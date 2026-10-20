# Kỹ năng: `/legacy`

## Tên
`legacy`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/legacy` hoặc dùng kết hợp `/legacy /spec`.
- Dành riêng cho kịch bản **Rebase / Modernization** (đập đi xây mới từ code cũ).

## Input (Dữ liệu đầu vào)
- **Thư mục đọc:** `source-legacy/` (**Strictly READ-ONLY**).
- Bản danh sách ánh xạ chức năng từ `extract-legacyion-inventory.md`.

## Output (Kết quả mong đợi)
- **Thư mục ghi:** `source-code/` (và các file spec SSOT tương ứng).
- Đọc hiểu 100% logic nghiệp vụ lõi (controllers, services, validation rules, state machine) từ mã nguồn cũ.
- Tái cấu trúc và xuất sang dạng Leaf Bundle spec chuẩn (`.bundle.yaml`, `ir/`, `01-backend-spec.yaml`) và code mới đặt trong `source-code/`.

## Quy tắc bắt buộc [CỰC KỲ QUAN TRỌNG]
- **`source-legacy/` là STRICTLY READ-ONLY:** Tuyệt đối cấm sửa đổi, thêm mới hay xóa bất kỳ file nào trong thư mục này.
- **Cấm copy-paste rác kỹ thuật:** Không bê nguyên xi code cũ sang hệ thống mới. Chỉ kế thừa logic nghiệp vụ và viết lại theo kiến trúc mới chuẩn mực.
- **Bắt buộc điều tra sâu tầng Model / Entity khi mapping Database:** Không dừng ở controller legacy. Phải mở trực tiếp các file Model/Entity (`app/Models/*`) và migration DDL cũ: trích xuất chính xác tên bảng, kiểu dữ liệu cột, `$fillable`, `$casts`, quan hệ liên kết (`belongsTo`, `hasMany`) và các trường ảo tính toán (`$appends`). Khai báo đầy đủ `design.dataModel.tables[]` và khối `db:` cho từng control/cột dữ liệu trên màn hình.
- **Ghi toàn bộ vào `source-code/`:** Mọi output codegen và specs đều được lưu trữ trực tiếp vào thư mục mã nguồn mới.

## Description / Ý nghĩa
- Trong các dự án đập đi xây lại, thách thức lớn nhất là làm sao để giữ trọn vẹn nghiệp vụ phức tạp của hệ thống cũ mà không bị "nhiễm độc" bởi cấu trúc code tệ hại trước đây.
- `/legacy` là công cụ lọc sạch nghiệp vụ: đọc logic từ code cũ, lọc bỏ rác kỹ thuật, và chuyển hóa thành kiến trúc mới tinh gọn và sạch sẽ trong `source-code/`.

---

## Example prompt (mẫu gọi)

```text
/legacy /spec

Màn hình: Quản lý khách hàng (Customer Management)
Hãy đọc logic cũ tại source-legacy/app/Http/Controllers/CustomerController.php để trích xuất toàn bộ nghiệp vụ, validation và API sang spec mới cho hệ thống trong source-code/.
```
