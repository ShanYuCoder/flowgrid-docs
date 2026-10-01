# Skill: `/update-spec`

## Tên
`update-spec`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/update-spec <bundle-id>`
- Dùng để vá/cập nhật nhỏ (delta update) trên một Spec đã tồn tại, thay vì viết mới toàn bộ.

## Input (Dữ liệu đầu vào)
- `ir/design.yaml` (nếu liên quan tới giao diện, tech).
- `ir/spec.yaml` (nếu liên quan tới nội dung chữ / acceptance).
- File bundle gốc `*.bundle.yaml`.

## Output (Kết quả mong đợi)
- File `*.bundle.yaml` được patch (sửa đổi) cục bộ.
- Gắn thêm tag `#update:*` và tăng `specRevision`.
- Đổi trạng thái `featureStatus` từ `wire` sang `need-update` nếu cần.
- Chạy `flowgrid split` và kiểm tra tính toàn vẹn thành công.

## Description / Ý nghĩa
- Cập nhật **cục bộ (Delta Update)**: Dùng khi có thay đổi nhỏ (một kịch bản, 1 khối UI, 1 trường API) trên hệ thống hiện hành. Không dùng để viết lại toàn bộ từ đầu (full rewrite).
- Bảo toàn dữ liệu: Nghiêm cấm xóa các dấu vết legacy (legacy evidence) hay các khối dữ liệu không liên quan trong lúc cập nhật.
- Bảo toàn Ma trận lỗi: Khi sửa action hoặc endpoint, bắt buộc phải giữ và cập nhật ma trận xử lý lỗi UI (`onSuccess`, `onCommonError`, `onSpecificError`) và API Hashtags (`#err:*`).
- Không tự ý thêm nhãn `codegen` hoặc `gen:` mà không có sự xác nhận của Dev (phải chuyển giao sang `/grill-dev`).

## Các Skill liên quan
- **Trước đó:** Nhận feedback/issue cần thay đổi nhỏ (từ `qa-resolve` hoặc thay đổi requirement mới).
- **Sau đó:** Tuỳ thuộc vào thành phần cập nhật, có thể phải gọi `/grill-bqa` (nếu sửa UX/copy) hoặc `/grill-dev` (nếu sửa tech/API), rồi mới tới `/prototype`.

## Chú ý quan trọng
- **Luật AskQuestion Tech Debt:** Nếu thông tin cập nhật bị hổng (gap), phải dùng AskQuestion Form. Bắt buộc có option `"Log as Tech Debt"`. Nếu user chọn, ghi nợ vào `qa/` (`qa-inbox.md`), tuyệt đối không tự chế (invent) business data.
- Không đọc và viết vào thẳng các file `*.md` hay sửa trực tiếp thư mục `ir/`. Phải sửa `bundle.yaml` rồi split.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/update-spec

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

