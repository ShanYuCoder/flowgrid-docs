# Skill: `/grill-prototype`

## Tên
`grill-prototype`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/grill-prototype <function-slug>`
- **Sau** session `/prototype` (đã `gen:dry` → `gen` + implement HANDOFF), **trước** demo team, `/test`, hoặc `/wire`.
- **`gen:dry`** không gọi trong skill này — chạy ở **đầu** session `/prototype` ([design.md](../../workflows/design.md#bước-trong-lane) bước 4–5).

## Input (Dữ liệu đầu vào)
- Route prototype đã chạy + `ir/design.yaml` trên docs hub (`FLOWGRID_DOCS_ROOT`).
- Handoff từ prototype (auth bypass, testIds, mocks).

## Output (Kết quả mong đợi)
- Checklist đã verify; danh sách issue còn mở (tiếng Việt) cho `/test` hoặc sửa trong scope prototype.

## Description / Ý nghĩa
- Audit UI prototype — **không** chạy Playwright/Vitest.
- Extracts: verify-gate, common-ui-spec, portal-test-readiness.

---

## Example prompt (mẫu gọi)

**Khi nào:** Sau `/prototype`, trước demo hoặc handoff test/wire.

```text
/grill-prototype

Function slug: {hotel-list}
Route prototype: {/admin/hotels}

Checklist (verify, sửa trong scope FE nếu rõ):
- [ ] Khớp spec: happy path, validation message, loading/empty/error
- [ ] Mock pagination ≥2 pages (khi spec có)
- [ ] Không gọi backend thật; mock đúng boundary
- [ ] Shell/registry reuse; composable mock boundary
- [ ] testcase testIds.required ⊆ UI (E2E-TESTIDS)
- [ ] Auth bypass documented
- [ ] Layout: copy tiếng Việt, affordance UX chuẩn

Không chạy Playwright/Vitest.
Handoff (tiếng Việt): route, testIds ok/missing, #wire-only list, open issues → /test
```
