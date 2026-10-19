---
name: init
description: "/init — Discover code repositories, map them to logical surfaces in .flowgrid/config.json, and perform a deep multi-layer scan of frontend and backend architectures."
disable-model-invocation: true
extractBundle: architecture-core
---

> [!CRITICAL] MANDATORY PRE-FLIGHT
> **[MANDATORY]** Re-read this entire `SKILL.md` via file-read tool. STRICTLY FORBIDDEN to rely on memory. All harness skills MUST be authored in English only.

# /init — Repository Discovery, Deep Architecture Scan & Smart Common Reconciliation

> **[LANGUAGE RULE]** The Agent MUST read `.flowgrid/config.json` to determine the output language.
> - **Content/Prose:** MUST be written in the language specified by `docsLanguage.docsProseLocale` (e.g., `vi` for Vietnamese). Do NOT output prose in English unless `docsProseLocale` is `en`.
> - **Structure/Headings/Keys:** MUST use the language specified by `docsLanguage.structureLocale` (typically `en` for global standard keys/labels).

**Audit Interlock:** Run `flowgrid audit legacy <target-id>`. Consume JSON gap report to verify mapping or prompt member if index is missing.

**Handoff SSOT spec:** After init, member drills [spec-ssot-prep.md](../../../docs/workflows/spec-ssot-prep.md) — Phase 0 → `/legacy /spec` per `W-*` (do not jump straight to a bundle whose ID is not in the inventory).

**Inventory template:** Section layout + **user-flow placement tiers** (cross-surface → `architecture/03-user-flows/`).

---

## 1. Initial Discovery & Execution Mode

- **[MANDATORY]** At the start of `/init`, the Agent **MUST** run `flowgrid repo-maps auto-scan --json` in the terminal to discover internal repositories in the workspace, and accept external repository paths provided by the user in chat.
- **[MANDATORY]** The Agent **MUST** prompt the Member via `AskQuestion` wizard (or parse command flags) to select the scan mode:
  - **Option 1 (Recommended):** `(Recommended) Full Deep Init (Map Repos to Surfaces in config.json + Deep Multi-Layer Scan for Frontend & Backend Architectures & Commons)`
  - **Option 2:** `Greenfield / Mapping Only (Map Repos to Surfaces in config.json, skip code analysis)`

---

## 2. Rule: Repository Discovery & Surface Mapping

- **[MANDATORY]** Before scanning code, the Agent MUST ask the user how to group discovered/provided repositories into logical `surfaces`.
  - In SaaS apps, one physical repo (e.g., `admin-web`) may serve multiple logical surfaces (e.g., `admin`, `tenant`).
  - Or, multiple repos (e.g., `admin-fe`, `client-fe`, `api`) must be mapped together.
- **[MANDATORY]** The Agent MUST present a **Draft Plan (JSON)** of the `projects` and `surfaces` blocks:
  - `projects`: Each repo's `path` (relative to workspace), `role`, `technology`.
  - `surfaces`: Logical names mapping to `frontend` and `backend` project IDs.
- **[MANDATORY]** Once the user approves the Draft Plan, the Agent MUST update `.flowgrid/config.json` directly.
- **[GREENFIELD]** If Option 2 is selected (Greenfield), the Agent stops here and outputs a clean success message (no `inition-inventory.md` is generated, or just an empty placeholder).

---

## 3. Rule: Multi-Layer Deep Scan Procedure (Heavyweight Code Analysis)

The Agent MUST NOT perform a shallow scan of file names or route tables. In Full Init mode, the Agent MUST execute a rigorous, multi-layer inspection across both Frontend and Backend layers:

### A. Frontend Layer Deep Scan (Page & Component Hierarchy)
The Agent MUST inspect router configurations, layout templates, view containers, and shared component kits to extract:
1. **Layout Shell & Global Chrome:**
   - Navigation header, sidebar, topbar, user profile menu, breadcrumb component/slot, footer, locale/theme switcher.
   - Layout slots and layout-switching mechanisms (e.g., Auth layout vs Dashboard layout).
2. **Page & Container Architecture:**
   - Route trees (`routes.ts`, `router/index.js`, file-based routes in Nuxt/Next).
   - Route navigation guards (auth check, role/permission authorization, query parameter preservation).
   - View types: List/Index views, Detail/Overview views, Form/Wizard views, Settings pages.
3. **Reusable UI Component Kits & Design System:**
   - Inspect existing shared directories (e.g., `src/components/common/`, `src/shared/components/`, `components/ui/`).
   - Identify active UI library foundation: Tailwind CSS, Ant Design, Element Plus, Vuetify, Material UI, PrimeNG, Bootstrap, or custom styling.
   - Reusable elements: Data tables/grids, pagination controls, search toolbars, filter dropdowns, status badges/chips, form inputs, date-range pickers, file uploaders.
4. **Interactive Action & Feedback Flows:**
   - Confirmation dialogs (especially "Delete Flow" or "Confirm Action" dialogs).
   - Form modals vs slide-over drawer panels.
   - Feedback alerts, toast notifications, snackbars, and loading skeletons.

