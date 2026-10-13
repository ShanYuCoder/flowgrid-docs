# Kỹ năng: `/wire`

## Tên
`wire`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/wire`
- Chạy ở Phase Wire, sau prototype + contract grill + **`/audit-api`** (BE) khi có API thật.

## Input (Dữ liệu đầu vào)
- Đọc lại đặc tả giao diện (`ir/design.yaml`) và API Spec.
- Đọc Source code Frontend (đang dùng API Mock).
- Các tag đánh dấu dời lại tích hợp như `#wire-only:*` hoặc `#update:*`.

## Output (Kết quả mong đợi)
- Tháo bỏ mock/stub production trên FE; đấu nối API Backend thật.
- Khắc phục CORS / lệch contract (nếu có) giữa FE và BE.
- Xóa tag `#update:*` và `#wire-only:*` khi chốt scope wire.
- Sau wire: E2E scoped, **`/grill-wire`** (chuỗi audit) hoặc **`/grill-test`** (matrix chi tiết), `audit fe-be` / `audit scenario` (xem [workflows/wire.md](../../workflows/wire.md)).

## Description / Ý nghĩa
- Phase **Wire — hội tụ** FE ↔ BE ([workflows/wire.md](../../workflows/wire.md#wire-cycle)).
- Pre: grill-prototype, audit-api, `cases:gate`, pre-wire E2E. Post: `audit e2e`, `audit fe-be`, `/grill-test`.
- Mâu thuẫn spec lớn → `/api-update` hoặc `/update-spec` trên docs hub — không vá ngầm trên code.
- Agent extract: `wire-phase.md`, `wire-audit-loop.md` (sync `.cursor/extracts/` trên FE repo).
- Gap spec/plan: docs `/update-spec` · tests `/grill-testcase` — xem `wire-audit-loop.md`.

---

## Example prompt (mẫu gọi)

```text
/wire

Function slug: {hotel-list}

Inputs:
- ir/spec.yaml + testcase YAML (resolve bằng --id)
- BE contract / staging response
- Prototype hiện tại + danh sách route auth bypass cần restore

Order:
1. Align models/ với API thật
2. services/* + $apiFetch + parseApiData
3. composables gọi service
4. validations nếu 422 cần map
5. pages/components bind composable
6. Gỡ mock production
7. Restore auth/guest/rbac middleware (từ grill-prototype handoff)
8. Chạy scoped E2E liên quan

Rules: 4 tầng Portal; không rename field; mock chỉ test/fallback explicit

Verify: lint/typecheck + scoped E2E — báo exit code (verify-gate)

Verify: /grill-wire (audit chain) hoặc /grill-test (matrix)
Handoff: gap code → /test; gap plan → /grill-testcase; gap spec → /update-spec; gap 01 → /api-update
```
