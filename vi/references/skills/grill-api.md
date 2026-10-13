# Skill: `/grill-api` (docs hub router)

## Tên
`grill-api`

## Cách dùng (Command/Trigger)
- Slash: `/grill-api` — **chỉ trên docs hub** (hoặc consumer có skill docs đầy đủ).
- Không thay `/grill-api-spec`; skill này **chỉ điều hướng** tới contract grill.

## Output
- Route tới **`/grill-api-spec`** sau khi đã có `…/api/<seq>/01-backend-spec.yaml`.
- Thiếu `01` → handoff **`/api-spec`**.

## Description
- Đọc `feature.source.base` trên `01` — portal hay `base: none` — **cùng một** `/grill-api-spec`.
- Audit **code BE** sau implement → dùng **`/audit-api`** trên repo API (BE), không dùng slash này.

## Liên quan
- Contract: `/grill-api-spec` · Sinh code: bộ code `/api` · Soi code: `/audit-api`

```text
/grill-api

Target: {API-* | slug} — resolve 01-backend-spec.yaml
→ /grill-api-spec
```
