# Phase 0 — 项目初始化与架构基座设置

本文档详细介绍了通过 `flowgrid setup` 命令执行项目初始化（Phase 0）的具体步骤，并深入拆解在 **3 种典型企业研发场景** 下的标准操作流程：
1. **Greenfield（全新开发）：** 从零开始构建全新产品。
2. **Maintain（既有维护）：** 在既有代码库上进行持续功能迭代与重构维护。
3. **Rebase / Modernization（系统重构升级）：** 基于老旧遗留系统进行彻底的技术栈升级与架构现代化。

---

## Phase 0 决策流程图

```mermaid
flowchart TD
  START(["开始: flowgrid setup [workspace]"]) --> CHOICE{"项目类型？"}

  %% 分支 1: Greenfield
  CHOICE -->|1. Greenfield<br/>(全新产品)| GF_DOCS["编写全局概览、架构约束<br/>定义 Surfaces 端结构"]
  GF_DOCS --> GF_REPO["在 source-code/ 下<br/>创建或关联目标代码仓"]
  GF_REPO --> GF_INIT["运行 /init<br/>(映射代码仓与 Surfaces)"]
  GF_INIT --> NEXT_PHASE

  %% 分支 2: Maintain
  CHOICE -->|2. Maintain<br/>(既有代码维护)| MT_REPO["将既有工程放入<br/>source-code/ 目录下"]
  MT_REPO --> MT_INIT["运行 /init<br/>(扫描并识别配置)"]
  MT_INIT --> MT_NEXT["进入设计阶段:<br/>结合 /trace 进行代码考古"]
  MT_NEXT --> NEXT_PHASE

  %% 分支 3: Rebase
  CHOICE -->|3. Rebase<br/>(遗留系统重构)| RB_LEGACY["将旧代码置于 source-legacy/<br/>(严格只读 READ-ONLY)"]
  RB_LEGACY --> RB_EXTRACT["运行 /extract-legacy<br/>(提取遗留模块与业务流)"]
  RB_EXTRACT --> RB_NEW["在 source-code/ 下<br/>建立全新技术栈工程"]
  RB_NEW --> RB_INIT["运行 /init<br/>(配置新工程环境)"]
  RB_INIT --> RB_NEXT["进入设计阶段:<br/>结合 /legacy 进行规则还原"]
  RB_NEXT --> NEXT_PHASE

  NEXT_PHASE(["进入功能生命周期:<br/>Design ➔ Codegen ➔ Test ➔ Wire"])
```

---

## 三大场景实战指南

### 1. Greenfield 场景（全新项目）
- **步骤 1：初始化工作区骨架**
  ```bash
  flowgrid setup my-project [--mode=base|custom]
  ```
  CLI 提供两种脚手架模式：
  - `base`（默认）：包含完整骨架及通用模式示例（`surfaces/common`, `03-user-flows/FLOW-login.md`）。
  - `custom`：仅搭建纯净的 SSOT 目录结构（`.vitepress/`, `architecture/`, `overview/`, `registries/`, `source-code/`），不塞入示例文件。
- **步骤 2：明确宏观指导方针**
  - 在 `overview/index.md` 中编写产品愿景、用户角色与发布目标。
  - 在 `architecture/` 中定义系统架构（Arc42 标准、技术约束、数据库 ERD）。
  - 在 `surfaces/` 中规划端列表（Admin 后台、移动端、Portal 门户等）。
- **步骤 3：创建代码仓库**
  - 在 `source-code/` 下创建或 Clone 源代码仓库（推荐使用 Git Submodules 管理）。
- **步骤 4：运行技能 `/init`**
  - 执行 `/init` 自动探测技术栈，配置 `platform-repos.local.json` 并注册生成模板。

### 2. Maintain 场景（既有项目维护）
- 将既有工程克隆或移动到 `source-code/` 下。
- 运行 `/init`，FlowGrid 会自动扫描目录架构与技术栈并生成映射。
- 在后续功能迭代阶段，执行 `/spec` 时结合 `/trace` 技能对 `source-code/` 中的实现进行对比验证，确保新功能与既有系统无缝兼容。

### 3. Rebase 场景（遗留重构与系统升级）
- **防复制隔离：** 将老旧系统完整代码放置在 `source-legacy/` 目录下（**严格只读**，绝不可直接在老代码上修改，也严禁直接大段复制老代码垃圾）。
- 运行 `/extract-legacy` 逆向挖掘老系统中的核心业务规则与实体流转逻辑。
- 在 `source-code/` 下建立采用现代框架的全新代码工程。
- 在 Phase 1 设计阶段，结合 `/legacy` 技能进行合规的业务逻辑提取与重新建模。
