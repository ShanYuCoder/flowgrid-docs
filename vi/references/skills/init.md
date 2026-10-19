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

| Category | Description | Processing Rule | Vị trí Docs Hub & DSL Registry |
| :--- | :--- | :--- | :--- |
| **Category 1: Native Project Commons** | Components/services already built in the project and reused across screens/routes (e.g., custom Breadcrumb, custom Delete Flow, custom BaseService). | **Strict Code-First**: Retain existing code as SSOT. Do NOT regenerate or overwrite code. Document native contract as official spec and register into DSL Registry with `status: "implemented"`. | `<LCA>/common/<id>.md`<br>+ DSL Registry (`status: implemented`) |
| **Category 2: Tool Pattern Overlap** | A native component serves the same purpose as a FlowGrid standard common pattern (e.g. Breadcrumb, Confirm Dialog, Pagination). | **Smart Selective Choice**: **Always prioritize native project code over tool pattern**. Never overwrite project files. Document project implementation and register into DSL Registry with `status: "implemented"`. | `<LCA>/common/<id>.md`<br>+ DSL Registry (`status: implemented`) |
| **Category 3: Duplicate Candidates** | Logic/UI copy-pasted qua 2+ nơi mà chưa có abstraction (ví dụ modal xóa riêng lẻ hoặc code phân trang bị lặp lại). | **Common Action Plan (Cho tính năng MỚI & UPDATE)**: Ghi vào `common-plan.md` để sinh 1 bản cài đặt dùng chung chuẩn trong `shared/` cho **các tính năng MỚI và đợt UPDATE sau này sử dụng**. **TUYỆT ĐỐI KHÔNG sửa hay refactor code cũ**. **Đăng ký trước vào DSL Registry với `status: "planned"`**. | `<LCA>/common/<id>.md` sau khi phê duyệt<br>+ DSL Registry (`status: planned` ➔ `implemented`) |
| **Category 4: Common Gaps** | Các năng lực chuẩn doanh nghiệp còn thiếu trong dự án (ví dụ chưa có confirm dialog chuẩn, format lỗi không nhất quán). | **Áp dụng Tool Standard**: Pattern chuẩn được sync sẵn trong `surfaces/common/` được giữ lại và đề xuất cho team áp dụng. | Lưu trong `surfaces/common/` & inventory §5.4 |

### Heuristic hòa giải có chọn lọc (Selective Reconciliation)
Khi phát hiện sự trùng lặp giữa code có sẵn của dự án (ví dụ `src/components/Breadcrumb.vue` hoặc `DeleteDialog.vue`) và các pattern base của FlowGrid:
- Agent kiểm tra file native có tồn tại và hoạt động hay không.
- Agent **bảo toàn cài đặt native của dự án làm Single Source of Truth**, lấy contract của dự án thay vì ép theo pattern chung chung của tool.
- Nếu dự án đã có implementation riêng, bất kỳ placeholder pattern nào từ tool sẽ được nhường chỗ cho phiên bản của dự án.

### 4.1. Quy tắc: Lập Kế hoạch Common chi tiết (`common-plan.md`) & Tích hợp DSL Registry

Trong quá trình deep scan, `/init` BẮT BUỘC phải tạo file kế hoạch hành động chi tiết `common-plan.md` tại thư mục gốc workspace khi phân tích các thành phần dùng chung hoặc phát hiện duplicate candidates.

> [!CRITICAL] TRIẾT LÝ CỐT LÕI: NGĂN CHẶN DUPLICATE TƯƠNG LAI — KHÔNG REFACTOR CODE CŨ
> - **Code-First & Safety First**: `"Ngăn chặn duplicate từ đây chứ không sửa duplicate code cũ."`
> - **Existing Commons (Code đã có sẵn)**: Kiểm tra các component đã có trong `shared/` hoặc `components/Common/`. Hành động: Chỉ lên kế hoạch viết file tài liệu spec Markdown (`<LCA>/common/<id>.md`) và đăng ký vào DSL Registry với `status: "implemented"`. **TUYỆT ĐỐI KHÔNG sinh lại code, KHÔNG ghi đè code.**
> - **Duplicate Candidates (Code trùng lặp nhiều nơi)**: Kiểm tra logic bị copy-paste qua 2+ nơi mà chưa có abstraction. Hành động: Lập kế hoạch sinh **1 bản cài đặt mã nguồn chuẩn duy nhất vào `shared/`** (`shared/components/` hoặc `shared/services/`) + sinh file spec Markdown. Đăng ký trước vào DSL Registry với `status: "planned"`.
> - **Mục đích sử dụng**: Sẵn sàng phục vụ cho các **tính năng MỚI** và các đợt **UPDATE** sau này chủ động import dùng chung.
> - **BẢO TOÀN TUYỆT ĐỐI**: **TUYỆT ĐỐI KHÔNG sửa, không chạm vào hay refactor code cũ nơi phát hiện trùng lặp!** Mã nguồn cũ đang chạy phải giữ nguyên 100% để loại bỏ rủi ro regression.

