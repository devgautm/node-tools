import fs from "node:fs/promises";

/** Returns true when data is piped into stdin. */
export function isStdinPiped() {
  return !process.stdin.isTTY;
}

/**
 * Read all data from stdin as utf-8.
 * @param {{ maxBytes?: number }} [opts]
 */
export async function readStdin(opts = {}) {
  const maxBytes = opts.maxBytes ?? 20 * 1024 * 1024; // 20MB safety cap
  if (process.stdin.isTTY) return "";

  const chunks = [];
  let total = 0;
  for await (const chunk of process.stdin) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += buf.length;
    if (total > maxBytes) {
      throw new Error(`stdin exceeded maxBytes (${maxBytes})`);
    }
    chunks.push(buf);
  }
  return Buffer.concat(chunks).toString("utf8");
}

/**
 * Read input text from: --text, --file, or stdin.
 * @param {{ text?: string, file?: string }} params
 */
export async function readTextInput({ text, file }) {
  if (typeof text === "string") return text;
  if (typeof file === "string") return fs.readFile(file, "utf8");
  return readStdin();
}

/**
 * Write a string to stdout (no extra newline).
 * @param {string} s
 */
export function writeOut(s) {
  process.stdout.write(String(s));
}

/**
 * Write a string to stderr (no extra newline).
 * @param {string} s
 */
export function writeErr(s) {
  process.stderr.write(String(s));
}
