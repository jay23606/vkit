// Connects the Bill Splitter page to the maths in bill.js.
import { splitBill } from "./bill.js";

const totalInput = document.getElementById("total");
const peopleInput = document.getElementById("people");
const splitButton = document.getElementById("split");
const result = document.getElementById("result");

splitButton.addEventListener("click", () => {
  const total = Number(totalInput.value);
  const people = Number(peopleInput.value);

  if (peopleInput.value.trim() === "" || people <= 0) {
    result.textContent = "Enter the number of people (1 or more).";
    return;
  }

  if (totalInput.value.trim() === "" || total <= 0) {
    result.textContent = "Enter the total bill.";
    return;
  }

  const share = splitBill(total, people);
  result.textContent = `Each person pays ₹${share.toFixed(2)}`;
});