### B. Backend Layer Deep Scan (Service, API & Middleware Architecture)
The Agent MUST inspect controllers, router definitions, middleware/guards, service layers, and data models to extract:
1. **Routing & Controller Boundaries:**
   - API endpoints, HTTP method decorators (`@Get`, `@Post`, `@Put`, `@Delete`), route prefixes, and API versioning (`/api/v1/`).
   - Request DTOs / Schemas and validation layers (Zod, Class-Validator, Pydantic, Joi, Laravel FormRequests).
2. **Security & Cross-Cutting Guards:**
   - Authentication mechanisms: JWT bearer token validation, session cookies, OAuth2/OIDC.
   - Authorization & Access Control: RBAC role checks, permission decorators, tenant isolation guards.
   - Rate limiting, CORS configurations, security headers.
3. **Core Business Abstractions & Data Layer:**
   - Base CRUD patterns: `BaseService`, `GenericRepository`, Unit of Work, or Domain Handlers.
   - Database ORM entities, schemas, table relationships, and soft-delete/audit columns (`created_by`, `updated_at`, `deleted_at`).
4. **Standard Envelopes & Error Handling:**
   - Pagination response envelope structure (e.g., `{ data: [...], pagination: { page, pageSize, total } }` vs `{ items: [...], totalCount: 100 }`).
   - Unified error response formatting (e.g., `{ success: false, code: 'ERR_NOT_FOUND', message: '...' }`).
   - Global exception filters and HTTP interceptors.
5. **Cross-Cutting & External Integrations:**
   - Background job queues (BullMQ, Celery, Laravel Queue), webhook handlers.
   - 3rd-party integration services (S3/OSS file storage, Stripe/Payment gateway, Twilio/SMS, SendGrid/Email).

### C. Behavioral Fingerprinting & Architectural Aliases (Zero Name-Bias)

> [!IMPORTANT]
> **ZERO NAME-BIAS DIRECTIVE**: Do NOT rely on naive keyword matching or exact filenames (e.g. grepping solely for `*Breadcrumb*` or `*Controller*`). Teams use diverse naming conventions, composables/hooks, or architectural patterns (Clean Arch, ADR, CQRS, Hexagonal). The Agent MUST identify patterns through **Behavioral Signatures, Props/State Contracts, and Framework Decorators**.

#### 1. Frontend Semantic Fingerprints & Architectural Aliases

| Semantic Pattern | Behavioral Signature & Contract (What it does) | Common Architectural Aliases & Implementations |
| :--- | :--- | :--- |
| **Breadcrumb Navigation** | Renders hierarchical route sequence, accepts an array of `{ label/title, to/path/href }`, renders separators (chevron/slash), or inspects router meta (`useRoute().matched`). | `Breadcrumbs.vue`, `CrumbTrail.tsx`, `PathIndicator.vue`, slot inside `PageHeader.vue` / `AppShell.vue`, or composable `useBreadcrumb()`. |
| **Danger / Delete Action Flow** | Prompts user before destructive actions (delete, revoke, cancel), has warning copy, confirmation & cancel triggers, danger button variant, and handles async deletion loading/toast. | `DeleteConfirmModal.vue`, `DangerDialog.tsx`, composable `useConfirm()`, or UI library wrapper like `ElMessageBox.confirm()` / `Modal.confirm()`. |
| **Data Table & Pagination** | Binds dataset (`items`/`data`/`rows`) to column definitions (`columns`), handles sorting, row selection, and pagination events (`page`, `pageSize`, `total`, `@page-change`). | `DataTable.vue`, `ProTable.tsx`, `SmartGrid.vue`, `ListingTable.vue`, `RecordList.vue`, `PaginatedView.vue`. |
| **Search & Filter Toolbar** | Manages query criteria (keywords, dropdown filters, date pickers), emits filter changes (`@search`, `@filter`, `@reset`), and syncs query params to URL. | `FilterBar.vue`, `SearchToolbar.tsx`, `QueryForm.vue`, `FilterPanel.vue`, `SearchCriteria.vue`. |
| **Status Chip / Badge** | Maps entity states (e.g., active, draft, pending, rejected) to semantic color tokens (success, warning, error, neutral) rendered as pills/tags. | `StatusPill.vue`, `StateBadge.tsx`, `CustomTag.vue`, `StatusIndicator.vue`. |
| **Composite / Embedded Components** | Pattern is not a standalone file, but implemented inline or as a slot inside a parent shell (e.g., Breadcrumb inside `LayoutHeader.vue`). | **Rule**: Document as `Embedded Pattern` within the parent file. Do NOT falsely report as missing! |
| **Hook / Composable Patterns** | Pattern operates purely via stateful logic rather than markup (e.g., `useConfirm()`, `useNotification()`). | **Rule**: Document the Composable contract (arguments, return values, event triggers) as the official SSOT pattern. Do NOT demand a dummy `.vue`/`.tsx` file. |

#### 2. Backend Semantic Fingerprints & Architectural Aliases

