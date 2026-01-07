export class CliError extends Error {
  /** @param {string} message */
  constructor(message, { exitCode = 1 } = {}) {
    super(message);
    this.name = "CliError";
    this.exitCode = exitCode;
  }
}
