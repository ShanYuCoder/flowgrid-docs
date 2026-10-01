# Skill: `/decision`

## Tên
`decision`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/decision`

## Input (Dữ liệu đầu vào)
- Quyết định kiến trúc hệ thống (Architecture Decision) cần được ghi nhận. 
- Mối liên kết với các Module (`CMP-*`), Thành phần (`CTR-*`) hoặc Luồng nghiệp vụ (`FLOW-*`) liên quan.

## Output (Kết quả mong đợi)
- Sinh ra file tài liệu Quyết định Kiến trúc (Architecture Decision Record - ADR).
- Vị trí lưu: `architecture/09-decisions/ADR-{NNN}-{slug}.md`. (Kèm theo cập nhật bảng mục lục Index table).
- Sử dụng mẫu `.cursor/extracts/tpl-adr.md`.

## Description / Ý nghĩa
- Dành riêng cho việc ghi nhận các Quyết định Kiến trúc (ADRs) dựa trên chuẩn arc42 phần 9.
- Giúp lưu lại lý do tại sao đội ngũ lại chọn giải pháp công nghệ này thay vì giải pháp khác (Ví dụ: Tại sao chọn Kafka thay vì RabbitMQ).
- **Tuyệt đối cấm:**
  - Không được lưu ngược ADR về thư mục `shared/adr` cũ (chỉ để lại file chuyển hướng stub).
  - Không được di chuyển các file `api-catalog` hay `data-model` vào phần số 9 này.
  - Các tài liệu hướng dẫn quy trình nội bộ (Platform process howto) phải nằm ở `platform/`, không được nhét vào `/decision`.

## Các Skill liên quan
- Kích hoạt bởi lệnh gốc `/architecture`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/decision

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

