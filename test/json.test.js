import test from "node:test";
import assert from "node:assert/strict";

import { formatJson, minifyJson, validateJson } from "../src/tools/json.js";

test("formatJson pretty prints", () => {
  const out = formatJson('{"a":1,"b":2}', { indent: 2 });
  assert.equal(out, '{\n  "a": 1,\n  "b": 2\n}');
});

test("minifyJson removes whitespace", () => {
  const out = minifyJson('{\n "a": 1, "b": 2 \n}');
  assert.equal(out, '{"a":1,"b":2}');
});

test("validateJson throws on invalid JSON", () => {
  assert.throws(() => validateJson('{"a":}')); 
});
