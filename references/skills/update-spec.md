# Skill: `/update-spec`

## Name
`update-spec`

## Usage (Command/Trigger)
- Call via slash command: `/update-spec <page-id/slug>`
- Used whenever modifying an existing specification bundle based on stakeholder feedback, UAT, or QA discoveries.

## Input
- Target `*.bundle.yaml` and change requests.

## Output
- Updated `*.bundle.yaml`.
- Re-split IR files: `ir/design.yaml` and `ir/spec.yaml`.
- Re-rendered documentation portal: `ir/generated/spec.md`.

## Description
- Official mutation entry point for specifications in Phase 1 and downstream change loops.
- Applies surgical edits to the leaf bundle, then automatically triggers `flowgrid split` and `flowgrid render`.
- **Inviolable Rule:** Never edit generated `ir/*` or `ir/generated/*.md` files by hand — always route changes through `/update-spec`.

---

## Example Prompt

```text
/update-spec

Target: surfaces/admin/CMP-ADM-ORD/01/01/order-list.bundle.yaml
Change: Add batch order status update action with confirmation modal and reason text field.
```
