import os from "node:os";

export function systemInfo() {
  const cpus = os.cpus();
  return {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    cwd: process.cwd(),
    uptimeSeconds: Math.round(process.uptime()),
    os: {
      type: os.type(),
      release: os.release(),
      hostname: os.hostname(),
      totalMem: os.totalmem(),
      freeMem: os.freemem(),
      cpus: {
        count: cpus.length,
        model: cpus[0]?.model ?? "unknown",
      }
    }
  };
}
