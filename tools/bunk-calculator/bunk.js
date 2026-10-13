// Attendance maths for the Bunk Calculator.
// No DOM code here, so these functions can be tested with Node.

// Attendance as a percentage, e.g. 31 of 36 -> 86.11
export function attendancePercent(attended, held) {
  return attended / held * 100;
}

// How many more lectures you can skip and still stay at or above the target.
// If you skip, "held" goes up but "attended" stays the same.
export function canSkip(attended, held, target = 75) {
  const maxHeld = attended / (target / 100);
  return Math.max(0, Math.ceil(maxHeld - held));
}

// How many lectures in a row you must attend to get back up to the target.
// Each lecture you attend adds 1 to both "attended" and "held".
export function mustAttend(attended, held, target = 75) {
  const t = target / 100;
  return Math.max(0, Math.ceil((t * held - attended) / (1 - t)));
}
