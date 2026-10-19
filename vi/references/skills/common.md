# Skill: `/common`

## Tên
`common`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/common <CMN-ID>`
- Có thể được kích hoạt tự động hàng loạt ngay sau `/init` qua giao diện hỏi tương tác GUI modal (`AskQuestion`).
- Yêu cầu người dùng (Member) bắt buộc phải chỉ định rõ **Nhóm sử dụng (Consumers)** là ai. VD: Dùng chung cho toàn hệ thống (`surfaces/common`), dùng chung cho 1 Surface (`surfaces/<Surface>/common`), hoặc dùng chung cho 1 Module (`surfaces/<Surface>/<module>/common`).

## Input (Dữ liệu đầu vào)
- Phạm vi dùng chung (Scope) do Member khai báo.
- Các quy tắc về trải nghiệm người dùng (UX/UI rules) hoặc quy tắc nghiệp vụ (Business rules) lặp đi lặp lại.

## Output (Kết quả mong đợi)
- Sinh ra file tài liệu định dạng Markdown (`.md`) lưu tại thư mục `common/*.md` của cấp độ bao trùm thấp nhất (Lowest Common Ancestor - LCA). Thư mục `common/` phẳng 1 cấp, không chứa thư mục con `patterns/`, `yaml/`, `code/`.

## Description / Ý nghĩa
- Dùng để thiết kế các **Quy tắc dùng chung bằng Markdown** dành cho Con người (Business, QA, Dev) đọc và tham chiếu.
- **Quy tắc LCA (Lowest Common Ancestor):** Không được lạm dụng thư mục gốc `surfaces/common` như một "Thùng rác". Kỹ năng này sẽ tính toán xem quy tắc này được xài chung bởi những tính năng nào, từ đó chọn ra một thư mục `common` ở cấp độ sâu nhất có thể bao bọc trọn vẹn được chúng. (Nếu chỉ có 1 chức năng xài, thì cấm tạo `common/`).
- Nội dung file viết bằng ngôn ngữ tự nhiên, phi kỹ thuật (Non-technical language). Không sa đà vào code. VD: "Dialog xác nhận xoá phải luôn làm mờ nền đen đằng sau (block background)".
- **Tiêu chuẩn 4 Lớp Chất Lượng cho Đặc tả Common (Cung cấp dữ liệu chuẩn cho DSL):**
  1. **Contract Invariants (Bất biến hợp đồng):** Khai báo chặt chẽ kiểu dữ liệu của Props, giá trị mặc định, ràng buộc kiểm tra hợp lệ, và kiểu payload của event emit.
  2. **4 Trạng thái chuẩn (4 Canonical States):** Luôn quy định rõ UX/UI cho `Loading` (skeleton/shimmer), `Empty` (màn hình trống có nút kêu gọi hành động), `Error` (banner lỗi có nút thử lại), và `Success / Active` (hiển thị dữ liệu).
  3. **Độc lập phụ thuộc (IoC & Slots):** Tuyệt đối không gắn cứng URL API hay nghiệp vụ miền cụ thể; toàn bộ dữ liệu động truyền qua props/slots/composables.
  4. **Golden Test Seam:** Định nghĩa kịch bản kiểm thử component/service mẫu để xác minh các giá trị biên của props và 4 trạng thái chuẩn.

## Chú ý quan trọng
- **Tuyệt đối cấm:** `/common` chỉ viết Markdown (`common/*.md` User Stories & Rules) trực tiếp dưới thư mục `common/` phẳng 1 cấp (không tạo thư mục con `patterns/`, `yaml/`, `code/`). **TUYỆT ĐỐI KHÔNG VIẾT FILE YAML CHO COMMON**, không phân tách IR. Do các thành phần common đã được code sẵn trong base (`shared/`), việc tạo YAML là hoàn toàn thừa thãi và sai chuẩn.
- **Phân biệt rõ 2 trường hợp thực thi:**
  - *Với Existing Common (Đã có sẵn code trong base/shared):* Chỉ sinh duy nhất file `.md` User Stories để chuẩn hóa tài liệu SSOT, **tuyệt đối không gen lại code**.
  - *Với Duplicate Candidate (Mã trùng lặp, chưa có component chung):* Lên plan ➔ Member bấm Approve/Proceed ➔ Tự động sinh file `.md` User Stories + **gen code 1 bản chuẩn hoá vào `shared/`** + đăng ký registry.
- **Chỉ tạo mới cho tương lai — KHÔNG sửa code legacy:** Common mới chuẩn bị sẵn cho các tính năng tiếp theo để tránh copy duplicate lần thứ 3. Tuyệt đối KHÔNG tự ý sửa code cũ trong `source-legacy/` (luôn READ-ONLY) để tránh mọi rủi ro degrade/regression cho hệ thống cũ.

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
