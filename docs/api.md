# Programmatic API

You can import the utilities from `node-tools` directly.

```js
import {
  hashString,
  hashFile,
  uuidV4,
  uuidMany,
  formatJson,
  minifyJson,
  validateJson,
  base64Encode,
  base64Decode,
  slugify,
  now,
  parseTime,
  systemInfo
} from "node-tools";
```

## Notes

- All functions are **pure** (no hidden global state) except helpers like `systemInfo()`.
- CLI commands are built on top of these utilities.
