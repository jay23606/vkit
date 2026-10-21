import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(path.join(root, "css/style.css"), "utf8");
const app = readFileSync(path.join(root, "tools/bunk-calculator/app.js"), "utf8")
  .replace(/^import .*;\r?\n/m, "");

assert.match(css, /--result-green:/);
assert.match(css, /--result-orange:/);
assert.match(css, /--result-red:/);
for (const colour of ["green", "orange", "red"]) {
  assert.match(css, new RegExp(`\\.result\\.attendance-${colour}\\s*\\{[^}]*var\\(--result-${colour}\\)`, "s"));
}

const elements = {
  attended: { value: "" },
  held: { value: "36" },
  calculate: { addEventListener(_event, handler) { this.handler = handler; } },
  result: { innerHTML: "", className: "result" },
};
const context = {
  document: { getElementById(id) { return elements[id]; } },
  attendancePercent: (attended, held) => attended / held * 100,
  canSkip: () => 0,
  mustAttend: () => 0,
};
vm.runInNewContext(app, context);

for (const [attended, held, expected] of [[31, 36, "green"], [25, 36, "orange"], [20, 36, "red"], [30, 40, "green"], [26, 40, "orange"]]) {
  elements.attended.value = String(attended);
  elements.held.value = String(held);
  elements.calculate.handler();
  assert.equal(elements.result.className, `result attendance-${expected}`, `${attended}/${held} should be ${expected}`);
}

elements.attended.value = "31";
elements.held.value = "36";
elements.calculate.handler();
assert.equal(elements.result.className, "result attendance-green");
elements.attended.value = "20";
elements.calculate.handler();
assert.equal(elements.result.className, "result attendance-red", "recalculation should replace the previous colour");
