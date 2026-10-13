# Skill: `/grill-api-spec`

## Name
`grill-api-spec`

## Usage (Command/Trigger)
- Call via slash command: `/grill-api-spec <page-id/slug>`
- Triggered after `/api-spec` or `/api-update` completes.

## Input
- `01-backend-spec.yaml` contract.
- Portal design: `ir/design.yaml` (if portal-backed).

## Output
- Verified API contract meeting all schema quality gates.
- Sets `approval.status: approved` on `01-backend-spec.yaml` when all criteria pass.

## Description
- Rigorous contract grilling checking error storming, idempotency, HTTP matrix responses (401, 403, 404, 409, 422), and tenant IDOR protection.
- Verifies that portal `apiRef` mappings match endpoint methods and paths exactly.

## Related Skills
- **Preceding:** `/api-spec`.
- **Subsequent:** `flowgrid api-gen:dry` → `/api`.

---

## Example Prompt

```text
/grill-api-spec surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```
