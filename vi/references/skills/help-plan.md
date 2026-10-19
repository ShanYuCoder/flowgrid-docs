# Kỹ năng: `/help-plan`

## Tên
`help-plan` (Implementation Planning & User Flow Navigation Advisor)

## Cách dùng (Command/Trigger)
- Gọi qua slash command: **`/help-plan <mô tả yêu cầu / CR / bug fix>`**
- Chạy khi bạn nhận được một yêu cầu tính năng mới, Change Request (CR), hoặc nhiệm vụ sửa lỗi (bug fix) và cần một kế hoạch hành động chuẩn hóa, bám sát vòng đời công cụ của FlowGrid.

## Input (Dữ liệu đầu vào)
1. **`.flowgrid/config.json`**: Danh sách surfaces, repositories (`projects`), vai trò FE/BE và công nghệ.
2. **`inition-inventory.md`** (hoặc `adoption-inventory.md`): Danh mục ánh xạ surfaces, modules (`CMP-*`), screens (`W-*`), đường dẫn mã nguồn thực tế (`source-code/` hoặc `source-legacy/`), và danh mục Common (`CMN-*`).
3. **Hiện trạng tài liệu trong Workspace**: Cấu trúc specs tại `surfaces/<surface>/<module>/<feature-slug>/`, danh sách user-flows tại `architecture/03-user-flows/` hoặc `**/common/user-flows/`, data models tại `architecture/model/data-models.md` hoặc `common/db-erd.md`.
4. **Mã nguồn thực tế (Ground Truth)**: Toàn bộ controllers, views, models, services đang chạy trong `source-code/` (hoặc `source-legacy/`).
5. **Mô tả yêu cầu từ người dùng**: Đề bài tính năng, nội dung CR, hoặc báo cáo bug từ khách hàng/PO.

## Output (Kết quả mong đợi)
1. **File Kế hoạch Triển khai (`implementation-plan-[task-slug].md`)**: Bản kế hoạch hành động có cấu trúc rõ ràng với các checkbox `[ ]`, tọa độ file chi tiết, ma trận đối chiếu hiện trạng và Checkpoint phê duyệt.
2. **Đề xuất Rà soát & Trace Toàn bộ User Flow liên quan (Mục tiêu: Trace ALL)**:
   - Khai thác triệt để những gì đã được quét và lập chỉ mục trong `inition-inventory.md`.
   - Đề xuất trace **càng nhiều User Flow liên quan càng tốt (đẹp nhất là TRACE TẤT CẢ)** trên cả 3 tầng:
     - **Tier A — Cross-surface:** Các luồng xuyên suốt nhiều surfaces (`architecture/03-user-flows/FLOW-*.md`).
     - **Tier B — Surface-shared:** Các luồng dùng chung trong cùng 1 surface (`surfaces/<surface>/<module>/user-flows/FLOW-*.md`).
     - **Tier C — Module scope:** Các luồng nội bộ cụm module (`surfaces/<surface>/<module>/user-flows/`).
   - Duyệt trọn vẹn chuỗi quan hệ 5 mắt xích:
     1. *Upstream Trigger:* Luồng đưa user/dữ liệu tới màn hình.
     2. *Primary Flow:* Luồng thao tác chính trên màn hình.
     3. *Downstream Side-effects:* Hiệu ứng lan truyền (trừ kho, bắn notification, xuất hóa đơn, hạch toán).
     4. *Failure & Rollback:* Luồng xử lý khi lỗi, hủy hoặc hoàn tiền.
     5. *System & Security:* Luồng phân tách đa tenant, JWT auth, background queue sync.
3. **Ma trận Đối chiếu Hiện trạng vs Yêu cầu (Reality vs Requirement Discrepancy Matrix)**: Chỉ rõ sự khác biệt giữa những gì yêu cầu/bug report miêu tả và thực tế mã nguồn đang chạy.
4. **Checkpoint Quyết định của Thành viên (Decision Gate)**: Dừng lại chờ người dùng xem xét và xác nhận (`Proceed / Approve` hoặc `Tạm dừng để nghiên cứu thêm`) trước khi bước vào code.

