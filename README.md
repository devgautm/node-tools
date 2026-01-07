# Node Tools 🧰⚡

A **modern, zero-dependency** toolbox for Node.js — shipped as a friendly **CLI** (`nt`) and a small set of reusable utility functions.

> Think of it like: **the everyday utilities you always end up re-writing**… but done once, cleanly.

---

## ✅ Requirements

- **Node.js >= 18** (works great on Node 20/22)

---

## 📦 Install

### Run without installing (recommended)

```bash
npx node-tools --help
```

### Install globally (to use `nt` anywhere)

```bash
npm i -g node-tools
nt --help
```

### Install locally (for development)

```bash
npm i
npm test
```

> Note: The npm package name `node-tools` may already be taken on npm. If you want to publish this repo, consider using a **scoped** name like `@devgautm/node-tools`.

---

## 🚀 CLI usage

```bash
nt <command> [options]
nt --help
nt --version
```

### Commands

| Command | What it does |
|---|---|
| `hash` | Hash text / files / stdin (sha256, md5, ...) |
| `uuid` | Generate UUID v4 |
| `json` | Format, minify, or validate JSON |
| `base64` | Base64 encode/decode (standard + urlsafe) |
| `slug` | Turn text into a clean URL slug |
| `time` | Print current time or parse a timestamp |
| `system` | Quick system & Node runtime info |

---

## 🧪 Examples

### `hash`

```bash
nt hash --text "hello"
# 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

echo "hello" | nt hash

nt hash --file package.json --algo sha256
nt hash --file package.json --algo md5
```

### `uuid`

```bash
nt uuid
nt uuid --count 5
```

### `json`

```bash
nt json format --file data.json
cat data.json | nt json minify > data.min.json
nt json validate --file data.json
```

### `base64`

```bash
nt base64 encode --text "hello"
# aGVsbG8=

nt base64 decode --text "aGVsbG8="
# hello

# url-safe base64 (no + and /)
nt base64 encode --text "hello" --url
```

### `slug`

```bash
nt slug --text "Hello, World!"
# hello-world

nt slug --text "  Café au lait  "
# cafe-au-lait
```

### `time`

```bash
nt time now
nt time parse "2026-01-06T10:00:00Z"
nt time parse 1700000000
nt time parse 1700000000000
```

### `system`

```bash
nt system
```

---

## 🧩 Programmatic API

You can also import the utilities directly:

```js
import { hashString, slugify, base64Encode, base64Decode } from "node-tools";

console.log(hashString("hello"));
console.log(slugify("Hello, World!"));
console.log(base64Encode("hello"));
console.log(base64Decode("aGVsbG8="));
```

---

## 🗂️ Project structure

```text
node-tools/
  src/
    cli.js
    commands/        # CLI command implementations
    tools/           # Reusable utility functions
    utils/           # Shared helpers (IO, ansi formatting)
  test/              # Node's built-in test runner
  docs/              # Extended docs
  examples/          # Quick usage scripts
```

---

## 🤝 Contributing

Contributions are welcome!

- **Bug**? Open an issue.
- **New tool** idea? Add a command in `src/commands` and the matching utilities in `src/tools`.

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📄 License

MIT — see [LICENSE](./LICENSE).
