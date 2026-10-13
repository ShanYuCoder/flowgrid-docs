# Workflow: Xây dựng Tài liệu Hướng dẫn Người dùng (User Manual)

Trong hệ sinh thái **FlowGrid**, tài liệu hướng dẫn người dùng cuối (User Manual) không được viết hoàn toàn thủ công. Thay vào đó, nó là sự kết hợp tự động giữa **Thông số Kỹ thuật (Spec)** và **Kết quả Test Tự động (E2E Evidence)**, đảm bảo luôn khớp 100% với hệ thống thực tế.

Tài liệu này hướng dẫn chi tiết quy trình từ lúc sinh tài liệu bằng AI cho đến lúc đồng bộ lên **Google Docs** cho khách hàng sử dụng.

---

## 1. Điều kiện tiên quyết (Prerequisites)

Trước khi tiến hành build User Manual, bạn cần đảm bảo:
1. **Spec & Flow đã được chốt:** Đã có file User Flow (VD: `surfaces/admin/user-flows/FLOW-ADM-TENANT-SETUP.md`).
2. **Automation Test (Phase 4):** Automation Test (Playwright/Cypress) đã được chạy thành công và lưu ảnh chụp màn hình thực tế (Evidence) tại thư mục `qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png`.
3. **Cấu hình Google Docs API:** Hệ thống cần quyền truy cập vào Google Workspace của công ty bằng Service Account. 
   - Tải file JSON Key của Service Account từ Google Cloud Console.
   - Đổi tên file thành `google-credentials.json` và đặt vào thư mục gốc của workspace (hoặc thư mục `.secrets/`).
   - **ĐẶC BIỆT LƯU Ý:** Bắt buộc phải thêm `google-credentials.json` và `.secrets/` vào file `.gitignore` để tránh rò rỉ key bảo mật lên Github.
   - FlowGrid Adapter sẽ tự động đọc file này (thông qua biến môi trường `GOOGLE_APPLICATION_CREDENTIALS` hoặc đọc trực tiếp từ thư mục gốc).

---

## 2. Bước 1: Sinh bản nháp Local (Local Generation)

Mọi User Manual đều bắt nguồn từ Local dưới dạng định dạng Markdown, đóng vai trò là **SSOT (Single Source of Truth)**. Tài liệu hướng dẫn sử dụng được xây dựng xoay quanh **User Flow (Luồng nghiệp vụ)** chứ không phải đi liệt kê từng trường trên giao diện.

**Câu lệnh thực thi:**
```bash
flowgrid docs /manual FLOW-ADM-TENANT-SETUP
```

**AI sẽ làm gì?**
1. **Đọc User Flow:** Lấy luồng tương tác, các bước rẽ nhánh (VD: Chọn Doanh nghiệp thì làm gì tiếp theo) từ file `FLOW-*.md`.
2. **Tham chiếu Spec (tổng quan):** Chỉ đọc file Spec Kỹ thuật (`W-*`) để nắm ý nghĩa của các khối thông tin lớn. BỎ QUA toàn bộ các validate lặt vặt (như required, email, số điện thoại, max-length 50) vì chúng hiển nhiên hoặc UI đã tự báo lỗi.
3. **Dịch sang ngôn ngữ End-User:** AI tập trung viết theo dạng hướng dẫn hành trình: "Bước 1: Vào mục X... Bước 2: Nhập thông tin Y".
4. **Ghép ảnh E2E:** Tự động chèn link tham chiếu đến file ảnh trong `qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png`.
5. **Khởi tạo Tracking:** Gắn khối YAML Frontmatter vào đầu file.

**Kết quả:**
Sinh ra file tại `surfaces/admin/user-manuals/tenant/FLOW-ADM-TENANT-SETUP.md`.

```markdown
---
gdoc_id: "" 
gdrive_image_id: "" 
content_hash: ""
---
# Hướng dẫn tạo đơn hàng
Dưới đây là giao diện thực tế:
![Screen Evidence](../../../qa/e2e/evidence/W-ADM-ORD-01-main.png)
...
```

---

## 3. Bước 2: Đồng bộ lên Google Docs (Publishing)

End-User không bao giờ đọc file Markdown. Họ cần một đường link Google Docs thân thiện. 

**Câu lệnh thực thi:**
```bash
flowgrid publish manual W-ADM-ORD-01 --target=gdocs
```

**Luồng hoạt động của Publisher Adapter (`gdocs-adapter.mjs`):**

1. **Kiểm tra thay đổi (Hash Bypass):**
   - Adapter gom nội dung file Markdown + mã nhị phân của file ảnh `.png` để tạo thành một mã băm MD5 (Hash).
   - So sánh với `content_hash` lưu ở lần chạy trước.
   - **Tác dụng:** Nếu tài liệu không có thay đổi, tiến trình sẽ Dừng Lại. Điều này giúp dự án có hàng trăm màn hình **tránh bị chặn Quotas (giới hạn API) của Google**.

2. **Upload Ảnh E2E lên Google Drive:**
   - Google Docs API không cho phép nhúng file local.
   - Adapter sẽ upload ảnh `.png` lên Google Drive, lấy một URL công khai tạm thời.

3. **Cập nhật Google Doc (Clear & Replace):**
   - Nếu `gdoc_id` chưa có: Tạo mới một Google Doc và ghi ID lại vào file markdown.
   - Nếu đã có `gdoc_id`: Gọi hàm `batchUpdate` -> Xóa toàn bộ nội dung cũ (`deleteContentRange`) -> Chèn nội dung & ảnh mới.
   - **Tác dụng:** Giữ nguyên vĩnh viễn một đường link Google Doc để share cho khách hàng/nội bộ, không bao giờ bị đứt link.

---

## 4. Chiến lược Cập nhật (Update Strategy)

> **Luật bất thành văn:** Tài liệu trên Google Docs là **Read-Only (Chỉ đọc)**.

Nếu có thành viên (BA, Customer Success) muốn chỉnh sửa User Manual, quy trình sẽ phải đi ngược từ gốc:
1. Sửa trực tiếp logic trên file Spec Kỹ thuật (Hoặc sửa thủ công trên file `.md` local nếu chỉ đổi câu chữ).
2. Chạy E2E lấy ảnh mới (Nếu có đổi UI).
3. Chạy lệnh `flowgrid publish`.

**Tuyệt đối không sửa trực tiếp văn bản trên giao diện Google Docs.** Vì hệ thống dùng cơ chế *Clear & Replace*, mọi chỉnh sửa trực tiếp trên Cloud sẽ bị xóa sạch vào lần Publish tiếp theo từ Local lên. Đây là nguyên tắc bảo vệ tính toàn vẹn dữ liệu SSOT (Single Source of Truth) của FlowGrid.