> [!IMPORTANT] ĐĂNG KÝ DSL REGISTRY BẮT BUỘC (CẢ CÓ CODE LẪN CHƯA CÓ CODE)
> - **Toàn bộ Commons BẮT BUỘC phải đăng ký vào DSL Registry tại Workspace SSOT** (`.flowgrid/registries/design.registry.json` cho FE, `.flowgrid/registries/be-capabilities.registry.json` cho BE).
> - **Existing Commons (`status: "implemented"`)**: Đăng ký với đường dẫn file code đang chạy (`path`), thẻ DSL (`#ui: <Name>`, `#pattern: <ID>`, `#reuse-api: <ID>`), và file docs spec.
> - **Duplicate Candidates / Planned Commons (`status: "planned"`)**: **Đăng ký trước trong `/init` với `status: "planned"`** kèm Target Code Path dự kiến trong `shared/`, thẻ DSL (`#pattern: <ID>`, `#ui: <Name>`), và Target Docs Path.
> - **Tác dụng với DSL**: Giúp `/spec`, `/update-spec` và bộ sinh mã DSL nhận diện được ngay component này để gắn thẻ `#pattern: <ID>`, `#ui: <Name>` mà không bị sinh ra các component tạm `#needs-component` hoặc copy-paste lặp lại. Khi chạy `/common <CMN-ID>` sinh code xong, registry entry sẽ tự động được promote từ `planned` ➔ `implemented`.

#### Cấu trúc & Định dạng chuẩn của `common-plan.md`

Agent BẮT BUỘC phải tạo `common-plan.md` theo đúng cấu trúc sau:

```markdown
# Common Action Plan (Duplicate Mitigation & Provisioning SSOT)

> **Generated by**: `/init` | **Scan Date**: YYYY-MM-DD | **Sources Config**: `.flowgrid/config.json`
> **Core Principle**: **Ngăn chặn duplicate từ đây chứ không sửa duplicate code cũ.** (Prevent future duplication; strictly zero-touch on existing running code).

## 1. Safety Boundary & Execution Rules
- **Rule 1 (Existing Commons)**: Kiểm tra code có sẵn trong base/shared ➔ Chỉ lên kế hoạch viết file .md spec. Đăng ký vào DSL Registry với `status: "implemented"`. KHÔNG sinh hay ghi đè code.
- **Rule 2 (Duplicate Candidates)**: Kiểm tra code trùng lặp qua 2+ nơi ➔ Lên kế hoạch sinh 1 bản cài đặt chuẩn trong `shared/` + file .md spec phục vụ cho **tính năng MỚI và các đợt UPDATE sau này**. Đăng ký trước vào DSL Registry với `status: "planned"`.
- **Rule 3 (Strict Zero Mutation on Old Code)**: **TUYỆT ĐỐI KHÔNG sửa hay refactor code cũ nơi phát hiện trùng lặp**. Toàn bộ file evidence được giữ nguyên 100%.
- **Rule 4 (Tích hợp DSL Registry)**: Cả Existing Commons (`status: implemented`) và Duplicate Candidates (`status: planned`) đều được đưa vào DSL Registry để phục vụ tái sử dụng DSL ngay cho `/spec`.

## 2. Duplicate Candidates Action Plan Table
| ID | Tên thành phần & Mô tả | Code cũ bị trùng lặp (Evidence) | Surface / Owning Repo | Target Code Path (`shared/`) | Target Docs Path (`<id>.md`) | DSL Registry Target & Status | Public Contract (Props / State Matrix) | Action / Safety Boundary | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CMN-UI-003` | Advanced Date Range Filter | • `OrdersPage.tsx:45-80`<br>• `AuditLogsPage.tsx:32-67` | `admin` (`admin-fe`) | `admin-fe/src/components/Common/DateRangeFilter.tsx` | `surfaces/admin/common/CMN-UI-003.md` | `design.registry.json`<br>(Tag: `#pattern: CMN-UI-003`, `#ui: DateRangeFilter`, `status: planned` ➔ `implemented`) | Props: `value`, `presets`, `onChange`<br>States: Loading, Empty, Active | **Provision Only**: Sinh code tại Target Code Path khi Approve. TUYỆT ĐỐI KHÔNG sửa OrdersPage hay AuditLogsPage. | `PENDING_APPROVAL` |
| `CMN-API-002` | Transmission Logger | • `PreBookingController.php:12-40`<br>• `OTAController.php:88-115` | `core-api` (`core-api`) | `core-api/app/Services/Common/TransmissionLogger.php` | `surfaces/common/CMN-API-002.md` | `be-capabilities.registry.json`<br>(Tag: `#reuse-api: CMN-API-002`, `status: planned` ➔ `implemented`) | Interface: `logTransmission(payload, status)` | **Provision Only**: Sinh code tại Target Code Path khi Approve. TUYỆT ĐỐI KHÔNG sửa các legacy controller. | `PENDING_APPROVAL` |

