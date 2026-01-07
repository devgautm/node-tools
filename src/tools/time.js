/** Return an object with current timestamps. */
export function now() {
  const d = new Date();
  return normalizeDate(d);
}

/**
 * Parse a timestamp/ISO date.
 * Accepts:
 * - ISO strings
 * - unix seconds (10 digits)
 * - unix milliseconds (13 digits)
 * @param {string|number} value
 */
export function parseTime(value) {
  const raw = String(value).trim();
  let d;

  if (/^-?\d+$/.test(raw)) {
    const n = Number(raw);
    const absLen = raw.replace("-", "").length;
    d = new Date(absLen > 10 ? n : n * 1000);
  } else {
    d = new Date(raw);
  }

  if (Number.isNaN(d.getTime())) {
    return {
      input: value,
      valid: false,
      error: "Unrecognized date/time format",
    };
  }

  return { input: value, valid: true, ...normalizeDate(d) };
}

function normalizeDate(d) {
  const ms = d.getTime();
  const unix = Math.floor(ms / 1000);
  return {
    iso: d.toISOString(),
    ms,
    unix,
    tzOffsetMinutes: d.getTimezoneOffset(),
  };
}
