# Skill: `/audit-api`

## Name
`audit-api`

## Usage (Command/Trigger)
- Call via slash command: `/audit-api <target>`
- Executed on the backend code repository prior to `/wire`.

## Input
- Backend codebase in `source-code/`.
- Target contract: `01-backend-spec.yaml`.

## Output
- Discrepancy report between actual backend code and the SSOT contract.

## Description
- Compares implemented backend routes, controller signatures, request validation rules, and DTO fields against the agreed `01-backend-spec.yaml` contract.
- Guarantees that the backend implementation has not drifted from the SSOT before frontend wiring begins.

---

## Example Prompt

```text
/audit-api surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```
