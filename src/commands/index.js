import { command as hash } from "./hash.js";
import { command as uuid } from "./uuid.js";
import { command as json } from "./json.js";
import { command as base64 } from "./base64.js";
import { command as slug } from "./slug.js";
import { command as time } from "./time.js";
import { command as system } from "./system.js";

export const commands = [hash, uuid, json, base64, slug, time, system];

export const commandMap = Object.fromEntries(commands.map((c) => [c.name, c]));
