export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export function getAttachmentSizeError(size?: number) {
  return size !== undefined && size > MAX_ATTACHMENT_BYTES ? 'Tệp phải có dung lượng tối đa 10 MB.' : undefined;
}

export function formatAttachmentSize(size?: number) {
  if (size === undefined) return 'Đã chọn';
  if (size < 1024 * 1024) return `${Math.max(1, Math.ceil(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
