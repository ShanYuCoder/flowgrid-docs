---
title: "Kỹ năng: `/pm-setup`"
description: "Khảo sát và cấu hình các MCP tool quản lý dự án bên thứ 3 (Backlog, Redmine, GitHub, GitLab, Jira, Git Worktree) vào workspace."
---

# Kỹ năng: `/pm-setup`

`/pm-setup` — Khởi tạo và kết nối MCP Server Quản lý Dự án & Issue Tracker.

FlowGrid tuân thủ **Triết lý Unix**: không phát minh lại bánh xe cho hệ thống issue tracker và git client. Hệ sinh thái MCP thế giới đã có sẵn các server chính chủ và mã nguồn mở chất lượng cao. FlowGrid tập trung đóng vai trò **nhạc trưởng điều phối và bóc tách task**.

## 🛠️ Danh mục MCP Server Hỗ trợ

| Mã | Hệ thống | Gói MCP / Lệnh chạy | Tính năng cốt lõi |
| :--- | :--- | :--- | :--- |
| **`backlog`** | Nulab Backlog | `npx -y backlog-mcp-server` | Quản lý issues, milestones, categories, PRs, wikis |
| **`redmine`** | Redmine | `npx -y mcp-server-redmine` | 50+ công cụ issue, trackers, custom fields, log thời gian |
| **`github`** | GitHub Issues & Projects | `npx -y @modelcontextprotocol/server-github` | Issues, labels, milestones, project boards, PRs |
| **`gitlab`** | GitLab | `npx -y @modelcontextprotocol/server-gitlab` | Issues, epics, milestones, Merge Requests |
| **`jira`** | Atlassian Jira | `npx -y @sooperset/mcp-atlassian` | Sprints, boards, chuyển trạng thái ticket, tạo issue |
| **`git`** | Git Local & Worktree | `npx -y @modelcontextprotocol/server-git` | Tạo branch, git worktree độc lập, auto-commit |

## 🚀 Cách sử dụng

Gọi trong AI Agent:
```text
/pm-setup
```

Hoặc qua dòng lệnh CLI:
```bash
# Xem danh sách tool hỗ trợ
flowgrid pm list

# Kiểm tra công cụ đã kích hoạt trong workspace
flowgrid pm status

# Cài đặt cấu hình (VD: Backlog)
flowgrid pm add backlog
```
