# Skill: `/decision`

## Name
`decision`

## Usage (Command/Trigger)
- Call via slash command: `/decision <ADR-title>`
- Used to record Architecture Decision Records (ADR) under `architecture/09-architectural-decisions/`.

## Input
- Architectural dilemma, evaluated alternatives, selected decision, technical justification.

## Output
- ADR document: `ADR-{NNNN}-{slug}.md` adhering to Michael Nygard's standard ADR template (Status, Context, Decision, Consequences).

## Description
- Records pivotal architectural choices and trade-offs made by engineering leadership.
- Provides immutable historical rationale for future developers, preventing repeated debates over settled decisions.

---

## Example Prompt

```text
/decision Use PostgreSQL JSONB for Dynamic Product Attributes

Record ADR evaluating MongoDB vs PostgreSQL JSONB; decide on PostgreSQL JSONB due to transactional consistency requirements.
```
