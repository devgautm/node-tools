/**
 * Parse JSON from a string with a nicer error message.
 * @param {string} input
 */
export function parseJson(input) {
  try {
    return JSON.parse(input);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const e = new Error(`Invalid JSON: ${msg}`);
    e.cause = err;
    throw e;
  }
}

/**
 * Format JSON (pretty-print).
 * @param {string} input
 * @param {{ indent?: number }} [opts]
 */
export function formatJson(input, opts = {}) {
  const indent = opts.indent ?? 2;
  const obj = parseJson(input);
  return JSON.stringify(obj, null, indent);
}

/**
 * Minify JSON (strip whitespace).
 * @param {string} input
 */
export function minifyJson(input) {
  const obj = parseJson(input);
  return JSON.stringify(obj);
}

/**
 * Validate JSON, returning the parsed object.
 * @param {string} input
 */
export function validateJson(input) {
  return parseJson(input);
}
