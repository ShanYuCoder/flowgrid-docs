# Skill: `/grill-dev`

## Name
`grill-dev`

## Usage (Command/Trigger)
- Call via slash command: `/grill-dev <page-id/slug>`
- Triggered after `/grill-bqa` completes with `bqaOpen: done`.

## Input
- `*.bundle.yaml` with completed BQA facts.
- Sibling API contract: `api/<seq>/01-backend-spec.yaml`.

## Output
- Enriched `bundle.gen` block with codegen profiles, entity definitions, and target frameworks.
- Hashtags assigned: `#gen:*`, `#needs-component:*`, and action mappings.
- Status flag set: `grillStatus.dev: done`.

## Description
- Technical grilling skill reviewing specifications from the perspective of Senior Developers and Codegen Engineers.
- Validates that UI sections cleanly map to backend API endpoints and data models.
- Prepares specifications for zero-error codegen dry-runs (`flowgrid gen:dry`).

## Related Skills
- **Preceding:** `/grill-bqa`.
- **Subsequent:** `flowgrid gen:dry` → `/prototype`.

---

## Example Prompt

```text
/grill-dev

Surface: admin-portal · Module: CMP-ADM-ORD · Screen: W-ADM-ORD-01
Verify codegen profile, action bindings, and ensure all component tags match design registry.
```
