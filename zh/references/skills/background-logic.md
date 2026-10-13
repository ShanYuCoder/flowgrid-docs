# Skill: `/background-logic`

## 名称 (Name)
`background-logic`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/background-logic`
- Used when specifying asynchronous background jobs, scheduled crons, or event queue consumers.

## 输入 (Input)
- Background processing requirements (e.g., nightly report generation, batch email delivery, media transcoding).

## 输出 (Output)
- Background worker specification: Queue names, message payload schemas, concurrency limits, Dead Letter Queue (DLQ) retry policies.

## 描述说明 (Description)
- 规范消息队列 (MQ)、定时任务 (Cron/Scheduler) 以及长周期异步批处理任务的架构契约与补偿机制。
---

## 提示词调用示例 (Example Prompt)

```text
/background-logic

Job: DailyInvoiceSummaryReport
Schedule: Cron daily at 02:00 UTC
Queue: reporting-queue
Specify retry backoff (3 attempts), DLQ alerts, and database cursor batching.
```

