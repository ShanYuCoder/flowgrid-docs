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

| Category | Description | Processing Rule | Docs Hub & DSL Registry 配置 |
| :--- | :--- | :--- | :--- |
| **Category 1: Native Project Commons** | Components/services already built in the project and reused across screens/routes (e.g., custom Breadcrumb, custom Delete Flow, custom BaseService). | **Strict Code-First**: Retain existing code as SSOT. Do NOT regenerate or overwrite code. Document native contract (props, slots, events, methods) as the official spec and register into DSL Registry with `status: "implemented"`. | `<LCA>/common/patterns/<id>.md`<br>+ DSL Registry (`status: implemented`) |
| **Category 2: Tool Pattern Overlap** | A native component serves the same purpose as a FlowGrid standard common pattern (e.g. Breadcrumb, Confirm Dialog, Pagination). | **Smart Selective Choice**: **Always prioritize native project code over tool pattern**. Never overwrite project files. Document the project's existing implementation as the SSOT standard and register into DSL Registry with `status: "implemented"`. | `<LCA>/common/patterns/<id>.md`<br>+ DSL Registry (`status: implemented`) |
| **Category 3: Duplicate Candidates** | 抽象化なしで 2 箇所以上にコピー＆ペーストされたロジック/UI（例: アドホックな削除モーダルや重複したページネーションコード）。 | **Common Action Plan（新規機能・今後の更新向け）**：`common-plan.md` にフラグを立て、**新規機能および今後の更新が利用するための**単一の正規共通実装を `shared/` に生成する。**既存の古いコードの修正・リファクタリングは厳禁**。ここからの重複発生を防止する。**DSL Registry に `status: "planned"` として事前登録**。 | `<LCA>/common/patterns/<id>.md` 承認後に生成<br>+ DSL Registry (`status: planned` ➔ `implemented`) |
| **Category 4: Common Gaps** | Standard enterprise capabilities absent in the project (e.g. no standard confirmation dialog, unhandled error format). | **Adopt Tool Standard**: The pre-synced tool pattern in `surfaces/common/` is retained and cataloged as the official recommendation for the team to adopt. | Cataloged in `surfaces/common/` & inventory §5.4 |

### Selective Reconciliation Heuristic
When an overlap is detected between existing project code (e.g. `src/components/Breadcrumb.vue` or custom `DeleteDialog.vue`) and FlowGrid's synced base patterns:
- The Agent verifies the native file exists and functions.
- The Agent **preserves the project's native implementation as the single source of truth**, taking the project's contract rather than forcing the tool's generic pattern.
- If the project already has its own implementation, any placeholder pattern from the tool is safely superseded by the project's version.

### 4.1. ルール: 専用共通アクションプラン (`common-plan.md`) の策定 ＆ DSL Registry 登録連携

ディープスキャン中、共通コンポーネントが分析された場合、または重複候補（Duplicate Candidates）が検出された場合、`/init` はワークスペース直下に具体的で実行可能なアクションプランファイル `common-plan.md` を必ず生成しなければならない。

> [!CRITICAL] 核心思想: 今後の重複を防止する — 既存コードの遡及的リファクタリングは行わない
> - **コードファースト＆安全性最優先**：`"ここからの重複発生を防止し、既存の旧コードは一切変更しない"`（Prevent duplication moving forward; strictly zero-touch on existing running code）。
> - **Existing Commons（既存の共通コード）**：`shared/` または `components/Common/` に既に存在するコンポーネント。アクション：Markdown 仕様書（`<LCA>/common/patterns/<id>.md`）のみを作成し、DSL Registry（`status: "implemented"`）に登録する。**コードの再生成や上書きは厳禁。**
> - **Duplicate Candidates（複数箇所の重複候補コード）**：2 箇所以上で重複コピーされ抽象化されていないロジック。アクション：`shared/`（`shared/components/` または `shared/services/`）に **1 つの標準化された正規コード実装** + `.md` 仕様書を生成する。**`/init` 時に `status: "planned"` として DSL Registry に事前登録**。
> - **共通コードの目的**：**新規機能**および今後の**更新**時にインポートして再利用できるよう準備しておくこと。
> - **絶対的な安全境界**：**重複が発見された既存の旧コードファイルを変更・接触・リファクタリングすることは厳禁！** 稼働中の旧コードは 100% そのまま保持し、本番機能のリグレッションリスクを完全に排除する。

