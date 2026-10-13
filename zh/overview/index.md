# 概览 (Overview)

本文档面向软件研发团队成员：深入阐述**为何**需要一套完备且结构化的产出物体系（Artifacts）、**SSOT（单一数据真源）** 在高敏捷项目中的关键价值、**研发阶段往往在赶进度时被粗暴裁剪**带来的巨大隐患——以及 **FlowGrid 如何结合 AI 进行纠偏**，既保持工程严谨性，又无需团队承担手工编写文档的繁重负担。

## 三大核心运作原则

FlowGrid 将**确定性脚本**与 **AI Agent** 有机融合在同一套磁盘 SSOT 体系上——两者互为补充，各司其职：

1. **分工明确（数量审计与质量把控）：** `flowgrid audit *` 与 `cases:gate` 使用纯 Node.js 代码确定性地检测字段缺口、Schema 校验以及链路追踪缺漏（`gaps[]`, `confirms[]`）；而质询机制（`/grill-bqa`, `/grill-dev`）与团队人工评审则专注推敲业务逻辑与 UI ↔ API ↔ 测试用例的一致性。AI 技能严禁默默脑补遗留缺口。
2. **反复制粘贴守卫与通用资产目录（Anti-Copy-Paste Guard）：** `/init` 技能自动扫描识别通用候选组件（`CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`），强制通过 `/common` 进行规范收口，在 `shared/` 目录下提供单一标准实现，杜绝跨模块盲目复制代码。
3. **高纪律性工作流：** 当未决事项（`gaps[]` + `confirms[]`）超过阈值（约 10 项）时，暂停零星提问，转入阶段性执行计划。大型复杂页面必须拆分为不同的**区域（Zones：Header、Toolbar、Table/Form、Footer）**分步推进，防止长上下文丢失信息。

## 三大适用实施场景

| 场景 | 特征 | 标准运作流程 (Phase 0 ➔ Feature) |
| --- | --- | --- |
| **1. Greenfield (全新开发)** | 从零开始构建全新产品 | `flowgrid setup` ➔ `/init` ➔ `/spec` ➔ `/prototype` ➔ `/api-spec` ➔ `/testcase` ➔ `/wire` |
| **2. Maintain (存量维护)** | 维护与迭代现有存量代码库 | `flowgrid setup` ➔ 引入代码至 `source-code/` ➔ `/init` 扫描端面 ➔ 配合 `/trace` 编写 `/spec` 对齐隐式逻辑 |
| **3. Rebase / Modernization (重构升级)** | 彻底推翻重构遗留系统（如技术栈升级） | 遗留代码置入 `source-legacy/` (只读) ➔ `/init` 提炼 `CMN-*` 启动反复制守卫 ➔ 选取黄金样例训练 `build-template-code` ➔ 配合 `/legacy` 编写 `/spec` |
