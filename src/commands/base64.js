import { parseArgs } from "node:util";
import { base64Encode, base64Decode } from "../tools/base64.js";
import { readTextInput, isStdinPiped, writeOut } from "../utils/io.js";
import { CliError } from "../utils/errors.js";

export const command = {
  name: "base64",
  summary: "Base64 encode/decode (standard + urlsafe)",
  examples: [
    "nt base64 encode --text \"hello\"",
    "nt base64 decode --text \"aGVsbG8=\"",
    "cat input.txt | nt base64 encode",
    "cat b64.txt | nt base64 decode"
  ],
  async run(ctx) {
    const { positionals, values } = parseArgs({
      args: ctx.args,
      allowPositionals: true,
      options: {
        file: { type: "string", short: "f" },
        text: { type: "string", short: "t" },
        url: { type: "boolean", default: false }
      }
    });

    const action = positionals[0];
    if (!action || action === "help" || action === "--help") {
      throw new CliError("Usage: nt base64 <encode|decode> [--file path] [--text str] [--url]\nTry: nt base64 --help");
    }

    if (!values.text && !values.file && !isStdinPiped()) {
      throw new CliError("Provide --text, --file, or pipe stdin.");
    }

    const input = await readTextInput({ text: values.text, file: values.file });

    if (action === "encode") {
      writeOut(`${base64Encode(input, { url: values.url })}\n`);
      return;
    }

    if (action === "decode") {
      writeOut(`${base64Decode(input, { url: values.url })}\n`);
      return;
    }

    throw new CliError(`Unknown base64 action: ${action}. Use encode|decode.`);
  }
};
