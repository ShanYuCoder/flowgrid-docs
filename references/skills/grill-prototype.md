# Skill: `/grill-prototype`

## Name
`grill-prototype`

## Usage (Command/Trigger)
- Call via slash command: `/grill-prototype <slug>`
- Executed immediately following `/prototype` before test lane handoff.

## Input
- Implemented prototype code in FE repository.
- Original design spec: `ir/design.yaml`.

## Output
- UI audit report covering layout fidelity, empty/loading/error states, long text overflow, and testIds.
- Remediation patches applied to prototype code.

## Description
- UI checklist verification ensuring the implemented prototype faithfully represents the design specification.
- Verifies mock boundary isolation, ensuring no hardcoded production calls exist.

---

## Example Prompt

```text
/grill-prototype order-list

Verify layout responsiveness, empty state handling, and data-testid presence on W-ADM-ORD-01 prototype.
```