| Architectural Layer | Behavioral Signature & Code Structure | Framework & Pattern Aliases |
| :--- | :--- | :--- |
| **API Entrypoint & Routing** | Receives HTTP requests, maps routes and verbs (`GET`, `POST`, `PUT`, `DELETE`), validates input, and returns HTTP responses. | • MVC: `*Controller` (`UserController.ts`)<br>• Clean/Hexagonal: `*Resource` (`OrderResource.java`), `*Endpoint`<br>• ADR (Action-Domain-Responder): `*Action` (`GetUserAction.php`)<br>• Routers/Views: `*_router.py`, `*_view.py`, `user.routes.ts`<br>• GraphQL: `*Resolver` |
| **Business Logic Layer** | Encapsulates domain logic, coordinates data operations, handles transactions; decoupled from raw HTTP context. | `*Service` (`OrderService`), `*UseCase` (`CreateOrderUseCase`), `*Interactor`, `*CommandHandler` (CQRS), `*Manager`, `*Workflow`, `*Pipeline`. |
| **Data Access / Persistence Layer** | Direct database/ORM interactions (SQL, TypeORM, Prisma, Eloquent, SQLAlchemy, Hibernate); provides CRUD and query methods. | `*Repository`, `*DAO` (Data Access Object), `*Gateway`, `*Finder`, `*Mapper`, `*Store`, or ActiveRecord models (`User.find()`). |
| **Security & Auth Guards** | Intercepts requests, validates `Authorization` headers, Bearer JWTs, or session cookies, enforces RBAC roles/permissions, throws 401/403. | `*Guard` (NestJS), `*Middleware` (Express/Laravel), `*SecurityFilter` (Spring), `*Policy`, `Depends(get_current_user)` (FastAPI). |
| **Standard Response Envelope** | Standardized response envelope wrapping lists with pagination metadata: `page`, `pageSize`/`per_page`, `total`/`count`, `has_next`. | `PaginationDto`, `PagedResult<T>`, `PageResponse`, `Envelope<T>`, `ApiResponse`. |
| **Centralized Error Filter** | Catches unhandled exceptions, maps internal errors to HTTP status codes, and formats standard JSON error payloads (`code`, `message`, `errors`). | `GlobalExceptionFilter`, `ErrorHandlerMiddleware`, `ApiExceptionResolver`, `CustomExceptionHandler`. |

---

## 4. Rule: Mandatory Template & Common Sync with Smart Selective Reconciliation

> [!CRITICAL] MANDATORY INIT SYNC & CODE-FIRST RULE
> 1. **Always Sync Templates & Common at Init:** During `/init` (or `flowgrid setup`), the system **MUST ALWAYS sync** global templates (`.flowgrid/templates/`) and base common patterns (`surfaces/common/`) into the target repo/workspace SSOT.
> 2. **Selective Analysis (Favor Project Over Tool):** During the deep scan, the Agent analyzes and reconciles native project code against tool patterns. **If an equivalent component or pattern already exists in the project, ALWAYS use and retain the project's native implementation; NEVER take the tool's implementation or overwrite project code.**

The Agent MUST categorize all commons into the following 4 categories:

| Category | Description | Processing Rule | Docs Hub & DSL Registry 归档 |
| :--- | :--- | :--- | :--- |
| **Category 1: Native Project Commons** | Components/services already built in the project and reused across screens/routes (e.g., custom Breadcrumb, custom Delete Flow, custom BaseService). | **Strict Code-First**: Retain existing code as SSOT. Do NOT regenerate or overwrite code. Document native contract (props, slots, events, methods) as the official spec and register into DSL Registry with `status: "implemented"`. | `<LCA>/common/<id>.md`<br>+ DSL Registry (`status: implemented`) |
| **Category 2: Tool Pattern Overlap** | A native component serves the same purpose as a FlowGrid standard common pattern (e.g. Breadcrumb, Confirm Dialog, Pagination). | **Smart Selective Choice**: **Always prioritize native project code over tool pattern**. Never overwrite project files. Document the project's existing implementation as the SSOT standard and register into DSL Registry with `status: "implemented"`. | `<LCA>/common/<id>.md`<br>+ DSL Registry (`status: implemented`) |
| **Category 3: Duplicate Candidates** | Logic/UI 在 2 处以上重复复制粘贴且无共用抽象（例如临时删除弹窗或重复分页代码）。 | **Common Action Plan（面向新功能与后续更新）**：在 `common-plan.md` 中规划在 `shared/` 中生成规范共用实现，以供**新功能和后续更新使用**。**严格禁止修改或重构既有旧代码**。从此处开始防止重复产生。**预先登记至 DSL Registry，标记 `status: "planned"`**。 | `<LCA>/common/<id>.md` 获批后生成<br>+ DSL Registry (`status: planned` ➔ `implemented`) |
| **Category 4: Common Gaps** | Standard enterprise capabilities absent in the project (e.g. no standard confirmation dialog, unhandled error format). | **Adopt Tool Standard**: The pre-synced tool pattern in `surfaces/common/` is retained and cataloged as the official recommendation for the team to adopt. | Cataloged in `surfaces/common/` & inventory §5.4 |

### Selective Reconciliation Heuristic
When an overlap is detected between existing project code (e.g. `src/components/Breadcrumb.vue` or custom `DeleteDialog.vue`) and FlowGrid's synced base patterns:
- The Agent verifies the native file exists and functions.
- The Agent **preserves the project's native implementation as the single source of truth**, taking the project's contract rather than forcing the tool's generic pattern.
- If the project already has its own implementation, any placeholder pattern from the tool is safely superseded by the project's version.

