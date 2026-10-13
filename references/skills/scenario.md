# Skill: `/scenario`

## Name
`scenario`

## Usage (Command/Trigger)
- Call via slash command: `/scenario <FLOW-ID>`
- Used in Phase 2b to author end-to-end multi-screen scenario test plans.

## Input
- User flow specification: `FLOW-*.md` from Docs Hub.
- Screen list touched by the user journey (`screens: [W-*, ...]`).

## Output
- Scenario plan YAML: `scenarios/**/SC-*.yaml`.

## Description
- Defines overarching user journey test plans spanning multiple screens and services.
- Orchestrates sequential test execution orders and data handoffs across individual screen test cases.

## Related Skills
- **Preceding:** `/user-flow`.
- **Subsequent:** `/testcase` (per screen) → `audit scenario`.

---

## Example Prompt

```text
/scenario FLOW-ADM-AUTH-01

Author cross-screen scenario plan for login, two-factor OTP verification, and first-time password reset.
```
