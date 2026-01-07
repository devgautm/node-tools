import test from "node:test";
import assert from "node:assert/strict";

import { base64Encode, base64Decode } from "../src/tools/base64.js";

test("base64Encode/base64Decode roundtrip", () => {
  const b64 = base64Encode("hello");
  assert.equal(b64, "aGVsbG8=");
  assert.equal(base64Decode(b64), "hello");
});

test("base64url encode/decode", () => {
  const b64u = base64Encode("hello", { url: true });
  assert.equal(b64u, "aGVsbG8");
  assert.equal(base64Decode(b64u, { url: true }), "hello");
});
