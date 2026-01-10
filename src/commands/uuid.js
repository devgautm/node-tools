import { parseArgs } from "node:util";
import { uuidMany } from "../tools/uuid.js";
import { writeOut } from "../utils/io.js";

export const command = {
  name: "uuid",
  summary: "Generate UUID v4",
  examples: ["nt uuid", "nt uuid --count 5"],
  async run(ctx) {
    const { values } = parseArgs({
      args: ctx.args,
      allowPositionals: true,
      options: {
        count: { type: "string", short: "c", default: "1" }
      }
    });

    const list = uuidMany(Number(values.count));
    writeOut(`${list.join("\n")}\n`);
  }
};
