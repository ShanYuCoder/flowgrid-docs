# Workspace Structure & SSOT Artifacts

When executing `flowgrid setup [workspace]` and launching `pnpm docs:dev` (or `flowgrid dev`), FlowGrid generates a standardized **SSOT (Single Source of Truth)** architecture skeleton.

The VitePress web interface directly reads these directories and Markdown files on the local machine so the entire cross-functional team (BA, Dev, QA, Lead) collaborates and aligns on a unified source of truth.

---

## On-Disk Directory Overview

```text
my-workspace/
├── overview/               # Product vision, business objectives, and release milestones
├── architecture/           # System architecture documentation (Arc42 standard & ERD models)
├── surfaces/               # Application surfaces, screen modules & common
│   ├── common/             # UI Patterns, model-data, rules across system (1-tier flat .md)
│   └── <surface-name>/     # Specific business surface (admin, portal, mobile, etc.)
│       ├── common/         # (Optional) Surface-scoped common (auto-hidden if empty)
│       └── <module-name>/  # Feature module (CMP-*)
│           ├── common/     # (Optional, auto-hidden if empty)
│           ├── user-flows/ # User flows with Step 1 starting in this module (auto-hidden if empty)
│           └── <feature>/  # Screen/feature (1-tier flat, holds bundle.yaml & spec.md)
├── .flowgrid/registries/   # Design Tokens, UI Components, and Backend Capabilities registries
├── qa/                     # Collaboration inbox for clarifying business open questions & risks
├── source-code/            # Active production codebases (Git Submodules)
└── source-legacy/          # Legacy codebases for archaeological reference (STRICTLY READ-ONLY)
```

---

## Directory Roles in the Documentation Hub

### 1. `overview/` — Product Vision & Release Scope
- **Contents:** Contains `overview/index.md` outlining the overall product specification.
- **Responsibilities:**
  - Defines business goals and the core problems the product solves.
  - Classifies user groups (*Actors & Personas*).
  - Establishes feature scope boundaries per release milestone (Release Scope / Milestones).
- **Primary Stakeholders:** Product Owner (PO), Business Analyst (BA), Project Manager.

### 2. `architecture/` — System Architecture (Arc42 Standard)
- **Contents:** An international standard Arc42 technical architecture framework featuring **12 specialized sections** alongside core data models:
  - **`01-introduction/` (Introduction, Goals & Hotspots):** System context overview, core business goals, technical boundaries, and high-risk hotspot analysis (*Technical Hotspots* / high-load bottlenecks, highly complex business modules).
  - **`02-constraints/` (Architecture Constraints):** Invariant technical constraints: mandatory technology stacks, hardware limits, network topology, budget limits, legal compliance standards (GDPR, ISO, PCI-DSS), and organizational governance conventions.
  - **`03-user-flows/` (System Context & Macro Business Workflows):**
    > **Clear Distinction from `surfaces/<surface>/<module>/user-flows/`:**
    > - **`architecture/03-user-flows/`** represents **Macro System Flows / System Context**. Describes data operational lifecycles between services, bounded contexts, subsystems, or third-party integrations (e.g., banking reconciliation cycles, order sync to ERP, async event-driven processing via Message Queues). Focuses on protocols, data logic, and inter-system interactions — **completely independent of any user interface or screens**.
    > - Conversely, **`surfaces/<surface>/<module>/user-flows/`** represents **Interactive UI User Journeys**. Tightly coupled with screens and frontend interactions (button clicks, form validations, navigation transitions, modals, notifications) traversing across application surfaces (`portal`, `admin`, `mobile`).
  - **`04-solution-strategy/` (Solution Strategy):** Strategic decisions shaping the macro architecture: architectural pattern selection (Clean Architecture, DDD, Event-Driven, Microservices vs Monolith), data partitioning strategy (SQL vs NoSQL), multi-layer caching, and data flow diagrams (*Data Flow Mermaid*).
  - **`05-building-blocks/` (Building Block View / C4 Containers & Components):** Static structural decomposition of the system (C4 Model): services, modules, internal libraries, individual block responsibilities, and static dependency relationships.
  - **`06-runtime/` (Runtime View):** Dynamic runtime behaviors and component interactions during critical scenarios: sequence diagrams (*Sequence Diagram*), system bootstrap workflows, sync/async communication models, and concurrency lock handling.
  - **`07-deployment/` (Deployment View):** Physical/virtual server topology, environments (Dev, Staging, Production), containerization (Docker, Kubernetes), network configuration (VPC, Load Balancer, CDN, API Gateway), and CI/CD pipelines.
  - **`08-cross-cutting/` (Cross-Cutting Concepts):** Unified technical standards applied system-wide:
    - `security.md`: Authentication, authorization (RBAC/ABAC), data encryption (at-rest & in-transit), OWASP defense standards.
    - `integration.md`: Internal service communication rules and third-party integrations (REST, gRPC, Webhooks, Retry policies, Circuit Breakers).
    - `observability.md`: Centralized structured logging, performance metrics, and distributed tracing (OpenTelemetry).
    - `conventions.md`: Coding conventions, naming standards, Git commit guidelines, and PR review workflows.
    - `configuration.md`: Environment variables management, secrets vault security (Vault, Secrets Manager), and dynamic configuration rules.
  - **`09-decisions/` (Architecture Decision Records — ADR):** Stores formal architecture decision records (`ADR-{NNN}-{slug}.md`). Documents context, evaluated options, chosen rationales, and consequences — ensuring the entire team understands the "why" behind technical choices.
  - **`10-quality/` (Quality Goals & NFRs):** Quantified Non-Functional Requirements (NFRs): response latency (p95, p99), throughput capacity (RPS), high availability (99.99%), scalability limits, and disaster recovery objectives (RTO/RPO).
  - **`11-risks/` (Risks & Technical Debt — Risk Register):** Tracks architectural risks (*Risk Register*), potential bottlenecks, and technical debt registries (*Technical Debt*) along with mitigation plans and remediation roadmaps.
  - **`12-glossary/` (Ubiquitous Language Glossary):** Standardizes team-wide terminology: defines precise technical terms and domain business nouns, ensuring PO, BA, Dev, QA, and AI Agents share identical semantics and eliminate cognitive misunderstandings.
  - **`model/` (Data Models & C4 DSL):**
    - `data-models.md`: Entity-relationship diagrams (`erDiagram` Mermaid) mapping tables, fields, primary/foreign keys, and constraints.
    - `workspace.dsl`: System architecture model adhering to C4 standard written in Structurizr DSL.