### 4.1. 规则：制定专属共用行动计划 (`common-plan.md`) 与 DSL Registry 注册集成

在深度扫描期间，当分析通用组件或发现重复候选（Duplicate Candidates）时，`/init` 必须在工作区根目录下生成专属且具体的行动计划文件 `common-plan.md`。

> [!CRITICAL] 核心哲学：从此处开始防止重复 — 绝不进行向后重构
> - **代码优先与安全第一**：`"从此处开始防止重复，绝不修改既有旧代码"`（Prevent duplication moving forward; strictly zero-touch on existing running code）。
> - **Existing Commons（既有共用代码）**：检查 `shared/` 或 `components/Common/` 中已存在的组件。行动：仅规划编写 Markdown 规范文件（`<LCA>/common/<id>.md`）并注册到 DSL Registry（`status: "implemented"`）。**严格禁止重新生成或覆盖代码。**
> - **Duplicate Candidates（多处重复候选代码）**：检查在 2 处以上重复复制且无抽象的逻辑。行动：规划在 `shared/`（`shared/components/` 或 `shared/services/`）中生成 **1 套标准化代码实现** + 生成 `.md` 规范文件。**在 `/init` 阶段以 `status: "planned"` 预先注册至 DSL Registry**。
> - **共用代码的目的**：预先准备就绪，专供**新功能**及未来**更新**时主动导入引用。
> - **绝对安全防线**：**严格禁止修改、触碰或重构发现重复的旧代码文件！** 正在运行的旧代码保持 100% 不变，彻底杜绝线上功能回归故障风险。

> [!IMPORTANT] 双向 DSL Registry 注册机制（包含已实现与计划中的 Common）
> - **所有 Common 必须注册至工作区 SSOT DSL Registry**（FE 对应 `.flowgrid/registries/design.registry.json`，BE 对应 `.flowgrid/registries/be-capabilities.registry.json`）。
> - **既有 Common (`status: "implemented"`)**：注册活跃代码路径 (`path`)、DSL 标签（`#ui: <Name>`, `#pattern: <ID>`, `#reuse-api: <ID>`）及文档规范路径。
> - **重复候选 / 计划中 Common (`status: "planned"`)**：**在 `/init` 阶段以 `status: "planned"` 预先注册**，记录计划的目标代码路径（`shared/`）、DSL 标签（`#pattern: <ID>`, `#ui: <Name>`）及目标文档路径。
> - **DSL 协同效应**：使 `/spec`、`/update-spec` 与 DSL 代码分析引擎能够立即识别并引用计划中的共享组件（`#pattern: <ID>`, `#ui: <Name>`），彻底避免重复创建 ad-hoc `#needs-component` 或复制粘贴重复逻辑。当后续通过 `/common <CMN-ID>` 生成共享代码时，注册项状态自动升级为 `planned` ➔ `implemented`。

#### `common-plan.md` 的标准结构与模式

Agent 必须使用以下精确结构生成 `common-plan.md`：

```markdown
# Common Action Plan (Duplicate Mitigation & Provisioning SSOT)

> **Generated by**: `/init` | **Scan Date**: YYYY-MM-DD | **Sources Config**: `.flowgrid/config.json`
> **Core Principle**: **从此处开始防止重复，绝不修改既有旧代码。** (Prevent future duplication; strictly zero-touch on existing running code).

## 1. Safety Boundary & Execution Rules
- **Rule 1 (Existing Commons)**: 检查 base/shared 中的既有组件 ➔ 仅规划编写 .md 规范，注册至 DSL Registry 并标记 `status: "implemented"`。绝不重新生成或覆盖代码。
- **Rule 2 (Duplicate Candidates)**: 检查在 2 处以上重复的代码 ➔ 规划在 `shared/` 生成 1 套规范实现 + .md 规范，以 `status: "planned"` 预先注册到 DSL Registry，供**新功能和未来更新使用**。
- **Rule 3 (Strict Zero Mutation on Old Code)**: **严格禁止修改或重构既有重复旧代码**。所有证据文件保持 100% 原始状态。
- **Rule 4 (DSL Registry Integration)**: 无论是既有 Common (`status: implemented`) 还是候选 Common (`status: planned`)，均登记到 DSL Registry (`design.registry.json` / `be-capabilities.registry.json`)，以供 `/spec` 立即复用。

## 2. Duplicate Candidates Action Plan Table
| ID | Tên thành phần & Mô tả | Code cũ bị trùng lặp (Evidence) | Surface / Owning Repo | Target Code Path (`shared/`) | Target Docs Path (`<id>.md`) | DSL Registry Target & Status | Public Contract (Props / State Matrix) | Action / Safety Boundary | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CMN-UI-003` | Advanced Date Range Filter | • `OrdersPage.tsx:45-80`<br>• `AuditLogsPage.tsx:32-67` | `admin` (`admin-fe`) | `admin-fe/src/components/Common/DateRangeFilter.tsx` | `surfaces/admin/common/CMN-UI-003.md` | `design.registry.json`<br>(Tag: `#pattern: CMN-UI-003`, `#ui: DateRangeFilter`, `status: planned` ➔ `implemented`) | Props: `value`, `presets`, `onChange`<br>States: Loading, Empty, Active | **Provision Only**: 获批时在 Target Code Path 生成代码。严格禁止修改 OrdersPage 或 AuditLogsPage。 | `PENDING_APPROVAL` |
| `CMN-API-002` | Transmission Logger | • `PreBookingController.php:12-40`<br>• `OTAController.php:88-115` | `core-api` (`core-api`) | `core-api/app/Services/Common/TransmissionLogger.php` | `surfaces/common/CMN-API-002.md` | `be-capabilities.registry.json`<br>(Tag: `#reuse-api: CMN-API-002`, `status: planned` ➔ `implemented`) | Interface: `logTransmission(payload, status)` | **Provision Only**: 获批时在 Target Code Path 生成代码。严格禁止修改旧 Controller。 | `PENDING_APPROVAL` |

