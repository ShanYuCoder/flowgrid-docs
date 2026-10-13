# Skill: `/api-update`

## Name
`api-update`

## Usage (Command/Trigger)
- Call via slash command: `/api-update <page-id/slug>`
- Used whenever backend contracts must be updated following UI changes, partner updates, or pending tech debt resolutions.

## Input
- Existing `01-backend-spec.yaml` and requested changes.

## Output
- Updated `01-backend-spec.yaml`.
- Re-generated `02-openapi.yaml` via `flowgrid openapi_gen`.
- Re-rendered documentation: `ir/generated/api.md`.

## Description
- Surgical mutation skill for backend API contracts.
- Adjusts request parameters, response schemas, error codes, and HTTP statuses without rewriting entire files from scratch.
- Maintains schema parity with frontend `apiRef` mappings.

---

## Example Prompt

```text
/api-update W-ADM-ORD-01

Add optional filter parameter 'customerEmail' to GET /api/v1/orders/list endpoint.
```
