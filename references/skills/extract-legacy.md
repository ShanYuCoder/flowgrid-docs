# Skill: `/extract-legacy`

## Name
`extract-legacy`

## Usage (Command/Trigger)
- Call via slash command: `/extract-legacy`
- Executed during Phase 0 of **Rebase / Modernization** workflows.

## Input
- Legacy codebase directory: `source-legacy/` (Read-Only).

## Output
- High-level functional inventory: `architecture/legacy-inventory.md`.
- Extracted surface catalog, module boundaries, database schemas, and shared business rules (`CMN-*`).
- Seed surface structure under `surfaces/`.

## Description
- Performs global archaeological discovery across legacy code repositories.
- Dissects monoliths into modular surfaces, routes, controllers, and services.
- Identifies cross-cutting utilities and duplicate code candidates across modules before greenfield modernization starts.

## Related Skills
- **Subsequent:** `/init` (bind new target repos) and `/legacy` (per-screen extraction).

## Important Notes
- Never modifies `source-legacy/`.
- Focuses on high-level architecture and functional rosters rather than line-by-line implementation details.

---

## Example Prompt

```text
/extract-legacy

Scan source-legacy/ to extract full module catalog, surfaces, database tables, and common services into architecture/legacy-inventory.md.
```