> [!IMPORTANT] 双方向 DSL Registry 登録メカニズム（実装済みおよび計画中の Common 双方を登録）
> - **すべての Common はワークスペース SSOT DSL Registry**（FE: `.flowgrid/registries/design.registry.json`, BE: `.flowgrid/registries/be-capabilities.registry.json`）に登録されなければならない。
> - **既存 Common (`status: "implemented"`)**: 実装コードパス (`path`)、DSL タグ（`#ui: <Name>`, `#pattern: <ID>`, `#reuse-api: <ID>`）、Docs 仕様パスを登録。
> - **重複候補 / 計画中 Common (`status: "planned"`)**: **`/init` 時に `status: "planned"` として事前登録**。`shared/` 配下の予定コードパス、DSL タグ（`#pattern: <ID>`, `#ui: <Name>`）、予定 Docs パスを保持。
> - **DSL 相乗効果**: `/spec`, `/update-spec`, DSL コード解析エンジンが計画された共通コンポーネント（`#pattern: <ID>`, `#ui: <Name>`）を即座に認識・参照可能となり、アドホックな `#needs-component` や重複コピペの発生を未然に防止。`/common <CMN-ID>` 実行時に共有コードが生成されると、レジストリステータスが `planned` ➔ `implemented` に自動昇格。

#### `common-plan.md` の標準構造とスキーマ

Agent は以下の正確な構造に従って `common-plan.md` を生成しなければならない：

```markdown
# Common Action Plan (Duplicate Mitigation & Provisioning SSOT)

> **Generated by**: `/init` | **Scan Date**: YYYY-MM-DD | **Sources Config**: `.flowgrid/config.json`
> **Core Principle**: **ここからの重複発生を防止し、既存の旧コードは一切変更しない。** (Prevent future duplication; strictly zero-touch on existing running code).

## 1. Safety Boundary & Execution Rules
- **Rule 1 (Existing Commons)**: base/shared 内の既存コンポーネントを確認 ➔ .md 仕様のみを作成し、DSL Registry に `status: "implemented"` で登録。コードの再生成や上書きは行わない。
- **Rule 2 (Duplicate Candidates)**: 2 箇所以上で重複しているコードを確認 ➔ `shared/` に 1 つの正規実装 + .md 仕様を生成し、DSL Registry に `status: "planned"` で事前登録。**新規機能および今後の更新で使用**する。
- **Rule 3 (Strict Zero Mutation on Old Code)**: **重複が発見された既存の旧コードは一切変更・リファクタリングしない**。すべてのエビデンスファイルは 100% 保持される。
- **Rule 4 (DSL Registry Integration)**: 既存 Common (`status: implemented`) と重複候補 (`status: planned`) の双方を DSL Registry (`design.registry.json` / `be-capabilities.registry.json`) に登録し、`/spec` から即座に再利用可能にする。

## 2. Duplicate Candidates Action Plan Table
| ID | Tên thành phần & Mô tả | Code cũ bị trùng lặp (Evidence) | Surface / Owning Repo | Target Code Path (`shared/`) | Target Docs Path (`patterns/<id>.md`) | DSL Registry Target & Status | Public Contract (Props / State Matrix) | Action / Safety Boundary | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CMN-UI-003` | Advanced Date Range Filter | • `OrdersPage.tsx:45-80`<br>• `AuditLogsPage.tsx:32-67` | `admin` (`admin-fe`) | `admin-fe/src/components/Common/DateRangeFilter.tsx` | `surfaces/admin/common/patterns/CMN-UI-003.md` | `design.registry.json`<br>(Tag: `#pattern: CMN-UI-003`, `#ui: DateRangeFilter`, `status: planned` ➔ `implemented`) | Props: `value`, `presets`, `onChange`<br>States: Loading, Empty, Active | **Provision Only**: 承認時に Target Code Path にコード生成。OrdersPage や AuditLogsPage の編集は厳禁。 | `PENDING_APPROVAL` |
| `CMN-API-002` | Transmission Logger | • `PreBookingController.php:12-40`<br>• `OTAController.php:88-115` | `core-api` (`core-api`) | `core-api/app/Services/Common/TransmissionLogger.php` | `surfaces/common/patterns/CMN-API-002.md` | `be-capabilities.registry.json`<br>(Tag: `#reuse-api: CMN-API-002`, `status: planned` ➔ `implemented`) | Interface: `logTransmission(payload, status)` | **Provision Only**: 承認時に Target Code Path にコード生成。旧 Controller の編集は厳禁。 | `PENDING_APPROVAL` |

