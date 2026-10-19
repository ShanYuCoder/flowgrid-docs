# 工作区结构与 SSOT 核心资产 (Artifacts)

当运行 `flowgrid setup [workspace]` 并启动 `pnpm docs:dev`（或 `flowgrid dev`）时，FlowGrid 会在本地生成标准化的 **SSOT（单一事实源）** 架构骨架。

VitePress 文档中心直接读取本地磁盘上的这些目录与 Markdown 文件，使整个跨职能团队（产品经理/BA、前端/后端开发、QA、架构师）能够在统一的事实标准下无缝协同。

---

## 本地磁盘目录全局概览

```text
my-workspace/
├── overview/               # 产品愿景、业务核心目标与发布里程碑
├── architecture/           # 系统技术架构设计文档（遵循 Arc42 标准与 ERD 模型）
├── surfaces/               # 应用端 (Surfaces)、功能模块与通用模式
│   ├── common/             # 全局 UI 模式、model-data 与通用规范（扁平单层 .md）
│   └── <surface-name>/     # 具体业务端（admin 后台、portal 门户、mobile 移动端等）
│       ├── common/         # （可选）该端作用域通用资产（空时自动隐藏）
│       └── <module-name>/  # 业务功能模块 (CMP-*)
│           ├── common/     # （可选，空时自动隐藏）
│           ├── user-flows/ # Step 1 在该模块发起的用户旅程流（空时自动隐藏）
│           └── <feature>/  # 页面/功能（扁平单层，包含 bundle.yaml 与 spec.md）
├── .flowgrid/registries/   # 设计系统组件、业务能力与代码生成注册表
├── qa/                     # 业务待决问题 (Open Questions) 与风险协作收件箱
├── source-code/            # 活跃生产代码仓库（Git Submodules 模式）
└── source-legacy/          # 遗留系统代码参考（严格只读 READ-ONLY，供考古分析）
```

---

## 各核心目录在文档中心的角色与职责

### 1. `overview/` — 产品愿景与发布范围
- **内容构成：** 包含 `overview/index.md` 以及架构核心优势分析 `overview/strengths.md`。
- **职责范围：**
  - 阐述产品的核心业务目标与要解决的痛点。
  - 定义用户角色群像（*Actors & Personas*）。
  - 划定各发布里程碑的特性交付边界（Release Scope / Milestones）。
- **主要协作角色：** 产品负责人（PO）、业务分析师（BA）、项目经理。

### 2. `architecture/` — 系统技术架构（Arc42 国际标准）
- **内容构成：** 遵循 Arc42 国际标准的系统架构框架，分为 **12 个核心专业板块** 及核心数据模型：
  - **`01-introduction/` (架构简介、目标与技术热点):** 系统全局上下文、业务核心目标、技术边界及高风险热点分析（高并发瓶颈、核心复杂业务集群）。
  - **`02-constraints/` (架构约束条件):** 既定不可变约束：必须采用的技术栈、硬件/网络拓扑、预算上限、法律合规（GDPR, ISO, 等保）与工程规范。
  - **`03-user-flows/` (系统宏观数据流与系统上下文):**
    > **与 `surfaces/<surface>/<module>/user-flows/` 的明确界限：**
    > - **`architecture/03-user-flows/`** 代表**系统宏观流（System Context）**。描述服务间、子系统间或三方系统间的数据流转与处理生命周期（如银企对账、ERP 异步同步、MQ 事件驱动）。关注数据协议与交互逻辑——**完全独立于具体的 UI 界面**。
    > - **`surfaces/<surface>/<module>/user-flows/`** 代表**交互式 UI 用户旅程**。紧密结合屏幕界面与前端交互（点击、校验、跳转、弹窗、通知），跨越具体的客户端（`portal`, `admin`, `mobile`）。
  - **`04-solution-strategy/` (解决方案策略):** 宏观架构策略：架构模式选型（Clean Architecture, DDD, 事件驱动, 微服务 vs 单体）、数据分片（SQL vs NoSQL）、多级缓存策略与 Mermaid 数据流图。
  - **`05-building-blocks/` (构建块视图 / C4 容器与组件):** 静态系统分解（C4 模型）：微服务划分、核心模块职责、内部依赖拓扑。
  - **`06-runtime/` (运行时视图):** 核心场景的动态运行时交互：时序图 (*Sequence Diagram*)、系统启动时序、同步/异步调用、并发分布式锁机制。
  - **`07-deployment/` (部署视图):** 服务器拓扑、多环境配置（Dev, Staging, Prod）、容器化编排（K8s/Docker）、网络网关（VPC, CDN, API Gateway）与 CI/CD 流水线。
  - **`08-cross-cutting/` (横切关注点):** 全局统一的技术标准：
    - `security.md`: 认证鉴权（RBAC/ABAC）、数据加密、OWASP 防御标准。
    - `integration.md`: 服务间通信规则与三方 API 集成（REST, gRPC, Webhook, 重试与熔断）。
    - `observability.md`: 集中式日志、性能指标监控与分布式追踪（OpenTelemetry）。
    - `conventions.md`: 代码规范、Git 提交规范、PR 审查流程。
    - `configuration.md`: 环境变量管理与秘钥安全管理。
  - **`09-decisions/` (架构决策记录 — ADR):** 归档正式的技术决策记录（`ADR-{NNN}-{slug}.md`），记录背景、备选方案评估、决策理由及后果，确保团队理解“为什么这么做”。
  - **`10-quality/` (质量目标与非功能性需求 — NFR):** 量化非功能指标：P95/P99 响应延迟、吞吐量 (RPS)、可用性 (99.99%)、容灾指标 (RTO/RPO)。
  - **`11-risks/` (风险登记与技术债务):** 持续追踪架构技术风险清单 (*Risk Register*) 与技术债务偿还规划。
  - **`12-glossary/` (统一通用语言术语表):** 统一定义专业术语与核心业务名词，消弭 PO、BA、开发、测试与 AI 之间的认知歧义。
  - **`model/` (数据模型与 C4 DSL):**
    - `data-models.md`: 实体关系模型（Mermaid `erDiagram`），定义表结构、字段、主外键及约束。
    - `workspace.dsl`: 遵循 C4 模型的 Structurizr DSL 系统架构模型。
