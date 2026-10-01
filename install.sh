#!/usr/bin/env bash
# Bản copy đặt tại root repo public ShanYuCoder/flowgrid-docs (cùng nội dung install.sh repo chính).
# Xem install.sh ở root flowgrid — giữ hai file đồng bộ khi đổi logic cài đặt.
set -euo pipefail
REPO="${FLOWGRID_REPO:-ShanYuCoder/flowgrid}"
TOKEN="${FLOWGRID_GITHUB_TOKEN:-${1:-}}"
REF="${FLOWGRID_REF:-latest}"
NPM_PACKAGE="@shanyucoder/flowgrid"

if [ "${1:-}" = "--uninstall" ]; then
  npm uninstall -g "$NPM_PACKAGE" 2>/dev/null || true
  command -v pnpm >/dev/null 2>&1 && pnpm remove -g "$NPM_PACKAGE" 2>/dev/null || true
  echo "Đã gỡ global $NPM_PACKAGE."
  exit 0
fi

if [ -z "$TOKEN" ]; then
  echo "Thiếu GitHub PAT (Fine-grained, Contents read trên $REPO)." >&2
  echo "  curl -fsSL https://raw.githubusercontent.com/ShanYuCoder/flowgrid-docs/main/install.sh | bash -s -- github_pat_..." >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "Cần Node.js ≥ 24 và npm." >&2
  exit 1
fi

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
HELPER="$tmpdir/download-release-pack.mjs"
TGZ="$tmpdir/flowgrid-pack.tgz"

curl -fsSL \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github.raw" \
  -o "$HELPER" \
  "https://raw.githubusercontent.com/$REPO/main/scripts/download-release-pack.mjs"

echo "Đang tải bản build từ github.com/$REPO (release: $REF)…"
node "$HELPER" --repo "$REPO" --ref "$REF" --token "$TOKEN" --out "$TGZ"

echo "Đang cài global $NPM_PACKAGE…"
npm install -g "$TGZ"

echo ""
echo "Hoàn tất. Đọc tài liệu trong repo flowgrid-docs hoặc CATALOG.md."
echo "  flowgrid --version"
