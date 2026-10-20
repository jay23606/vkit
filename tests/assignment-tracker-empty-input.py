from pathlib import Path
import subprocess
import sys


app = Path("tools/assignment-tracker/app.js").resolve()
BASE_COMMIT = "243deba5687306ad349139d58a02ae451c7f329f"
test = r"""
const vm = require('node:vm');
const assert = require('node:assert/strict');

class Element {
  constructor() { this.children = []; this.listeners = {}; this.value = ''; this.classList = { add() {} }; }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  append(...children) { this.children.push(...children); }
  set innerHTML(value) { if (value === '') this.children = []; }
}

const input = new Element();
const addButton = new Element();
const list = new Element();
const writes = [];
const context = {
  document: { getElementById: id => ({ 'new-assignment': input, add: addButton, list }[id]), createElement: () => new Element() },
  localStorage: { setItem: (...args) => writes.push(args) }
};
vm.runInNewContext(require('node:fs').readFileSync(0, 'utf8'), context);

addButton.listeners.click();
assert.equal(list.children.length, 0, 'blank click should leave the assignment list unchanged');
assert.equal(writes.length, 0, 'blank click should not save');

input.value = '   ';
input.listeners.keydown({ key: 'Enter' });
assert.equal(list.children.length, 0, 'whitespace Enter should leave the assignment list unchanged');
assert.equal(writes.length, 0, 'whitespace Enter should not save');

input.value = 'DBMS journal';
addButton.listeners.click();
assert.equal(list.children.length, 1, 'Add should create a real assignment');
assert.equal(list.children[0].children[1].textContent, 'DBMS journal');

input.value = 'Exam review';
input.listeners.keydown({ key: 'Enter' });
assert.equal(list.children.length, 2, 'Enter should create a real assignment');
assert.equal(list.children[1].children[1].textContent, 'Exam review');
"""

source = app.read_text(encoding="utf-8")
if "--base" in sys.argv:
    source = subprocess.run(
        ["git", "show", f"{BASE_COMMIT}:tools/assignment-tracker/app.js"],
        check=True, capture_output=True, text=True
    ).stdout

result = subprocess.run(["node", "-e", test], input=source, capture_output=True, text=True)
if result.returncode:
    raise AssertionError(result.stderr or result.stdout)
print("Behavioral assignment tracker regression test passed")
