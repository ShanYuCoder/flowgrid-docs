---
title: "Skill: `/task`"
description: "Pick an issue from Backlog, Redmine, GitHub, or Jira, update status to In Progress, create an isolated Git branch/worktree, and guide execution."
---

# Skill: `/task`

`/task` — Agile Task Execution & Git Branch Orchestration.

## 🔄 Standard Lifecycle

1. **Pick Ticket:** Query ticket details via Tracker MCP (`backlog:get_issue`, `github:get_issue`, etc.).
2. **In Progress:** Transition ticket status to "In Progress" on your team's board.
3. **Git Branch:** Create dedicated branch `feat/<KEY>-<slug>` (or isolated git worktree).
4. **FlowGrid SDLC:** Guide implementation using `/spec`, `/api-spec`, `/wire`, and `/testcase`.
5. **Handoff:** Verify with `flowgrid:audit` and hand off to `/ship`.

## 🚀 Usage

```text
/task pick PROJ-101          # Pick a ticket by key
/task start #42              # Start working on an issue
/task list                   # List assigned open tasks
```
