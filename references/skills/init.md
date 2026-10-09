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

## 4. Rule: Code-First Common Reconciliation Matrix (Native Project vs Tool Patterns)

> [!IMPORTANT]
> **CODE-FIRST PRIORITY PRINCIPLE**: Existing project code is ALWAYS the single source of truth. FlowGrid generic templates must NEVER overwrite, delete, or supersede working code in the project.

During the deep scan, the Agent MUST categorize all discovered commons into the following 4 categories:

| Category | Description | Processing Rule | Docs Hub Placement |
| :--- | :--- | :--- | :--- |
| **Category 1: Native Project Commons** | Components/services already built in the project and reused across screens/routes (e.g., custom Breadcrumb, custom Delete Flow, custom BaseService). | **Strict Code-First**: Retain existing code as SSOT. Do NOT regenerate or overwrite code. Document native contract (props, slots, events, methods) as the official spec. | `<LCA>/common/patterns/<id>.md` (e.g. `surfaces/common/patterns/breadcrumb.md`) |
| **Category 2: Tool Pattern Overlap** | A native component serves the same purpose as a FlowGrid standard common pattern (e.g. Breadcrumb, Confirm Dialog, Pagination). | **Smart Reconciliation**: Offer user choice via `AskQuestion`. Default: **Retain Native Implementation**. Never silently overwrite with tool templates. | `<LCA>/common/patterns/<id>.md` |
| **Category 3: Duplicate Candidates** | Logic/UI copy-pasted across 2+ locations without an abstraction (e.g. ad-hoc delete modals or duplicate pagination code). | **Common Action Plan**: Flag in `common-plan.md` for refactoring into a single shared implementation in `shared/`. | `<LCA>/common/patterns/<id>.md` upon approval |
| **Category 4: Common Gaps** | Standard enterprise capabilities absent in the project (e.g. no standard confirmation dialog, unhandled error format). | **On-Demand Recommendation**: Document in inventory under `5.4 Common Recommendations & Gaps`. User can adopt FlowGrid's catalog via `flowgrid add base-common`. | Cataloged on demand |

### Conflict Resolution Wizard Prompt (AskQuestion Heuristic)
When an overlap is detected between existing project code (e.g. `webbeds`'s `src/components/Breadcrumb.vue` or custom `DeleteDialog.vue`) and FlowGrid's standard base catalog:
- The Agent informs the user:
  - *Detected Native Implementation:* `<path-to-file>`
  - *Standard Catalog Equivalent:* FlowGrid `<pattern-id>`
- The Agent prompts via `AskQuestion`:
  - **Option 1 (Recommended):** `(Recommended) Retain & Document Native Implementation (Use project's own code as workspace SSOT, no file modifications)`
  - **Option 2:** `Standardize on FlowGrid Base Pattern (Import FlowGrid's recommended base pattern via 'flowgrid add base-common')`

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
### 5.1 Native Project Commons (Code-First Priority)
> Components and services already built in the project. These are cataloged as official SSOT patterns without modifying codebase.
- **CMN-UI-001 (Breadcrumb)**: Native breadcrumb navigation component → `admin-fe/src/components/Breadcrumb.vue`
- **CMN-UI-002 (Delete Confirmation Flow)**: Reusable delete modal with confirmation input → `admin-fe/src/components/Common/DeleteConfirmModal.vue`
- **CMN-API-001 (Pagination Wrapper)**: Standard paginated response envelope → `backend-api/src/common/dto/pagination.dto.ts`

### 5.2 Duplicate Candidates (Refactoring Plan Required)
> Duplicate logic found across 2+ locations. Requires an action plan (`common-plan.md`) to create a single shared implementation in `shared/`.
- **CMN-UI-003**: Advanced Date Range Filter Toolbar → Duplicated in: `OrdersPage.tsx`, `AuditLogsPage.tsx`

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
- [ ] `common-plan.md` generated ONLY for duplicate candidates requiring shared refactoring.
- [ ] Missing common capabilities flagged with recommendation to use `flowgrid add base-common`.
- [ ] All IDs follow standard format: `CMP-*`, `W-*`, `API-*`, `FLOW-*`, `CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`.
- [ ] Output prose written in `docsProseLocale` and headings in `structureLocale` (per `config.json`).
