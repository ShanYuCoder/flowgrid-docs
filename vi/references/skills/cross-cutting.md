# Skill: `/cross-cutting`

## Tên
`cross-cutting`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/cross-cutting`

## Input (Dữ liệu đầu vào)
- Khai báo các quyết định kiến trúc thuộc nhóm "Cross-cutting concerns" (Mối quan tâm cắt ngang hệ thống), chẳng hạn như: Security, Logging, Observability, Caching, Messaging, Configuration, Exception handling, Validation, Localization, Authorization.

## Output (Kết quả mong đợi)
- Sinh ra các file tài liệu Markdown lưu tại `architecture/08-cross-cutting/[Topic].md`.
- Yêu cầu cấu trúc nội dung phải có:
  - Mục đích (Intent).
  - Người chịu trách nhiệm (Owner) hoặc đánh dấu TBD (Chưa quyết định).
  - Hướng tiếp cận sơ bộ (Approach stub).

## Description / Ý nghĩa
- Dành riêng cho việc ghi chép các quy chuẩn kiến trúc mức Doanh nghiệp (Enterprise concerns) dựa trên bộ khung arc42 (phần 8).
- Nhằm đảm bảo toàn bộ hệ thống đều tuân thủ một chuẩn mực chung về những cơ chế nền tảng. Ví dụ: Tất cả các Microservices đều phải dùng chung một kiểu định dạng Log, hoặc chung một cơ chế Xác thực (Auth).
- **CẤM ĐOÁN TỐI KỴ:**
  - Cấm ghi rườm rà lan man bằng văn phong của AI (No AI waffle).
  - Cấm nhét cấu hình OpenAPI, UI DSL hay kịch bản test E2E vào đây.
  - Cấm vẽ lại luồng hành trình người dùng (Business journeys). Nhắc lại: Kể chuyện hành trình là nhiệm vụ của `/journey`.

## Các Skill liên quan
- Kích hoạt bởi lệnh gốc `/architecture`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/cross-cutting

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

