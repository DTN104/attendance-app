import assert from 'node:assert/strict';

import { formatMonthKey, getCalendarMonth, shiftMonth } from './date.ts';

const july = getCalendarMonth(new Date(2026, 6, 1));
assert.equal(july.leadingDays, 2);
assert.equal(july.days.length, 31);

const leapFebruary = getCalendarMonth(new Date(2024, 1, 1));
assert.equal(leapFebruary.leadingDays, 3);
assert.equal(leapFebruary.days.length, 29);

assert.equal(formatMonthKey(shiftMonth(new Date(2026, 11, 1), 1)), '2027-01');
