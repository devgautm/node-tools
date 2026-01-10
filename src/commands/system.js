import { parseArgs } from "node:util";
import { systemInfo } from "../tools/system.js";
import { writeOut } from "../utils/io.js";

export const command = {
  name: "system",
  summary: "Show basic system + Node runtime info",
  examples: ["nt system", "nt system --json"],
  async run(ctx) {
    const { values } = parseArgs({
      args: ctx.args,
      allowPositionals: true,
      options: {
        json: { type: "boolean", default: false }
      }
    });

    const info = systemInfo();
    if (values.json) {
      writeOut(`${JSON.stringify(info, null, 2)}\n`);
      return;
    }

    writeOut(`Node: ${info.node}
Platform: ${info.platform} (${info.arch})
Hostname: ${info.os.hostname}
CPU: ${info.os.cpus.count} × ${info.os.cpus.model}
Memory: ${Math.round(info.os.freeMem / 1024 / 1024)}MB free / ${Math.round(info.os.totalMem / 1024 / 1024)}MB total
CWD: ${info.cwd}
Uptime: ${info.uptimeSeconds}s
`);
  }
};
