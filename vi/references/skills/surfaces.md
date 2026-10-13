# Skill: `/surfaces`

## Tên
`surfaces`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/surfaces <Tên Surface>` (Ví dụ: `/surfaces "Admin Portal"`)
- Có thể dùng kèm với `common`: `/surfaces common` (cho toàn hệ thống) hoặc `/surfaces "Admin Portal" common` (Share riêng trong phạm vi 1 Surface).
- Có thể kết hợp cờ khảo cổ mã nguồn cũ: `/legacy /surfaces`

## Input (Dữ liệu đầu vào)
- Tên Business Surface (VD: Customer App, Admin Portal, Integration Gateway).
- Nếu có `/legacy`: Đọc `legacy-repos.local.json`.
- Định danh và thông tin về người dùng (actors), kênh tương tác (channels) và phạm vi nghiệp vụ (business responsibility).

## Output (Kết quả mong đợi)
- Khởi tạo thư mục và sinh ra các file tài liệu Markdown lưu tại `surfaces/<Tên Surface>/`.
- Nếu có cờ `/legacy`: Khảo cổ mã nguồn cũ và map lại thành `legacy-surface.md`.

## Description / Ý nghĩa
- Dùng để thiết kế tầng **Giao diện Nghiệp vụ (Business Surfaces)**. Tầng này định nghĩa rõ "Ai (Actor) - làm gì (Business Responsibility) - trên kênh nào (Channel)".
- Ranh giới Kỹ thuật (Surface Technical Boundary): 
  - Thư mục Surface **CHỈ ĐƯỢC PHÉP** chứa tài liệu kỹ thuật liên quan đến UI/Page Building (UI Layout, States, Props) hoặc Data Schema của 1 API đơn lẻ. 
  - **TUYỆT ĐỐI CẤM** nhét cấu trúc Backend server, Load balancer, cấu trúc Database ngầm vào đây.
  - Luồng xuyên suốt (Cross-flows) trong thư mục Surface chỉ được phép là luồng điều hướng màn hình (User navigation journeys), CẤM chứa luồng kỹ thuật Backend chéo.
- Lưu ý: **API NỘI BỘ KHÔNG PHẢI LÀ MỘT SURFACE**. Đừng bao giờ tạo thư mục `surfaces/API` để chứa API của một màn hình. **API giao tiếp ngoại vi** (webhook, Open API cho bên thứ 3) vẫn nằm trên một **surface nghiệp vụ** bình thường (ví dụ `surfaces/partner-gateway/…/api/<seq>/`) — cùng skill `/api-spec`, không tách skill riêng.

## Các Skill liên quan
- Được kích hoạt/điều phối bởi `/architecture`.
- Nếu thiết kế chung cho toàn hệ thống → Gọi `/common`.
- Đi sâu vào thiết kế chức năng bên trong Surface → Gọi `/module`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/surfaces

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

