# Skill: `/grill-unit`

## Name
`grill-unit`

## Usage (Command/Trigger)
- Call via slash command: `/grill-unit <target>`
- Quality gate executed before finalizing backend unit test suites.

## Input
- Backend unit test files and source implementation.

## Output
- Unit test quality report (boundary checks, edge-case coverage, mock boundaries).

## Description
- Audits unit test suites to ensure edge cases, negative validation tests, and exception handling paths are thoroughly tested without over-mocking domain logic.

---

## Example Prompt

```text
/grill-unit source-code/backend/tests/Unit/OrderServiceTest.php
```
