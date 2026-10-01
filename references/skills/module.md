# Skill: `/module`

## Tên
`module`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/module <CMP-ID>` (Ví dụ: `/module CMP-ADM-AUTH-01`)
- Có thể dùng kèm tên thư mục Surface: `/module "Customer App" CMP-123`
- Khảo cổ mã nguồn cũ: `/legacy /module`
- Chia sẻ tài nguyên chung của 1 Module: `/module <CMP-ID> common`

## Input (Dữ liệu đầu vào)
- Nhận diện CMP ID do người dùng cung cấp. Agent sẽ tự động phân giải (Resolve Target) xem Module đó đang nằm ở Surface nào bằng `flowgrid_docs_route` hoặc glob search.
- Định nghĩa các cụm chức năng (Clusters), quy trình hoặc API nội bộ trong Module đó.

## Output (Kết quả mong đợi)
- Khởi tạo thư mục Module tại `surfaces/<Surface>/<CMP-ID>/`.
- Sinh ra file tài liệu gốc của Module: `surfaces/<Surface>/<CMP-ID>/<CMP-ID>.md`.
- **Luật về ID Phân cấp (Numeric Hierarchical IDs):** Mọi thư mục con đại diện cho các tính năng/màn hình nhỏ bên trong Module BẮT BUỘC phải dùng định dạng ID thuần số (Ví dụ: `01/`, `01/01/02/`). TUYỆT ĐỐI KHÔNG dùng tên dạng chữ (textual slug) để đặt tên thư mục con của Module.

## Description / Ý nghĩa
- Quản lý cấp độ chức năng lớn (Business Modules) - thường là các cụm màn hình hoặc một nhóm quy trình nghiệp vụ gom chung lại (Ví dụ: Module Quản lý Người dùng, Module Thanh toán).
- Hỗ trợ tạo thư mục `common/` cục bộ cho Module đó. Ví dụ: Nếu một vài hàm tiện ích (utils) hoặc file YAML chỉ xài chung quanh quẩn trong `CMP-123`, ta sẽ bỏ vào `surfaces/<Surface>/CMP-123/common/` thay vì quăng ra ngoài `surfaces/common` gây rác hệ thống.
- VitePress/Publish sẽ đọc các file `[CMP-ID].md` này và dùng Mã tài liệu (vd `SPEC-PORTAL-AUTH-00`) làm Text hiển thị trên Menu.

## Các Skill liên quan
- Được kích hoạt/điều phối bởi `/architecture`.
- Nằm dưới cấp của `/surfaces`.
- Chứa bên trong nó là vô số các `/spec` (Đặc tả màn hình chi tiết).

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/module

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

