// Runs the Pomodoro countdown on the page.
import { formatTime } from "./timer.js";

const FOCUS_SECONDS = 25 * 60;

const display = document.getElementById("display");
const message = document.getElementById("message");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

let secondsLeft = FOCUS_SECONDS;
let timer = null;

// Show the time that is left.
function render() {
  display.textContent = formatTime(secondsLeft);
  document.title = `${formatTime(secondsLeft)} - Pomodoro`;
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
    message.textContent = "Time's up! Take a break.";
  }
}

startButton.addEventListener("click", () => {
  message.textContent = "";
  render();
  timer = setInterval(tick, 1000);
});

pauseButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  secondsLeft = FOCUS_SECONDS;
  message.textContent = "";
  render();
  document.title = "Pomodoro Timer · vkit";
});

render();
document.title = "Pomodoro Timer · vkit";
