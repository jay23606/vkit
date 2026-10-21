// Exercise the Pomodoro app with a controllable clock and lightweight DOM.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

import { formatTime } from "../tools/pomodoro/timer.js";

const DEFAULT_TITLE = "Pomodoro Timer · vkit";

test("the tab title follows the running timer, stays paused, and resets", async () => {
  const appUrl = process.env.POMODORO_APP_PATH
    ? pathToFileURL(resolve(process.env.POMODORO_APP_PATH))
    : new URL("../tools/pomodoro/app.js", import.meta.url);
  const source = (await readFile(appUrl, "utf8")).replace(
    /import \{ formatTime \} from "\.\/timer\.js";\s*/,
    "",
  );
  assert.notEqual(source, "", "Pomodoro app source must be available");

  const elements = Object.fromEntries(["display", "message", "start", "pause", "reset"].map((id) => [
    id,
    {
      textContent: id === "display" ? "25:00" : "",
      addEventListener(event, handler) {
        assert.equal(event, "click");
        this.click = handler;
      },
    },
  ]));
  const intervals = new Map();
  let nextInterval = 0;
  const document = {
    title: DEFAULT_TITLE,
    getElementById(id) {
      return elements[id];
    },
  };

  runInNewContext(source, {
    document,
    formatTime,
    setInterval(callback, delay) {
      assert.equal(delay, 1000);
      const id = ++nextInterval;
      intervals.set(id, callback);
      return id;
    },
    clearInterval(id) {
      intervals.delete(id);
    },
  });

  assert.equal(document.title, DEFAULT_TITLE, "opening the page keeps the normal title");

  elements.start.click();
  assert.equal(document.title, "25:00 - Pomodoro", "Start shows the remaining time immediately");
  const [intervalId] = [...intervals.keys()];
  const advanceSecond = () => {
    for (const callback of [...intervals.values()]) callback();
  };

  advanceSecond();
  assert.equal(elements.display.textContent, "24:59");
  assert.equal(document.title, `${elements.display.textContent} - Pomodoro`, "title matches the displayed time after a tick");

  advanceSecond();
  assert.equal(elements.display.textContent, "24:58");
  assert.equal(document.title, `${elements.display.textContent} - Pomodoro`, "title updates with every tick");

  elements.pause.click();
  const pausedTime = elements.display.textContent;
  assert.equal(intervals.has(intervalId), false, "Pause stops the timer");
  advanceSecond();
  assert.equal(elements.display.textContent, pausedTime, "the display remains paused after another second");
  assert.equal(document.title, `${pausedTime} - Pomodoro`, "Pause preserves the remaining time in the title");

  elements.reset.click();
  assert.equal(elements.display.textContent, "25:00");
  assert.equal(document.title, DEFAULT_TITLE, "Reset restores the normal title");
});
