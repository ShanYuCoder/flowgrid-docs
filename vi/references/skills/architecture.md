# Skill: `/architecture`

## Tên
`architecture`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/architecture`
- Đóng vai trò là lệnh **Router (Điều hướng)** tổng phân phối các công việc liên quan đến kiến trúc tới các Skill con tương ứng.

## Input (Dữ liệu đầu vào)
- Member sẽ nhập vào một khu vực kiến trúc (Operational Area), hoặc một Module (CMP ID), hoặc đơn giản là một nhu cầu chung về kiến trúc.
- Agent tự động quét và phân giải (Resolve ID) sử dụng các lệnh nội bộ (`flowgrid_docs_route`, `flowgrid_docs_list_ids`).

## Output (Kết quả mong đợi)
- Không trực tiếp sửa file, mà sẽ **điều hướng** sang một trong các Skill con chuyên sâu.
- Bảng điều hướng (Route Map):
  - Hỏi về mục đích kinh doanh, chân dung người dùng → Gọi `/overview`.
  - Hỏi về nhóm màn hình (kênh giao tiếp) → Gọi `/surfaces`.
  - Hỏi về Module / Chức năng (CMP) → Gọi `/module`.
  - Hỏi về hạ tầng, vật lý → Gọi `/deployment`.
  - Quyết định kiến trúc → Gọi `/decision`.
  - Các quy trình nghiệp vụ chéo → Gọi `/user-flow`, `/db-erd`, `/cross-service`.

## Description / Ý nghĩa
- Tách biệt rõ ràng ranh giới giữa **Kiến trúc Kỹ thuật (Technical Architecture)** và **Đặc tả Nghiệp vụ (Business Spec)**.
- Kiến trúc (Architecture) chỉ xoay quanh cấu trúc hệ thống, dịch vụ nội bộ, cronjobs, hạ tầng cơ sở dữ liệu và các luồng kỹ thuật cắt ngang (Cross-cutting flows như Auth).
- Cấm lặp lại chân dung người dùng (Personas) hay use-cases chi tiết trong các file kiến trúc. Thay vào đó, nó phải đề cập thẳng vào thành phần kỹ thuật, Cloud Services và giao tiếp Backend.
- Bắt buộc các sơ đồ thiết kế (Mermaid Flowchart / Sequence Diagram) phải mô hình hóa rõ ràng các luồng ngoại lệ và lỗi (MANDATORY ERROR FLOWS). VD: Redirect khi 401/403 IDOR, hay trạng thái Validation Fail.

## Các Skill liên quan
- **Điều hướng đến:** Các skill như `/overview`, `/surfaces`, `/module`, `/user-flow`, `/db-erd`, `/deployment`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/architecture

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

