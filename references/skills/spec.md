# Skill: `/spec`

## Name
`spec`

## Usage (Command/Trigger)
- Call via slash command: `/spec`
- Used when authoring functional specifications for a new screen or feature from scratch (Greenfield mode).

## Input
- User requirements, business rules, UI mockups/screenshots, wireframes, or descriptive bullet points.
- Screen context: Owning Surface (`surfaces/<surface>/`), Module (`CMP-*`), and Screen Code (`W-*`).
- Local common components registry (`.flowgrid/registries/design.registry.json`).

## Output
- Leaf Bundle YAML file: `<slug>.bundle.yaml` located at `surfaces/<surface>/CMP-*/<NN...>/<slug>.bundle.yaml`.
- IR artifacts generated via `flowgrid split`: `ir/design.yaml` and `ir/spec.yaml`.
- Rendered business Markdown specification: `ir/generated/spec.md` (and `data-model.md` if persisted entities exist).
- Unresolved questions routed directly to `qa/<SHORT>_NNNN.yaml` (tagged `#tech-debt:QA-*`).

## Description
- Core specification authoring skill in **Phase 1 (Design)**.
- Structures human and business requirements into a deterministic, machine-readable Single Source of Truth (SSOT).
- Enforces strict data modeling: binds inputs to `db.schema` / `db.field` or tags computed columns with `#derived-data`.
- Maps UI elements to reusable components via `#ui:`, `#shell:`, `#composable:`, or marks missing components with `#needs-component:`.
- Binds user actions to backend API contracts using `apiRef` or `#reuse-api` + `reuseFrom`.

## Related Skills
- **Preceding:** `/overview`, `/module`, `/user-flow`, `/db-erd` (Phase 0).
- **Subsequent:** `/grill-bqa` (Business Review), `/grill-dev` (Codegen readiness).

## Important Notes
- **Never write Markdown manually** — always generate via `flowgrid render`.
- **Never store `openQuestions` in YAML** — use AskQuestion in-session or record tech debt in `qa/`.
- Always run `flowgrid audit spec <bundle> --type <profile>` to ensure structural compliance before proceeding.

---

## Example Prompt

```text
/spec

Surface: admin-portal · Module: CMP-ADM-ORD · Screen: W-ADM-ORD-01 (Order Listing)
Scope: Display paginated order table with date-range filters, order status dropdown, and batch export action.
```
