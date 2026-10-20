import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const footer = html.match(/<footer>[\s\S]*?<\/footer>/)?.[0] ?? '';
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

function yearShownAt(date) {
  const slot = { textContent: '' };
  const document = { getElementById: (id) => (id === 'footer-year' ? slot : null) };
  const FakeDate = class extends Date {
    constructor() {
      super(date);
    }
  };
  vm.runInNewContext(script, { document, Date: FakeDate });
  return String(slot.textContent);
}

test('index.html does not type the year in', () => {
  assert.doesNotMatch(html, /2025|2026/, 'year is hard-coded in index.html');
});

test('footer has a slot for the year', () => {
  assert.match(footer, /<span id="footer-year"><\/span>/, 'footer-year span missing');
});

test('footer script fills the slot with the current year', () => {
  assert.ok(script, 'footer script missing');
  assert.equal(yearShownAt('2026-10-20T12:00:00Z'), '2026');
  assert.equal(yearShownAt('2027-01-03T09:00:00Z'), '2027');
});
