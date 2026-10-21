// Connects the Bill Splitter page to the maths in bill.js.
import { splitBill } from "./bill.js";

const totalInput = document.getElementById("total");
const peopleInput = document.getElementById("people");
const serviceChargeInput = document.getElementById("service-charge");
const splitButton = document.getElementById("split");
const result = document.getElementById("result");

splitButton.addEventListener("click", () => {
  const total = Number(totalInput.value);
  const people = Number(peopleInput.value);
  const serviceCharge = Number(serviceChargeInput.value || 0);

  const share = splitBill(total + total * serviceCharge / 100, people);
  result.textContent = `Each person pays ₹${share.toFixed(2)}`;
});
