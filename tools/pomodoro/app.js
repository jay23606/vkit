// Runs the Pomodoro countdown on the page.
import { formatTime } from "./timer.js";

const display = document.getElementById("display");
const message = document.getElementById("message");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const durationSelect = document.getElementById("duration");

function selectedDurationSeconds() {
  return Math.max(1, Number(durationSelect.value) * 60);
}

let secondsLeft = selectedDurationSeconds();
let timer = null;

// Show the time that is left.
function render() {
  display.textContent = formatTime(secondsLeft);
}

// Called once every second while the timer is running.
function tick() {
  if (secondsLeft > 0) {
    secondsLeft = secondsLeft - 1;
    render();
  }

  if (secondsLeft === 0) {
    clearInterval(timer);
    timer = null;
    durationSelect.disabled = false;
    message.textContent = "Time's up! Take a break.";
  }
}

startButton.addEventListener("click", () => {
  message.textContent = "";
  durationSelect.disabled = true;
  timer = setInterval(tick, 1000);
});

pauseButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  durationSelect.disabled = false;
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  durationSelect.disabled = false;
  secondsLeft = selectedDurationSeconds();
  message.textContent = "";
  render();
});

durationSelect.addEventListener("change", () => {
  if (timer === null) {
    secondsLeft = selectedDurationSeconds();
    message.textContent = "";
    render();
  }
});

render();
