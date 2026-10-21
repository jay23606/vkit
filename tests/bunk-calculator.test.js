// Tests for checkInputs() in the Bunk Calculator.
// Run all tests with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";

import * as bunk from "../tools/bunk-calculator/bunk.js";

test("typed numbers that cannot be real get a message, and real numbers get none", () => {
  assert.equal(bunk.checkInputs("40", "30"), "Lectures attended can't be more than lectures held.");
  assert.equal(bunk.checkInputs("", ""), "Please fill in both boxes.");
  assert.equal(bunk.checkInputs("", "36"), "Please fill in both boxes.");
  assert.equal(bunk.checkInputs("31", ""), "Please fill in both boxes.");
  assert.equal(bunk.checkInputs("-5", "36"), "Lectures held must be at least 1, and neither number can be negative.");
  assert.equal(bunk.checkInputs("5", "0"), "Lectures held must be at least 1, and neither number can be negative.");

  assert.equal(bunk.checkInputs("30", "30"), null);
  assert.equal(bunk.checkInputs("0", "10"), null);
  assert.equal(bunk.checkInputs("31", "36"), null);
});
