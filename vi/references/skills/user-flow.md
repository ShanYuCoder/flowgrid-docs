# Skill: `/user-flow`

**SSOT:** `harness/docs/skills/user-flow/SKILL.md`

Kỹ năng dùng để thiết kế luồng người dùng chi tiết, đóng vai trò bản đồ chỉ đường xuyên suốt cho các màn hình (W-*) và API (API-*).

- Author `FLOW-*.md` under `architecture/03-user-flows/` or `**/common/user-flows/`.
- Convention ID: `FLOW-{SURF}-{DOMAIN}-{NN}` (Ví dụ: `FLOW-ADM-AUTH-01`). Tuyệt đối không dùng `FLOW-{slug}` hay các định dạng khác.
- Audit: `flowgrid audit flow <path>`.

## Các nhóm User Flow cốt lõi
1. **Hành trình đa bước (Multi-step Journey)**: Checkout, wizard đăng ký.
2. **State machine (Chuyển trạng thái)**: Trạng thái đơn hàng, luồng duyệt văn bản.
3. **Phân nhánh Role (Role branching)**: Luồng cho Admin vs Customer.
4. **Async/Webhooks**: Payment callbacks, xử lý nền.
5. **Dialog Sub-flows**: Các luồng con trong modal/drawer liên quan nhiều màn hình.

---

## Kiến trúc Phân tách Tầng vs Sai lầm Spec Nguyên Khối (Monolithic Spec)
- **Sai lầm của Spec Nguyên Khối (Monolithic Spec):** Nhồi nhét 3–5 màn hình, form, bảng, API vào chung 1 file spec. Kết quả là **User Flow bị nhạt nhòa**, AI agent bị tràn ngữ cảnh (context saturation), bỏ quên hoàn toàn các kịch bản chuyển giao dữ liệu, lỗi bất đồng bộ và ranh giới phân quyền giữa các màn hình.
- **Mô hình Phân tách của FlowGrid:**
  - **Tầng Vĩ mô (`FLOW-*.md`):** Bản đồ chỉ đường toàn cảnh kết nối Actors, Màn hình (`W-*`), API (`API-*`), Luật nghiệp vụ (`BR-*`), và Worker bất đồng bộ.
  - **Tầng Vi mô (`W-*.bundle.yaml`):** Tập trung sắc bén vào **duy nhất 1 màn hình**: layout, validation form, bảng cột và các trạng thái nội tại của màn hình đó (`interactionCases` L2).

---

## 5 Điểm Mù Ngóc Ngách Bắt Buộc Săn Lùng (5 Corner-Case Blindspots)
1. **Mất trạng thái khi Back/F5/Deep-link:** Quy định rõ phương thức lưu vết (`URL params`, `sessionStorage`, hay `Server Draft ID`).
2. **Tranh chấp ghi & Sửa đè (Race Condition / Concurrent Mutation):** Định nghĩa khoá Optimistic Locking (`version`/`updated_at`), Idempotency Key, và UX xử lý `409 Conflict`.
3. **Đứt gãy thông báo đa vai trò (Cross-Surface Handoff):** Xây dựng hàng đợi Worklist trên Surface B để không bị sót việc khi kênh email/push gặp sự cố.
4. **Lỗi nửa chừng & Hoàn tác Saga (Partial Failure Rollback):** Luôn vẽ nhánh `alt/else` cho cơ chế hoàn tiền, mở khoá tồn kho khi bước tiếp theo thất bại.
5. **Lệch kiểu dữ liệu khi chuyển trang (Data Handoff Schema Drift):** Bảng kiểm tra 1:1 tương thích schema giữa Output màn hình trước và Input màn hình sau.

---

## Giao thức Phân tích Sâu Cross-Flow (3 Cấp độ)
- **Tier A (Cross-Surface):** Hành trình chuyển giao trách nhiệm giữa $\ge 2$ bề mặt hoặc tác nhân độc lập (Customer Web ➔ Admin Portal ➔ Worker nền). Bắt buộc kiểm tra tương thích dữ liệu đầu ra/vào (Data Handoff Audit), khoá chống lặp (Idempotency Key), và cơ chế đền bù/hoàn tác (Rollback / Saga).
- **Tier B (Surface-Shared):** Các luồng dùng chung giữa nhiều module trong cùng 1 surface (Xóa an toàn có kiểm tra phụ thuộc, xuất file Excel dung lượng lớn).
- **Tier C (Module-Scope):** Luồng cục bộ trong 1 cụm component (Wizard tạo mới 3 bước, đổi mật khẩu OTP).

---

## Ma trận Quyết định Biểu đồ: Khi nào vẽ Sequence vs Sơ đồ Khối (Block/Flowchart) vs State Machine

| Loại biểu đồ | Ký hiệu Mermaid | Khi nào BẮT BUỘC dùng | Thành phần bắt buộc |
| :--- | :--- | :--- | :--- |
| **Sequence Diagram (Tuần tự)** | `sequenceDiagram` | Giao tiếp theo thời gian giữa $\ge 2$ Lifelines (Actor, FE, Gateway, Backend, DB, 3rd-party, Worker nền). | `autonumber`, khối lỗi `alt/else`, khối worker `rect rgb(...)`, mũi tên phản hồi `-->>`. |
| **Block Diagram / Flowchart (Sơ đồ Khối)** | `flowchart TD/LR` | Cây quyết định nhiều điều kiện rẽ nhánh (`IF/ELSE`), sơ đồ điều hướng chuyển trang/màn hình, pipeline xử lý dữ liệu. | Điểm đầu/cuối `([Bắt đầu/Kết thúc])`, hình thoi điều kiện `{Điều kiện?}`, nhãn rẽ nhánh (`-->|Đúng|`). |
| **State Machine (Máy trạng thái)** | `stateDiagram-v2` | Mô hình hóa vòng đời trạng thái của thực thể (Ví dụ Order: `DRAFT ➔ PENDING ➔ PAID / CANCELLED`). | Trạng thái ban đầu `[*] --> State`, nhãn kích hoạt (`Sự kiện [Điều kiện]`), trạng thái kết thúc. |