## 3. Existing Commons Documentation Plan Table
| ID | Tên thành phần & Mô tả | File code hiện hữu (Existing Path) | Surface / Owning Repo | Target Docs Path (`<id>.md`) | Target DSL Registry & Status | Action | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CMN-UI-001` | Breadcrumb Navigation | `admin-fe/src/components/Breadcrumb.vue` | `admin` (`admin-fe`) | `surfaces/admin/common/CMN-UI-001.md` | `design.registry.json`<br>(Tag: `#pattern: CMN-UI-001`, `#ui: Breadcrumb`, `status: implemented`) | **Spec Only**: 生成 Markdown 规范并注册。代码保持不变。 | `READY_FOR_SPEC` |
| `CMN-API-001` | BaseServiceImpl | `core-api/app/Services/Impl/BaseServiceImpl.php` | `core-api` (`core-api`) | `surfaces/common/CMN-API-001.md` | `be-capabilities.registry.json`<br>(Tag: `#reuse-api: CMN-API-001`, `status: implemented`) | **Spec Only**: 生成 Markdown 规范并注册。代码保持不变。 | `READY_FOR_SPEC` |

## 4. Execution Workflow
1. **Pre-Registration**: `/init` 将既有 Common (`status: "implemented"`) 与重复候选 (`status: "planned"`) 预先登记至 DSL Registry。
2. **交互式引导链路 (Interactive Onboarding Chain)**:
   - `/init` 弹出 GUI 模态窗口 1，询问是否运行 `build-env` 配置容器开发环境。若同意，优先运行 `build-env`。
   - `build-env` 执行完毕（或成员选择跳过）后，弹出 GUI 模态窗口 2，询问是否开始执行 `common-plan.md`。
3. **Common 计划执行路径**:
   - **路径 A (立即执行 - 推荐)**: 若在模态 2 选择“是”，Agent 立即在 `shared/` 为重复候选生成代码，并为所有 Common 编写 `.md` 规范，同时在 DSL Registry 中将状态立即升级为 `planned` ➔ `implemented`。
   - **路径 B (稍后审查)**: 若在模态 2 选择“否”，成员先在 `common-plan.md` 中进行审查，稍后再通过 `/common` 或 `/common <CMN-ID>` 触发。
