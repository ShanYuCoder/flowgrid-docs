# Skill: `/audit-api`

## Tên
`audit-api`

## Cách dùng (Command/Trigger)
- Slash: `/audit-api` — **repo BE** (`--type=be`), sau `/api` / `api-gen` và implementation.
- Không dùng trên docs hub (contract grill = `/grill-api-spec`).

## Input
- `01-backend-spec.yaml` (qua `FLOWGRID_DOCS_ROOT` / route resolve).
- Generated routes, controllers, validation, tests trên repo BE.

## Output
- Gap list: lệch route, status, auth, validation, placeholder chưa thay.
- Pass → handoff `/wire` (hoặc open issues có tên).

## Description
- Soi **code thật** vs `01` — không sửa contract YAML (docs `/grill-api-spec`).
- CLI: `flowgrid audit api` + `flowgrid audit fe-be` khi có portal bundle.

## Liên quan
- Trước: `/api`, `api-gen:dry` · Sau: `/wire` · Contract: `/grill-api-spec` (docs)

```text
/audit-api

Function slug: {hotel-list}
Backend: đã /api xong (ghi path evidence)

Checklist:
- [ ] Endpoints cover spec actions
- [ ] Request/response/pagination khớp FE models/
- [ ] Validation, permission, error shapes documented cho /wire
- [ ] Backend test status

KHÔNG sửa Portal UI. KHÔNG rename contract.
Handoff: /wire khi checklist pass hoặc open issues rõ
```
