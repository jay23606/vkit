// Exercise the page's real click handler with a small mocked DOM.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { test } from "node:test";

const appSource = (await readFile(new URL("../tools/bill-splitter/app.js", import.meta.url), "utf8"))
  .replace('import { splitBill } from "./bill.js";', "const splitBill = (total, people) => total / people;");

function clickSplit(total, people) {
  const elements = {
    total: { value: total },
    people: { value: people },
    split: { addEventListener: (_event, handler) => { elements.handler = handler; } },
    result: { textContent: "" },
  };
  vm.runInNewContext(appSource, {
    document: { getElementById: (id) => elements[id] },
  });
  elements.handler();
  return elements.result.textContent;
}

test("invalid bill splitter inputs show a clear message", () => {
  for (const [total, people] of [["600", "0"], ["600", ""], ["", "4"], ["", ""], ["-600", "4"], ["600", "-4"]]) {
    const message = clickSplit(total, people);
    assert.match(message, /^Enter (the number of people \(1 or more\)\.|the total bill\.)$/);
    assert.doesNotMatch(message, /Infinity|NaN|₹/);
  }
});

test("valid bill splitter inputs still show the rounded share", () => {
  assert.equal(clickSplit("600", "4"), "Each person pays ₹150.00");
  assert.equal(clickSplit("100", "3"), "Each person pays ₹33.33");
});
