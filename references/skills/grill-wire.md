# Skill: `/grill-wire`

## Name
`grill-wire`

## Usage (Command/Trigger)
- Call via slash command: `/grill-wire <screen-id>`
- Executed on the FE repository following `/wire` implementation.

## Input
- Wired frontend application code.
- Test suite in `tests/e2e/`.

## Output
- Convergence audit execution report:
  - `flowgrid audit e2e --screen <W-*>`
  - `flowgrid audit fe-be <path-to-bundle>`
  - `flowgrid audit scenario <SC.yaml>` (if part of scenario journey)

## Description
- Final automated convergence quality gate before Shipping / UAT sign-off.
- Verifies that no mock bypasses remain, authentication is active, and post-wire E2E test passes cleanly against live endpoints.

---

## Example Prompt

```text
/grill-wire W-ADM-ORD-01
```