## 3. Existing Commons Documentation Plan Table
| ID | Tên thành phần & Mô tả | File code hiện hữu (Existing Path) | Surface / Owning Repo | Target Docs Path (`<id>.md`) | Target DSL Registry & Status | Action | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CMN-UI-001` | Breadcrumb Navigation | `admin-fe/src/components/Breadcrumb.vue` | `admin` (`admin-fe`) | `surfaces/admin/common/CMN-UI-001.md` | `design.registry.json`<br>(Tag: `#pattern: CMN-UI-001`, `#ui: Breadcrumb`, `status: implemented`) | **Spec Only**: Viết file .md User Stories & đăng ký registry. Giữ nguyên code. | `READY_FOR_SPEC` |
| `CMN-API-001` | BaseServiceImpl | `core-api/app/Services/Impl/BaseServiceImpl.php` | `core-api` (`core-api`) | `surfaces/common/CMN-API-001.md` | `be-capabilities.registry.json`<br>(Tag: `#reuse-api: CMN-API-001`, `status: implemented`) | **Spec Only**: Viết file .md User Stories & đăng ký registry. Giữ nguyên code. | `READY_FOR_SPEC` |

## 4. Execution Workflow
1. **Đăng ký trước**: `/init` đăng ký Existing Commons (`status: "implemented"`) và Duplicate Candidates (`status: "planned"`) vào DSL Registry.
2. **Chuỗi khởi chạy tương tác (Interactive Onboarding Chain)**:
   - `/init` hiển thị GUI Modal 1 hỏi member có muốn chạy `build-env` để thiết lập môi trường container phát triển hay không. Nếu có, Agent chạy `build-env` trước.
   - Khi `build-env` hoàn thành (hoặc nếu member chọn bỏ qua), Agent hiển thị GUI Modal 2 hỏi member có muốn bắt đầu thực thi Kế hoạch Common ngay bây giờ không.
3. **Các luồng thực thi Kế hoạch Common**:
   - **Luồng 1 (Thực thi ngay - Khuyến nghị)**: Nếu chọn Yes ở Modal 2, Agent chuyển sang thực thi Kế hoạch Common ngay: tự động sinh Markdown Specs cho Existing Commons (không sửa code cũ), sinh 1 bản cài đặt chuẩn vào `shared/` + Markdown Spec cho Duplicate Candidates, và promote trạng thái trong DSL Registry từ `planned` ➔ `implemented`.
   - **Luồng 2 (Xem lại trước)**: Nếu chọn No ở Modal 2, member xem xét lại `common-plan.md` và có thể kích hoạt bằng lệnh `/common` hoặc `/common <CMN-ID>` bất kỳ lúc nào.
