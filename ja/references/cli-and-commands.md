# 🛠 CLI コマンド ＆ Agent スキル一覧 (References)

本文書は、FlowGrid が提供するコマンドラインツール（CLI Commands）、Model Context Protocol ツール（MCP Tools）、および AI エージェントスキル（Skills）の全容を整理したリファレンスです。

---

## FlowGrid CLI のインストール

**必須動作環境：** Node.js **≥ 24**。

**推奨インストール方法 — pnpm によるグローバルインストール**（Linux, macOS, WSL, Windows PowerShell 共通）：

```bash
pnpm add -g @shanyucoder/flowgrid@latest
```

| 代替インストール手段 | 実行コマンド |
| :--- | :--- |
| **GitHub からの直接グローバルインストール** | `pnpm add -g github:ShanYuCoder/flowgrid --allow-build=@shanyucoder/flowgrid` |
| **npx によるオンデマンド実行** | `npx -y -p @shanyucoder/flowgrid@latest flowgrid <command>` |
| **npm によるグローバルインストール** | `npm install -g @shanyucoder/flowgrid@latest` |
| **Bash ワンライナー実行** | `curl -fsSL https://raw.githubusercontent.com/ShanYuCoder/flowgrid/main/install.sh \| bash` |

- **CLI のアップデート：** `flowgrid update`
- **最新版の確認：** `flowgrid update --check`
- **アンインストール：** `flowgrid uninstall`

---

## ⚙️ コア処理エンジンコマンド (FlowGrid CLI)

FlowGrid は、開発プロセスを**ドキュメントエンジン (Docs Engine)**、**コードエンジン (Code Engine)**、**テストエンジン (Test Engine)** の 3 つの基盤で支えます：

### 1. ドキュメントエンジン (Docs Engine — 仕様およびドキュメント管理)

| FlowGrid コマンド | 機能概要 |
| :--- | :--- |
| `flowgrid split` | `.bundle.yaml` を `ir/design.yaml`, `ir/spec.yaml`, `ir/generated/spec.md` に分割。 |
| `flowgrid split_all` | ワークスペース内のすべての Bundle YAML ファイルを再帰的に走査して分割。 |
| `flowgrid render` | YAML 形式の UI 仕様から Markdown（データ辞書と状態マトリクス）を再レンダリング。 |
| `flowgrid dev` | ローカルの VitePress ドキュメントハブ（ポート **5173**）およびテストハブ（ポート **5174**）を起動。 |
| `flowgrid build` | 静的ドキュメントサイトをビルド。 |
| `flowgrid publish` | ドキュメント成果物を公開し、`CATALOG.md` を更新。 |
| `flowgrid openapi_gen` | `01-backend-spec.yaml` から OpenAPI の定義スニペットを自動生成・更新。 |
| `flowgrid openapi_render` | 各 OpenAPI YAML スニペットを統合し `docs/openapi/api.yaml` を生成。 |
| `flowgrid openapi_build_ui`| ドキュメントハブ用の静的 Swagger UI 画面をビルド。 |
| `flowgrid api:check` | バックエンドコード生成前に `01-backend-spec.yaml` の妥当性を検証。 |

### 2. 監査 ＆ ガバナンスコマンド (PR 監査および品質ゲート)

| コマンド | 概要 |
| :--- | :--- |
| `flowgrid audit` | 監査コマンドのヘルプを表示。 |
| `flowgrid audit spec …` | UI 仕様バンドルおよび UX アフォーダンスの欠落を監査。 |
| `flowgrid audit api …` | `01-backend-spec.yaml` の API 契約仕様を監査。 |
| `flowgrid audit flow …` | `FLOW-*.md` 業務フローの各章と画面参照の整合性を監査。 |
| `flowgrid audit testcase …` | `TC-*.yaml` テストケースと画面仕様バンドルを突合監査。 |
| `flowgrid audit fe-be …` | フロントエンドの `apiRef` とバックエンド契約の整合性を検証。 |
| `flowgrid audit scenario …`| テストシナリオの画面網羅率を監査。 |
| `flowgrid audit e2e …` | Playwright 自動テストとテスト計画の網羅性を監査。 |
| `flowgrid harness sync` | `.flowgrid/config.json` からスキル、ルール、MCP 設定を IDE に自動同期。 |
| `flowgrid doctor` | ワークスペース設定、MCP 環境変数、ツールチェーンの健全性を自己診断。 |
| `flowgrid doctor --fix` | 不足している設定ファイルを自動補完し、同期を再実行。 |

### 3. テストエンジン (Test Engine — テスト ＆ 品質保証)

| FlowGrid コマンド | 機能概要 |
| :--- | :--- |
| `flowgrid cases:render` | テストハブ上で Testplan YAML マトリクスを Markdown にレンダリング。 |
| `flowgrid cases:check` | テスト計画 YAML の構文と JSON Schema 準拠を検証。 |
| `flowgrid cases:gate` | CI/CD 品質リリースゲート（Schema v2 + TC 監査 + 追跡性検査）。 |
| `flowgrid cases:coverage` | テスト網羅率を計算し、テストが未作成の仕様を即座に検出。 |
| `flowgrid testcase:gen` | TC YAML から Playwright E2E UI 自動テストコードを生成。 |
| `flowgrid testcase:gen:api`| TC YAML から Playwright API 自動テストコードを生成。 |

### 4. コードエンジン (Code Engine — コードおよび単体テスト生成)

| FlowGrid コマンド | 機能概要 |
| :--- | :--- |
| `flowgrid gen` | `ir/design.yaml` からフロントエンド UI コンポーネントを自動生成。 |
| `flowgrid unit-gen` | フロントエンド単体テスト（Jest / Vitest）コードを自動生成。 |
| `flowgrid api-gen` | `ir/spec.yaml` からバックエンド API ルート、コントローラー、サービスを生成。 |
| `flowgrid api-unit-gen` | バックエンド単体テスト（Pytest, PHPUnit, xUnit）コードを自動生成。 |
| `flowgrid contract-gen` | 共通 TypeScript 型定義および DTO 契約コードを生成。 |
| `flowgrid build-template-code --sample=<dir>` | 既存のゴールデンサンプルモジュールの AST とコーディングスタイルを学習。 |
| `flowgrid build-template-code --yes` | 学習済みテンプレートを `.flowgrid/adapters/` 配下に書き出し。 |
