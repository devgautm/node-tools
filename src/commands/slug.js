import { parseArgs } from "node:util";
import { slugify } from "../tools/slug.js";
import { readTextInput, isStdinPiped, writeOut } from "../utils/io.js";
import { CliError } from "../utils/errors.js";

export const command = {
  name: "slug",
  summary: "Create a clean URL slug from text",
  examples: [
    "nt slug --text \"Hello, World!\"",
    "echo 'Café au lait' | nt slug"
  ],
  async run(ctx) {
    const { values } = parseArgs({
      args: ctx.args,
      allowPositionals: true,
      options: {
        file: { type: "string", short: "f" },
        text: { type: "string", short: "t" },
        separator: { type: "string", short: "s", default: "-" }
      }
    });

    if (!values.text && !values.file && !isStdinPiped()) {
      throw new CliError("Provide --text, --file, or pipe stdin.");
    }

    const input = await readTextInput({ text: values.text, file: values.file });
    const out = slugify(input, { separator: values.separator });
    writeOut(`${out}\n`);
  }
};