4. **Bảo toàn an toàn tuyệt đối**: Trong mọi trường hợp, code cũ nơi phát hiện trùng lặp tuyệt đối KHÔNG bao giờ bị sửa đổi hay refactor.
```

---

### 4.2. Quy tắc: Chuỗi Khởi Chạy Tương Tác Sau Init (`build-env` ➔ `common`)

Ngay sau khi hoàn thành deep scan kiến trúc, sinh file `inition-inventory.md` và `common-plan.md`, đồng thời đăng ký các common vào DSL registries:
Agent **TUYỆT ĐỐI KHÔNG** chỉ dừng lại và chờ lệnh thủ công một cách thụ động.
Agent **BẮT BUỘC** phải dẫn dắt member qua chuỗi 2 bước hỏi tương tác bằng modal `AskQuestion`:

#### Bước 1: Modal GUI Hỏi Bước 1 — Thiết lập Môi trường Phát triển (`build-env`)
Agent chủ động hỏi member có muốn cấu hình và khởi tạo môi trường chạy container Docker cục bộ (`build-env`) hay không:
- **Tiêu đề câu hỏi (Question)**:
  `"Đã hoàn thành phân tích kiến trúc và tạo Kế hoạch Common (common-plan.md). Bạn có muốn thiết lập môi trường container phát triển (build-env) ngay bây giờ không?"`
- **Lựa chọn 1 (Khuyến nghị - Recommended)**:
  `"(Khuyến nghị) Có, chạy build-env ngay — Tự động tạo Docker Compose, cấu hình container và scripts khởi chạy cho các service"`
- **Lựa chọn 2**:
  `"Không, bỏ qua build-env — Chuyển sang bước tiếp theo"`

**Xử lý lựa chọn ở Bước 1:**
- **Nếu chọn Lựa chọn 1 ("Có, chạy build-env ngay"):**
  1. Agent thực thi ngay quy trình `/build-env`: khảo sát Dockerfile hiện có, giải quyết cổng theo 2 tầng ưu tiên (Ưu tiên 1: port trong code cũ; Ưu tiên 2: quy ước framework), sinh `docker-compose.yml`, `docker/.env`, các scripts (`frontend-dev.sh`, `backend-dev.sh`).
  2. Ngay sau khi `/build-env` hoàn thành, Agent **lập tức chuyển sang Bước 2** bên dưới.
- **Nếu chọn Lựa chọn 2 ("Không, bỏ qua build-env") hoặc bỏ qua:**
  Agent bỏ qua `build-env` và **chuyển thẳng sang Bước 2**.

---

#### Bước 2: Modal GUI Hỏi Bước 2 — Khởi chạy Kế hoạch Common (`common`)
Nếu `common-plan.md` có chứa BẤT KỲ mục common nào (Existing Commons với `READY_FOR_SPEC` hoặc Duplicate Candidates với `PENDING_APPROVAL`), Agent **BẮT BUỘC** bật tiếp modal GUI thứ 2:
- **Tiêu đề câu hỏi (Question)**:
  `"Bạn có muốn bắt đầu thực thi Kế hoạch Common (common-plan.md) ngay bây giờ không?"`
- **Lựa chọn 1 (Khuyến nghị - Recommended)**:
  `"(Khuyến nghị) Có, thực thi Kế hoạch Common ngay — Tự động sinh Markdown Specs cho Common có sẵn và khởi tạo code dùng chung trong shared/ cho các ứng viên trùng lặp"`
- **Lựa chọn 2**:
  `"Không, để tôi xem lại common-plan.md trước — Tôi sẽ gọi /common sau"`

**Xử lý lựa chọn ở Bước 2:**

1. **Luồng A — Khi Member chọn Lựa chọn 1 ("Có, thực thi Kế hoạch Common ngay"):**
   - Agent chuyển tiếp mượt mà sang quy trình thực thi `/common` cho toàn bộ danh mục trong `common-plan.md` mà không cần người dùng phải gõ thêm câu lệnh:
     - **Đối với Existing Commons (`status: "implemented"`):**
       - Tự động sinh file tài liệu Markdown User Stories tại `<LCA>/common/<CMN-ID>.md` (tuân thủ chuẩn 4 lớp: contract, 4 canonical states, IoC, golden test seam).
       - Xác nhận thông tin trong DSL Registry (`design.registry.json` hoặc `be-capabilities.registry.json`) với `status: "implemented"`.
       - **BẢO TOÀN AN TOÀN TUYỆT ĐỐI:** Tuyệt đối KHÔNG sửa, KHÔNG ghi đè mã nguồn hiện có.
       - Cập nhật trạng thái mục trong `common-plan.md` thành `COMPLETED`.
     - **Đối với Duplicate Candidates (`status: "planned"`):**
       - Khởi tạo 1 bản cài đặt mã nguồn chuẩn duy nhất vào `shared/` (`<Target Code Path>`) với đầy đủ public contract (props, state matrix, xử lý lỗi).
       - Tự động sinh file Markdown User Stories tại `<Target Docs Path>`.
       - Thăng cấp trạng thái trong DSL Registry từ `status: "planned"` ➔ `status: "implemented"` (trỏ đến đường dẫn code mới trong `shared/`, sẵn sàng cho `/spec` tái sử dụng ngay).
       - **BẢO TOÀN AN TOÀN TUYỆT ĐỐI:** Tuyệt đối KHÔNG chỉnh sửa, chạm vào hoặc refactor các file code cũ nơi phát hiện trùng lặp. Các file evidence giữ nguyên 100%.
       - Cập nhật trạng thái mục trong `common-plan.md` thành `COMPLETED`.
   - Cập nhật bảng tổng kết thực thi trong `common-plan.md` kèm thời gian hoàn thành.
   - Báo cáo kết quả chúc mừng tới người dùng kèm các liên kết nhấp được (clickable links) tới file cấu hình môi trường, các file Markdown specs vừa tạo, các component code dùng chung và DSL registries.

2. **Luồng B — Khi Member chọn Lựa chọn 2 ("Không, để tôi xem lại common-plan.md trước") hoặc bỏ qua:**
   - Kết thúc phiên làm việc một cách gọn gàng.
   - Trình bày tóm tắt các sản phẩm đã khởi tạo (`inition-inventory.md`, `common-plan.md`, tài liệu Arc42, cấu hình Docker nếu đã chạy, và DSL registries).
   - Nhắc nhở member: *"Bạn có thể xem lại `common-plan.md` bất cứ lúc nào và kích hoạt `/common` hoặc `/common <CMN-ID>` khi sẵn sàng."*

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
| **B** | Module User Flows (Step 1 Ownership) | `### B — Module User Flows (Step 1 Ownership)` | `surfaces/<surface>/<module>/user-flows/FLOW-*.md` |

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

