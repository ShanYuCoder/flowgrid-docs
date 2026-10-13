# Skill: `/background-logic`

## Name
`background-logic`

## Usage (Command/Trigger)
- Call via slash command: `/background-logic`
- Used when specifying asynchronous background jobs, scheduled crons, or event queue consumers.

## Input
- Background processing requirements (e.g., nightly report generation, batch email delivery, media transcoding).

## Output
- Background worker specification: Queue names, message payload schemas, concurrency limits, Dead Letter Queue (DLQ) retry policies.

## Description
- Models asynchronous and deferred task execution.
- Prevents long-running computations from blocking synchronous HTTP request/response lifecycles.

---

## Example Prompt

```text
/background-logic

Job: DailyInvoiceSummaryReport
Schedule: Cron daily at 02:00 UTC
Queue: reporting-queue
Specify retry backoff (3 attempts), DLQ alerts, and database cursor batching.
```
