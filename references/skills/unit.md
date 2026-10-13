# Skill: `/unit`

## Name
`unit`

## Usage (Command/Trigger)
- Call via slash command: `/unit <target>`
- Used in Phase 2c to generate and run unit tests for backend modules.

## Input
- Backend service / controller implementation files in `source-code/`.
- Target contract: `01-backend-spec.yaml`.

## Output
- Unit test suites (PHPUnit / Vitest / Jest / PyTest depending on tech stack).
- High-coverage unit test verification.

## Description
- Implements comprehensive backend unit tests for domain business logic, DTO mapping, validations, and service layers.

---

## Example Prompt

```text
/unit source-code/backend/app/Services/OrderService.php
```
