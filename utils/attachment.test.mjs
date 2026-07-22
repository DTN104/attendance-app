import assert from 'node:assert/strict';

import { formatAttachmentSize, getAttachmentSizeError, MAX_ATTACHMENT_BYTES } from './attachment.ts';

assert.equal(getAttachmentSizeError(MAX_ATTACHMENT_BYTES), undefined);
assert.equal(getAttachmentSizeError(MAX_ATTACHMENT_BYTES + 1), 'Tệp phải có dung lượng tối đa 10 MB.');
assert.equal(formatAttachmentSize(1536), '2 KB');
assert.equal(formatAttachmentSize(1.5 * 1024 * 1024), '1.5 MB');
