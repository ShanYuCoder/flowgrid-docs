# Skill: `/deployment`

## Tên
`deployment`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/deployment`

## Input (Dữ liệu đầu vào)
- Thông tin cơ bản về môi trường triển khai mong muốn.

## Output (Kết quả mong đợi)
- Sinh ra file tài liệu triển khai lưu tại `architecture/deployment/` (hoặc cấu trúc tương đương), bắt đầu bằng tiền tố `DEP-*` (Ví dụ: `DEP-production`).
- Mặc định chỉ sinh ra một file khung (stub) ngắn gọn dựa theo mẫu `tpl-deployment.md`.

## Description / Ý nghĩa
- Dành riêng cho việc ghi chép sơ đồ triển khai hạ tầng vật lý hoặc Cloud (Deployment Topology).
- **Lệnh CẤM ĐOÁN CHẶT CHẼ:**
  - Nếu người dùng KHÔNG yêu cầu rõ ràng việc phải vẽ sơ đồ mạng/hạ tầng chi tiết, Agent **BẮT BUỘC TỪ CHỐI** việc tự tưởng tượng ra sơ đồ Prod/Staging (Multi-region topology from imagination) và chỉ ghi một đoạn stub siêu ngắn.
  - Cấm ghi chép các mẹo vặt cài đặt máy ảo Local IDE/WSL cá nhân vào tài liệu Hub chung này.
  - Tuyệt đối không được nhầm lẫn giữa sơ đồ mạng hạ tầng triển khai với sơ đồ hành trình người dùng (`/journey`).
  - Không được đưa mã nguồn bảo mật (Secrets, Passwords) vào file Markdown này.
- Khi được phép vẽ, sơ đồ ưu tiên dùng chuẩn **C4 Model** (Mermaid).

## Các Skill liên quan
- Kích hoạt bởi lệnh gốc `/architecture`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/deployment

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

