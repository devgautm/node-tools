import { parseArgs } from "node:util";
import { formatJson, minifyJson, validateJson } from "../tools/json.js";
import { readTextInput, isStdinPiped, writeOut } from "../utils/io.js";
import { CliError } from "../utils/errors.js";

export const command = {
  name: "json",
  summary: "Format, minify, or validate JSON",
  examples: [
    "nt json format --file data.json",
    "cat data.json | nt json minify",
    "nt json validate --file data.json",
  ],
  async run(ctx) {
    const { positionals, values } = parseArgs({
      args: ctx.args,
      allowPositionals: true,
      options: {
        file: { type: "string", short: "f" },
        text: { type: "string", short: "t" },
        indent: { type: "string", short: "i", default: "2" },
        quiet: { type: "boolean", default: false }
      }
    });

    const action = positionals[0];
    if (!action || action === "help" || action === "--help") {
      throw new CliError("Usage: nt json <format|minify|validate> [--file path] [--text str]\nTry: nt json --help");
    }

    if (!values.text && !values.file && !isStdinPiped()) {
      throw new CliError("Provide --text, --file, or pipe stdin.");
    }

    const input = await readTextInput({ text: values.text, file: values.file });

    if (action === "format") {
      const indent = Math.max(0, Number(values.indent) || 2);
      writeOut(`${formatJson(input, { indent })}\n`);
      return;
    }

    if (action === "minify") {
      writeOut(`${minifyJson(input)}\n`);
      return;
    }

    if (action === "validate") {
      validateJson(input);
      if (!values.quiet) writeOut("OK\n");
      return;
    }

    throw new CliError(`Unknown json action: ${action}. Use format|minify|validate.`);
  }
};
