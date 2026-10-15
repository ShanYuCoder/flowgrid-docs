---
title: "技能: `/pm-setup`"
description: "在工作区中配置第三方敏捷项目管理 MCP 工具（Backlog、Redmine、GitHub、GitLab、Jira、Git Worktree）。"
---

# 技能: `/pm-setup`

`/pm-setup` — 敏捷项目管理与缺陷跟踪 MCP 服务初始化引导。

FlowGrid 坚守 **Unix 哲学**：不重复造轮子。借助成熟的官方及开源 MCP 服务，FlowGrid 作为**任务拆解与流程编排的核心引擎**。

## 🛠️ 支持的 MCP 工具列表

| 标识 | 系统 | MCP 软件包 | 核心能力 |
| :--- | :--- | :--- | :--- |
| **`backlog`** | Nulab Backlog | `npx -y backlog-mcp-server` | 事项管理、里程碑、Wiki、PR 关联 |
| **`redmine`** | Redmine | `npx -y mcp-server-redmine` | 50+ 项操作、跟踪标签、自定义字段、工时记录 |
| **`github`** | GitHub Issues & Projects | `npx -y @modelcontextprotocol/server-github` | Issues、里程碑、项目看板、PR |
| **`gitlab`** | GitLab | `npx -y @modelcontextprotocol/server-gitlab` | Issues、史诗、里程碑、合并请求 |
| **`jira`** | Atlassian Jira | `npx -y @sooperset/mcp-atlassian` | 冲刺迭代、看板视图、工作流状态转换 |
| **`git`** | Git Local & Worktree | `npx -y @modelcontextprotocol/server-git` | 分支管理、独立工作树、自动提交 |

## 🚀 使用方式

在 AI Agent 中直接调用：
```text
/pm-setup
```

或使用终端命令行：
```bash
# 查看支持工具列表
flowgrid pm list

# 检查当前配置状态
flowgrid pm status

# 添加工具配置（例如 Backlog）
flowgrid pm add backlog
```