## Description / Quy trình Chuẩn 6 Bước
Triết lý cốt lõi của FlowGrid: **TUYỆT ĐỐI KHÔNG nhảy vào code ngay, KHÔNG cô lập một màn hình đơn lẻ, và KHÔNG tin tưởng mù quáng vào văn bản yêu cầu/bug report**. Yêu cầu từ khách hàng/BA thường xuyên miêu tả sai lệch hoặc không đầy đủ hiện trạng thực tế của hệ thống.

`/help-plan` định hướng thực thi theo đúng vòng đời 6 bước:

- **Bước 0 — Khai thác Inventory Init & Đề xuất Trace Toàn bộ User Flow liên đới:**
  - Đọc `inition-inventory.md` để bóc tách toàn bộ các User Flow (Tier A, Tier B, Tier C) có chạm tới các màn hình, API, controllers, hoặc database entities của task.
  - Đưa toàn bộ danh sách các luồng này vào kế hoạch trace ở Phase 1 để triệt tiêu triệt để rủi ro "sửa màn này làm vỡ 4 màn khác" (Blast Radius Blind Spots).

- **Bước 1 — Trace Toàn bộ User Flow & Làm rõ hiện trạng (`/trace` / `/legacy` / `/user-flow`):**
  - Quét mã nguồn thực tế tại `source-code/` (hoặc `source-legacy/`) để hiểu rõ màn hình/API/luồng đang hoạt động như thế nào.
  - Với từng luồng được phát hiện: Nếu chưa có file `FLOW-*.md`, lập kế hoạch trace bằng `/user-flow` hoặc `/trace`; nếu đã có, đối chiếu với code thực tế.
  - Nếu màn hình chưa có spec trong `surfaces/`, chạy **`/trace`** (chế độ Maintain) hoặc **`/legacy`** (chế độ Rebase) để khôi phục bản spec hiện trạng (`W-*.bundle.yaml`).
  - Đối chiếu hiện trạng thực tế vs mô tả yêu cầu: Chỉ ra các điểm mâu thuẫn, ngộ nhận hoặc logic ngầm trước khi thực hiện bất kỳ sửa đổi nào.

- **Bước 2 — Phân tích Gaps & Cập nhật Spec Delta (`/update-spec`):**
  - Rà soát toàn diện các User Flow liên đới (`FLOW-*` upstream, primary, downstream side-effects, rollback).
  - Đánh giá tính tương thích: Liệu CR/bug fix có làm vỡ luồng người dùng khác hay cần sửa thêm các màn hình/API nào khác không?
  - Cập nhật bản đặc tả leaf bundle spec bằng **`/update-spec`** (hoặc **`/spec`** nếu là màn mới).
  - Chạy `flowgrid audit spec <bundle> --type <profile>` và `flowgrid split` để kết xuất IR/generated spec.

- **Bước 3 — Checkpoint Quyết định (Decision Gate):**
  - **Trường hợp KHÔNG OK (Có vướng mắc lớn / Rủi ro cao):** Member/Lead yêu cầu tạm dừng (Pause), log vào QA inbox (`qa/<SHORT>_NNNN.yaml` với `/qa` / AskQuestion Tech Debt) để nghiên cứu thêm và thảo luận với stakeholder trước khi code.
  - **Trường hợp ĐÃ OK (Rõ ràng & Khả thi):** Member duyệt kế hoạch (`Approve` / `Proceed`) để chuyển sang giai đoạn thực thi.

- **Bước 4 — Phản biện Thiết kế & Chốt Contract API:**
  - Chạy **`/grill-bqa`** (soi nghiệp vụ, 4 tầng outcome xử lý lỗi: `onSuccess`, `onBusinessErrors`, `onSecurityErrors`, `onSystemErrors`).
  - Chạy **`/grill-dev`** (soi kỹ thuật, gán tag `#gen:*`, `#needs-component:*`).
  - Nếu có thay đổi API: chạy **`/api-spec`** (hoặc **`/api-update`**) để cập nhật `01-backend-spec.yaml`, kiểm tra bằng `flowgrid api:check`.

