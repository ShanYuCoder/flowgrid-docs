# Skill: `/grill-api`

## Name
`grill-api`

## Usage (Command/Trigger)
- Call via slash command: `/grill-api <target>`
- Router command directing to either contract grilling (`/grill-api-spec`) or backend code audits (`/audit-api`).

## Input
- API contract or backend repository code.

## Output
- Dispatches to appropriate backend grilling workflow.

## Description
- Central router for all API quality assurance checks in Phase 2c and Phase 3.

---

## Example Prompt

```text
/grill-api surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```
