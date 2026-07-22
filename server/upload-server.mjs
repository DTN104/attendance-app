import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { extname } from 'node:path';
import { pathToFileURL } from 'node:url';

import { Client } from 'minio';

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);

export function validateUpload({ mimeType, name, size } = {}) {
  if (typeof name !== 'string' || !name.trim()) return 'Tên tệp không hợp lệ.';
  if (!ALLOWED_MIME_TYPES.has(mimeType)) return 'Chỉ hỗ trợ tệp PNG, JPG hoặc PDF.';
  if (!Number.isFinite(size) || size <= 0) return 'Dung lượng tệp không hợp lệ.';
  if (size > MAX_ATTACHMENT_BYTES) return 'Tệp phải có dung lượng tối đa 10 MB.';
  return undefined;
}

export function createObjectKey(name, date = new Date(), id = randomUUID()) {
  return `attachments/${date.toISOString().slice(0, 7)}/${id}${extname(name).toLowerCase()}`;
}

async function readJson(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 4096) throw new Error('Request quá lớn.');
  }
  return JSON.parse(body);
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify(body));
}

async function startServer() {
  const required = ['MINIO_ENDPOINT', 'MINIO_ACCESS_KEY', 'MINIO_SECRET_KEY'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Thiếu biến môi trường: ${missing.join(', ')}`);

  const bucket = process.env.MINIO_BUCKET ?? 'attendance-attachments';
  const minio = new Client({
    accessKey: process.env.MINIO_ACCESS_KEY,
    endPoint: process.env.MINIO_ENDPOINT,
    port: Number(process.env.MINIO_PORT ?? 9000),
    secretKey: process.env.MINIO_SECRET_KEY,
    useSSL: process.env.MINIO_USE_SSL === 'true',
  });

  if (!await minio.bucketExists(bucket)) await minio.makeBucket(bucket);

  // ponytail: local-only presigner; add authentication and a size-constrained POST policy before production.
  const server = createServer(async (request, response) => {
    if (request.method === 'OPTIONS') return sendJson(response, 204, {});
    if (request.method === 'GET' && request.url === '/health') return sendJson(response, 200, { ok: true });
    if (request.method !== 'POST' || request.url !== '/uploads/presign') return sendJson(response, 404, { error: 'Không tìm thấy endpoint.' });

    try {
      const upload = await readJson(request);
      const error = validateUpload(upload);
      if (error) return sendJson(response, 400, { error });

      const objectKey = createObjectKey(upload.name);
      const uploadUrl = await minio.presignedPutObject(bucket, objectKey, 5 * 60);
      return sendJson(response, 200, { objectKey, uploadUrl });
    } catch {
      return sendJson(response, 400, { error: 'Dữ liệu tải lên không hợp lệ.' });
    }
  });

  const host = process.env.UPLOAD_API_HOST ?? '0.0.0.0';
  const port = Number(process.env.UPLOAD_API_PORT ?? 3001);
  server.listen(port, host, () => console.log(`Upload API: http://${host}:${port}`));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
