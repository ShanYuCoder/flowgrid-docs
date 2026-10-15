---
title: "スキル: `/pm-setup`"
description: "サードパーティ製MCPプロジェクト管理ツール（Backlog、Redmine、GitHub、GitLab、Jira、Git Worktree）をワークスペースに設定します。"
---

# スキル: `/pm-setup`

`/pm-setup` — アジャイルプロジェクト管理＆課題管理MCPツールの導入設定。

FlowGridは**Unix哲学**（車輪の再発明を避ける）に従います。BacklogやGitHub、Redmineなどの優れたMCPサーバーと連携し、FlowGridは**タスク分解とオーケストレーション**に特化します。

## 🛠️ 対応MCPツール一覧

| キー | ツール名 | MCPパッケージ | 主な機能 |
| :--- | :--- | :--- | :--- |
| **`backlog`** | Nulab Backlog | `npx -y backlog-mcp-server` | 課題管理、マイルストーン、PR連携、Wiki |
| **`redmine`** | Redmine | `npx -y mcp-server-redmine` | 50以上の課題操作、カスタムフィールド、時間記録 |
| **`github`** | GitHub Issues & Projects | `npx -y @modelcontextprotocol/server-github` | Issues、マイルストーン、プロジェクトボード、PR |
| **`gitlab`** | GitLab | `npx -y @modelcontextprotocol/server-gitlab` | Issues、マイルストーン、マージリクエスト |
| **`jira`** | Atlassian Jira | `npx -y @sooperset/mcp-atlassian` | スプリント、カンバン、ステータス変更 |
| **`git`** | Git Local & Worktree | `npx -y @modelcontextprotocol/server-git` | ブランチ作成、Worktree分離、コミット自動化 |

## 🚀 使用方法

AIエージェント内で実行:
```text
/pm-setup
```

CLIコマンドで実行:
```bash
# 対応ツール一覧を表示
flowgrid pm list

# 設定済みツールを確認
flowgrid pm status

# ツールを設定に追加（例: Backlog）
flowgrid pm add backlog
```
