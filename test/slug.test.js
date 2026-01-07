import test from "node:test";
import assert from "node:assert/strict";

import { slugify } from "../src/tools/slug.js";

test("slugify basic", () => {
  assert.equal(slugify("Hello, World!"), "hello-world");
});

test("slugify removes diacritics", () => {
  assert.equal(slugify("Café au lait"), "cafe-au-lait");
});

test("slugify custom separator", () => {
  assert.equal(slugify("Hello World", { separator: "_" }), "hello_world");
});
