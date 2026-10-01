# Skill: `/api-update`

## Tên
`api-update`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/api-update <page-id/slug>` (Mặc định: Đồng bộ thay đổi từ Portal FE sang Backend API).
- Chế độ Backend Only: `/api-update <page-id/slug> --be-only` (Chỉ cập nhật logic ngầm, không làm thay đổi giao thức kết nối với Frontend).

## Input (Dữ liệu đầu vào)
- Đọc file `ir/design.yaml` (dữ liệu từ FE Portal).
- Đọc file hợp đồng Backend hiện hành: `api/<seq>/01-backend-spec.yaml` (và `03-mock.yaml` nếu có).

## Output (Kết quả mong đợi)
- File `01-backend-spec.yaml` (và file mock data) được vá/cập nhật (Delta Patch).
- Ghi log thay đổi vào `changeLog` và tự động tăng `feature.version` trong file `01`.
- Chạy lệnh CLI để kiểm định và sinh lại OpenAPI: `flowgrid openapi_gen`.

## Description / Ý nghĩa
- Dùng để **Đồng bộ hóa (Sync) / Cập nhật (Update)** hợp đồng Backend API khi giao diện Frontend (Portal) có sự thay đổi về đặc tả, hoặc khi team Backend có những yêu cầu logic ngầm mới (BE-only requirements).
- Tương tự như `/update-spec` (sửa FE), kỹ năng này chỉ cập nhật cục bộ (Patch) dựa trên những điểm khác biệt (Diff). Tuyệt đối không viết lại toàn bộ file từ đầu hay tự ý thiết kế lại API.
- Cấm sửa đổi tên các trường (API fields) một cách tuỳ tiện chỉ để "cho tiện" bên Frontend.

## Các Skill liên quan
- **Trước đó:** Giao diện FE thay đổi thông qua `/update-spec`.
- **Sau đó:** Bắt buộc gọi `/grill-api-spec` để chạy lại kiểm toán kỹ thuật và gỡ/thêm các nhãn gencode (codegen tags).

## Chú ý quan trọng
- **Cấm đoán:** Tuyệt đối không sinh file Markdown report, không sinh mã nguồn Laravel/Python.
- Nếu đụng tới các liên kết ngoại (External Integrations), phải dùng form AskQuestion (có option "Log as Tech Debt"). Nếu User chọn Tech Debt, sinh file trong `qa-inbox.md` và xử lý sau bằng `/qa-resolve`. 
- File `02-openapi.yaml` là file **gen tự động**, cấm được patch/sửa tay trực tiếp vào nó. Chỉ sửa `01` và chạy lệnh gen.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/api-update

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

