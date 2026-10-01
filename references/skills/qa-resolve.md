# Skill: `/qa-resolve`

## Tên
`qa-resolve`

## Cách dùng
- Slash: `/qa-resolve HOTEL-LIST_0001` (hoặc legacy `QA-<page-id>-NNNN`) **kèm solution** trên các dòng sau.
- Đọc `qa/<id>.yaml`, patch `target.path` / `target.at`, **append** `kind: answer`, `status: closed`.

## Không dùng khi
- Grill full screen chưa có file QA.
- Chỉ sync API đã chốt (`/api-update`).

## Workflow
[workflows/qa-team.md](../../workflows/qa-team.md) · extract `qa-inbox.md`

## Example

```text
/qa-resolve HOTEL-LIST_0001
Filter timezone theo property TZ; label UTC+7 trên UI.
```
