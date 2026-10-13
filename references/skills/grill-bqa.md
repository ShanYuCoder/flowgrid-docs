# Skill: `/grill-bqa`

## Name
`grill-bqa`

## Usage (Command/Trigger)
- Call via slash command: `/grill-bqa <page-id/slug>`
- Automatically triggered after completing `/spec` or via `/grill` handoff.

## Input
- `*.bundle.yaml` containing UI design and business rules.
- Intermediate IR files: `ir/design.yaml` and `ir/spec.yaml`.

## Output
- Refined `*.bundle.yaml` with validated business rules, UX copy, and validation logic.
- QA Tech Debt files (`qa/<SHORT>_NNNN.yaml`) if open items are deferred.
- Status flags set: `grillStatus.bqaFacts: done` and `grillStatus.bqaOpen: done`.

## Description
- Dedicated to reviewing and validating specifications from the perspective of Business Analysts (BA) and QA Engineers.
- Focuses purely on domain behavior, UX affordances, and user stories (ignores low-level codegen tags).
- **Audit Interlock:** Executes `flowgrid audit spec <bundle> --type <pageType>` before Step A, after each patch, and before handing off to `/grill-dev`.
- Enforces 4-tier UI error handling outcomes on every user action (`onSuccess`, `onBusinessErrors`, `onSecurityErrors`, `onSystemErrors`).
- Two-step execution process:
  - **Step A: Fact-Lock:** Locks existing explicit requirements; no interactive questions allowed here.
  - **Step B: Member Wizard:** Interactively surfaces AskQuestion modals for genuine missing information.

## Important Notes
- **Tech Debt Rule:** AskQuestion options in Step B must always include `"Log as Tech Debt"`. Selecting this routes the item directly to `qa/`.
- Reads only `ir/design.yaml` and the original bundle — never reads rendered `*.md` files.

---

## Example Prompt

```text
/grill-bqa

Surface: admin-portal · Module: CMP-ADM-ORD · Scope: Order Listing Screen (W-01)
```
