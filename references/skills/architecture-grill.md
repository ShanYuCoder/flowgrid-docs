# Skill: `/architecture-grill`

## Name
`architecture-grill`

## Usage (Command/Trigger)
- Call via slash command: `/architecture-grill`
- Executed after drafting architecture documents in Phase 0.

## Input
- Documents in `architecture/` and system constraints.

## Output
- Architecture critique report, identifying scalability bottlenecks, single points of failure, and security risks.
- Actionable revisions applied to `architecture/` files.

## Description
- Rigorously challenges architectural assumptions prior to detailed feature specification.
- Evaluates concurrency, data consistency models, latency SLAs, and multi-tenant isolation.

## Related Skills
- **Preceding:** `/architecture`.
- **Subsequent:** `/db-erd`, `/module`.

---

## Example Prompt

```text
/architecture-grill

Critique architecture/ files focusing on high-concurrency payment processing, idempotent webhooks, and distributed transaction boundaries.
```
