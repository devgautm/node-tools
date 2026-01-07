#!/usr/bin/env node

import fs from "node:fs/promises";
import { ansi } from "./utils/ansi.js";
import { writeErr, writeOut } from "./utils/io.js";
import { CliError } from "./utils/errors.js";
import { commands, commandMap } from "./commands/index.js";

const pkg = JSON.parse(
  await fs.readFile(new URL("../package.json", import.meta.url), "utf8")
);

const argv = process.argv.slice(2);

const globalFlags = new Set(["--help", "-h", "--version", "-v"]);

function printGlobalHelp() {
  writeOut(`${ansi.bold("node-tools")}

${ansi.bold("Usage")}:
  nt <command> [options]

${ansi.bold("Commands")}:
${commands
    .map((c) => `  ${ansi.cyan(c.name.padEnd(8))} ${ansi.dim(c.summary)}`)
    .join("\n")}

${ansi.bold("Examples")}:
  nt hash --text "hello"
  echo "hello" | nt hash
  nt json format --file data.json

Run a command with --help for more details:
  nt <command> --help
`);
}

function printCommandHelp(cmd) {
  const examples = cmd.examples?.length
    ? `\n${ansi.bold("Examples")}:\n  ${cmd.examples.join("\n  ")}\n`
    : "";

  writeOut(`${ansi.bold(`nt ${cmd.name}`)}
${ansi.dim(cmd.summary)}
${examples}
`);
}

async function main() {
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    printGlobalHelp();
    return;
  }

  if (argv.includes("--version") || argv.includes("-v")) {
    writeOut(`${pkg.name} v${pkg.version}\n`);
    return;
  }

  const [maybeCmd, ...rest] = argv;

  if (globalFlags.has(maybeCmd)) {
    printGlobalHelp();
    return;
  }

  if (maybeCmd === "help") {
    printGlobalHelp();
    return;
  }

  const cmd = commandMap[maybeCmd];
  if (!cmd) {
    throw new CliError(`Unknown command: ${maybeCmd}. Try: nt --help`);
  }

  if (rest.includes("--help") || rest.includes("-h")) {
    printCommandHelp(cmd);
    return;
  }

  await cmd.run({ args: rest });
}

try {
  await main();
} catch (err) {
  const isCli = err instanceof CliError;
  const msg = err instanceof Error ? err.message : String(err);
  writeErr(`${ansi.red(isCli ? msg : "Unexpected error:")} ${msg}\n`);
  if (!isCli && err instanceof Error && err.stack) {
    writeErr(`${ansi.dim(err.stack)}\n`);
  }
  process.exitCode = isCli ? err.exitCode ?? 1 : 1;
}
