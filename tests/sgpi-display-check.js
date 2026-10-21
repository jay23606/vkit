import assert from "node:assert/strict";

const scenarios = [
  ["O", "A+", "A+"],
  ["O", "O", "A+"],
  ["O", "O", "O"],
];
let scenarioIndex = 0;
let clickHandler;
const result = { textContent: "" };
globalThis.document = {
  getElementById(id) {
    if (id === "result") return result;
    return { addEventListener(_event, handler) { clickHandler = handler; } };
  },
  querySelectorAll() {
    return scenarios[scenarioIndex++].map((grade) => ({
      querySelector(selector) {
        if (selector === ".credits") return { value: "3" };
        if (selector === ".grade") return { value: grade };
        throw new Error(`Unexpected selector: ${selector}`);
      },
    }));
  },
};

await import("../tools/sgpi-calculator/app.js");
for (const expected of ["Your SGPI: 9.33", "Your SGPI: 9.67", "Your SGPI: 10.00"]) {
  clickHandler();
  assert.equal(result.textContent, expected, `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result.textContent)}`);
}
console.log("SGPI display formatting passed for 9.33, 9.67, and 10.00.");

