---
title: "Kỹ năng: `/breakdown`"
description: "Bóc tách kiến trúc, phân hệ và màn hình thành các micro-task 2-4h (cấm > 8h) kèm đồ thị DAG tuần tự/song song, và bulk-sync lên Backlog, Redmine, GitHub, Jira."
---

# Kỹ năng: `/breakdown`

`/breakdown` — Động cơ Phân tách Micro-Task Chuẩn Agile FlowGrid.

## 🎯 Quy tắc Vàng: Task 2 - 4 Giờ

- **Mục tiêu lý tưởng:** Mỗi task có thời lượng **2 đến 4 giờ**.
- **Hạn chế:** Task 6 đến 8 giờ chỉ dành cho setup hạ tầng phức tạp.
- **CẤM TUYỆT ĐỐI:** **Không một task nào được vượt quá 8 giờ**. Yêu cầu lớn hơn sẽ tự động được chẻ nhỏ theo chu trình SDLC của FlowGrid.

## 🌊 Kiến trúc 4 Làn sóng Thực thi (Wave DAG)

1. **Wave 1: Nền tảng & Hợp đồng API (Song song ⚡)** — Đặc tả giao diện (`/spec`) & Hợp đồng OpenAPI (`/api-spec`).
2. **Wave 2: Lập trình Cốt lõi (Song song ⚡)** — Frontend UI (`/wire`) và Backend logic (`/service`) chạy song song độc lập.
3. **Wave 3: Tích hợp & Nối Luồng (Tuần tự 🔒)** — Ghép nối dữ liệu thật giữa UI và API, xử lý edge case.
4. **Wave 4: Ma trận QA & Cổng Nghiệm thu (Tuần tự 🔒)** — Kịch bản tự động hóa (`/testcase`) và kiểm toán `flowgrid:audit`.

## 🚀 Cách sử dụng

```text
/breakdown                   # Phân tách toàn bộ màn hình dự án
/breakdown W-AUTH-LOGIN      # Phân tách 1 màn hình cụ thể
/breakdown FLOW-CHECKOUT     # Phân tách 1 luồng nghiệp vụ
```