- **Responsibilities:** Comprehensive technical roadmap guiding system standards, guaranteeing developers and AI Agents build homogenous code without conflicting conventions.
- **Primary Stakeholders:** Solution Architect, Technical Lead.

### 3. `surfaces/` — Application Surfaces, Features & Flat Structure
- **Contents:** Manages all user interface specifications and interactive workflows, partitioned into specific surfaces (`admin`, `portal`, `mobile`, etc.), feature modules (`CMP-*`), and flat 1-tier screens/features (`<feature-slug>/`).
- **Streamlined `common/` Structure (Flat 1-Tier .md):**
  - At `surfaces/common/`: Holds shared rules for the **entire system** as flat `.md` files (no subdirectories `patterns/`, `yaml/`, `code/`, `data-model/`). Includes: UI Patterns, `model-data.md`, `model-derived-data.md`, `api-health.md`, `ui-empty-state.md`.
  - At `surfaces/<surface>/common/` or `<module>/common/`: (Optional) Holds shared rules for that surface or module. **Automatically hidden from VitePress sidebar if empty**.
- **`user-flows/` Structure and Ownership Rule (Step 1 Ownership):**
  - **No `user-flows/` at root `surfaces/` or `<surface>/`**:
    - **System / Cross-Surface Flows**: Centrally stored under [`architecture/03-user-flows/FLOW-*.md`](../../architecture/03-user-flows/) as technical `sequenceDiagram`s.
    - **Module User Flows**: Stored under `surfaces/<surface>/<module>/user-flows/FLOW-*.md`.
    - **Step 1 Ownership Rule**: The module where Step 1 (the initial trigger screen) takes place owns the entire flow and its scenarios.
    - Module `user-flows/` directories **automatically hide from the VitePress sidebar if empty**.
- **Module Screen Hierarchy (1-Tier Flat):**
  - All screens/features within a module reside directly at tier 1: `surfaces/<surface>/<module>/<feature-slug>/` (no multi-tier numbering like `01/01/02`).
  - Child/secondary screens (Create, Edit, Detail, Drawer) declare access flow in §1 Overview ("Vào từ màn hình danh sách ➔ Bấm nút [Tạo mới]").
- **Primary Stakeholders:** BA, Frontend Dev, Backend Dev, QA.

### 4. `.flowgrid/registries/` — Shared Component & Capability Registries (Workspace SSOT)
- **Contents:** Machine-readable JSON dictionary files (`design.registry.json`, `be-capabilities.registry.json`). Centrally maintained in the Workspace SSOT, not inside application code repositories.
- **Responsibilities:**
  - Catalogs existing reusable UI components (`components/ui`, layouts, buttons, tables).
  - Catalogs available backend services and capabilities.
  - Enables AI Agents to recognize existing codebase capabilities, prioritizing reuse and avoiding duplicate code generation.

### 5. `qa/` — Collaboration & Clarification Inbox
- **Contents:** Houses `qa/index.md` aggregating business open questions (*Open Questions*).
- **Responsibilities:**
  - Where QAs or Devs record requirement ambiguities identified while reviewing specs.
  - BAs or POs clarify and sign off directly here using skill `/qa-resolve`.
  - Ensures every question has a documented resolution before feature development is closed.

---

## Workspace Code Repositories

| Directory | Mode | Purpose & Rules |
| :--- | :--- | :--- |
| **`source-code/`** | **Read / Write** | Contains active production repositories (Frontend, Backend, Microservices). All generated code and modifications are committed here. |
| **`source-legacy/`** | **Strictly READ-ONLY** | Houses legacy source code for archaeological analysis during Rebase workflows. **Modifications or raw copy-pasting from this directory are strictly forbidden.** |
