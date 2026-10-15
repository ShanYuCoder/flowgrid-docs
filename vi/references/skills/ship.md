---
title: "Kỹ năng: `/ship`"
description: "Chạy kiểm toán chất lượng, commit & push code, mở Pull Request / Merge Request qua GitHub/GitLab/Backlog, và đổi trạng thái ticket sang In Review."
---

# Kỹ năng: `/ship`

`/ship` — Cổng Kiểm toán Chất lượng, Push Git, Mở PR & Bàn giao Ticket.

## 🛡️ Cổng Kiểm toán Không Thể Vượt Qua (Zero-Bypass)

Kỹ năng `/ship` thực hiện xác minh toàn diện trước khi đẩy mã nguồn:
- Tính hợp lệ của cấu trúc spec (`flowgrid:audit spec`)
- Khớp hợp đồng FE - BE (`flowgrid:audit fe-be`)
- Kịch bản kiểm thử tự động (`flowgrid:cases-check`)

## 🚢 Quy trình Bàn giao

1. **Kiểm toán:** Chặn đứng quá trình nếu phát hiện lỗi nghiêm trọng.
2. **Commit:** Tự động tạo Conventional Commit kèm mã tham chiếu ticket.
3. **Git Push:** Đẩy nhánh code lên remote repository an toàn.
4. **Mở Pull Request:** Mở PR trên GitHub, Backlog, hoặc GitLab kèm bảng nghiệm thu audit.
5. **Cập nhật Ticket:** Chuyển trạng thái ticket sang "In Review" và bình luận link PR.

## 🚀 Cách sử dụng

```text
/ship                        # Kiểm toán, commit, push và mở PR tự động
```
