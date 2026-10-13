# Skill: `/business-impact-review`

## Name
`business-impact-review`

## Usage (Command/Trigger)
- Call via slash command: `/business-impact-review`
- Used prior to major production releases or architectural refactoring.

## Input
- Scope of planned changes, database migrations, breaking API changes.

## Output
- Business impact analysis report: Downtime risk, data migration windows, backward compatibility matrix, rollback strategies.

## Description
- Assesses real-world business risks of technical changes.
- Ensures customer-facing SLAs and data integrity guarantees are safeguarded during deployments.

---

## Example Prompt

```text
/business-impact-review

Scope: Migrating Order status enum to dynamic status state machine table.
Assess database lock times, backward compatibility with mobile apps, and rollback plan.
```
