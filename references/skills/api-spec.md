# Skill: `/api-spec`

## Tên
`api-spec`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/api-spec <page-id/slug>`
- **Portal-backed:** chạy khi `ir/design.yaml` đã có actions / `apiRefs` (sau `/spec` hoặc `/update-spec` + split).
- **BE-only** (`feature.source.base: none`): có thể chạy không có portal — chỉ author `01` theo requirement/partner.

## Input (Dữ liệu đầu vào)
- Portal: đọc `design.actions`, `apiRefs`, nested items từ `ir/design.yaml` (hoặc bundle nếu chưa split).
- Quét reuse theo thứ tự: sibling `api/<seq>/` → LCA `common/yaml/` → module lân cận trên surface.

## Output (Kết quả mong đợi)
- API **mới:** thư mục `api/<seq>/` với `01-backend-spec.yaml` (mẫu [`backend-api.yaml`](../../../templates/shared/backend-api.yaml); hướng dẫn đọc [`tpl-api-contract.md`](../../../templates/shared/tpl-api-contract.md)).
- API **reuse:** `#reuse-api` + `reuseFrom` trên action/item trong `ir/design.yaml` — **không** tạo trio mới.
- `02-openapi.yaml` qua `flowgrid openapi_gen`; team đọc `ir/generated/api.md` sau `flowgrid render`.

## Description / Ý nghĩa
- Thiết kế hợp đồng Backend — SSOT duy nhất là `01`, không `bundle.spec.api`.
- **Reuse first** · **URI có hậu tố hành động** · **Error storming** (`#err:*`, `errorStorming`).

## Các Skill liên quan
- **Trước:** `/spec` (portal) hoặc requirement BE-only.
- **Sau:** `/openapi` (gen `02`) → `/grill-api-spec` → bộ code `/api`.

## Chú ý quan trọng
- AskQuestion + Tech Debt → `qa/` — không `openQuestions` trong YAML.
- **Không sinh Markdown tay** — `flowgrid render` → `ir/generated/api.md`.
- Audit: `flowgrid audit api` trên `01` — không `flowgrid check` trên `01`.
- **Không** dùng `backend-api.bundle.yaml` cho contract mới (legacy).

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

```text
/api-spec

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```
