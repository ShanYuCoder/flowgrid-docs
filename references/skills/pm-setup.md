---
title: "Skill: `/pm-setup`"
description: "Discover, survey, and configure 3rd-party MCP project management tools (Backlog, Redmine, GitHub, GitLab, Jira, Git Worktree) into the workspace."
---

# Skill: `/pm-setup`

`/pm-setup` — Agile PM & Tracker MCP Server Onboarding.

FlowGrid embraces the **Unix Philosophy**: do not reinvent issue tracking or git clients. Industry-standard official and open-source MCP servers exist for all major trackers. FlowGrid serves as the **intelligent decomposition engine** and orchestrator.

## 🛠️ Supported MCP Servers

| Key | System | MCP Package | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **`backlog`** | Nulab Backlog | `npx -y backlog-mcp-server` | Issues, milestones, categories, PRs, wikis |
| **`redmine`** | Redmine | `npx -y mcp-server-redmine` | 50+ issue tools, trackers, custom fields, time entries |
| **`github`** | GitHub Issues & Projects | `npx -y @modelcontextprotocol/server-github` | Issues, labels, milestones, project boards, PRs |
| **`gitlab`** | GitLab | `npx -y @modelcontextprotocol/server-gitlab` | Issues, epics, milestones, Merge Requests |
| **`jira`** | Atlassian Jira | `npx -y @sooperset/mcp-atlassian` | Sprints, boards, transitions, issue creation |
| **`git`** | Git Local & Worktree | `npx -y @modelcontextprotocol/server-git` | Feature branches, isolated worktrees, auto-commit |

## 🚀 Usage

Run inside your AI Agent:
```text
/pm-setup
```

Or configure via CLI:
```bash
# List supported tools
flowgrid pm list

# Check active configuration
flowgrid pm status

# Add a tool (e.g. Backlog)
flowgrid pm add backlog
```
