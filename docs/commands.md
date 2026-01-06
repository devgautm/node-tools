# CLI Commands

`node-tools` ships a CLI named `nt`.

> Tip: most commands accept input via `--text`, `--file`, or **stdin**.

---

## `nt hash`

Hash text/files using Node's crypto.

```bash
nt hash [--algo sha256] [--encoding hex] [--text "..."] [--file path] [--upper]
```

**Options**

- `--algo, -a` Hash algorithm (default: `sha256`)
- `--encoding, -e` Output encoding (default: `hex`)
- `--text, -t` Hash this text
- `--file, -f` Hash this file (streamed)
- `--upper` Uppercase output

**Examples**

```bash
nt hash --text "hello"
echo "hello" | nt hash
nt hash --file package.json --algo md5
```

---

## `nt uuid`

Generate UUID v4.

```bash
nt uuid [--count 1]
```

---

## `nt json`

Format, minify, or validate JSON.

```bash
nt json <format|minify|validate> [--indent 2] [--text ...] [--file path] [--quiet]
```

---

## `nt base64`

Encode/decode Base64.

```bash
nt base64 <encode|decode> [--url] [--text ...] [--file path]
```

---

## `nt slug`

Create URL slugs.

```bash
nt slug [--separator -] [--text ...] [--file path]
```

---

## `nt time`

Print current time or parse a timestamp.

```bash
nt time now [--json]
nt time parse <value> [--json]
```

Accepted parse inputs:

- ISO strings (e.g. `2026-01-06T10:00:00Z`)
- unix seconds (e.g. `1700000000`)
- unix milliseconds (e.g. `1700000000000`)

---

## `nt system`

Print Node + OS info.

```bash
nt system [--json]
```
