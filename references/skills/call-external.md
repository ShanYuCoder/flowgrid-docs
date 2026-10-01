# Skill: `/call-external`

## Tên
`call-external` (Đồng thời là Hashtag `#call-external`)

## Cách dùng (Command/Trigger)
- KHÔNG gọi độc lập qua slash command, mà là một thẻ đánh dấu (Hashtag) lồng ghép bên trong các bước `/api-spec`, `/grill-api-spec` và sinh code `/api`.
- Nếu Member gõ `/call-external <API ID>`, Agent sẽ tìm đúng file API đó và gắn thẻ này vào.

## Input (Dữ liệu đầu vào)
- ID của Function hoặc đường dẫn API Endpoint (Ví dụ: `API-AUTH-001`, `stripe/charge`).

## Output (Kết quả mong đợi)
- Tìm đến đúng file cấu hình kỹ thuật `api/<seq>/01-backend-spec.yaml` (hoặc `common/yaml`).
- Bổ sung định nghĩa vào mảng `externalCalls` và gắn thêm hashtag `#call-external` vào trong file YAML.

## Description / Ý nghĩa
- Dành riêng cho việc đánh dấu các API có thực hiện **Gọi ra bên ngoài hệ thống (Third-party integrations)**.
- Ví dụ: API Thanh toán có gọi sang Cổng Stripe, hoặc API Gửi Email có gọi sang SendGrid. Hành động này tiềm ẩn rủi ro về Network Timeout, Lỗi kết nối, do đó bắt buộc phải cắm cờ `#call-external`.
- hệ thống bộ code Backend khi nhìn thấy cờ này sẽ tự động sinh code bổ sung thêm các cơ chế chịu lỗi (Fault tolerance) như Retry, Timeout, Circuit Breaker.

## Chú ý quan trọng
- **Tuyệt đối cấm:** Kỹ năng này chỉ được phép ghi thêm tag vào file `01-backend-spec.yaml`. Không được quyền can thiệp vào file `ir/design.yaml`, và tuyệt đối không xuất ra các file Markdown report giả mạo.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/call-external

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

