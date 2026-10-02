#!/usr/bin/env bash
# Bootstrap cài FlowGrid khi repo flowgrid private (browser Release URL → 404).
# Script này có thể host trên flowgrid-docs (public raw) — chỉ PAT để gọi GitHub API.
#
#   export FLOWGRID_GITHUB_TOKEN=github_pat_...
#   export FLOWGRID_REF=latest
#   curl -fsSL https://raw.githubusercontent.com/ShanYuCoder/flowgrid-docs/main/scripts/install-from-release.sh | bash -s -- "$FLOWGRID_GITHUB_TOKEN"
set -euo pipefail

REPO="${FLOWGRID_REPO:-ShanYuCoder/flowgrid}"
REF="${FLOWGRID_REF:-latest}"
TOKEN="${FLOWGRID_GITHUB_TOKEN:-${1:-}}"
INSTALL_REF="${FLOWGRID_INSTALL_SCRIPT_REF:-main}"

if [ -z "$TOKEN" ]; then
  echo "Thiếu FLOWGRID_GITHUB_TOKEN (Fine-grained PAT: Contents Read trên $REPO)." >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "flowgrid: Node.js ≥ 24 required." >&2
  exit 1
fi

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
installer="$tmpdir/install.sh"

export FLOWGRID_GITHUB_TOKEN="$TOKEN"
export FLOWGRID_REPO="$REPO"
export FLOWGRID_REF="$REF"
export FLOWGRID_INSTALL_SCRIPT_REF="$INSTALL_REF"

node --input-type=module - "$installer" <<'NODE'
import fs from 'node:fs';
const dest = process.argv[2];
const token = process.env.FLOWGRID_GITHUB_TOKEN;
const repo = process.env.FLOWGRID_REPO || 'ShanYuCoder/flowgrid';
const installRef = process.env.FLOWGRID_INSTALL_SCRIPT_REF || 'main';
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};
const res = await fetch(
  `https://api.github.com/repos/${repo}/contents/install.sh?ref=${encodeURIComponent(installRef)}`,
  { headers },
);
if (!res.ok) {
  console.error(`Không tải install.sh (ref=${installRef}): HTTP ${res.status}`);
  console.error((await res.text()).slice(0, 400));
  process.exit(1);
}
const body = await res.json();
if (!body.content) {
  console.error('install.sh: response không phải file (kiểm tra PAT Contents: Read).');
  process.exit(1);
}
const text = Buffer.from(body.content, 'base64').toString('utf8');
fs.writeFileSync(dest, text, { mode: 0o755 });
NODE

exec bash "$installer" "$TOKEN"
