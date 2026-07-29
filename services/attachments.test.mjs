import assert from 'node:assert/strict';

import { isLocalAttachment, submitWithAttachment, toStoredAttachment } from './attachments.ts';

const attachment = { name: 'proof.pdf', uri: 'file:///proof.pdf' };
const events = [];
const id = await submitWithAttachment(
  attachment,
  (uploaded) => {
    events.push(`submit:${uploaded.objectKey}`);
    return 'REQ-1';
  },
  async () => {
    events.push('upload');
    return { name: attachment.name, objectKey: 'attachments/proof.pdf' };
  },
);

assert.equal(id, 'REQ-1');
assert.deepEqual(events, ['upload', 'submit:attachments/proof.pdf']);

let uploaded = false;
await submitWithAttachment(null, () => 'REQ-2', async () => {
  uploaded = true;
  return { name: '', objectKey: '' };
});
assert.equal(uploaded, false);

const stored = toStoredAttachment(
  { mimeType: 'application/pdf', name: 'proof.pdf', size: 1024, uri: 'file:///proof.pdf' },
  { id: 'ATT-1', name: 'proof.pdf', objectKey: 'attachments/proof.pdf' },
);
assert.deepEqual(stored, {
  id: 'ATT-1',
  mimeType: 'application/pdf',
  name: 'proof.pdf',
  objectKey: 'attachments/proof.pdf',
  size: 1024,
});
assert.equal(isLocalAttachment(stored), false);