- **职责范围：** 全局技术灯塔，保障所有团队成员与 AI Agent 产出高度一致的代码规范。
- **主要协作角色：** 架构师、技术主管 (Tech Lead)。

### 3. `surfaces/` — 应用端、功能特性与扁平架构
- **内容构成：** 管理所有用户交互规范，细分为不同的端（`admin`, `portal`, `mobile`）、业务功能模块（`CMP-*`）以及扁平单层页面/功能（`<feature-slug>/`）。
- **精简 `common/` 架构（扁平单层 .md）：**
  - 在 `surfaces/common/`: 存放**全系统共享**规范，以扁平 `.md` 文件管理（无 `patterns/`, `yaml/`, `code/`, `data-model/` 子目录）。包含：UI Patterns, `model-data.md`, `model-derived-data.md`, `api-health.md`, `ui-empty-state.md`。
  - 在 `surfaces/<surface>/common/` 或 `<module>/common/`: （可选）存放该端或模块专属规范。**为空时在 VitePress 侧边栏自动隐藏**。
- **`user-flows/` 架构与归属规则（Step 1 归属法则）：**
  - **`surfaces/` 根层及 `<surface>/` 根层不再放置 `user-flows/`**：
    - **系统全域 / 跨端流**：集中存放于 [`architecture/03-user-flows/FLOW-*.md`](../../architecture/03-user-flows/)，以技术时序图 (*sequenceDiagram*) 呈现。
    - **模块业务流**：存放于 `surfaces/<surface>/<module>/user-flows/FLOW-*.md`。
    - **Step 1 归属法则**：流程第 1 步所在的模块拥有该流程及其 scenarios 的归属权。
    - 模块 `user-flows/` 目录**在为空时自动在 VitePress 侧边栏隐藏**。
- **模块页面结构（扁平单层 1-Tier Flat）：**
  - 模块内所有屏幕/功能直接平铺在第 1 层：`surfaces/<surface>/<module>/<feature-slug>/`（不采用 `01/01/02` 等多级数字）。
  - 子屏幕/弹窗（创建、编辑、详情、抽屉）在 spec §1 Overview 中明确说明访问流转路径（例：“从列表页 ➔ 点击 [新增] 按钮”）。
- **主要协作角色：** BA、前端工程师、后端工程师、QA。

### 4. `.flowgrid/registries/` — 共享能力与组件注册表 (Workspace SSOT)
- **内容构成：** 机器可读的 JSON 字典文件（`design.registry.json`, `codegen.registry.json`），集中维护在工作区 SSOT 中，绝不污染业务代码仓库。
- **职责范围：**
  - 编目已实现的 UI 组件库与布局容器。
  - 编目后端已有服务能力与接口端点。
  - 指引 AI Agent 识别已有资产，优先复用现有组件，避免重复生成代码。

### 5. `qa/` — 协作与业务疑点澄清收件箱
- **内容构成：** 维护 `qa/index.md`，汇总各模块待澄清问题（*Open Questions*）。
- **职责范围：**
  - 开发或测试人员在阅读规格说明时，记录发现的业务逻辑盲区。
  - BA 或产品负责人在此针对问题进行澄清确认，并使用 `/qa-resolve` 进行归档。
  - 确保每一个疑问在功能开发关闭前都有迹可循地解决。

---

## 工作区代码仓库说明

| 目录路径 | 访问权限 | 用途与约束规则 |
| :--- | :--- | :--- |
| **`source-code/`** | **读写 (Read / Write)** | 存放生产代码仓库（前端、后端、微服务）。所有自动生成的代码与手动改动均提交于此。 |
| **`source-legacy/`** | **严格只读 (READ-ONLY)** | 存放老系统旧代码，供重构和系统升级时考古参考。**严禁修改该目录或从中随意复制粘贴代码。** |
