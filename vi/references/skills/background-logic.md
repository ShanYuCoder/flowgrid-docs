# Skill: `/background-logic`

## Tên
`background-logic` (Xử lý Background Logic)

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/background-logic <Mã-FLOW hoặc Tên-Chức-Năng>`
- *Ví dụ:* 
  - `/background-logic FLOW-AUTO-MESSAGE-BOOKING`
  - `/background-logic "Thêm job tự động gửi Zalo cho booking"`

## Input (Dữ liệu đầu vào)
- Mã quy trình `FLOW-*` đã có hoặc tên màn hình liên quan.
- Thông tin về tác vụ ngầm:
  * Sự kiện kích hoạt (Trigger): Sau khi bấm Lưu ở màn hình nào, hoặc chạy theo chu kỳ Cron?
  * Logic so khớp (Matching logic): So sánh trường dữ liệu nào với điều kiện gì?
  * Hành vi của Job: Gửi tin nhắn Zalo/SMS, đồng bộ đối tác ERP, tạo file báo cáo, gửi email?
  * Hạ tầng khái quát: Dữ liệu ghi log vào table nào, đẩy file lên S3 bucket nào?
  * Chính sách sự cố: Số lần thử lại (Retry Policy) và cơ chế chống gửi trùng lặp (Idempotency).

## Output (Kết quả mong đợi)
- Cập nhật đồng bộ vào file `FLOW-*.md` tương ứng:
  1. Thêm **System Story** vào phần User Stories (`## 2. Chuỗi User Stories Đa Tầng`).
  2. Bổ sung các quy tắc xử lý ngầm (Idempotency, Retry Policy) và ma trận trạng thái ngầm (`## 3. Quy tắc Nghiệp vụ`).
  3. Đặc tả chi tiết chặng xử lý ngầm và kịch bản phục hồi lỗi/thử lại (`## 4. Đặc tả Chi tiết Hành trình Từng Chặng`).
  4. Cập nhật bảng đối chiếu Traceability (`## 5. Ma trận Đối chiếu`).
  5. Chèn hoặc cập nhật phân đoạn `rect rgb(...)` (Background Job) trong sơ đồ Mermaid `sequenceDiagram`.

## Description / Ý nghĩa
- Kỹ năng chuyên trách quản lý, kiểm tra, bổ sung và cập nhật các tác vụ xử lý ngầm (Async Jobs, Workers, Event Triggers, Notification Dispatchers).
- **Lợi ích cốt lõi:**
  - Tách bạch giữa phần Giao diện (Screens UI) và phần Tự động hóa ngầm (Automation).
  - Giúp bổ sung hoặc chỉnh sửa các tính năng tự động (như gửi tin nhắn, quét timeout, đồng bộ hệ thống) vào một flow đã có sẵn mà **không làm xáo trộn** cấu trúc màn hình đã chốt với khách hàng.
  - Đảm bảo đầy đủ cả câu chuyện nghiệp vụ (**System Story**) lẫn sơ đồ trực quan (**Sequence Diagram**).

## Các Skill liên quan
- Kết hợp với `/user-flow` và `/grill`.
- Kết nối tới `architecture/03-user-flows/` nếu cần đào sâu vào kiến trúc kỹ thuật của Worker.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/background-logic

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

