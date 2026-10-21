from pathlib import Path
import subprocess
import sys


root = Path(__file__).resolve().parents[1]
html = (root / "tools/pomodoro/index.html").read_text(encoding="utf-8")

if '<select id="duration">' not in html or '<option value="25" selected>' not in html or '<option value="50">' not in html:
    print("missing 25/50 minute duration choices", file=sys.stderr)
    raise SystemExit(1)

script = r'''
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const elements = Object.fromEntries(["display", "message", "start", "pause", "reset", "duration"].map(id => [id, {
  id, textContent: "", disabled: false, value: id === "duration" ? "25" : "",
  listeners: {}, addEventListener(name, fn) { this.listeners[name] = fn; },
  click() { this.listeners.click(); }, change() { this.listeners.change(); },
}]));
globalThis.document = { getElementById: id => elements[id] };
let interval;
globalThis.setInterval = fn => (interval = fn, 1);
globalThis.clearInterval = () => { interval = null; };

await import(pathToFileURL(process.argv[1]));
assert.equal(elements.display.textContent, "25:00");
elements.duration.value = "50";
elements.duration.change();
assert.equal(elements.display.textContent, "50:00");
elements.start.click();
assert.equal(elements.duration.disabled, true);
interval();
assert.equal(elements.display.textContent, "49:59");
elements.duration.value = "25";
elements.duration.change();
assert.equal(elements.display.textContent, "49:59", "duration changed while timer was running");
elements.duration.value = "50";
elements.reset.click();
assert.equal(elements.duration.disabled, false);
assert.equal(elements.display.textContent, "50:00");
elements.start.click();
interval();
assert.equal(elements.display.textContent, "49:59");
elements.pause.click();
assert.equal(elements.duration.disabled, false);
elements.duration.value = "25";
elements.duration.change();
assert.equal(elements.display.textContent, "25:00");
'''

result = subprocess.run(
    ["node", "--input-type=module", "-e", script, str(root / "tools/pomodoro/app.js")],
    cwd=root,
    text=True,
    capture_output=True,
)
if result.returncode:
    print(result.stderr, file=sys.stderr)
    raise SystemExit(result.returncode)
print("Pomodoro duration behavior checks passed")
