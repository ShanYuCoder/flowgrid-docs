# Skill: `/grill-bqa`

## Tên
`grill-bqa`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/grill-bqa <page-id/slug>`
- Tự động trigger sau khi kỹ năng `/spec` hoàn thành hoặc chuyển giao từ `/grill`.

## Input (Dữ liệu đầu vào)
- File `*.bundle.yaml` chứa thiết kế UI và logic.
- File trung gian `ir/design.yaml` và `ir/spec.yaml` sinh ra từ bundle.
- Yêu cầu User Prompt ban đầu (nếu có bổ sung).

## Output (Kết quả mong đợi)
- Các file `*.bundle.yaml` được làm sạch, bổ sung và chuẩn hóa về mặt Business và UI.
- File QA Tech Debt (`qa/<SHORT>_NNNN.yaml`) nếu có thông tin chưa chốt.
- Trạng thái `grillStatus.bqaFacts: done` và `grillStatus.bqaOpen: done`.

## Description / Ý nghĩa
- Chuyên dùng để Review và Validate đặc tả (Spec) từ góc nhìn của Business Analyst (BA) / QA UI. Không soi các thẻ kỹ thuật (`#gen`, `codegen.profile`).
- **Audit interlock:** `flowgrid audit spec <bundle> --type <pageType>` trước Step A, sau mỗi patch, và trước handoff `/grill-dev` (xử lý `gaps[]` / `confirms[]` — [grill-and-human-review.md](../../workflows/grill-and-human-review.md)).
- Kiểm tra tính hợp lý của UX/UI: So sánh layout, copy, purpose với các template UI chung. Đảm bảo mô tả theo ngôn ngữ Stakeholder.
- Bắt buộc kiểm định: UI Error Handling — **4-tier outcomes** trên mỗi action (`onSuccess`, `onBusinessErrors`, `onSecurityErrors`, `onSystemErrors` — xem harness `grill-bqa` SKILL).
- Quá trình xử lý diễn ra qua 2 bước:
  - **Step A:** Fact-lock (Khóa logic chuẩn hóa dữ liệu cũ, không được dùng Wizard hỏi ở bước này).
  - **Step B:** Member Wizard (Tung form AskQuestion cho các khoảng trống thông tin).

## Các Skill liên quan
- **Trước đó:** Nhận đầu vào từ `/spec` hoặc `/grill`.
- **Sau đó:** Chuyển giao sang `/grill-dev` để soi chiếu góc nhìn lập trình viên (Codegen/Tech).

## Chú ý quan trọng
- **Luật AskQuestion Tech Debt:** Trong Step B (Member Wizard), các lựa chọn đưa ra hỏi phải bao gồm option `"Log as Tech Debt"`. Nếu user chọn option này, hệ thống sẽ đẩy thẳng vướng mắc vào file QA Inbox (`qa-inbox.md`) thay vì đoán mò.
- Không đọc các file Markdown được render (`*.md`), chỉ đọc `ir/design.yaml` và Bundle gốc.
- Nếu chưa chạy xong `bqaFacts: done` thì tuyệt đối không được mở Step B (Wizard).

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/grill-bqa

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

