# Kỹ năng: `/trace`

## Tên
`trace`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/trace` hoặc dùng kết hợp `/trace /spec`.
- Dành riêng cho kịch bản **Maintain** (bảo trì và phát triển tiếp codebase hiện có).

## Input (Dữ liệu đầu vào)
- **Thư mục đọc:** `source-code/` (mã nguồn đang chạy của dự án).
- Tài liệu kiến trúc hiện có trong `architecture/`.

## Output (Kết quả mong đợi)
- **Thư mục ghi:** `source-code/` (và các file spec SSOT tương ứng).
- Quét và đối chiếu trực tiếp code thực tế trong `source-code/` để trích ngược Data Model, API contract, state logic vào Leaf Bundle spec.
- Mọi code mới sinh ra hoặc sửa đổi được cập nhật trực tiếp vào `source-code/`.

## Quy tắc bắt buộc
- **Tự giác điều tra (Autonomous Fact-Finding Guard):** Tuyệt đối không hỏi người dùng vị trí file router, controllers, hay schema nằm ở đâu; tự động rà quét và phân tích mã nguồn.
- **Duyệt trọn vẹn Chuỗi 5 mắt xích User Flow:** Phải trace luồng Upstream (điều kiện kích hoạt), Primary (thao tác màn hình), Downstream side-effects (job ngầm, email, kho), Failure & Rollback (hủy/lỗi), và Ranh giới Bảo mật (Auth, Tenant).
- **Bắt buộc điều tra sâu tầng Model / Entity khi mapping Database:** Tuyệt đối không dừng lại ở Controller hay Service. Agent **BẮT BUỘC phải mở và đọc sâu xuống các file Model / Entity** (`app/Models/*`, `@Entity`, etc.) và migration DDL: trích xuất chính xác tên bảng vật lý, danh sách cột (`$fillable`), kiểu dữ liệu & ép kiểu (`$casts`), quan hệ liên kết (`belongsTo`, `hasMany`) và các thuộc tính ảo (`$appends`). Khai báo đầy đủ `design.dataModel.tables[]` và khối `db:` cho từng control/cột dữ liệu trên màn hình.
- **Thực tế code là Chân lý tối thượng:** Đoạn code đang chạy là ground truth; ghi nhận ngay các điểm mâu thuẫn giữa mô tả yêu cầu/ticket và thực tế code vào bảng đối chiếu.
- **Chỉ đọc và ghi trên `source-code/`**: Không tìm kiếm hay đụng chạm vào thư mục `source-legacy/`.
- Luôn giữ tính nhất quán giữa tài liệu kiến trúc SSOT và mã nguồn thực thi đang phát triển.

## Description / Ý nghĩa
- Trong dự án bảo trì, việc dev tự viết spec từ đầu rất dễ bỏ sót các logic ngầm, validation ẩn hoặc edge-cases đã tồn tại trong code.
- `/trace` giúp Agent đóng vai trò "thám tử", dò ngược từ implementation thực tế ra spec chuẩn SSOT (`W-*.bundle.yaml`, `01-backend-spec.yaml`, `FLOW-*.md`), bảo đảm việc phát triển tính năng mới không làm gãy vỡ hệ thống cũ.

---

## Example prompt (mẫu gọi)

```text
/trace /spec

Surface: admin
Màn hình: Quản lý đơn hàng (Order Management)
Hãy quét controller và view tương ứng trong source-code/ để trích xuất đầy đủ spec, data model và API contract hiện có.
```
