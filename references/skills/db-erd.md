# Skill: `/db-erd`

## Name
`db-erd`

## Usage (Command/Trigger)
- Call via slash command: `/db-erd`
- Executed in Phase 0 whenever introducing new modules, shared entities, or altering table relationships.

## Input
- Domain models, entity relationships, ownership boundaries across modules.

## Output
- Lowest Common Ancestor (LCA) ERD document: `<LCA>/common/db-erd.md`.
- Mermaid `erDiagram`, logical entity descriptions, primary keys, relationships, and owning module tags.

## Description
- Phase 0 global data modeling skill.
- Authoritatively establishes entity definitions and relationships before screen-level specifications bind to `db.schema` / `db.field`.
- Prevents entity fragmentation and redundant database tables across features.

## Related Skills
- **Preceding:** `/module`, `/user-flow`.
- **Subsequent:** `/spec` (binds UI controls to ERD tables).

## Important Notes
- Screen-level specifications (`/spec`) **never** create `db-erd.md` — they read this existing ERD.

---

## Example Prompt

```text
/db-erd

Location: surfaces/admin/common/db-erd.md
Define ERD for Hotel and Reservation domains: Hotel, RoomType, Room, Booking, Customer, and Payment entities with relationships.
```
