# 🔌 マルチ Agent プラグイン ＆ IDE ネイティブ連携ガイド

FlowGrid は、**ワークスペース構成の同期**（`flowgrid init` / `harness sync` 経由）だけでなく、現代の AI コーディングエコシステムにおける**ネイティブなマルチ Agent プラグイン規格**をサポートしています。

標準化されたプラグイン仕様に準拠することで、各リポジトリにスキルフォルダを手動で複製することなく、お好みの AI 開発環境に FlowGrid を直接インストールして使用できます。

---

## 1. サポート対象 AI Agent ＆ IDE 一覧

| Agent / IDE | プラグイン定義 / 設定ファイル | インストール・実行コマンド |
| :--- | :--- | :--- |
| **Google Antigravity IDE** | `.antigravity-plugin/plugin.json` | `agy plugin install https://github.com/ShanYuCoder/flowgrid` |
| **Claude Code** | `.claude-plugin/plugin.json`<br>`.claude-plugin/marketplace.json` | `/plugin marketplace add ShanYuCoder/flowgrid`<br>`/plugin install flowgrid@flowgrid-marketplace` |
| **Cursor** | `.cursor-plugin/plugin.json`<br>`hooks/hooks-cursor.json` | `/add-plugin flowgrid` またはワークスペース内で自動検出 |
| **Gemini CLI** | `gemini-extension.json`<br>`AGENTS.md` | `gemini extensions install https://github.com/ShanYuCoder/flowgrid` |
| **OpenAI Codex** | `.codex-plugin/plugin.json` | `/plugins install flowgrid` |
| **Devin CLI** | `.devin-plugin/plugin.json` | `devin plugins install ShanYuCoder/flowgrid` |
| **標準 Agents** | `.agents/plugins/marketplace.json` | `.agents/plugins/` 配下で自動検出 |

---

## 2. プラットフォーム別インストール手順

### Google Antigravity IDE
公式リポジトリからプラグインを直接インストール：
```bash
agy plugin install https://github.com/ShanYuCoder/flowgrid
```
Antigravity はすべてのスキル（`/help-plan`, `/spec`, `/update-spec`, `/grill`, `/trace` 等）を自動認識します。

### Claude Code
FlowGrid マーケットプレイスを追加してインストール：
```bash
/plugin marketplace add ShanYuCoder/flowgrid
/plugin install flowgrid@flowgrid-marketplace
```
Claude Code 起動時に `SessionStart` ライフサイクルフックが自動実行され、FlowGrid の主要ルールが読み込まれます。

### Cursor
Cursor Agent のチャットで実行：
```text
/add-plugin flowgrid
```
または `.cursor-plugin/plugin.json` を含むプロジェクトを開くだけで、自動的にプラグインが適用されます。

### Gemini CLI
Gemini 拡張としてインストール：
```bash
gemini extensions install https://github.com/ShanYuCoder/flowgrid
```

### Devin CLI
Devin 環境へインストール：
```bash
devin plugins install ShanYuCoder/flowgrid
```

---

## 3. ライフサイクルフック (Lifecycle Hooks)

FlowGrid は、クロスプラットフォーム対応のフックランナーを提供しています：
- **Unix (Linux, macOS, WSL):** `hooks/session-start`
- **Windows (Git Bash, コマンドプロンプト, PowerShell):** `hooks/run-hook.cmd`

エージェントの起動時やツール実行時に、FlowGrid のバージョン、SSOT パス、必須遵守事項が自動的にプロンプトコンテキストへ注入されます。
