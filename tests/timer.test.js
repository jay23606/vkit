// Tests for formatTime() in the Pomodoro Timer.
// Run all tests with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";

import { formatTime } from "../tools/pomodoro/timer.js";

test("25 minutes is shown as 25:00", () => {
  assert.equal(formatTime(1500), "25:00");
});

test("65 seconds is shown as 01:05", () => {
  assert.equal(formatTime(65), "01:05");
});

test("0 seconds is shown as 00:00", () => {
  assert.equal(formatTime(0), "00:00");
});
