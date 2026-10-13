# Skill: `/grill-docs`

## Name
`grill-docs`

## Usage (Command/Trigger)
- Call via slash command: `/grill-docs <page-id/slug>`
- Optional reconciliation skill used when conflicts arise between BQA and Dev requirements.

## Input
- `*.bundle.yaml`, `ir/spec.yaml`, and `ir/design.yaml`.

## Output
- Reconciled bundle resolving discrepancies between business requirements and technical constraints.

## Description
- Acts as an automated mediator between BA requirements and engineering feasibility.
- Re-aligns user story acceptance criteria with backend API schemas and UI component libraries.

---

## Example Prompt

```text
/grill-docs surfaces/admin/CMP-ADM-ORD/01/01/order-list.bundle.yaml
```
