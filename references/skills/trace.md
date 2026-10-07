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
- **Chỉ đọc và ghi trên `source-code/`**: Không tìm kiếm hay đụng chạm vào thư mục `source-legacy/`.
- Luôn giữ tính nhất quán giữa tài liệu kiến trúc SSOT và mã nguồn thực thi đang phát triển.

## Description / Ý nghĩa
- Trong dự án bảo trì, việc dev tự viết spec từ đầu rất dễ bỏ sót các logic ngầm, validation ẩn hoặc edge-cases đã tồn tại trong code.
- `/trace` giúp Agent đóng vai trò "thám tử", dò ngược từ implementation thực tế ra spec chuẩn SSOT, bảo đảm việc phát triển tính năng mới không làm gãy vỡ hệ thống cũ.

---

## Example prompt (mẫu gọi)

```text
/trace /spec

Surface: admin
Màn hình: Quản lý đơn hàng (Order Management)
Hãy quét controller và view tương ứng trong source-code/ để trích xuất đầy đủ spec, data model và API contract hiện có.
```