4. **安全底线强制执行**: 无论选择哪条路径，发现重复的既有旧代码绝对严禁修改或重构。
```

---

### 4.2. 规则：初始化后连续交互式引导链路 (`build-env` ➔ `common`)

在完成深度架构扫描、生成 `inition-inventory.md` 和 `common-plan.md`，并将所有 Common 登记到 DSL Registries 之后：
Agent **严禁**仅仅结束流程或被动等待手动命令。
Agent **必须**通过 `AskQuestion` 模态窗口引导成员完成 2 步连续交互式配置链路：

#### 步骤 1：交互式提问模态 1 — 容器环境构建 (`build-env`)
Agent 主动询问成员是否希望配置并生成本地 Docker 容器运行环境 (`build-env`)：
- **问题标题 (Question)**:
  `"架构扫描与通用组件计划（common-plan.md）已生成完毕！您是否要立即配置容器化开发环境 (build-env)？"`
- **选项 1 (推荐 - Recommended)**:
  `"(推荐) 是，立即执行 build-env — 自动为所有服务生成 Docker Compose、容器配置与运行脚本"`
- **选项 2**:
  `"否，暂时跳过 build-env — 进入下一步"`

**步骤 1 选择处理：**
- **若选择选项 1（“是，立即执行 build-env”）：**
  1. Agent 立即执行 `/build-env` 管线：扫描既有 Dockerfile，按双层优先级解析端口（优先级 1：既有代码配置；优先级 2：框架约定），生成 `docker-compose.yml`、`docker/.env` 以及运行脚本（`frontend-dev.sh`、`backend-dev.sh`）。
  2. `/build-env` 完成后，Agent **立即进入步骤 2**。
- **若选择选项 2（“否，暂时跳过 build-env”）或跳过：**
  Agent 跳过 `build-env` 并**直接进入步骤 2**。

---

#### 步骤 2：交互式提问模态 2 — 通用组件计划启动 (`common`)
若 `common-plan.md` 中包含任何 Common 项（处于 `READY_FOR_SPEC` 的既有 Common 或处于 `PENDING_APPROVAL` 的重复候选），Agent **必须**弹出第 2 个交互式 GUI 模态窗口 (`AskQuestion`)：
- **问题标题 (Question)**:
  `"您是否要立即开始执行通用组件计划 (common-plan.md)？"`
- **选项 1 (推荐 - Recommended)**:
  `"(推荐) 是，立即执行 Common 计划 — 为既有 Common 自动生成 Markdown Specs，并在 shared/ 中为重复候选生成共用代码"`
- **选项 2**:
  `"否，让我先审查 common-plan.md — 稍后我再调用 /common"`

**步骤 2 选择处理：**

1. **路径 A — 成员选择选项 1（“是，立即执行 Common 计划”）：**
   - Agent 无缝切换至 `/common` 执行管线，按顺序处理 `common-plan.md` 中的所有条目，无需重复询问：
     - **针对既有 Common (`status: "implemented"`):**
       - 自动在 `<LCA>/common/<CMN-ID>.md` 生成 Markdown User Stories 规范文件（包含契约、4 种标准状态、IoC 与黄金测试缝 4 层标准）。
       - 确认 DSL Registry (`design.registry.json` 或 `be-capabilities.registry.json`) 中的记录状态为 `status: "implemented"`。
       - **绝对安全底线：** 严禁修改或重新生成既有工作代码。
       - 将 `common-plan.md` 中的条目状态更新为 `COMPLETED`。
     - **针对重复候选 (`status: "planned"`):**
       - 在 `shared/` (`<Target Code Path>`) 生成 1 套规范且干净的共享实现，具备完整的公共契约（props、状态矩阵、错误处理）。
       - 自动在 `<Target Docs Path>` 生成 Markdown User Stories 规范文件。
       - 将 DSL Registry 条目状态升级为 `status: "planned"` ➔ `status: "implemented"`（指向新生成的 `shared/` 代码路径，供 `/spec` 立即复用）。
       - **绝对安全底线：** 严禁修改、触碰或重构发现重复的旧代码文件。证据代码保持 100% 原始状态。
       - 将 `common-plan.md` 中的条目状态更新为 `COMPLETED`。
   - 更新 `common-plan.md` 中的执行汇总表与完成时间戳。
   - 向用户呈现完成祝贺报告，并附带指向环境配置、新生成的 Markdown 规范、共享组件代码与 DSL Registries 的可点击链接。

2. **路径 B — 成员选择选项 2（“否，让我先审查 common-plan.md”）或跳过：**
   - 优雅结束当前初始化会话。
   - 呈现已生成的产物汇总（`inition-inventory.md`、`common-plan.md`、Arc42 架构文档、若已运行的 Docker 环境配置及 DSL Registries）。
   - 提示成员：*“您可以随时审查 `common-plan.md`，并在准备就绪后运行 `/common` 或 `/common <CMN-ID>`。”*

---

## 5. Rule: Dual-Dimension Surface Classification

The Agent MUST NOT perform a shallow surface scan (such as labeling everything generic `web` or `app`). The Agent MUST classify all Surfaces across 2 explicit dimensions:

1. **Dimension 1 — Role / Portal Domain:**
   - `admin` (`ADM`): Super-Admin / Operational Management Portal
   - `chain` (`CHN`): Multi-branch / Franchise / Chain Store Portal
   - `merchant` (`MER`): Seller / Vendor / Merchant Self-service Portal
   - `customer` (`CUS`): End-Customer Portal
   - `driver` (`DRV`): Courier / Delivery / Fulfillment App
   - `staff` (`STF`): Internal Support / Tele-sales Staff Portal
   - `partner` (`PRT`): Third-party B2B / Integration Gateway
2. **Dimension 2 — Channel / Platform:**
   - `web`: SPA / SSR Web Application
   - `app`: Mobile Native / Hybrid App (iOS/Android)
   - `desktop`: Desktop Native / Electron Application
   - `api-gateway`: Public REST / gRPC API Gateway
   - `pos`: Point of Sale Terminal

### Surface Code Declaration
For each Surface detected, the Agent MUST assign:
- **Surface Folder Slug:** e.g., `surfaces/admin`, `surfaces/chain`, `surfaces/customer-web`
- **`surfaceCode`:** 2–4 uppercase letters (e.g., `ADM`, `CHN`, `CUS`, `MER`, `DRV`, `GW`)
- **Dual-Dimension Label:** e.g., `[Role: Operations Admin | Channel: Web SPA]`
- **Mapped Project Path:** Repository or subdirectory path

---

## 6. Rule: Deep Architecture Integration (Arc42 Mapping)

In Full Init mode, the Agent MUST extract core architectural insights from the codebase and distribute them into the docs hub Arc42 structure (`<docs-hub>/architecture/`):
1. **System Overview & Hotspots:** Write to `01-introduction/index.md` (or `overview/index.md`) with a high-level summary, directory map, and risky areas (Hotspots/Blast radius).
2. **Layering & Data Flow:** Write to `04-solution-strategy/index.md` with legacy design patterns (MVC, Repository, Clean Arch) and generate a **Mermaid `graph TB`** showing the end-to-end HTTP request/response flow.
3. **Data Models:** Write to `model/data-models.md` with a **Mermaid `erDiagram`** of the core entities and their relationships.
4. **Workflows:** Extract complex business logic (e.g. Booking, Checkout, Multi-step Approvals) into standalone markdown files inside `03-user-flows/` (DO NOT use the deprecated `03-business-process` folder).
5. **Security & Integrations:** Write to `08-cross-cutting/security.md` (Auth guards, JWT, RBAC) and `08-cross-cutting/integration.md` (3rd-party services like S3, Payment, Notification).
6. **Conventions & Constraints:** Write to `02-constraints/` and `08-cross-cutting/index.md` with coding conventions, legacy constraints, and global helpers.
7. **Tooling & Environments:** Write to `07-deployment/index.md` with CI/CD pipelines, containerization (Docker, Compose), and deployment configurations.

---

## 7. Rule: User Flow Discovery & Placement Tiers

The Agent MUST systematically trace user flows across routers, state stores, form handlers, and API handoffs. Each flow MUST be categorized into one of 3 placement tiers:

| Tier | Label | Subsection in Inventory | Target Docs Hub Path |
| :--- | :--- | :--- | :--- |
| **A** | Cross-surface / Org Catalog | `### A — Cross-surface (org catalog)` | `architecture/03-user-flows/FLOW-*.md` |
| **B** | Surface-shared | `### B — Shared on one surface` | `surfaces/<surface>/<module>/user-flows/FLOW-*.md` |
| **C** | Module / Cluster scope | `### C — Module or cluster scope` | `surfaces/.../CMP-*/user-flows/` |

