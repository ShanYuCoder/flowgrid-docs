# Skill: `/api`

## Tên
`api`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/api`

## Input (Dữ liệu đầu vào)
- Tham số truyền vào có thể là đường dẫn của một file `01-backend-spec.yaml` hiện có hoặc ID của một Module cần xử lý API.

## Output (Kết quả mong đợi)
- Đây là một **Router (Bộ điều hướng)**, do đó nó KHÔNG trực tiếp sinh ra file rác nào cả.
- Dựa vào bối cảnh (Context), Agent sẽ tự động chuyển hướng sang gọi các Skill cấp dưới thích hợp (như `/api-spec`, `/api-update` v.v.).

## Description / Ý nghĩa
- Lệnh gốc cao nhất dành cho luồng xử lý Backend (Backend Router).
- Tránh việc Member phải nhớ quá nhiều lệnh con, chỉ cần gõ `/api` và AI sẽ tự suy luận:
  - Nếu tính năng đó có giao diện (Portal-backed) và chưa có file Spec → Gọi `/api-spec`.
  - Nếu tính năng đó là Webhook/Partner không có giao diện Frontend → Gọi `/api-spec` (`feature.source.base: none`).
  - Nếu Spec đã có nhưng cần sửa đổi/đồng bộ → Gọi `/api-update`.
  - Nếu Spec đã có nhưng chưa được duyệt (not approved) → `/grill-api-spec`.
  - Nếu Spec đã được `approved` và có lệnh triển khai → Bàn giao cho bộ code chạy `/api --type=be` để sinh code PHP/Python thực tế.

## Các Skill liên quan
- Luôn gọi xuống các lệnh thuộc Phase 3 như: `/api-spec`, `/api-update`, `/grill-api-spec`.
- Chú ý: Việc viết Unit Test cho Backend KHÔNG đi qua router này, mà phải dùng lệnh riêng `/unit-be`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

```text
/api

Function slug: {hotel-list}
Portal spec: prefer `--id {API-*}`
Path: surfaces/<surface>/CMP-*/<NN…>/api/<seq>/

Resolve backend từ platform-repos — stop nếu thiếu config.
Đọc ir/spec + testcase; align key với Portal models/.

KHÔNG implement BE trong portal workspace.
Báo rõ repo/path đã đọc.

Pipeline BE (bộ code trên repo api/): /api → /audit-api

Handoff Portal: /audit-api → /wire
```

---
