# Skill: `/background-logic`

## スキル名 (Name)
`background-logic`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/background-logic`
- Used when specifying asynchronous background jobs, scheduled crons, or event queue consumers.

## 入力 (Input)
- Background processing requirements (e.g., nightly report generation, batch email delivery, media transcoding).

## 出力 (Output)
- Background worker specification: Queue names, message payload schemas, concurrency limits, Dead Letter Queue (DLQ) retry policies.

## 説明・役割 (Description)
- メッセージキュー (MQ)、定期実行ジョブ (Cron/Scheduler)、長時間実行バッチなどの非同期バックグラウンド処理の契約と補償トランザクションを定義。
---

## プロンプト実行例 (Example Prompt)

```text
/background-logic

Job: DailyInvoiceSummaryReport
Schedule: Cron daily at 02:00 UTC
Queue: reporting-queue
Specify retry backoff (3 attempts), DLQ alerts, and database cursor batching.
```