Each flow entry MUST include:
- **ID & Title:** `FLOW-{SURF}-{DOMAIN}-{NN}` (Standardized ID + Descriptive Title)
- **Tier:** A / B / C
- **Trigger & Entry Point:** Button click, URL route, webhook event, state change
- **Surfaces & Modules involved:** e.g., `admin` (`CMP-ADM-ORD-01`), `customer-web` (`CMP-CUS-CART-01`)
- **Step Sequence:** Ordered sequence connecting UI screens (`W-*`), API calls (`API-*`), and dialog actions
- **Branches & Fallbacks:** Error handling, validation failures, role branching
- **Code Evidence:** Specific files and methods implementing the flow

---

## 7. Rule: Tech Stack & Dependencies Summary

Since members often skip reading raw dependency files, the Agent MUST extract and summarize the tech stack, library versions, and plugins from the project's dependency files (e.g., `package.json`, `composer.json`, `requirements.txt`).
This summary MUST be included in the `inition-inventory.md` under a new section `## 7. Tech Stack & Dependencies`.
- **Purpose**: This summary will act as the context for the `/build-env` skill to generate correct Docker environments.
- **Format**: Flexible (tables, lists, or JSON blocks), as long as it clearly lists the core framework, language version, and key plugins/modules (like mailer, ORM, etc.).

---

## 8. Rule: Output Format (`inition-inventory.md`)

The Agent MUST generate `inition-inventory.md` directly at the workspace root using the following structure:

```markdown
# Core Inition Inventory (Architecture Scan & Common Catalog)

> **Scan Date**: YYYY-MM-DD | **Sources Config**: `.flowgrid/config.json` | **Common Analysis**: [Full Deep Scan]

## 1. Surfaces
- **Admin Portal** (`surfaces/admin`) — `[Role: Operations Admin | Channel: Web SPA]` → Repo: `admin-fe`
- **Customer Web** (`surfaces/customer-web`) — `[Role: End-Customer | Channel: Web SSR]` → Repo: `customer-fe`
- **Core Backend API** (`projects/backend-api`) — `[Role: Central API | Channel: REST API]` → Repo: `backend-api`

## 2. Modules Catalog (`CMP-*`)
- **CMP-ADM-AUTH-01**: Authentication & Identity Management → Legacy: `admin-fe/src/modules/auth/`
- **CMP-ADM-ORD-01**: Order Processing & Fulfillment → Legacy: `admin-fe/src/modules/orders/`

## 3. Screens & API Function Inventory (`W-*`, `API-*`)
### Admin Portal (`surfaces/admin/CMP-ADM-AUTH-01`)
- **W-ADM-AUTH-01**: Admin Login Screen → `admin-fe/src/pages/Login.tsx`
- **API-ADM-AUTH-01**: Admin Login & Token Endpoint → `backend-api/src/controllers/AuthController.ts:login`

## 4. User Flows (`FLOW-*`)
### A — Cross-surface (org catalog) → `architecture/03-user-flows/`
- **FLOW-CUS-CHECKOUT-01**: Multi-channel Order & Checkout Flow — Surfaces: `customer-web`, `admin-portal` — CMPs: `CMP-CUS-CART-01`, `CMP-ADM-ORD-01` — Tier: **A**

### B — Shared on one surface → `surfaces/<surface>/user-flows/`
- **FLOW-ADM-DELETE-01**: Entity Safe Delete & Cascade Confirmation Flow — Surface: `admin-portal` — CMPs: `CMP-ADM-ORD-01` — Tier: **B**

### C — Module / cluster scope → `…/CMP-*/user-flows/`
- **FLOW-ADM-AUTH-RESET-01**: Password Reset with OTP Flow — Surface: `admin-portal` — CMP: `CMP-ADM-AUTH-01` — Tier: **C**

## 5. Common Catalog & Reconciliation
### 5.1 Native Project Commons (Code-First Priority — 仅规范)
> 项目中已经构建的组件与服务。仅作为官方 SSOT 规范编目，不修改现有代码库，并以 `status: "implemented"` 注册至 DSL Registry。
- **CMN-UI-001 (Breadcrumb)**: 原生面包屑导航组件 → 代码: `admin-fe/src/components/Breadcrumb.vue` → 文档: `surfaces/admin/common/CMN-UI-001.md` → DSL Registry: `design.registry.json` (`#pattern: CMN-UI-001`, `status: implemented`)
- **CMN-UI-002 (Delete Confirmation Flow)**: 可复用删除确认弹窗 → 代码: `admin-fe/src/components/Common/DeleteConfirmModal.vue` → 文档: `surfaces/admin/common/CMN-UI-002.md` → DSL Registry: `design.registry.json` (`#pattern: CMN-UI-002`, `status: implemented`)
- **CMN-API-001 (Pagination Wrapper)**: 标准分页响应外壳 → 代码: `backend-api/src/common/dto/pagination.dto.ts` → 文档: `surfaces/common/CMN-API-001.md` → DSL Registry: `be-capabilities.registry.json` (`#reuse-api: CMN-API-001`, `status: implemented`)

