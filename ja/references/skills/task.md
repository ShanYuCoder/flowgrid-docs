---
title: "スキル: `/task`"
description: "Backlog、Redmine、GitHub、Jiraから課題を取得し、進行中に更新して専用GitブランチやWorktreeを作成し開発を開始します。"
---

# スキル: `/task`

`/task` — タスク着手＆Gitブランチ・Worktree連携。

## 🔄 標準ワークフロー

1. **課題取得:** Tracker MCPを通じて課題詳細を取得（`backlog:get_issue`、`github:get_issue`等）。
2. **進行中更新:** カンバンボード上でチケットステータスを「進行中（In Progress）」に変更。
3. **Gitブランチ作成:** `feat/<KEY>-<slug>` ブランチ（または独立Worktree）を自動作成。
4. **FlowGrid SDLC進行:** `/spec`、`/api-spec`、`/wire`、`/testcase` に沿って開発を推進。
5. **品質引き渡し:** `flowgrid:audit` を実行後、`/ship` で納品準備。

## 🚀 使用方法

```text
/task pick PROJ-101          # 課題キーを指定して着手
/task start #42              # Issue番号を指定して着手
/task list                   # 割り当てられた課題一覧を表示
```
