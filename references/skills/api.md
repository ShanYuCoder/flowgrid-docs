# Skill: `/api`

## Name
`api`

## Usage (Command/Trigger)
- CLI command: `flowgrid api-gen --spec <path-to-01>`
- Slash command: `/api <page-id/slug>`
- Executed in Phase 2c to generate and implement backend controllers, services, and routes.

## Input
- Approved backend contract: `01-backend-spec.yaml` (never uses `ir/design.yaml` as codegen input).

## Output
- Production backend source code in target repository (Controllers, Models, Services, Requests/DTOs).
- Registered routes and middleware configurations.

## Description
- Implements backend API endpoints strictly adhering to the contract specification.
- Generates clean, idiomatic architecture matching the project's adapter profile (NestJS / Laravel / FastAPI / ASP.NET).

## Related Skills
- **Preceding:** `/api-spec`, `/grill-api-spec`.
- **Subsequent:** `/unit` → `/audit-api` → `/wire`.

---

## Example Prompt

```text
/api W-ADM-ORD-01

Generate and implement backend API endpoints using approved contract at surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml.
```
