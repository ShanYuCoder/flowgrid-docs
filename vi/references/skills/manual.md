---
name: manual
description: "/manual — Generates End-User Documentation (User Manuals / Help Center guides) anchored on User Flows and E2E Evidences."
disable-model-invocation: true
extractBundle: spec-core
---

# `/manual` - Kỹ Năng Sinh Hướng Dẫn Sử Dụng (User Manual Generation)

Kỹ năng này sinh tài liệu hướng dẫn sử dụng (User Manuals / Help Center guides) toàn diện, phi kỹ thuật cho người dùng cuối. Tài liệu được thiết kế theo hướng **Trọng tâm luồng người dùng (Flow-Centric)**, tập trung dẫn dắt người dùng hoàn thành công việc cụ thể (Use Case) thay vì liệt kê chi li từng trường thông tin trên màn hình.

## 1. Yêu cầu Frontmatter (Đồng bộ Google Docs)
Mỗi tệp Markdown sinh ra BẮT BUỘC bắt đầu bằng khối frontmatter YAML sau:
```yaml
---
gdoc_id: "" # Populated by adapter
gdrive_image_id: "" # Populated by adapter
content_hash: "" # Populated by adapter
locale: "vi" # Ngôn ngữ của tài liệu hướng dẫn (BCP-47)
---
```

## 2. Chọn Phạm vi & Ngôn ngữ Tài liệu (Multi-Language Scope)
1. **Kiểm tra Cấu hình:** Đọc `docs/ssot-docs.locale.yaml` để xác định danh sách ngôn ngữ tài liệu hỗ trợ (`docsProseLocales`) và ngôn ngữ mặc định (`defaultDocsProseLocale`).
2. **Kiểm tra Tham số Dòng lệnh:**
   - Nếu gọi kèm cờ `--locale=all`: Tự động sinh manual cho TẤT CẢ ngôn ngữ trong `docsProseLocales`.
   - Nếu gọi kèm cờ `--locale=<code >` (ví dụ: `--locale=ja`): Chỉ sinh manual cho riêng ngôn ngữ đó.
3. **Modal Hỏi Tương tác (`AskQuestion`):**
   - Nếu không có cờ `--locale` VÀ `docsProseLocales` có nhiều hơn 1 ngôn ngữ:
     AI Agent dùng `AskQuestion` để hỏi member:
     > *"Chọn ngôn ngữ tài liệu hướng dẫn sử dụng cần xuất bản (Select User Manual language):"*
     > - `(Recommended) [All] Xuất bản cho TẤT CẢ ngôn ngữ (${docsProseLocales.join(', ')})`
     > - `${locale_1}`
     > - `${locale_2}`
     > - ...
   - Nếu `docsProseLocales` chỉ có 1 ngôn ngữ duy nhất: Tự động dùng ngôn ngữ đó mà không cần hỏi.

## 3. Thu thập Ngữ cảnh
Khi được gọi bằng `/manual <FLOW-ID>` (ví dụ: `/manual FLOW-ADM-TENANT-SETUP`):
1. **Xác định mục tiêu:** Đọc tài liệu User Flow chính (`FLOW-*`).
2. **Thu thập ngữ cảnh:** Đọc Component Specs (`W-*`) CHỈ để hiểu mục đích của các khu vực chính. TUYỆT ĐỐI KHÔNG trích xuất các quy tắc validate chi tiết.
3. **Tải Template:** Đọc mẫu template chuẩn tại `surfaces/_user-manual-page.template.md`.

## 4. Liên kết Ảnh Evidence Thông minh (Stateless Pathing & Fallback Hierarchy)
TUYỆT ĐỐI KHÔNG quét tìm tệp zip. Đọc `.flowgrid/config.json` để lấy `evidence.base_url` và `.flowgrid/product-i18n.yaml` (hoặc `config.productI18n`) để lấy danh sách ngôn ngữ UI sản phẩm (`languages`) và ngôn ngữ mặc định (`defaultLocale`).

