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
- API **System Common (`CMN-API-*`):** Thư mục `architecture/04-common-apis/` (Upload, OTP, Master Data...).
- API **Domain Shared (`API-{SURF}-{DOMAIN}-{NN}`):** Thư mục `architecture/apis/<domain>/` (Dùng chung cho nhiều màn hình trong Domain như Detail, Edit, List...).
- API **Feature Private:** Thư mục `surfaces/<Surface>/<CMP-ID>/api/` (Chỉ dùng cho API siêu đặc thù của 1 màn hình).
- File contract SSOT: `01-backend-spec.yaml` (mẫu [`backend-api.yaml`](../../../templates/shared/backend-api.yaml); hướng dẫn đọc [`tpl-api-contract.md`](../../../templates/shared/tpl-api-contract.md)).
- API **reuse:** `#reuse-api` + `reuseFrom` trên action/item trong `ir/design.yaml` — **không** tạo trio mới.
- `02-openapi.yaml` qua `flowgrid openapi_gen`; team đọc `ir/generated/api.md` sau `flowgrid render`.

## Description / Ý nghĩa
- Thiết kế hợp đồng Backend tập trung (Contract-First API Design).
- **Agent Registry Lookup Interlock (BẮT BUỘC):** Agent AI tự động tra cứu `api.registry.json` và thư mục `architecture/apis/` trước khi cấp ID. Nếu endpoint (vd: `GET /orders/{id}`) đã được pre-declare ở tầng `/module`, Agent bắt buộc dùng lại ID có sẵn thay vì cấp ID mới gây trùng lặp/conflict.
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
