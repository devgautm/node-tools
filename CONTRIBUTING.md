# Contributing to node-tools

Thanks for your interest in contributing!

## Development setup

```bash
npm i
npm test
```

## Adding a new CLI command

1. Create a file in `src/commands/<name>.js`.
2. Export a `command` object with:
   - `name`, `summary`, `examples`, and an async `run(ctx)` function
3. Add your command to `src/commands/index.js`.
4. Put reusable logic in `src/tools/<name>.js` and import it into the command.
5. Add tests in `test/` using Node's built-in test runner.

## Coding style

- Use modern ESM syntax.
- Keep runtime dependencies at **zero**.
- Prefer built-in Node APIs over third-party packages.
- Make commands pipe-friendly (stdin/stdout), and use exit codes correctly.

## Running tests

```bash
npm test
```

## Reporting bugs / proposing features

- Open an issue with:
  - expected vs actual behavior
  - Node version (`node -v`)
  - minimal reproduction steps

---

By contributing, you agree that your contributions will be licensed under the MIT License.
