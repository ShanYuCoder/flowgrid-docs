# Kỹ năng: `/docs-mark`

## Tên
`docs-mark` (thay thế cho skill cũ `/platform-mark`)

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/docs-mark`.
- Chạy sau quá trình Grill (phân tích) để đánh dấu (mark) lại các quyết định kỹ thuật đã được chốt (confirm).

## Input (Dữ liệu đầu vào)
- Thông số kỹ thuật từ `ir/spec.yaml`.
- Các registries thuộc tầng giao diện UI (`.flowgrid/registries/design.registry.json`) hoặc tầng logic (`.flowgrid/registries/common.registry.json`) tại Workspace SSOT.
- Quyết định (confirm) của member sau khi chạy các grill (vd: chọn option A, B, C).

## Output (Kết quả mong đợi)
- Cập nhật (Upsert) registry: Ghi nhận các tag và đánh dấu (marks) chính xác vào file registry.
- Đánh dấu trên Docs Hub: Lưu các dấu vết kỹ thuật (SSOT) vào `surfaces/common/integrations/*` hoặc `surfaces/common/data-model/derived-data.md`.
- Kích hoạt ArtifactGraph: Gọi các lệnh như `artifactgraph_remember` hoặc `artifactgraph_allowlist_check` (nếu tools khả dụng) để lưu kiến thức vào bộ nhớ chung.
- Bàn giao (Handoff): Đẩy các phần validate chuyên sâu sang cho bộ code FE (`flowgrid gen:dry`). Không tự thay thế lệnh shell nếu thiếu tool.

## Description / Ý nghĩa
- Thuộc cụm Agent Common. Là chốt chặn đánh dấu các quyết định thiết kế kỹ thuật, mẫu thiết kế (common patterns) và các thành phần UI dùng chung.
- Khi một tính năng cần tạo mới Component UI (`#needs-ui:`) hoặc Logic dùng chung (`#needs-common:`), kỹ năng này giúp ghi sổ (register) chúng lại để đội Frontend/Platform biết và thực thi.
- Không tự động đánh tag nếu chưa hỏi và chốt với member.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/docs-mark

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

