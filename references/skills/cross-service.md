# Skill: `/cross-service`

## Tên
`cross-service`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/cross-service`
- Dùng kèm cờ khảo cổ mã nguồn cũ: `/legacy /cross-service`

## Input (Dữ liệu đầu vào)
- Đọc các yêu cầu về nghiệp vụ cần sự giao tiếp chéo giữa nhiều Service độc lập hoặc các hệ thống bên ngoài (Integrations).
- Nếu có `/legacy`: Khảo cổ file `legacy-repos.local.json` để mò lại luồng giao tiếp cũ.

## Output (Kết quả mong đợi)
- Sinh ra file tài liệu Markdown lưu tại cấu trúc `<LCA>/common/cross-service.md`.
- File tài liệu này sử dụng sơ đồ tuần tự (Sequence Diagram) của Mermaid để biểu diễn luồng dữ liệu (Sync/Async RPC, Event-driven, Messages).

## Description / Ý nghĩa
- Kỹ năng chuyên biệt để thiết kế **Mô hình Giao tiếp Chéo Dịch vụ (Inter-service / Inter-system integrations)**.
- Tập trung làm rõ:
  - Hợp đồng tích hợp (Integration Contracts).
  - Chiều giao tiếp dữ liệu (Direction).
  - Quyền sở hữu (Ownership) của từng phần dữ liệu.
  - Các bước chuyển giao (Handoff) giữa các service với nhau.
  - Các cơ chế phức tạp như: Thử lại (Retries), Chống trùng lặp (Idempotency).

## Các Skill liên quan
- **Sự khác biệt với các skill khác:**
  - Không dùng để vẽ các luồng code nội bộ (Internal code paths) bên trong 1 service.
  - Không dùng để vẽ các luồng hành động của người dùng trên 1 màn hình UI (Việc đó là của `/user-flow`).
  - Không dùng để kể chuyện (Narratives) mô tả toàn bộ hành trình trải nghiệm người dùng (Việc đó là của `/journey`).

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/cross-service

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

