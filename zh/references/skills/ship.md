---
title: "技能: `/ship`"
description: "执行发布前代码质量审计，提交并推送代码，通过 GitHub/GitLab/Backlog 创建 PR，并将任务状态置为待评审。"
---

# 技能: `/ship`

`/ship` — 质量门禁、Git 推送、PR 自动创建与任务移交。

## 🛡️ 零绕过质量门禁 (Zero-Bypass Gate)

`/ship` 技能在推送代码前强制执行完整的 FlowGrid 质量检测：
- 规范与模式审计 (`flowgrid:audit spec`)
- 前后端契约对齐 (`flowgrid:audit fe-be`)
- 自动化测试校验 (`flowgrid:cases-check`)

## 🚢 交付标准流

1. **前置审计:** 存在严重错误时立即阻断交付。
2. **规范提交:** 自动生成关联任务 ID 的 Conventional Commit。
3. **代码推送:** 将特性分支推送到远程仓库。
4. **创建 PR:** 在 GitHub、Backlog 或 GitLab 上创建包含审计报告的 Pull Request。
5. **更新看板:** 将任务状态流转为“待评审 (In Review)”并附上 PR 链接。

## 🚀 使用方式

```text
/ship                        # 一键完成审计、提交、推送与 PR 发起
```
