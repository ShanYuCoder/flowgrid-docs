# Skill: `/build-templates`

## Name
`build-templates`

## Usage (Command/Trigger)
- CLI command: `flowgrid build-template-code --sample=<path>`
- Slash command: `/build-templates`

## Input
- Golden Sample module path (e.g., `source-code/src/modules/orders`).

## Output
- Custom templates stored in Workspace SSOT: `.flowgrid/adapters/<target>/custom/`.
- Updated registries in `.flowgrid/adapters/<target>/custom/registries/`.

## Description
- Trains custom codegen templates by learning directly from an existing canonical module in the codebase.
- Guarantees 100% adherence to project architecture, UI styling conventions, and directory layouts during codegen.
- **4-Layer Quality Standard for DSL Initial Data:**
  1. **Contract Invariants:** Scans strict Prop/Input types, defaults, and API response envelope conventions.
  2. **4 Canonical States:** Enforces template slots for `Loading`, `Empty`, `Error`, and `Success/Active`.
  3. **Inversion of Control (IoC):** Ensures templates do not leak hardcoded domain endpoints or names.
  4. **Golden Test Seams:** Establishes unit test fixtures for automated test harness execution.

---

## Example Prompt

```text
/build-templates --sample=./source-code/admin-fe/src/modules/orders
```
