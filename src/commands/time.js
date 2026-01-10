import { parseArgs } from "node:util";
import { now, parseTime } from "../tools/time.js";
import { writeOut } from "../utils/io.js";
import { CliError } from "../utils/errors.js";

export const command = {
  name: "time",
  summary: "Print current time or parse a timestamp",
  examples: [
    "nt time now",
    "nt time parse 1700000000",
    "nt time parse 1700000000000",
    "nt time parse \"2026-01-06T10:00:00Z\""
  ],
  async run(ctx) {
    const { positionals, values } = parseArgs({
      args: ctx.args,
      allowPositionals: true,
      options: {
        value: { type: "string" },
        json: { type: "boolean", default: false }
      }
    });

    const action = positionals[0] ?? "now";

    if (action === "now") {
      const res = now();
      if (values.json) {
        writeOut(`${JSON.stringify(res, null, 2)}\n`);
        return;
      }
      writeOut(`ISO : ${res.iso}\nUNIX: ${res.unix}\nMS  : ${res.ms}\n`);
      return;
    }

    if (action === "parse") {
      const v = values.value ?? positionals[1];
      if (v == null) {
        throw new CliError("Usage: nt time parse <value> [--json]\nExamples: nt time parse 1700000000");
      }
      const res = parseTime(v);
      if (!res.valid) {
        throw new CliError(res.error ?? "Could not parse time");
      }
      if (values.json) {
        writeOut(`${JSON.stringify(res, null, 2)}\n`);
        return;
      }
      writeOut(`ISO : ${res.iso}\nUNIX: ${res.unix}\nMS  : ${res.ms}\n`);
      return;
    }

    throw new CliError(`Unknown time action: ${action}. Use now|parse.`);
  }
};
