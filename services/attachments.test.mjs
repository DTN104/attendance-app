import assert from 'node:assert/strict';

import { submitWithAttachment } from './attachments.ts';

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
