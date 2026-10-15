---
title: "技能: `/task`"
description: "从 Backlog、Redmine、GitHub、Jira 领取任务，更新状态为进行中，自动创建独立 Git 分支/工作树并引导研发流程。"
---

# 技能: `/task`

`/task` — 任务领取与 Git 分支/工作树自动编排。

## 🔄 标准执行流

1. **查询任务:** 通过 Tracker MCP 获取需求描述与验收标准。
2. **更新状态:** 在项目管理看板中将任务置为“进行中 (In Progress)”。
3. **创建分支:** 自动检出专用分支 `feat/<KEY>-<slug>`（或独立工作树）。
4. **驱动研发:** 遵循 FlowGrid 规范推进 `/spec`、`/api-spec`、`/wire` 及 `/testcase`。
5. **质量移交:** 运行 `flowgrid:audit` 审计通过后，唤起 `/ship`。

## 🚀 使用方式

```text
/task pick PROJ-101          # 按编号领取任务
/task start #42              # 启动 Issue 研发
/task list                   # 查看分配给当前用户的待办任务
```
