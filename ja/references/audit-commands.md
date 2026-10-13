# 監査 ＆ ギャップ検出コマンド (CLI ↔ エンジン対応)

**SSOT 参照：** `flowgrid audit *` コマンド群は、標準出力に構造化された **JSON**（`gaps[]` ギャップ一覧、`confirms[]` 未確定項目、エラーコード）を出力する確定的な Node.js スクリプトです。

**実行タイミング（品質ゲートと開発フェーズ）：** [workflows/gates.md](../workflows/gates.md) · **機能の完了判定：** [gates.md § 単一機能の完了](../workflows/gates.md#close-one-function)。

**環境設定：** `FLOWGRID_DOCS_ROOT`、`FLOWGRID_TESTS_DOC`、`--e2e-root` → [cli-and-commands.md](./cli-and-commands.md)。

---

## コマンド構文

```bash
flowgrid audit <kind> [args…]
flowgrid audit:<kind> [args…]    # 互換エイリアス
flowgrid audit                   # ヘルプを表示
```

`flowgrid init` 実行後、リポジトリに npm スクリプトが注入されている場合は `pnpm run flowgrid:audit:<kind>` でも実行可能です。

---

## コマンド ↔ エンジン 1:1 対応表

| 種別 (Kind) | 実行コマンド | エンジンスクリプト | 主な入力 | フラグ ＆ 環境変数 |
| :--- | :--- | :--- | :--- | :--- |
| **spec** | `flowgrid audit spec` | `engines/spec/lib/audit-bundle-gaps.mjs` | `*.bundle.yaml` (UI/spec) | `--type list \| create \| detail \| admin-crud \| auth \| change-password \| public` |
| **hub-prd** | `flowgrid audit hub-prd` | `engines/docs/lib/audit-hub-prd.mjs` | `overview/index.md`, surface/CMP `index.md` | — |
| **risks** | `flowgrid audit risks` | `engines/docs/lib/audit-risks-catalog.mjs` | **`architecture/11-risks/risk-register.md`** | リスク台帳カラム（閾値、需要、差分） |
| **flow** | `flowgrid audit flow` | `audit-flow-gaps.mjs` | `FLOW-*.md` | — |
| **api** | `flowgrid audit api` | `audit-api-gaps.mjs` | 外部連携 / API `*.bundle.yaml` | — |
| **testcase** | `flowgrid audit testcase` | `audit-testcase-gaps.mjs` | `TC-*.yaml` (v2) または既存計画 | `--bundle <foo.bundle.yaml>` クロス突合 |
| **fe-be** | `flowgrid audit fe-be` | `audit-fe-be-alignment.mjs` | フロントエンド `*.bundle.yaml` | `--backend-spec …/01-backend-spec.yaml` |
| **scenario** | `flowgrid audit scenario` | `audit-scenario-coverage.mjs` | `SC-*.yaml` / シナリオ md | `--tests-docs <hub>` または `FLOWGRID_TESTS_DOC` |
| **e2e** | `flowgrid audit e2e` | `audit-e2e-coverage.mjs` | Playwright コード + TC 計画 | `--id TC-*`, `--tests-docs`, `--screen W-*`, `--strict` |
| **legacy** | `flowgrid audit legacy` | `audit-legacy-gaps.mjs` | `adoption-inventory.md` | `<target-id>` |

---

## 出力と終了コード規約

- デフォルトで標準出力に整形された **JSON** を出力します。AI の業務批判スキル（Grill スキル）や Agent が `gaps[]` を読み取って自動修復します。
- エンジンは `criticalGaps`（致命的欠落）と `warningGaps`（警告）を識別します。CI パイプラインでは **`cases:gate`** を用いてテスト網羅率を強制します。
- UI/UX 仕様のギャップコード：`UX_*`、`CONFIRM_UX_*`。
- FE ↔ BE 整合性のギャップコード：`FEBE_*`。
- シナリオ網羅率のギャップ：テスト用例が未作成の場合に `SC_SCREEN_NO_TC` を出力。

---

## 実行例

```bash
export FLOWGRID_DOCS_ROOT="$(pwd)/docs"
export FLOWGRID_TESTS_DOC="$(pwd)/tests"

# 画面仕様バンドルの監査
flowgrid audit spec surfaces/orders/W-001.bundle.yaml --type list

# テストケースと画面仕様の整合性監査
flowgrid audit testcase cases/orders/TC-W-001.yaml --bundle surfaces/orders/W-001.bundle.yaml

# フロントエンドとバックエンド API の契約整合性監査
flowgrid audit fe-be surfaces/orders/W-001.bundle.yaml
```
