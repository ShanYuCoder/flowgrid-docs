---
title: "Kỹ năng: `/task`"
description: "Nhận task từ Backlog, Redmine, GitHub, Jira, đổi trạng thái sang In Progress, tạo branch Git/worktree riêng biệt và điều phối thực thi."
---

# Kỹ năng: `/task`

`/task` — Nhận Task & Điều phối Nhánh Git / Worktree Tự động.

## 🔄 Quy trình Chuẩn

1. **Nhận Ticket:** Truy vấn thông tin task từ Tracker MCP (`backlog:get_issue`, `github:get_issue`, v.v.).
2. **Đổi trạng thái:** Cập nhật ticket sang "In Progress" trên board của team.
3. **Nhánh Git:** Tự động tạo branch `feat/<KEY>-<slug>` (hoặc git worktree độc lập).
4. **Vận hành SDLC:** Dẫn dắt lập trình tuần tự qua `/spec`, `/api-spec`, `/wire`, và `/testcase`.
5. **Bàn giao:** Chạy kiểm toán `flowgrid:audit` và sẵn sàng gọi `/ship`.

## 🚀 Cách sử dụng

```text
/task pick PROJ-101          # Nhận task theo mã ticket
/task start #42              # Bắt đầu làm issue
/task list                   # Xem danh sách task đang được giao
```
