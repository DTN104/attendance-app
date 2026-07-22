import type { DocumentPickerAsset } from 'expo-document-picker';

type PresignResponse = {
  error?: string;
  objectKey?: string;
  uploadUrl?: string;
};

export async function uploadAttachment(attachment: DocumentPickerAsset) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!apiUrl) throw new Error('Thiếu EXPO_PUBLIC_API_URL trong .env.local.');

  const presignResponse = await fetch(`${apiUrl}/uploads/presign`, {
    body: JSON.stringify({
      mimeType: attachment.mimeType,
      name: attachment.name,
      size: attachment.size,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  const presign = await presignResponse.json() as PresignResponse;

  if (!presignResponse.ok || !presign.uploadUrl || !presign.objectKey) {
    throw new Error(presign.error ?? 'Không thể tạo đường dẫn tải lên.');
  }

  const localFile = await fetch(attachment.uri);
  if (!localFile.ok) throw new Error('Không thể đọc tệp đã chọn.');

  const uploadResponse = await fetch(presign.uploadUrl, {
    body: await localFile.blob(),
    headers: { 'Content-Type': attachment.mimeType ?? 'application/octet-stream' },
    method: 'PUT',
  });
  if (!uploadResponse.ok) throw new Error('MinIO từ chối tải tệp.');

  return { objectKey: presign.objectKey };
}
