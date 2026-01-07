import test from "node:test";
import assert from "node:assert/strict";

import { parseTime } from "../src/tools/time.js";

test("parseTime unix seconds", () => {
  const res = parseTime(0);
  assert.equal(res.valid, true);
  assert.equal(res.unix, 0);
  assert.equal(res.iso, "1970-01-01T00:00:00.000Z");
});

test("parseTime unix milliseconds", () => {
  const res = parseTime(0);
  assert.equal(res.valid, true);
  assert.equal(res.ms, 0);
});

test("parseTime invalid", () => {
  const res = parseTime("not-a-time");
  assert.equal(res.valid, false);
});