### 5.2 Duplicate Candidates (在 `shared/` 中为新功能与后续更新准备代码 — 详见 `common-plan.md`)
> 在 2 处以上发现的重复逻辑。需要行动计划（`common-plan.md`）在 `shared/` 中创建单一共享实现，供**新功能和后续更新使用**。**严格禁止修改或重构存在重复的既有旧代码**。在 DSL Registry 中预先注册标记为 `status: "planned"`，以便 `/spec` 立即识别。
- **CMN-UI-003 (Advanced Date Range Filter Toolbar)**:
  - *Evidence*: `OrdersPage.tsx`, `AuditLogsPage.tsx`
  - *Target Code Path*: `admin-fe/src/components/Common/DateRangeFilter.tsx`
  - *Target Docs Path*: `surfaces/admin/common/CMN-UI-003.md`
  - *DSL Registry Target*: `design.registry.json` (`#pattern: CMN-UI-003`, `#ui: DateRangeFilter`, 获批后由 `status: planned` ➔ `implemented`)
  - *Safety Boundary*: 仅预先生成新代码。所有旧证据文件保持 100% 原始状态。

### 5.3 Whole Page Duplication Warnings
- **W-ADM-USR-01 (Create User)** & **W-ADM-USR-02 (Edit User)**: 90% identical → *Recommendation: Consolidate into single Polymorphic Spec `CMP-ADM-USR-FORM`*

### 5.4 Common Recommendations & Gaps
> Standard enterprise capabilities not found in the codebase.
- **Gap: Audit Logging Interceptor**: No automated change logging across write endpoints.
- **On-Demand Adoption**: To import FlowGrid's recommended base patterns without affecting existing code, run:
  ```bash
  flowgrid add base-common
  ```

## 6. Recommended Golden Sample Module & Template Training
- **Recommended Golden Sample Module**: `<Path to reference module, e.g.: admin-fe/src/modules/orders>`
  - *Rationale*: Clean layered architecture, complete CRUD operations, standard validation and error handling.
- **Template Training Command**:
  ```bash
  flowgrid build-template-code --sample=<sample-module-path>
  ```

## 7. Tech Stack & Dependencies
- **Core Framework**: e.g., Laravel 10 / Next.js 14 / FastAPI
- **Language**: PHP 8.2 / Node 20 / Python 3.10
- **Key Plugins/Extensions (requiring OS/system-level installation)**:
  - PHP: `php-mbstring`, `pdo_mysql`, `gd`
  - Python: `opencv-python`, `yolo3`
  - Node: `node-gyp` dependencies, `canvas`
```

---

## 9. Verification Checklist

- [ ] AskQuestion wizard triggered for mode selection.
- [ ] Surface discovery mapped and written to `.flowgrid/config.json`.
- [ ] Multi-layer deep scan performed across both Frontend (pages, UI kits, layouts) and Backend (routes, guards, services).
- [ ] Code-First Principle respected: Existing project components (e.g. Breadcrumbs, Delete flow) documented as SSOT; NEVER overwritten.
- [ ] Arc42 architectural documents updated in `<docs-hub>/architecture/` (Mermaid diagrams included).
- [ ] User flows classified across tiers **A / B / C** in Section 4.
- [ ] `common-plan.md` 已生成，包含详细计划；所有 Common（既有 common 标记 `status: implemented`，重复候选标记 `status: planned`）均已注册到 DSL Registry (`design.registry.json` / `be-capabilities.registry.json`)。
- [ ] init 完成时依次执行连续交互式 GUI 模态链路（先通过 `AskQuestion` 询问 `build-env`，完成后再通过 `AskQuestion` 询问 `common-plan`）。
- [ ] Missing common capabilities flagged with recommendation to use `flowgrid add base-common`.
- [ ] All IDs follow standard format: `CMP-*`, `W-*`, `API-*`, `FLOW-*`, `CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`.
- [ ] Output prose written in `docsProseLocale` and headings in `structureLocale` (per `config.json`).

