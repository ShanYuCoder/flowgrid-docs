# Skill: `/overview`

## Tên
`overview`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/overview`
- Có thể dùng kèm với `common`: `/overview common`
- Có thể dùng kèm với cờ khảo cổ mã cũ: `/legacy /overview`

## Input (Dữ liệu đầu vào)
- Mục đích kinh doanh, phạm vi sản phẩm, operational areas (prose theo `contentLocale` hub).
- Nếu có cờ `/legacy`: Đọc `legacy-repos.local.json`.

## Output (Kết quả mong đợi)
- `overview/index.md` (Goals / Background / Scope — tiêu đề section **English**).
- `overview/operational-areas/<slug>.md` (một file phẳng mỗi area, không lồng thư mục theo tên area).
- Nếu có modifier `/legacy`: Tự động thêm tiền tố `legacy-` vào đầu tên file (ví dụ: `overview/legacy-overview.md`).

## Description / Ý nghĩa
- Nằm ở tầng cao nhất của kiến trúc, xử lý thư mục gốc (Root Folder) `overview/`.
- Tập trung vào các mảng nghiệp vụ vận hành lớn (Operational Areas) như "Admin operations", "Workforce operations" thay vì sa đà vào tính năng nhỏ.
- **Ranh giới Spec Nghiệp vụ (Business Spec Boundary):** Tài liệu Overview bắt buộc phải là một tài liệu kinh doanh thuần tuý, viết bằng ngôn ngữ của người dùng (User Language).
- **CẤM ĐOÁN TỐI KỴ:** Tuyệt đối không nhét các chi tiết kỹ thuật hệ thống (như Database Schemas, cấu hình Cloud, cách định tuyến Routing) vào file Overview. Nếu cần nhắc tới một hệ thống thứ 3, hãy dùng tên thương mại (VD: "Cổng thanh toán Payment Gateway") thay vì mô tả giao thức API của nó.

## Các Skill liên quan
- Được kích hoạt/điều phối bởi `/architecture`.
- Nếu cần đi sâu vào kênh giao tiếp (Web/App), dùng `/surfaces`. Mức nhỏ hơn nữa là `/module`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/overview

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

