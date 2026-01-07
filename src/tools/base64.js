/**
 * Base64-encode utf8 text.
 * @param {string} text
 * @param {{ url?: boolean }} [opts]
 */
export function base64Encode(text, opts = {}) {
  const url = opts.url ?? false;
  const b64 = Buffer.from(text, "utf8").toString("base64");
  if (!url) return b64;
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

/**
 * Decode base64/base64url into utf8 text.
 * @param {string} input
 * @param {{ url?: boolean }} [opts]
 */
export function base64Decode(input, opts = {}) {
  const url = opts.url ?? false;
  let s = String(input).trim();
  if (url) {
    s = s.replace(/-/g, "+").replace(/_/g, "/");
    // add padding
    const pad = s.length % 4;
    if (pad) s += "=".repeat(4 - pad);
  }
  return Buffer.from(s, "base64").toString("utf8");
}
