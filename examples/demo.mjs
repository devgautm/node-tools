import {
  hashString,
  uuidV4,
  formatJson,
  base64Encode,
  slugify,
  now,
  systemInfo
} from "../src/index.js";

console.log("hash:", hashString("hello"));
console.log("uuid:", uuidV4());
console.log("json:", formatJson('{"a":1,"b":2}'));
console.log("b64:", base64Encode("hello"));
console.log("slug:", slugify("Café au lait"));
console.log("time:", now());
console.log("system:", systemInfo());