## 3. Existing Commons Documentation Plan Table
| ID | Tên thành phần & Mô tả | File code hiện hữu (Existing Path) | Surface / Owning Repo | Target Docs Path (`patterns/<id>.md`) | Target DSL Registry & Status | Action | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CMN-UI-001` | Breadcrumb Navigation | `admin-fe/src/components/Breadcrumb.vue` | `admin` (`admin-fe`) | `surfaces/admin/common/patterns/CMN-UI-001.md` | `design.registry.json`<br>(Tag: `#pattern: CMN-UI-001`, `#ui: Breadcrumb`, `status: implemented`) | **Spec Only**: Markdown 仕様を生成し登録。コードは変更しない。 | `READY_FOR_SPEC` |
| `CMN-API-001` | BaseServiceImpl | `core-api/app/Services/Impl/BaseServiceImpl.php` | `core-api` (`core-api`) | `surfaces/common/patterns/CMN-API-001.md` | `be-capabilities.registry.json`<br>(Tag: `#reuse-api: CMN-API-001`, `status: implemented`) | **Spec Only**: Markdown 仕様を生成し登録。コードは変更しない。 | `READY_FOR_SPEC` |

## 4. Execution Workflow
1. **Pre-Registration**: `/init` が既存 Common (`status: "implemented"`) と重複候補 (`status: "planned"`) を DSL Registry に事前登録。
2. **インタラクティブな起動 (Interactive Kick-off)**: `/init` は GUI 質問モーダル (`AskQuestion`) を自動起動し、メンバーに今すぐ共通プランを実行するかどうかを確認する。
3. **実行パス**:
   - **パス A (即時実行 - 推奨)**: メンバーが「はい」を選択した場合、Agent は直ちに `shared/` に重複候補用コードを生成し、全 Common の `.md` 仕様書を作成し、DSL Registry のステータスを即座に `planned` ➔ `implemented` に昇格する。
   - **パス B (後で確認)**: メンバーが「いいえ」を選択した場合、メンバーはまず `common-plan.md` を確認し、後で `/common` または `/common <CMN-ID>` で実行する。
4. **安全境界の徹底**: いずれのパスにおいても、重複が見つかった既存の旧コードは一切変更またはリファクタリングしない。
```

---

### 4.2. ルール: 初期化後の対話型共通プラン起動（GUI 質問モーダル）

アーキテクチャディープスキャンが完了し、`inition-inventory.md` と `common-plan.md` が生成され、すべての Common が DSL Registries に登録された直後：
`common-plan.md` に何らかの Common 項目（`READY_FOR_SPEC` 状態の既存 Common または `PENDING_APPROVAL` 状態の重複候補）が含まれている場合、Agent は単に処理を終了したり手動コマンドの入力を受動的に待ったりしては**ならない**。
Agent は `AskQuestion` ツールを使用して対話型 GUI モーダルを能動的に起動し、メンバーに共通プランを今すぐ実行するかどうかを尋ねなければ**ならない**：

#### GUI 質問モーダルの仕様（`AskQuestion`）
- **質問タイトル (Question)**:
  `"アーキテクチャスキャンと共通コンポーネント計画（common-plan.md）が正常に生成されました！今すぐ共通コンポーネント計画を実行しますか？"`
- **選択肢 1 (推奨 - Recommended)**:
  `"(推奨) はい、今すぐ共通プランを実行します — 既存の共通コンポーネントの Markdown 仕様を自動生成し、重複候補用に shared/ 配下に共通コードを生成します"`
- **選択肢 2**:
  `"いいえ、まずは common-plan.md を確認します — 後で /common を呼び出します"`

#### 自動実行パス：

1. **パス A — メンバーが選択肢 1（「はい、今すぐ共通プランを実行します」）を選択した場合：**
   - Agent は、追加のプロンプトを求めることなく、`common-plan.md` に記載された全項目に対して `/common` 実行パイプラインにスムーズに切り替える：
     - **既存 Common (`status: "implemented"`):**
       - `<LCA>/common/patterns/<CMN-ID>.md` に Markdown ユーザーストーリー仕様書を自動生成する（契約、4つの標準状態、IoC、ゴールデンテストシームの4層標準に準拠）。
       - DSL Registry (`design.registry.json` または `be-capabilities.registry.json`) のエントリが `status: "implemented"` であることを確認する。
       - **絶対的な安全境界：** 既存の稼働中コードは一切変更・再生成しない。
       - `common-plan.md` 内のステータスを `COMPLETED` に更新する。
     - **重複候補 (`status: "planned"`):**
       - 完全な公開契約（props、状態マトリクス、エラーハンドリング）を備えた 1 つの正規かつクリーンな共通実装を `shared/` (`<Target Code Path>`) に生成する。
       - `<Target Docs Path>` に Markdown ユーザーストーリー仕様書を自動生成する。
       - DSL Registry エントリのステータスを `status: "planned"` ➔ `status: "implemented"` に昇格する（`shared/` 配下の新規コードパスを指し、`/spec` から即時再利用可能）。
       - **絶対的な安全境界：** 重複が検出された旧コードファイルは一切変更・リファクタリングしない。エビデンスコードは 100% 保持される。
       - `common-plan.md` 内のステータスを `COMPLETED` に更新する。
   - `common-plan.md` の実行サマリー表と完了タイムスタンプを更新する。
   - 生成された Markdown 仕様書、共通コンポーネントコード、DSL Registries へのクリック可能なリンクを含む完了報告をメンバーに提示する。

2. **パス B — メンバーが選択肢 2（「いいえ、まずは common-plan.md を確認します」）を選択した場合、またはスキップした場合：**
   - `/init` の実行を正常に完了する。
   - 生成された init 成果物（`inition-inventory.md`、`common-plan.md`、Arc42 アーキテクチャ文書、DSL Registries）のサマリーを提示する。
   - メンバーに案内する：*「いつでも `common-plan.md` を確認でき、準備ができ次第 `/common` または `/common <CMN-ID>` を実行できます。」*

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
| **B** | Surface-shared | `### B — Shared on one surface` | `surfaces/<surface>/user-flows/FLOW-*.md` |
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
### 5.1 Native Project Commons (Code-First Priority — 仕様のみ)
> プロジェクト内で既に構築されているコンポーネントおよびサービス。コードベースを変更することなく、公式 SSOT 仕様としてカタログ化され、`status: "implemented"` で DSL Registry に登録されます。
- **CMN-UI-001 (Breadcrumb)**: ネイティブのパンくずナビゲーションコンポーネント → コード: `admin-fe/src/components/Breadcrumb.vue` → ドキュメント: `surfaces/admin/common/patterns/CMN-UI-001.md` → DSL Registry: `design.registry.json` (`#pattern: CMN-UI-001`, `status: implemented`)
- **CMN-UI-002 (Delete Confirmation Flow)**: 再利用可能な削除確認モーダル → コード: `admin-fe/src/components/Common/DeleteConfirmModal.vue` → ドキュメント: `surfaces/admin/common/patterns/CMN-UI-002.md` → DSL Registry: `design.registry.json` (`#pattern: CMN-UI-002`, `status: implemented`)
- **CMN-API-001 (Pagination Wrapper)**: 標準化されたページネーションレスポンスエンベロープ → コード: `backend-api/src/common/dto/pagination.dto.ts` → ドキュメント: `surfaces/common/patterns/CMN-API-001.md` → DSL Registry: `be-capabilities.registry.json` (`#reuse-api: CMN-API-001`, `status: implemented`)

