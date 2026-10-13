# Skill: `/api-spec`

## Name
`api-spec`

## Usage (Command/Trigger)
- Call via slash command: `/api-spec <page-id/slug>`
- **Portal-backed:** Triggered when `ir/design.yaml` has defined actions / `apiRefs` (post `/spec` or `/update-spec` + split).
- **BE-only** (`feature.source.base: none`): Can run without portal screens — authors `01` directly from requirements/partner specs.

## Input
- Portal-backed: Reads `design.actions`, `apiRefs`, and nested items from `ir/design.yaml` (or bundle if un-split).
- Hierarchical reuse search: Sibling `api/<seq>/` → LCA `common/yaml/` → adjacent modules on surface.

## Output
- **System Common APIs (`CMN-API-*`):** Stored under `architecture/04-common-apis/` (Upload, OTP, Master Data, etc.).
- **Domain Shared APIs (`API-{SURF}-{DOMAIN}-{NN}`):** Stored under `architecture/apis/<domain>/` (Shared across Detail, Edit, List screens).
- **Feature Private APIs:** Stored under `surfaces/<Surface>/<CMP-ID>/api/` (Exclusive to a single screen).
- Contract SSOT: `01-backend-spec.yaml` (template `backend-api.yaml`; authoring guide `tpl-api-contract.md`).
- Sibling OpenAPI: `02-openapi.yaml` via `flowgrid openapi_gen`.
- Rendered review view: `ir/generated/api.md` via `flowgrid render`.

## Description
- Contract-First Backend API specification skill.
- **Agent Registry Lookup Interlock (MANDATORY):** Automatically consults `api.registry.json` and `architecture/apis/` before issuing new IDs. If an endpoint (e.g. `GET /orders/{id}`) was pre-declared at the `/module` tier, the agent reuses the existing ID, eliminating duplicate definitions and merge conflicts.
- Enforces explicit action suffixes (`/create`, `/update`, `/delete`, `/detail`, `/list`).
- Error storming: Applies `#err:*` tags based on endpoint characteristics (not-found + IDOR for `{id}`, validation for POST/PUT).

## Related Skills
- **Preceding:** `/spec` (portal-backed) or BE requirements.
- **Subsequent:** `/openapi` (generate `02`) → `/grill-api-spec` → `/api`.

## Important Notes
- Always resolve questions via AskQuestion / Tech Debt into `qa/` — never write `openQuestions` in YAML.
- **Never author Markdown manually** — compile via `flowgrid render`.
- Validate via `flowgrid audit api <01-path>` — never run `flowgrid check` on `01`.

---

## Example Prompt

```text
/api-spec

Surface: admin-portal · Module: CMP-ADM-ORD · Scope: Order Management Endpoints
```
