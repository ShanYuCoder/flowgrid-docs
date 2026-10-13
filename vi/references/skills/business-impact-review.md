# Skill: `/business-impact-review`

## Tên
`business-impact-review`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/business-impact-review`
- Lệnh mang tính chất phân tích (Read-only analysis), Agent tuyệt đối không tự ý sửa code nếu không được yêu cầu.

## Input (Dữ liệu đầu vào)
- Đọc thông tin cấu hình Multi-repo của nền tảng FlowGrid (ví dụ: `dna/platform.json` cho hệ thống mới, hoặc `dna/legacy.json` cho hệ thống cũ).
- Nhận diện các phương thức (methods), API routes, Jobs, Events, Listeners vừa bị thay đổi.

## Output (Kết quả mong đợi)
- Sinh ra Báo cáo Đánh giá tác động (Blast-radius review).
- Báo cáo phải bao gồm:
  - Khuyến nghị có nên Deploy (Ship recommendation).
  - Danh sách các symbols/functions bị ảnh hưởng.
  - Phân tích Caller theo chiều ngang (Horizontal callers).
  - Phân tích Luồng quy trình theo chiều dọc (Vertical process paths).
  - **Báo cáo tác động ranh giới (Cross-Boundary Impact - FE/BE & Surfaces).**
  - Rủi ro/Nợ kỹ thuật còn sót (Residual risks).
  - Kế hoạch Test tập trung (Targeted test plan).

## Description / Ý nghĩa
- Kỹ năng phân tích rủi ro hệ thống trước khi Deploy hoặc khi thay đổi lõi nghiệp vụ.
- **Quét xuyên biên giới (Cross-Boundary Scan):**
  - **Cross-repo (FE ↔ BE):** Nếu sửa API ở BE, phải quét xem FE gọi API đó có bị gãy contract không. Ngược lại, nếu FE đổi form payload, phải xem BE có parse lỗi không.
  - **Cross-surface (Surface A ↔ Surface B):** Nếu sửa logic ở module A (vd: phát sinh event mới hoặc đổi DB schema), phải dùng CodeGraph truy vết xem module B (listener/consumer) có dính side-effect hay không.
- **Trace luồng dọc (Vertical Path Trace):** Agent sẽ truy vết từ `Client/FE -> Route -> Auth/Middleware -> Controller -> Service -> DB -> Event -> API bên ngoài`.
- **Phân loại rủi ro (Risk Classes):** Đánh giá các lỗ hổng về phân quyền (AuthZ/IDOR), thiếu xác thực dữ liệu rỗng (Null/Empty), nuốt lỗi (Error collapsing), hoặc logic bất đồng bộ (Async idempotency).
- Kỹ năng này không sinh ra tài liệu kiến trúc (Architecture Docs) thông thường, mà nó là một dạng "Kiểm toán viên trước giờ G" để đảm bảo không làm sập các hệ thống khác (nhất là trong môi trường Microservices hoặc nhiều repo liên kết).

## Các Skill liên quan
- Sử dụng các công cụ mạnh mẽ như `CodeGraph` để truy vết Caller/Callee xuyên suốt các Repository.
- Bổ trợ cực tốt cho chu trình `/review` và `/test` ở cuối vòng đời.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/business-impact-review

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

