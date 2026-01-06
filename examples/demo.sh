#!/usr/bin/env bash
set -euo pipefail

echo "== hash =="
nt hash --text "hello"
echo "hello" | nt hash

echo "== uuid =="
nt uuid --count 3

echo "== json =="
echo '{"a":1,"b":2}' | nt json format

echo "== base64 =="
nt base64 encode --text "hello"
nt base64 decode --text "aGVsbG8="

echo "== slug =="
nt slug --text "Café au lait"

echo "== time =="
nt time now
nt time parse 1700000000

echo "== system =="
nt system
