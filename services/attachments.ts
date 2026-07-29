import { apiRequest } from './api.ts';
import type { RequestAttachment } from '../data/requests.ts';

type PresignResponse = {
  attachmentId: string;
  headers: Record<string, string>;
  objectKey: string;
  uploadUrl: string;
};

export type LocalAttachment = RequestAttachment & { uri: string };

export type UploadedAttachment = {
  id: string;
  name: string;
  objectKey: string;
};

export function isLocalAttachment(attachment?: RequestAttachment | null): attachment is LocalAttachment {
  return Boolean(attachment?.uri);
}

export function toStoredAttachment(
  local: LocalAttachment,
  uploaded: UploadedAttachment,
): RequestAttachment {
  return {
    id: uploaded.id,
    mimeType: local.mimeType,
    name: uploaded.name,
    objectKey: uploaded.objectKey,
    size: local.size,
  };
}

export async function uploadAttachment(
  attachment: LocalAttachment,
  ownerId: string,
  accessToken: string,
): Promise<UploadedAttachment> {
  const presign = await apiRequest<PresignResponse>('/uploads/presign', {
    accessToken,
    body: JSON.stringify({
      purpose: 'request_attachment',
      ownerId,
      mimeType: attachment.mimeType,
      name: attachment.name,
      size: attachment.size,
    }),
    method: 'POST',
  });

  const uploadResponse = await uploadLocalFile(presign.uploadUrl, presign.headers, attachment);
  if (!uploadResponse.ok) throw new Error('MinIO từ chối tải tệp.');

  await apiRequest(`/uploads/${presign.attachmentId}/complete`, {
    accessToken,
    body: JSON.stringify({}),
    method: 'POST',
  });

  return { id: presign.attachmentId, name: attachment.name, objectKey: presign.objectKey };
}

async function uploadLocalFile(
  uploadUrl: string,
  headers: Record<string, string>,
  attachment: LocalAttachment,
) {
  try {
    if (typeof document !== 'undefined') {
      const localFile = await fetch(attachment.uri);
      if (!localFile.ok) throw new Error('Không thể đọc tệp đã chọn.');
      return fetch(uploadUrl, { body: await localFile.blob(), headers, method: 'PUT' });
    }

    const [{ File }, { fetch: expoFetch }] = await Promise.all([
      import('expo-file-system'),
      import('expo/fetch'),
    ]);
    return expoFetch(uploadUrl, { body: new File(attachment.uri), headers, method: 'PUT' });
  } catch (error) {
    throw new Error(
      error instanceof Error ? `Không thể tải tệp: ${error.message}` : 'Không thể tải tệp đính kèm.',
    );
  }
}

export async function submitWithAttachment<T>(
  attachment: LocalAttachment | null,
  submit: (uploaded?: UploadedAttachment) => T,
  upload: (attachment: LocalAttachment) => Promise<UploadedAttachment>,
) {
  const uploaded = attachment ? await upload(attachment) : undefined;
  return submit(uploaded);
}