### 5.2 Duplicate Candidates（新規機能・今後の更新向けに `shared/` へコード準備 — `common-plan.md` 参照）
> 2 箇所以上で検出された重複ロジック。**新規機能および今後の更新で利用するため**、`shared/` に単一の共通実装を作成するアクションプラン（`common-plan.md`）が必要。**重複が見つかった既存の旧コードの修正・リファクタリングは厳禁**。`/spec` が即座に認識できるよう、DSL Registry に `status: "planned"` として事前登録。
- **CMN-UI-003 (Advanced Date Range Filter Toolbar)**:
  - *Evidence*: `OrdersPage.tsx`, `AuditLogsPage.tsx`
  - *Target Code Path*: `admin-fe/src/components/Common/DateRangeFilter.tsx`
  - *Target Docs Path*: `surfaces/admin/common/patterns/CMN-UI-003.md`
  - *DSL Registry Target*: `design.registry.json` (`#pattern: CMN-UI-003`, `#ui: DateRangeFilter`, 承認後に `status: planned` ➔ `implemented`)
  - *Safety Boundary*: 新規コードの事前準備のみ。すべての旧エビデンスファイルは 100% 保持。

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
- [ ] `common-plan.md` が生成され詳細計画が含まれていること；すべての Common（既存は `status: implemented`、重複候補は `status: planned`）が DSL Registry (`design.registry.json` / `be-capabilities.registry.json`) に登録されていること。
- [ ] init 完了時に対話型 GUI モーダル (`AskQuestion`) が表示され、メンバーに共通プランの即時実行を促すこと。
- [ ] Missing common capabilities flagged with recommendation to use `flowgrid add base-common`.
- [ ] All IDs follow standard format: `CMP-*`, `W-*`, `API-*`, `FLOW-*`, `CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`.
- [ ] Output prose written in `docsProseLocale` and headings in `structureLocale` (per `config.json`).