### 5.2 Duplicate Candidates (Lên kế hoạch sinh code vào `shared/` cho tính năng MỚI & UPDATE — xem `common-plan.md`)
> Logic bị trùng lặp qua 2+ nơi. Bắt buộc lập Action Plan (`common-plan.md`) để sinh 1 bản cài đặt chuẩn trong `shared/` cho **các tính năng MỚI và đợt UPDATE sau này sử dụng**. **TUYỆT ĐỐI KHÔNG sửa hay refactor code cũ nơi phát hiện trùng lặp** — ngăn chặn duplicate từ đây chứ không sửa duplicate code cũ.
- **CMN-UI-003 (Advanced Date Range Filter Toolbar)**:
  - *Evidence*: `OrdersPage.tsx`, `AuditLogsPage.tsx`
  - *Target Code Path*: `admin-fe/src/components/Common/DateRangeFilter.tsx`
  - *Target Docs Path*: `surfaces/admin/common/CMN-UI-003.md`
  - *Safety Boundary*: Chỉ sinh mã nguồn mới. Toàn bộ file evidence giữ nguyên 100%.

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
- [ ] `common-plan.md` được sinh với kế hoạch chi tiết cho Duplicate Candidates (chuẩn bị sẵn trong shared/ cho tính năng mới/update, không sửa code cũ) và Existing Commons (chỉ viết spec .md).
- [ ] Chuỗi hỏi tương tác GUI modal (`AskQuestion` cho `build-env`, sau đó đến `AskQuestion` cho `common-plan`) được kích hoạt ngay khi hoàn tất init.
- [ ] Missing common capabilities flagged with recommendation to use `flowgrid add base-common`.
- [ ] All IDs follow standard format: `CMP-*`, `W-*`, `API-*`, `FLOW-*`, `CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`.
- [ ] Output prose written in `docsProseLocale` and headings in `structureLocale` (per `config.json`).

