import { randomUUID } from "node:crypto";

export function uuidV4() {
  return randomUUID();
}

/** @param {number} count */
export function uuidMany(count = 1) {
  const n = Math.max(1, Number(count) || 1);
  return Array.from({ length: n }, () => uuidV4());
}
