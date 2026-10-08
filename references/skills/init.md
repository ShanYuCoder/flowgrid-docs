# Kỹ năng: `/init`

## Tên
`init`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/init`.
- Chạy sau khi vừa chạy `flowgrid setup [workspace]`.
- Dùng cho cả dự án mới (**Greenfield**), dự án tiếp tục duy trì (**Maintain**) lẫn đập đi làm lại (**Rebase**).

## Input (Dữ liệu đầu vào)
- Mã nguồn trong workspace (thư mục `source-code/` hoặc `source-legacy/`).
- Cấu hình `.flowgrid/config.json`.

## Output (Kết quả mong đợi)
1. **Lập bản đồ Surfaces & Repos:** Nhận diện các repo mã nguồn, phân bổ vào các `surfaces` logic (ví dụ `admin`, `portal`, `api`) và ghi vào `.flowgrid/config.json` cùng `platform-repos.local.json`.
2. **Khảo cổ kiến trúc sâu đa tầng (Multi-Layer Deep Scan):**
   - **Frontend Layer:** Quét cây view/page, layout shell (header/sidebar/breadcrumb), UI kit/design system (bảng, phân trang, form, modal xác nhận xóa...).
   - **Backend Layer:** Quét router, controller, middleware/auth guard, lớp abstraction (BaseService, BaseRepository), chuẩn hóa envelope phân trang và xử lý lỗi tập trung.
3. **Cơ chế đối chiếu thông minh (Code-First Common Reconciliation):**
   - **Ưu tiên code hiện hữu (Code-First):** Nhận diện các common đã có trong dự án (ví dụ Breadcrumb, Delete Flow, BaseService của dự án như WebBeds), lưu vào SSOT docs (`<LCA>/common/patterns/<id>.md`) dựa trên code thực tế, tuyệt đối **không ghi đè** bằng template chung của tool.
   - **Khắc phục trùng lặp & Khoảng trống:** Phân tách duplicate candidates (cần refactor vào `shared/`) và gaps đề xuất. Cung cấp lệnh độc lập `flowgrid add base-common` để nạp catalog mẫu khi cần.
4. **Bóc tách kiến trúc Arc42 đưa vào `architecture/`:**
   - `01-introduction/`: Tổng quan hệ thống và các điểm nóng kỹ thuật (*Hotspots*).
   - `04-solution-strategy/`: Sơ đồ luồng dữ liệu Mermaid `graph TB`.
   - `model/data-models.md`: Sơ đồ thực thể ERD Mermaid `erDiagram`.
   - `03-user-flows/`: Bóc tách các luồng nghiệp vụ phức tạp đa tầng A/B/C.
   - `08-cross-cutting/`: Xác thực, bảo mật, tích hợp bên thứ ba.
5. Sinh file danh mục `inition-inventory.md` tại root workspace và đề xuất **Golden Sample** huấn luyện template chuẩn qua `build-template-code`.

## Description / Ý nghĩa
- `/init` là bước khởi đầu bắt buộc của Agent AI ngay sau khi dựng workspace. 
- Giúp Agent "hiểu" toàn bộ không gian dự án, biết repo nào đóng vai trò gì, phục vụ surface nào, thiết lập cầu nối liên kết, ưu tiên tuyệt đối mã nguồn hiện hữu của dự án, và chủ động ngăn chặn sao chép code thừa (Anti-Copy-Paste Guard) ngay từ vạch xuất phát.

---

## Example prompt (mẫu gọi)

```text
/init

Hãy quét không gian workspace hiện tại, nhận diện các repository trong source-code/ và giúp tôi lập bản đồ surfaces cho hệ thống.
```
