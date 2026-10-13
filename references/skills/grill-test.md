# Skill: `/grill-test`

## Name
`grill-test`

## Usage (Command/Trigger)
- Call via slash command: `/grill-test <screen-id>`
- Executed on the code repository (e2e-root) after `/test` has achieved a green test pass.

## Input
- Generated Playwright test files (`*.spec.ts`) and Page Objects.
- Source test plan: `TC-*.yaml`.

## Output
- Verification report confirming 1:1 parity across TC ↔ Page Object ↔ Playwright assertions.
- Semantic assertion audit (`#e2e:*` checks, layout integrity, no raw brittle locators).

## Description
- Automation quality gate ensuring code-level Playwright specs faithfully execute the agreed test plan.
- Forbids fragile locators, hardcoded arbitrary sleeps, and unasserted test steps.

---

## Example Prompt

```text
/grill-test W-ADM-ORD-01
```
