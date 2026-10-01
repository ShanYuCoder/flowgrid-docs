# Kỹ năng: `/configure-repo-maps`

## Tên
`configure-repo-maps`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/configure-repo-maps`.
- Nhập kèm yêu cầu bằng ngôn ngữ tự nhiên (NL) chỉ định các đường dẫn (paths) tới thư mục repo trên máy tính (ví dụ: `docs = base-docs ở ~/ws/base-docs, portal admin ở ~/ws/portal`).

## Input (Dữ liệu đầu vào)
- Mô tả bằng ngôn ngữ tự nhiên của member về vị trí checkout các repo thuộc hệ thống (Platform) hoặc hệ thống cũ (Legacy).
- File cấu hình map hiện tại: `platform-repos.local.json` hoặc `legacy-repos.local.json`.

## Output (Kết quả mong đợi)
- **Cập nhật Map:** Ghi các đường dẫn (được chuẩn hóa sang dạng tuyệt đối absolute path) vào file `platform-repos.local.json` (cho platform/hub hiện tại) hoặc `legacy-repos.local.json` (cho repo legacy).
- **Không xâm lấn:** Tuyệt đối không gọi `git clone`/`git fetch` hay kết nối remote để tải code.
- **Bảo toàn Portable:** Không sửa các file dùng chung `platform-repos.json` / `legacy-repos.json` (chỉ ghi vào bản `.local.json`).
- Hướng dẫn member chạy lệnh `platform-dna codegraph:wire` hoặc `codegraph init` ở các repo chưa có cấu hình.

## Description / Ý nghĩa
- Đóng vai trò là cầu nối giúp hệ thống FlowGrid (thông qua Platform DNA) biết được mã nguồn của các module/repo thành phần đang nằm ở đâu trên máy tính (Local Workspace) của lập trình viên.
- Rất cần thiết khi bắt đầu thiết lập môi trường (setup environment) để các Agent có thể thực hiện nhảy cross-repo (đọc file từ Docs Hub sang FE/BE và ngược lại) một cách chính xác.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/configure-repo-maps

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

