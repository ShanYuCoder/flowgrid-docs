# Skill: `/model`

## Name
`model`

## Usage (Command/Trigger)
- Call via slash command: `/model`
- Used in Phase 2a to generate TypeScript models and DTOs from contracts.

## Input
- `01-backend-spec.yaml` or `02-openapi.yaml`.

## Output
- TypeScript interfaces and DTOs in FE repository (`src/models/`).

## Description
- Automatically maps contract schemas to frontend data models, ensuring type safety.

---

## Example Prompt

```text
/model surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```
