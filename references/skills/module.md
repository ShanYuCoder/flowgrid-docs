# Skill: `/module`

## Name
`module`

## Usage (Command/Trigger)
- Call via slash command: `/module`
- Executed in Phase 0 to define module clusters under specific surfaces.

## Input
- Surface directory and functional domain breakdown.

## Output
- Module-level specification: `index.md` (or `spec.md`) and `.module.yaml` under `surfaces/<surface>/<module>/`.
- 1-tier flat feature screen directories directly under module: `surfaces/<surface>/<module>/<feature-slug>/` (no multi-tier numbers).
- Child/secondary screens (Create, Edit, Detail, Drawer) declare access flow in §1 Overview.
- Reserved module directories: `common/` (optional) and `user-flows/` (Step 1 ownership rule) — both auto-hidden from sidebar if empty.

## Description
- Establishes modular architectural boundaries, grouping related user screens and domain features.
- Enables PMs and Tech Leads to pre-plan shared API contracts and common DTOs, preventing merge conflicts during parallel screen development.

## Related Skills
- **Preceding:** `/surfaces`.
- **Subsequent:** `/user-flow`, `/db-erd`, `/spec`.

---

## Example Prompt

```text
/module

Surface: surfaces/admin/
Create module CMP-ADM-HOTEL (Hotel Management) containing screens for Hotel List (W-01), Hotel Detail/Edit (W-02), and Room Allocation (W-03).
```
