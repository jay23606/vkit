// Tests for canSkip() in the Bunk Calculator.
// Run all tests with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";

import { canSkip } from "../tools/bunk-calculator/bunk.js";

test("31 of 36 attended lets you skip 5 more, not 6", () => {
  assert.equal(canSkip(31, 36), 5);
});
