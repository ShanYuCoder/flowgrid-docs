# Skill: `/cross-entity-service`

## Tên
`cross-entity-service` (Đồng thời là Hashtag `#cross-entity-service`)

## Cách dùng (Command/Trigger)
- Thường KHÔNG gọi độc lập qua slash command, mà đây là một thẻ đánh dấu (Hashtag) được sử dụng lồng ghép bên trong các bước `/api-spec`, `/grill-api-spec` và sinh code `/api`.
- Nếu Member gõ `/cross-entity-service <API ID>`, Agent sẽ tìm đúng file API đó và gắn thẻ này vào.

## Input (Dữ liệu đầu vào)
- ID của Function hoặc đường dẫn API Endpoint (Ví dụ: `API-WORKFORCE-001`).

## Output (Kết quả mong đợi)
- Tìm đến đúng file cấu hình kỹ thuật `api/<seq>/01-backend-spec.yaml` hoặc `common/yaml/01-backend-spec.yaml`.
- Bổ sung mảng `services[]` và gắn thêm hashtag `#cross-entity-service` vào trong file YAML.

## Description / Ý nghĩa
- Dành riêng cho việc điều phối luồng dữ liệu liên quan đến nhiều thực thể (Cross-aggregate orchestration). 
- Ví dụ: API Tạo Đơn hàng không chỉ đụng tới bảng `Order` mà còn phải gọi sang bảng `Inventory` (kiểm tra tồn kho), gọi sang `User` (lấy điểm thưởng). Hành động vượt biên giới thực thể này bắt buộc phải được đánh dấu bằng cờ `#cross-entity-service`.
- bộ code của Backend khi nhìn thấy cờ này sẽ tự động sinh code theo mô hình khác (Ví dụ: tách logic ra Service Layer thay vì nhét chung vào Controller hay Repository đơn lẻ).

## Chú ý quan trọng
- **Tuyệt đối cấm:** Kỹ năng này chỉ được phép ghi thêm tag vào file `01-backend-spec.yaml`. Không được quyền can thiệp vào file giao diện Frontend `ir/design.yaml`, và tuyệt đối không xuất ra các file Markdown report giả mạo.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/cross-entity-service

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

