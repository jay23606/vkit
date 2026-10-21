// Connects the SGPI Calculator page to the maths in sgpi.js.
import { sgpi } from "./sgpi.js";

const calcButton = document.getElementById("calculate");
const result = document.getElementById("result");

calcButton.addEventListener("click", () => {
  // Read credits and grade from every subject row.
  const rows = document.querySelectorAll(".subject-row");
  const subjects = [];

  rows.forEach((row) => {
    subjects.push({
      credits: Number(row.querySelector(".credits").value),
      grade: row.querySelector(".grade").value,
    });
  });

  result.textContent = `Your SGPI: ${sgpi(subjects).toFixed(2)}`;
});
