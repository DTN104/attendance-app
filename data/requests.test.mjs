import assert from 'node:assert/strict';

import { getRequestRoute } from './requests.ts';

assert.deepEqual(
  getRequestRoute({ id: 'draft-1', status: 'draft', type: 'business' }),
  { pathname: '/business-trip-request', params: { id: 'draft-1' } },
);
assert.deepEqual(
  getRequestRoute({ id: 'request-1', status: 'pending', type: 'leave' }),
  { pathname: '/request-detail', params: { id: 'request-1' } },
);
