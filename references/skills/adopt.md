# Skill: `/adopt`

## Tên
`adopt` (hoặc `/legacy-adopt`)

## Cách dùng (Command/Trigger)
- Gọi quét toàn hệ thống legacy: `/adopt` (hoặc `/legacy-adopt`)
- Gọi quét phạm vi ứng dụng/module legacy cụ thể: `/adopt "Customer App"` hoặc `/adopt admin-fe`

## Input (Dữ liệu đầu vào)
- Đọc `legacy-repos.local.json` (hoặc `platform-repos.local.json`) để xác định các repos/dự án legacy.
- Quét qua cấu trúc file code cũ (Routers, Controllers, View/Page Components, Service Interfaces).

## Output (Kết quả mong đợi)
- Khởi tạo duy nhất file chỉ mục `adoption-inventory.md` nằm ngay ở thư mục gốc (workspace root).
- Mã sản phẩm theo [`product-id-convention.md`](../../../harness/docs/extracts/product-id-convention.md) (`surfaceCode`, không bỏ `{SURF}` trong `CMP-*` / `W-*` / `API-*`).
- Liệt kê dạng bullet list (không checkbox, không ghi chi tiết spec) định danh danh mục:
  - **Surfaces (Bề mặt hệ thống)** — **Phân loại 2 chiều bắt buộc**: Role/Portal Domain (`admin`/`ADM`, `chain`/`CHN`, `merchant`/`MER`, `customer`/`CUS`, `driver`/`DRV`, `staff`/`STF`, `partner`/`PRT`) kết hợp Channel/Platform (`web`, `app`, `desktop`, `api-gateway`, `pos`) kèm `surfaceCode` 2-4 ký tự in hoa.
  - Modules (`CMP-*`)
  - Screens (`W-*`) & APIs (`API-*`) kèm đường dẫn file code cũ tương ứng (`ID -> Legacy File Path`)
  - **User flows (`FLOW-*`)** — **Bắt buộc quét sâu và toàn diện (Deep Tracing)**: Không chỉ liệt kê 1–2 luồng cơ bản mà phải quét toàn bộ 5 nhóm luồng:
    1. *Hành trình đa bước (Multi-step Journeys)*: Đăng ký/Onboarding, Checkout/Thanh toán, Search-Filter-Detail-Action, Quên MK/OTP.
    2. *Luồng chuyển trạng thái & Phê duyệt (State Machine)*: State transitions (`Draft → Pending → Approved/Rejected → Completed`).
    3. *Luồng phân nhánh theo vai trò & Điều kiện (Role/Permission Branching)*: Phân nhánh Admin vs User, ngưỡng phê duyệt giá trị giao dịch.
    4. *Luồng bất đồng bộ & Tích hợp hệ thống (Async & Webhooks)*: Webhooks, background worker queues, notification/email, WebSocket.
    5. *Luồng Sub-modal & Dialog*: Dialog xác nhận, drawer actions làm thay đổi state màn hình cha.
    - Phân tier **A** (cross-surface → `architecture/03-user-flows/`), **B** (surface `common/user-flows/`), **C** (module/cluster). Mẫu: extract `tpl-adoption-inventory.md`.
- Cuối file tổng hợp danh sách gợi ý Handoff Prompts cho bước tiếp theo.

## Description / Ý nghĩa
- Dùng để lập **Bản đồ chỉ mục & Mã hóa ID (Index & Mapping Directory)** cho dự án Legacy.
- Giải quyết bài toán không ai có thời gian khảo cổ 100% dự án legacy. Đóng vai trò làm bản tra cứu giúp Member tìm nhanh ID của chức năng cần làm và file code cũ tương ứng.
- Khi Member cần nâng cấp/sửa lỗi Chức năng A, Member tra `adoption-inventory.md` tại root để lấy ID (ví dụ `W-ADM-AUTH-01`), sau đó gọi lệnh khảo cổ đi kèm `/legacy` (`/docs-hub /legacy /spec W-ADM-AUTH-01`).

## Các Skill liên quan
- Kích hoạt sau khi cài đặt hoặc bắt đầu tiếp cận dự án legacy: `/adopt`.
- **Sau adopt:** [spec-ssot-prep](../../workflows/spec-ssot-prep.md) (cùng drill với [custom-base](../../workflows/custom-base.md) nếu stack custom) → `/legacy /spec` từng `W-*`.
- Khi khảo cổ chi tiết từng chức năng: Gọi kèm modifier `/legacy` với các skill `/surfaces`, `/module`, `/spec`, `/user-flow`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/adopt

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

