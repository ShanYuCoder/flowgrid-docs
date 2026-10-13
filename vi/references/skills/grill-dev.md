# Skill: `/grill-dev`

## Tên
`grill-dev`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/grill-dev <page-id/slug>`
- Thường được gọi sau khi `grill-bqa` (hoặc `spec`) đã hoàn tất việc chốt nghiệp vụ (`grillStatus.bqaOpen: done`).

## Input (Dữ liệu đầu vào)
- File `*.bundle.yaml` chứa thiết kế UI và logic.
- File trung gian `ir/design.yaml`.
- File contract backend `api/<seq>/01-backend-spec.yaml` (nếu có).

## Output (Kết quả mong đợi)
- Cập nhật nhánh `gen:` trong `*.bundle.yaml` (`codegen.profile`, `entity`, `module`, `tags`, `ui.*`).
- Bổ sung các Endpoint actions (`/create`, `/{id}/update`...) vào file `01-backend-spec.yaml`.
- Sinh các mã lỗi `#err:*` và cấu trúc Hashtag phục vụ Gen Code (`#needs-component`, `#use-store`, `#reuse-api`).
- Trạng thái `grillStatus.dev: done`.

## Description / Ý nghĩa
- Kỹ năng **độc quyền** dành riêng cho việc rà soát kỹ thuật (Technical Review & Engineering). **Không** dùng để tranh luận lại logic Business hay UX copy.
- Kiểm tra tính sẵn sàng của Codegen: Bắt buộc cấu hình chính xác `codegen.profile` (vd: `auth`, `admin-crud`, `list`, `not-found`, `error`) để hệ thống biết rẽ nhánh sinh code vào thư mục Frontend phù hợp (vd: `src/app/(auth)/` hay `src/app/(dashboard)/`).
- Quản lý Component: Rà soát nếu màn hình quá phức tạp ($\ge 3$ cấp) phải gắn `#use-store` để dùng Pinia/Zustand. Bắt buộc tách form ra component riêng. Phân tích các khối UI phức tạp để đề xuất `#needs-component: MoBlockName`.
- Kiểm tra API Contract: Bắt buộc tuân thủ suffix chuẩn (vd: `/create`, `/{id}/delete`), không dùng RESTful mù mờ. Nếu gọi lại API có sẵn thì phải dùng `#reuse-api`.

## Các Skill liên quan
- **Trước đó:** Nhận đầu vào từ `/grill-bqa` (hoặc `/spec`).
- **Sau đó:** 
  - Chuyển giao sang `bộ code FE` để sinh code prototype (`/prototype`).
  - Nếu xung đột giữa Code và Business -> Gọi `/grill-docs`.
  - Nếu thông tin Legacy bị thiếu → `/legacy /spec` hoặc `/update-spec` (patch `legacy` / evidence).

## Chú ý quan trọng
- **Cấm đoán (Out of scope):** Tuyệt đối không sinh Markdown reports, không xuất code mẫu (FastAPI, Axios...). Nhiệm vụ duy nhất là cập nhật metadata cấu hình YAML cho Codegen engine.
- **Hard gate (Chốt chặn):** Không bao giờ được đánh dấu `grillStatus.dev: done` nếu `bundle.gen` vẫn thiếu `codegen.profile` hoặc các profile CRUD mà lại thiếu `entity`/`module`.
- **Luật AskQuestion Tech Debt:** Khi thiếu các thông tin kỹ thuật cốt lõi để gen code (như cấu hình profile, tham số entity, hoặc endpoint action), Agent phải gọi Form AskQuestion đưa ra lựa chọn dự đoán (Recommended). Form **BẮT BUỘC** phải có tuỳ chọn `"Log as Tech Debt (Pending)"`.
- Nếu người dùng chọn `"Log as Tech Debt"`, phải ghi vào `qa/<SHORT>_NNNN.yaml` và giữ nguyên trạng thái `grillStatus.dev: pending`. Không được tự ý cho pass.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/grill-dev

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

