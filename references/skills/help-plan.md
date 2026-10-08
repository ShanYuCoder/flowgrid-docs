# Kỹ năng: `/help-plan`

## Tên
`help-plan` (Action Plan & User Flow Navigation Advisor)

## Cách dùng (Command/Trigger)
- Gọi qua slash command: **`/help-plan`**.
- Chạy khi bạn có một yêu cầu mới, tính năng mới hoặc Change Request (CR) cần làm gấp nhưng chưa biết phải bắt đầu từ đâu, đọc file nào hay thực hiện theo thứ tự nào.

## Input (Dữ liệu đầu vào)
1. **`.flowgrid/config.json`**: Danh sách surfaces, projects (FE/BE, technology stack).
2. **`inition-inventory.md`** (hoặc `adoption-inventory.md`): Danh mục ánh xạ surfaces, modules (`CMP-*`), screens (`W-*`), đường dẫn file code legacy (`source-legacy/` hoặc `source-code/`), và Common patterns (`CMN-*`).
3. **Hiện trạng tài liệu trong Workspace**: Cấu trúc `surfaces/`, `architecture/03-user-flows/`, `model/data-models.md`, `overview/`, v.v.
4. **Mô tả yêu cầu từ người dùng**: Ví dụ *"Tôi cần thêm 1 tenant mới"*, *"Tôi cần thêm tính năng voucher vào surface customer"*, *"Tôi cần sửa flow thanh toán"*.

## Output (Kết quả mong đợi)
Một bản **Action Plan phân cấp chi tiết từng bước (Step 1 -> 1.1, 1.2; Step 2 -> 2.1, 2.2...)** với trọng tâm **Rà soát đầy đủ User Flow**:

1. **Rà soát toàn diện các User Flow liên quan (Mandatory Check):**
   - **Architecture & System Flows (`architecture/03-user-flows/`):** Các luồng hạ tầng như cấp phát tài nguyên (`FLOW-*-provisioning`), phân tách dữ liệu & JWT (`FLOW-*-isolation-auth`), đồng bộ ngầm, billing, audit logging.
   - **Product & Business User Flows:**
     - *Upstream Flow:* Luồng khởi tạo và dữ liệu đầu vào đến từ đâu?
     - *Primary Story Flow:* Thao tác tương tác chính của Actor tại màn hình.
     - *Downstream Flows & Side-effects:* Hiệu ứng lan truyền sang các module/surface khác (trừ kho, bắn thông báo, hạch toán).
     - *Failure & Rollback Flow:* Luồng xử lý khi gặp lỗi ngoại lệ, hủy hoặc hoàn tiền.
2. **Chiến lược kiểm tra 2 cấp (Two-tier Check):**
   - *Surface check:* Nếu tài liệu surface đã có -> Đọc hiểu; nếu chưa có -> Dựng khung (`/surfaces`) hoặc trace từ inventory (`/trace`, `/legacy`).
   - *Module check:* Nếu module đã có -> Mở ra đọc & chuẩn bị `/update-spec`; nếu chưa có -> Khởi tạo module (`/module`), viết spec mới (`/spec`).
3. **Lộ trình FlowGrid End-to-End:**
   - **Step 1:** Khảo sát & làm rõ Surface.
   - **Step 2:** Kiến trúc & User Flow (Cập nhật `FLOW-*.md`, Data models).
   - **Step 3:** Module & Tái sử dụng Common Catalog (`CMN-*` trong `inition-inventory.md`).
   - **Step 4:** Đặc tả Leaf Bundle Spec & Phản biện nghiệp vụ (`/spec`, `/grill-bqa`, `pnpm flowgrid:split`).
   - **Step 5:** Prototype & Backend Contract (`/prototype`, `/api-spec`).
   - **Step 6:** Kiểm thử tự động (`/testcase`, `pnpm flowgrid:cases:gen`).
   - **Step 7:** Đấu nối mã nguồn thật & Chạy audit gate (`/wire`, `pnpm flowgrid:audit`).
4. **Cheat Sheet:** Bảng tổng hợp các lệnh/skill cần chạy tuần tự.

## Description / Ý nghĩa
- Giúp developer không bị "lạc" trong hệ sinh thái FlowGrid khi phải đối mặt với các task gấp.
- Đặc biệt ngăn chặn rủi ro bỏ quên các User Flow liên đới và hiệu ứng lan truyền (blast radius) trên toàn hệ thống.
- Tự động tận dụng tối đa kết quả quét từ `/init` (`inition-inventory.md`) để chỉ định đúng file legacy cần đọc, đúng surface cần vào, tránh việc viết code tùy tiện hoặc copy-paste legacy.

---

## Example prompt (mẫu gọi)

```text
/help-plan Tôi cần thêm 1 tenant mới vào hệ thống multi-tenant, hãy phân tích inventory và lập plan giúp tôi bắt đầu từ đâu.
```

```text
/help-plan Tôi cần thêm tính năng Export Excel cho màn hình danh sách đơn hàng thuộc surface Admin, hãy lên plan chi tiết.
```
