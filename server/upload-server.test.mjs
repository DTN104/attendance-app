import assert from 'node:assert/strict';

import { createObjectKey, validateUpload } from './upload-server.mjs';

assert.equal(validateUpload({ mimeType: 'image/png', name: 'proof.png', size: 1024 }), undefined);
assert.equal(validateUpload({ mimeType: 'text/plain', name: 'proof.txt', size: 1024 }), 'Chỉ hỗ trợ tệp PNG, JPG hoặc PDF.');
assert.equal(validateUpload({ mimeType: 'application/pdf', name: 'proof.pdf', size: 10 * 1024 * 1024 + 1 }), 'Tệp phải có dung lượng tối đa 10 MB.');
assert.equal(createObjectKey('proof.PDF', new Date('2026-07-22T00:00:00Z'), 'test-id'), 'attachments/2026-07/test-id.pdf');
