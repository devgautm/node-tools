/**
 * Turn text into a URL-friendly slug.
 * @param {string} input
 * @param {{ separator?: string }} [opts]
 */
export function slugify(input, opts = {}) {
  const separator = opts.separator ?? "-";
  const sep = separator.length ? separator : "-";

  const cleaned = String(input)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, sep)
    .replace(new RegExp(`${escapeRegExp(sep)}{2,}`, "g"), sep)
    .replace(new RegExp(`^${escapeRegExp(sep)}|${escapeRegExp(sep)}$`, "g"), "");

  return cleaned;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
