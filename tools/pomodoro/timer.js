// Time formatting for the Pomodoro Timer.
// No DOM code here, so this function can be tested with Node.

// Turns a number of seconds into "MM:SS", e.g. 65 -> "01:05".
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
