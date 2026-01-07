const isColorEnabled =
  process.stdout.isTTY &&
  !process.env.NO_COLOR &&
  process.env.TERM !== "dumb";

function wrap(open, close, s) {
  return isColorEnabled ? `${open}${s}${close}` : String(s);
}

export const ansi = {
  bold: (s) => wrap("\x1b[1m", "\x1b[22m", s),
  dim: (s) => wrap("\x1b[2m", "\x1b[22m", s),
  red: (s) => wrap("\x1b[31m", "\x1b[39m", s),
  green: (s) => wrap("\x1b[32m", "\x1b[39m", s),
  yellow: (s) => wrap("\x1b[33m", "\x1b[39m", s),
  cyan: (s) => wrap("\x1b[36m", "\x1b[39m", s),
};
