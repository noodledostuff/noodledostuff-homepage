import test from 'node:test';
import assert from 'node:assert/strict';
import { progress, recordTotals } from '../snowbreak/training.js';

test('Combat Records charge the selected cost and carry EXP across level thresholds', () => {
  assert.deepEqual(recordTotals([0,0,0,0]), { exp: 0, cost: 0 });
  assert.deepEqual(recordTotals([1,0,0,0]), { exp: 600, cost: 150 });
  assert.deepEqual(recordTotals([2,1,1,1]), { exp: 14400, cost: 3600 });
  assert.deepEqual(progress(399), { level: 1, exp: 399, next: 400 });
  assert.deepEqual(progress(400), { level: 2, exp: 0, next: 600 });
  assert.deepEqual(progress(600), { level: 2, exp: 200, next: 600 });
  assert.deepEqual(progress(1000), { level: 3, exp: 0, next: 800 });
  assert.deepEqual(progress(50000), { level: 20, exp: 0, next: 0 });
});
