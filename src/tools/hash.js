import { createHash } from "node:crypto";
import fs from "node:fs";

/**
 * Hash a string.
 * @param {string} text
 * @param {{ algo?: string, encoding?: import('node:crypto').BinaryToTextEncoding }} [opts]
 */
export function hashString(text, opts = {}) {
  const algo = opts.algo ?? "sha256";
  const encoding = opts.encoding ?? "hex";
  return createHash(algo).update(text).digest(encoding);
}

/**
 * Hash a file without loading it fully into memory.
 * @param {string} filepath
 * @param {{ algo?: string, encoding?: import('node:crypto').BinaryToTextEncoding }} [opts]
 */
export async function hashFile(filepath, opts = {}) {
  const algo = opts.algo ?? "sha256";
  const encoding = opts.encoding ?? "hex";

  return await new Promise((resolve, reject) => {
    const hash = createHash(algo);
    const stream = fs.createReadStream(filepath);
    stream.on("error", reject);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => {
      try {
        resolve(hash.digest(encoding));
      } catch (e) {
        reject(e);
      }
    });
  });
}