- **Bước 5 — Triển khai Theo Định hướng Kiểm thử TDD (TDD Micro-Steps):**
  - Lập kế hoạch testcase bằng **`/testcase`** bao phủ toàn bộ các luồng đã trace -> sinh `cases/**/TC-*.yaml`.
  - **Red Phase:** Viết test case thất bại xác thực logic mới hoặc lỗi cần sửa -> Chạy lệnh test xác nhận đỏ (Red).
  - **Green Phase:** Sinh/viết mã nguồn tối thiểu bằng **`/api`** (`flowgrid api-gen`) hoặc **`/prototype`** (`portal:gen`) -> Chạy lệnh test xác nhận xanh (Green - Exit code 0).
  - **Refactor & Wire:** Đấu nối sản phẩm bằng **`/wire`** (gỡ mock, nối API thật, khôi phục auth/RBAC) -> Xác nhận toàn bộ test vẫn xanh.

- **Bước 6 — Kiểm định Chất lượng & E2E Validation:**
  - Sinh test tự động: `flowgrid testcase:gen` và chạy Playwright E2E scoped (`pnpm test:e2e --screen <W-*>`).
  - Chạy kiểm định hội tụ: `flowgrid audit e2e` và `flowgrid audit fe-be`.

## Cấu trúc File Kế hoạch Bắt buộc (`implementation-plan-[task-slug].md`)

Khi chạy `/help-plan`, AI Agent **bắt buộc tạo file kế hoạch trên đĩa** với cấu trúc chuẩn:
- **Phần 1: Metadata & Scope:** Phân loại task, surfaces, modules, screens, APIs liên quan.
- **Phần 2: Tiêu điểm Đánh giá Rủi ro (Review Focus — Top 5 Failure Modes):**
  1. Điều kiện biên & Off-by-one (phân trang, chuỗi rỗng, 0 vs null).
  2. Dữ liệu thiếu / Payload sai định dạng.
  3. Lỗi & Rollback trên chuỗi 5 mắt xích User Flow.
  4. Máy trạng thái & Race conditions / Concurrency.
  5. Ranh giới bảo mật & Multi-tenant (chống IDOR, kiểm soát quyền truy cập).
- **Phần 3: Danh sách Toàn bộ User Flows được đề xuất Trace từ Init Inventory:**
  - Tier A (Cross-surface), Tier B (Surface-shared), Tier C (Module-scope).
  - Chuỗi quan hệ 5 mắt xích (Upstream, Primary, Downstream, Failure, System).
- **Phần 4: Ma trận Đối chiếu Hiện trạng vs Yêu cầu:** Bảng so sánh Controls UI, Logic nghiệp vụ, Schema dữ liệu giữa thực tế code và văn bản yêu cầu.
- **Phần 5: Lộ trình 6 Phase chi tiết với TDD Vi mô:** Danh sách các checkbox `[ ]` phân theo Phase 1 -> Phase 6.
- **Phần 6: Checkpoint Quyết định:** Điểm dừng rõ ràng cho người dùng bấm **Proceed** hoặc **Tạm dừng**.

## Quy tắc Tương tác trong Chat
- Không phản hồi lan man trong chat.
- Sinh file `implementation-plan-[task-slug].md` vào workspace.
- Tóm tắt các User Flow quan trọng nhất cần trace và các điểm lệch giữa thực tế code và yêu cầu.
- **Dừng lại yêu cầu User xác nhận:**
  ```text
  Đã khởi tạo kế hoạch chi tiết tại `implementation-plan-[task-slug].md`.
  Toàn bộ các User Flow liên đới từ init inventory đã được đưa vào danh sách trace ở Phase 1.
  Vui lòng kiểm tra kế hoạch trên.
  - Bấm **Proceed / Approve** để bắt đầu Phase 1.
  - Hoặc phản hồi để tạm dừng/yêu cầu điều chỉnh thêm.
  ```

---

## Example prompt (mẫu gọi)

```text
/help-plan

Mục tiêu: Sửa lỗi tính sai thuế và bổ sung tính năng xuất hóa đơn VAT tại màn hình Chi tiết Đơn hàng (Admin Portal).
Hãy phân tích inition-inventory.md, đề xuất trace toàn bộ các user-flows liên đới (cả checkout khách hàng, xuất kho và kế toán), kiểm tra hiện trạng thực tế code vs yêu cầu, và lập Implementation Plan chi tiết.
```
