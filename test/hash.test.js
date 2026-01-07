import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { hashString, hashFile } from "../src/tools/hash.js";

test("hashString('hello') sha256", () => {
  const out = hashString("hello", { algo: "sha256" });
  assert.equal(
    out,
    "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
  );
});

test("hashFile() matches hashString()", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "node-tools-"));
  const p = path.join(dir, "x.txt");
  await fs.writeFile(p, "hello", "utf8");
  const fileHash = await hashFile(p, { algo: "sha256" });
  const strHash = hashString("hello", { algo: "sha256" });
  assert.equal(fileHash, strHash);
});
