# Kỹ năng: `/extract-legacy`

## Tên
`extract-legacy`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/extract-legacy`.
- Sử dụng ở Phase 0 trong kịch bản **Rebase / Modernization** (đập đi xây mới từ code cũ).

## Input (Dữ liệu đầu vào)
- Mã nguồn cũ đặt trong thư mục `source-legacy/` (**Strictly READ-ONLY**).

## Output (Kết quả mong đợi)
1. **Danh mục chức năng cũ:** Sinh file `extract-legacyion-inventory.md` tại root workspace, lập bảng ánh xạ các module, màn hình, API routes từ code cũ.
2. **Bóc tách Common Candidates (`CMN-*`):** Quét phát hiện các đoạn code trùng lặp do thói quen copy-paste trong code cũ:
   - `CMN-UI-*`: Component dùng chung bị lặp (toolbar tìm kiếm, modal xác nhận, badge trạng thái,...).
   - `CMN-API-*`: Logic backend lặp (logging interceptor, phân trang, export excel, jwt resolver,...).
   - `CMN-DTO-*`: Thực thể dữ liệu dùng chung.
3. **Cảnh báo nhân bản cả trang:** Ghi nhận cảnh báo nếu phát hiện 2 file màn hình copy nguyên xi của nhau (ví dụ `CreateUser` vs `EditUser`) để gộp thành polymorphic spec (`mode: create | edit`).

## Quy tắc bắt buộc
- Tuyệt đối không sửa đổi hay xóa bất kỳ file nào trong `source-legacy/`.
- File inventory chỉ chứa mục lục và bản đồ ánh xạ, không sinh spec chi tiết tại bước này.

## Description / Ý nghĩa
- `/extract-legacy` đóng vai trò "khảo cổ tổng quan", giúp team nhìn thấy bức tranh toàn cảnh về quy mô hệ thống cũ trước khi đập đi làm lại.
- Chặn đứng thói quen copy-paste code bừa bãi sang codebase mới bằng cách chủ động phát hiện và đề xuất danh mục các thành phần dùng chung (`CMN-*`).

---

## Example prompt (mẫu gọi)

```text
/extract-legacy

Hãy quét sâu mã nguồn trong source-legacy/, phát hiện các mẫu UI/API trùng lặp để đề xuất danh mục CMN-* và lập danh mục chức năng vào extract-legacyion-inventory.md.
```
