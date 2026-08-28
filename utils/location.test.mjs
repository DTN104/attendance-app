import assert from 'node:assert/strict';

import { getDistanceMeters, OFFICE_LOCATION } from './location.ts';

assert.equal(getDistanceMeters(OFFICE_LOCATION, OFFICE_LOCATION), 0);
assert.ok(getDistanceMeters(OFFICE_LOCATION, {
  latitude: OFFICE_LOCATION.latitude + 0.001,
  longitude: OFFICE_LOCATION.longitude,
}) > 100);
