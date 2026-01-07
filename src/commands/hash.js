import { parseArgs } from "node:util";
import { hashFile, hashString } from "../tools/hash.js";
import { readTextInput, isStdinPiped, writeOut } from "../utils/io.js";
import { CliError } from "../utils/errors.js";

export const command = {
  name: "hash",
  summary: "Hash text, files, or stdin (sha256, md5, sha1, ...)",
  examples: [
    "nt hash --text \"hello\"",
    "echo 'hello' | nt hash",
    "nt hash --file package.json --algo sha256",
    "nt hash --file package.json --algo md5",
  ],
  async run(ctx) {
    const { values } = parseArgs({
      args: ctx.args,
      allowPositionals: true,
      options: {
        algo: { type: "string", short: "a", default: "sha256" },
        encoding: { type: "string", short: "e", default: "hex" },
        file: { type: "string", short: "f" },
        text: { type: "string", short: "t" },
        upper: { type: "boolean", default: false },
      },
    });

    let out;
    if (values.file) {
      out = await hashFile(values.file, { algo: values.algo, encoding: values.encoding });
    } else {
      if (!values.text && !isStdinPiped()) {
        throw new CliError("Provide --text, --file, or pipe stdin. Try: nt hash --help");
      }
      const input = await readTextInput({ text: values.text });
      out = hashString(input, { algo: values.algo, encoding: values.encoding });
    }

    if (values.upper) out = out.toUpperCase();
    writeOut(`${out}\n`);
  },
};
