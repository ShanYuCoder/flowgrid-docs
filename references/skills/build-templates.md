# Skill: `/build-templates`

> [!WARNING] Đang phát triển (WIP)
> Kỹ năng này hiện tại vẫn đang trong giai đoạn phát triển và thử nghiệm ban đầu (chưa hoàn thiện 100% mượt mà). Hãy cẩn thận kiểm tra lại kết quả khi sử dụng.

## Tên
`build-templates`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/build-templates`
- Dùng khi khởi tạo dự án mới hoặc khi có sự thay đổi lớn về thư viện UI/Core ở phía mã nguồn Frontend/Backend.

## Input (Dữ liệu đầu vào)
- File cấu hình `platform-repos.local.json` (Để định vị đường dẫn thư mục code FE/BE).
- Các file `package.json` của FE/BE.
- Các file Component dùng chung (Breadcrumb, Layout, Form, Table) trong mã nguồn Frontend.

## Output (Kết quả mong đợi)
- Sinh ra các file giao diện EJS (`.ejs`) bên trong thư mục `.flowgrid/templates/` (ví dụ: `default-layout.ejs`).
- Đồng bộ template codegen và `design.registry.json` trên FE base (không author `surfaces/common/yaml` trên hub).

## Description / Ý nghĩa
- Để hệ thống có thể tự động sinh code (gencode) cho cả Frontend, Backend, và Test E2E, FlowGrid hiện đang cần gắn liền với một bộ base có sẵn của các công nghệ như Nuxt4, Next.js, Python FastAPI, Laravel... với các cấu trúc thư mục, file mẫu, và common code định sẵn.
- **Vấn đề đặt ra:** Khi áp dụng vào các dự án có sẵn, đôi khi dự án đó không tuân thủ đúng base tiêu chuẩn của công nghệ, hoặc dùng chung công nghệ nhưng lại khác cấu trúc layout, thư viện dùng chung. Ví dụ: base FE mặc định của FlowGrid dùng `shadcn-ui`, nhưng một dự án khác lại dùng `vuetify`.
- **Giải pháp của `/build-templates`:** Kỹ năng này sẽ làm nhiệm vụ "đọc vị" base code thực tế của dự án đích. Sau đó, nó tự động build lại toàn bộ các template (`.ejs`, v.v.) để cung cấp đầu vào chuẩn xác cho các script sinh code (codegen, testgen). Nhờ đó, tính năng sinh code sẽ "nhập gia tùy tục" và tuân thủ đúng chuẩn của dự án hiện tại thay vì ép buộc dùng base mặc định.

## Các Skill liên quan
- **Trước đó:** Yêu cầu chạy `/configure-repo-maps` nếu chưa liên kết thư mục mã nguồn.
- **Sau đó:** Chạy lệnh `pnpm docs:render` để biên dịch thử và xem kết quả giao diện các template EJS mới.

## Chú ý quan trọng
- **Không tự ý ghi đè:** Nếu các file template EJS đã tồn tại và có dấu hiệu chỉnh sửa bằng tay của con người, Agent phải hỏi ý kiến User trước khi ghi đè, hoặc chỉ vá phần chênh lệch.
- Không được phép thay đổi hoặc xóa các thẻ neo HTML Comment (Ví dụ: `<!-- flowgrid-anchor: ... -->`) trong file EJS vì hệ thống bộ docs dựa vào đó để nhét nội dung động vào.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/build-templates

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

