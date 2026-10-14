# Skill: `/common`

## Name
`common`

## Usage (Command/Trigger)
- Call via slash command: `/common <CMN-ID>`
- Can be triggered directly in batch immediately after `/init` via the post-init GUI Question modal (`AskQuestion`).
- Used to document common rules or generate single shared implementations in Phase 0 / Phase 1.


## Input
- Common ID (`CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`).
- Existing code in `shared/` or duplicate candidate code references.

## Output
- Markdown User Stories & Rules: `<LCA>/common/patterns/<CMN-ID>.md`.
- Canonical single implementation in `shared/` (for Duplicate Candidates).
- Registration in Workspace SSOT registry (`.flowgrid/registries/`).

## Description
- Enforces the Anti-Copy-Paste Guard.
- For existing common components: Generates Markdown User Stories documentation only (never regenerates existing working code).
- For duplicate candidates: Generates 1 canonical implementation in `shared/` and registers it in the SSOT registry so future screens reuse it.
- **Inviolable Rule:** Common components are documented using Markdown `.md` only. Never author YAML or IR bundles for common components.
- **4-Layer Quality Standard for Common Specifications:**
  1. **Contract Invariants:** Strict prop schemas, default values, and event payload types.
  2. **4 Canonical States:** Explicit UX rules for `Loading`, `Empty`, `Error`, and `Success/Active`.
  3. **Inversion of Control (IoC):** Zero hardcoded API URLs or business domain coupling.
  4. **Golden Test Seams:** Dedicated unit test scenarios verifying contract invariants and visual states.

---

## Example Prompt

```text
/common CMN-UI-001

Generate User Stories specification for Confirm Delete Modal and register in design.registry.json.
```
