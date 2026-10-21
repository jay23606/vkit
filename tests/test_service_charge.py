import json
import subprocess
from pathlib import Path


root = Path(__file__).resolve().parents[1]
script = r'''import { pathToFileURL } from "node:url";
const fields = {
  total: { value: "600" },
  people: { value: "4" },
  "service-charge": { value: "" },
};
let click;
const result = { textContent: "" };
globalThis.document = {
  getElementById(id) {
    if (id === "split") return { addEventListener: (_, handler) => { click = handler; } };
    if (id === "result") return result;
    return fields[id];
  },
};
await import(pathToFileURL(process.cwd() + "/tools/bill-splitter/app.js"));
const outputs = [];
for (const charge of ["10", "5", "0", ""]) {
  fields["service-charge"].value = charge;
  click();
  outputs.push(result.textContent);
}
console.log(JSON.stringify(outputs));'''

run = subprocess.run(
    ["node", "--input-type=module", "-e", script],
    cwd=root,
    text=True,
    capture_output=True,
    check=True,
)
actual = json.loads(run.stdout.strip().splitlines()[-1])
expected = ["165.00", "157.50", "150.00", "150.00"]
assert all(value.startswith("Each person pays ") for value in actual) and [
    value[-6:] for value in actual
] == expected, f"expected displayed amounts {expected!r}, got {actual!r}"
print("Service charge calculation outputs match all four examples.")
