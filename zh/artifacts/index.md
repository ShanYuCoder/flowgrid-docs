# 工作区结构与 SSOT 核心资产 (Artifacts)

当运行 `flowgrid setup [workspace]` 并启动 `pnpm docs:dev`（或 `flowgrid dev`）时，FlowGrid 会在本地生成标准化的 **SSOT（单一事实源）** 架构骨架。

VitePress 文档中心直接读取本地磁盘上的这些目录与 Markdown 文件，使整个跨职能团队（产品经理/BA、前端/后端开发、QA、架构师）能够在统一的事实标准下无缝协同。

---

## 本地磁盘目录全局概览

```text
my-workspace/
├── overview/               # 产品愿景、业务核心目标与发布里程碑
├── architecture/           # 系统技术架构设计文档（遵循 Arc42 标准与 ERD 模型）
├── surfaces/               # 应用端 (Surfaces)、功能模块、通用模式与业务流 (User Flows)
│   ├── common/             # [动态作用域] 可复用的 UX 规范、通用模式及共享 DTO
│   ├── user-flows/         # [动态作用域] 跨页面及跨端的端到端用户业务旅程
│   └── <surface-name>/     # 具体业务端（admin 后台、portal 门户、mobile 移动端等）
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
    > **与 `surfaces/user-flows/` 的明确界限：**
    > - **`architecture/03-user-flows/`** 代表**系统宏观流（System Context）**。描述服务间、子系统间或三方系统间的数据流转与处理生命周期（如银企对账、ERP 异步同步、MQ 事件驱动）。关注数据协议与交互逻辑——**完全独立于具体的 UI 界面**。
    > - **`surfaces/user-flows/`** 代表**交互式 UI 用户旅程**。紧密结合屏幕界面与前端交互（点击、校验、跳转、弹窗、通知），跨越具体的客户端（`portal`, `admin`, `mobile`）。
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

### 3. `surfaces/` — 应用端、功能特性与动态作用域
- **内容构成：** 管理所有用户交互规范，细分为不同的端（`admin`, `portal`, `mobile`）、业务功能模块（`CMP-*`）以及原子页面叶子节点（`W-*`）。
- **`common/` 与 `user-flows/` 的多级动态作用域：**
  这两个目录**不是固定在单一根目录下**，而是具有动态作用域，可以在从 `surfaces/` 到具体 `surface` 或 `module` 的任意层级根据复用需求动态建立：
  - **`common/` (作用域共享资产):**
    - 在 `surfaces/common/`: **全系统共享**（全局 UI 规范、统一表单校验规则、通用确认对话框）。
    - 在 `surfaces/<surface>/common/`: **该端内共享**（例如仅管理端后台专用的通用布局与过滤工具栏）。
    - 在 `<module>/common/`: **该业务模块内共享**（例如仅订单模块专用的状态胶囊标签与高级检索器）。
    - 存放 UI Patterns、校验规则、DTO 与布局，彻底杜绝无序复制代码。
  - **`user-flows/` (作用域业务旅程):**
    - 包含端到端多步业务流规范（`FLOW-*.md`）：
      - 在 `surfaces/user-flows/`: 记录**跨端的端到端流**（如用户在 `portal` 购物 ➔ 管理员在 `admin` 审核出库）。
      - 在 `surfaces/<surface>/user-flows/`: 记录**单端内跨模块**的业务旅程。
      - 在 `<module>/user-flows/`: 记录**单模块内的多步业务向导**（如 3 步下单流程）。
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
