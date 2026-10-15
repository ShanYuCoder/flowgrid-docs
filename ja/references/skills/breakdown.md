---
title: "スキル: `/breakdown`"
description: "アーキテクチャや画面を2〜4時間のマイクロタスクに分解し、並行・順次DAGグラフを構築してBacklog/Redmine/GitHub/Jiraに一括登録します。"
---

# スキル: `/breakdown`

`/breakdown` — FlowGrid アジャイルマイクロタスク分解エンジン。

## 🎯 2〜4時間黄金律

- **目標規模:** すべてのタスクは **2〜4時間** のマイクロタスクに分割。
- **制限事項:** 6〜8時間タスクは基盤環境構築のみ許可。
- **厳格な禁止:** **8時間を超えるタスクは一切禁止**。大規模要件はFlowGridの各工程に自動細分化されます。

## 🌊 4つの実行ウェーブ（Wave DAG）

1. **Wave 1: 基盤＆API規約（並行実行 ⚡）** — 画面仕様（`/spec`）とOpenAPI規約（`/api-spec`）。
2. **Wave 2: コア実装（並行実行 ⚡）** — フロントエンドUI（`/wire`）とバックエンド実装（`/service`）の並行進行。
3. **Wave 3: 結合＆業務フロー連携（順次実行 🔒）** — 実APIとUIのデータ結合および例外処理。
4. **Wave 4: QAテスト＆出荷ゲート（順次実行 🔒）** — 自動E2Eテスト（`/testcase`）と品質監査。

## 🚀 使用方法

```text
/breakdown                   # 全画面をマイクロタスクに分解
/breakdown W-AUTH-LOGIN      # 特定の画面を分解
/breakdown FLOW-CHECKOUT     # 業務フローを分解
```
