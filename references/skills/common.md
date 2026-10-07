# Skill: `/common`

## Tên
`common`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/common`
- Yêu cầu người dùng (Member) bắt buộc phải chỉ định rõ **Nhóm sử dụng (Consumers)** là ai. VD: Dùng chung cho toàn hệ thống (`surfaces/common`), dùng chung cho 1 Surface (`surfaces/<Surface>/common`), dùng chung cho 1 Module (`surfaces/<Surface>/<CMP-ID>/common`), hoặc dùng chung cho 1 cụm màn hình nhỏ (`surfaces/<Surface>/<CMP-ID>/<NN>/common`).

## Input (Dữ liệu đầu vào)
- Phạm vi dùng chung (Scope) do Member khai báo.
- Các quy tắc về trải nghiệm người dùng (UX/UI rules) hoặc quy tắc nghiệp vụ (Business rules) lặp đi lặp lại.

## Output (Kết quả mong đợi)
- Sinh ra file tài liệu định dạng Markdown (`.md`) lưu tại thư mục `common/patterns/` của cấp độ bao trùm thấp nhất (Lowest Common Ancestor - LCA).

## Description / Ý nghĩa
- Dùng để thiết kế các **Quy tắc dùng chung bằng Markdown** dành cho Con người (Business, QA, Dev) đọc và tham chiếu.
- **Quy tắc LCA (Lowest Common Ancestor):** Không được lạm dụng thư mục gốc `surfaces/common` như một "Thùng rác". Kỹ năng này sẽ tính toán xem quy tắc này được xài chung bởi những tính năng nào, từ đó chọn ra một thư mục `common` ở cấp độ sâu nhất có thể bao bọc trọn vẹn được chúng. (Nếu chỉ có 1 chức năng xài, thì cấm tạo `common/`).
- Nội dung file viết bằng ngôn ngữ tự nhiên, phi kỹ thuật (Non-technical language). Không sa đà vào code. VD: "Dialog xác nhận xoá phải luôn làm mờ nền đen đằng sau (block background)".

## Chú ý quan trọng
- **Tuyệt đối cấm:** `/common` chỉ viết Markdown (`patterns/`). Không viết `common/yaml`. `/common-spec` và `/gen-common` đã deprecated.
- Code `CMN-*` chỉ xuất hiện sau khi member duyệt plan adopt: [adopt-common](../../workflows/adopt-common.md). Template codegen mới đi [custom-base](../../workflows/custom-base.md).

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

Chỉ khi **không** fit command cụ thể (shared component, review architecture).

```text
@framework-rules skill

Task: {thêm testId cho FormField suffix pattern mới}
Scope: components/molecules/MoFormField.vue only
Không đọc reference.md trừ khi cần template code đầy đủ
```

---