Đối với mỗi ngôn ngữ manual cần sinh `targetLocale`:
1. **Tình huống A — Giao diện sản phẩm CÓ hỗ trợ (`targetLocale ∈ productI18n.languages`) & ĐÃ CÓ ảnh chụp:**
   - Tính toán URL: `${base_url}/surfaces/${surface}/${moduleId}/${screenId}.${targetLocale}.png`
   - Nhúng ảnh: `![Screen Evidence (${targetLocale.toUpperCase()})](${imageUrl})`
   - Chú thích: `*(Ảnh chụp màn hình giao diện ${targetLocale.toUpperCase()})*`
2. **Tình huống B — Giao diện CÓ hỗ trợ NHƯNG CHƯA chụp ảnh (`targetLocale ∈ productI18n.languages`):**
   - Fallback an toàn về ảnh mặc định của sản phẩm: `${base_url}/surfaces/${surface}/${moduleId}/${screenId}.png`
   - Nhúng ảnh: `![Screen Evidence (${defaultLocale.toUpperCase()})](${imageUrl})`
   - Chú thích: `*(Ảnh chụp màn hình từ hệ thống thật - Giao diện mặc định ${defaultLocale.toUpperCase()}, chưa có snapshot ${targetLocale.toUpperCase()})*`
3. **Tình huống C — Giao diện sản phẩm KHÔNG hỗ trợ ngôn ngữ này (`targetLocale ∉ productI18n.languages`):**
   - Ứng dụng không có bản dịch UI cho ngôn ngữ này. Bắt buộc dùng ảnh mặc định của sản phẩm:
   - Nhúng ảnh: `![Screen Evidence (${defaultLocale.toUpperCase()})](${imageUrl})`
   - Chú thích: `*(Ảnh chụp màn hình từ hệ thống thật - Giao diện ${defaultLocale.toUpperCase()}, sản phẩm không hỗ trợ UI ${targetLocale.toUpperCase()})*`

## 5. Cấu trúc Đường dẫn Đầu ra
- Trong workspace đa ngôn ngữ, tệp tài liệu sinh ra được lưu tại:
  `surfaces/<surface>/user-manuals/<module>/<FLOW-ID>.<targetLocale>.md`
  *(ví dụ: `FLOW-ADM-TENANT-SETUP.ja.md`, `FLOW-ADM-TENANT-SETUP.vi.md`, `FLOW-ADM-TENANT-SETUP.en.md`)*.
- Nếu dự án chỉ cấu hình 1 ngôn ngữ duy nhất, phần mở rộng ngôn ngữ có thể bỏ qua (`<FLOW-ID>.md`) để tương thích ngược.

## 6. Ràng buộc Hành vi (Góc nhìn Người dùng Cuối)
- **Tập trung vào hành trình, không liệt kê trường:** Người dùng cuối đã hiểu email hay số điện thoại là gì. KHÔNG diễn giải validate vụn vặt ("Dài tối đa 50", "Phải là email hợp lệ", "Bắt buộc"). Giao diện hệ thống sẽ tự xử lý.
- **Hướng dẫn theo hành động:** Viết chỉ dẫn theo chuỗi hành động thực tế: "Bước 1: Vào trang Quản trị và bấm Thêm Khách hàng. Bước 2: Điền thông tin doanh nghiệp..."
- **Xử lý rẽ nhánh:** Nếu quy trình có điều kiện (ví dụ: "Nếu chọn Doanh nghiệp thì hiện thêm Mã số thuế"), mô tả rõ các kịch bản để người dùng biết hướng đi tiếp theo.
- **Không dùng thuật ngữ kỹ thuật:** TUYỆT ĐỐI KHÔNG đề cập "API", "DTO", "Regex", "Schema", hay "Validation".
- **Văn phong chuẩn theo từng ngôn ngữ:**
  - Tiếng Nhật (`ja`): Kính ngữ chuẩn (丁寧語 / Keigo: です・ます), lịch sự, trang nhã.
  - Tiếng Việt (`vi`): Thân thiện, tự nhiên, rõ ràng, dễ hiểu.
  - Tiếng Anh (`en`): Chủ động, hướng dẫn dứt khoát bằng động từ hành động.
