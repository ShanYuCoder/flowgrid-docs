# Skill: `/grill-api-spec`

## Tên
`grill-api-spec`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/grill-api-spec <page-id/slug>`
- Chạy sau `/api-spec` (portal hoặc webhook/partner `base: none`), trước bộ code BE `/api`.

## Input (Dữ liệu đầu vào)
- Portal: đọc `ir/design.yaml` + `01-backend-spec.yaml`.
- BE-only (`feature.source.base: none`): chỉ `01-backend-spec.yaml` — không dùng `ir/design.yaml`.

## Output (Kết quả mong đợi)
- File `01-backend-spec.yaml` được vá/sửa đổi nếu phát hiện sai sót.
- Bổ sung các thẻ gencode (`codegen.profile`, `entity`, `module`, `#gen:*`) vào `01-backend-spec.yaml`.
- Audit (lượng): `flowgrid audit api` trên `01-backend-spec.yaml`; khi có portal bundle → `flowgrid audit fe-be` (`apiRef` ↔ `01`).
- Gates (từ docs hub cwd hoặc `--docs-root`): `flowgrid api:check --spec …/01-backend-spec.yaml` → `flowgrid openapi_gen --spec …` → `flowgrid openapi_render`. Không dùng `flowgrid check` trên file `01`.

## Description / Ý nghĩa
- Kỹ năng **kiểm toán (Audit)** độc quyền cho Technical Backend.
- Đối soát khắt khe giữa những gì thiết kế FE yêu cầu và những gì API cung cấp (Database schemas, API endpoints, data types, securitySchemes).
- **Kiểm định thẻ `#reuse-api`:** Quét lại toàn bộ các actions của Frontend xem có vi phạm việc đẻ ra các API dư thừa hay không. Nếu action nào có `#reuse-api` thì file YAML đó không được quyền đẻ ra `api/<seq>` mới.
- **Kiểm định Error Matrix:** Kiểm tra gắt gao các mã lỗi (Endpoint Error Storming Matrix). Ví dụ route có tham số `{id}` bắt buộc phải cover lỗi 404 và 403 IDOR. Form Submit phải cover lỗi 422.

## Các Skill liên quan
- **Trước đó:** `/api-spec`.
- **Sau đó:** `flowgrid render` (cập nhật `ir/generated/api.md` trên VitePress) → bộ code BE `/api` (`api-gen`).

## Chú ý quan trọng
- **Cấm đoán:** Tuyệt đối không sinh Markdown reports, BQA 3-Pillars reports hay mã nguồn (FastAPI, Laravel) bằng tay.
- Mọi Tech Debt (Câu hỏi chưa rõ ràng) đều phải được tracking dưới dạng `#tech-debt:QA-<feature.id>-NNNN` và đối chiếu bằng file vật lý trong `qa/`. Không được để lại `openQuestions`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/grill-api-spec

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

