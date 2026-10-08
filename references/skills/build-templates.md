# Skill: `/build-templates`

> Golden sample là một **thư mục module**. Phân tích trước, ghi template khi member tiếp tục (`--yes`).

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
- Bước phân tích ghi `.flowgrid/template-plan.json`.
- Bước `--yes` ghi template vào repo đúng lane, dưới `.flowgrid/adapters/custom/templates/`:
  - Nuxt, Next, Nest → `.hbs`
  - Laravel → `.stub`
  - FastAPI → `.j2`
  - .NET → `.scriban`
- FE ghi `design.registry.json`. BE ghi `codegen.registry.json`.

## Description / Ý nghĩa
- Để hệ thống có thể tự động sinh code (gencode) cho cả Frontend, Backend, và Test E2E, FlowGrid hiện đang cần gắn liền với một bộ base có sẵn của các công nghệ như Nuxt4, Next.js, Python FastAPI, Laravel... với các cấu trúc thư mục, file mẫu, và common code định sẵn.
- **Vấn đề đặt ra:** Khi áp dụng vào các dự án có sẵn, đôi khi dự án đó không tuân thủ đúng base tiêu chuẩn của công nghệ, hoặc dùng chung công nghệ nhưng lại khác cấu trúc layout, thư viện dùng chung. Ví dụ: base FE mặc định của FlowGrid dùng `shadcn-ui`, nhưng một dự án khác lại dùng `vuetify`.
- **Giải pháp của `/build-templates`:** Đọc một thư mục module (kể cả repo ngoài hệ thống), lập plan, rồi khi member tiếp tục thì ghi template đúng công nghệ vào repo FE hoặc BE tương ứng.

## Các Skill liên quan
- **Trước đó:** Khởi tạo qua `flowgrid setup` và chạy `/init` (liên kết `source-legacy/` hoặc `source-code/`) để quét cấu trúc và đề xuất Golden Sample.
- **Sau đó:** `/spec` dùng registry vừa ghi. Template đã có được giữ. `--force` chỉ khi member muốn ghi đè.

## Chú ý quan trọng
- Phân tích (`--sample`) không ghi template. Hỏi một lần rồi mới `--yes`.
- Không ghi đè template đã sửa tay nếu member chưa yêu cầu `--force`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/build-templates

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

