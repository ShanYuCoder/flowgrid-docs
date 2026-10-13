# Skill: `/grill-unit`

## Tên
`grill-unit`

## Cách dùng (Command/Trigger)
- Slash: `/grill-unit` — **repo FE**, trước hoặc sau `unit-gen` dry-run.
- Không thay `/unit` (sinh/sửa test); skill này **gate** codegen unit.

## Input
- Manifest / allowlist unit trên FE repo.
- `FLOWGRID_DOCS_ROOT` cho registry IR (không đọc ArtifactGraph thay docs pointer).

## Output
- Pass dry-gen (`npm run codegen:unit:dry` hoặc `flowgrid unit-gen:dry`) hoặc báo block trước khi chạy `/unit` full.

## Description
- Lane **tách E2E** — xem [index.md § unit](../../workflows/index.md).
- BE unit grill: `/grill-api-unit` trên repo API.

## Liên quan
- Trước/sau: `/unit` · Rule: `team-flow-unit.mdc` (sau `harness sync`)

```text
/grill-unit

Screen or module id: {W-*}
flowgrid unit-gen:dry -- --id …
```
