// Connects the Bunk Calculator page to the maths in bunk.js.
import { attendancePercent, canSkip, mustAttend } from "./bunk.js";

const TARGET = 75;

const attendedInput = document.getElementById("attended");
const heldInput = document.getElementById("held");
const calcButton = document.getElementById("calculate");
const result = document.getElementById("result");

calcButton.addEventListener("click", () => {
  const attended = Number(attendedInput.value);
  const held = Number(heldInput.value);

  const percent = attendancePercent(attended, held);
  let message = `<p>Your attendance: ${percent.toFixed(2)}%</p>`;

  if (percent >= TARGET) {
    const skip = canSkip(attended, held, TARGET);
    message += `<p>You can skip ${skip} more lectures and stay above ${TARGET}%.</p>`;
  } else {
    const need = mustAttend(attended, held, TARGET);
    message += `<p>Attend the next ${need} lectures in a row to get back to ${TARGET}%.</p>`;
  }

  result.innerHTML = message;
});
