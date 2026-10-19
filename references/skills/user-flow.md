# Skill: `/user-flow`

**SSOT:** `harness/docs/skills/user-flow/SKILL.md`

Skill for designing detailed end-to-end user flows, acting as an overarching roadmap connecting screens (`W-*`) and APIs (`API-*`).

- Author `FLOW-*.md` under `architecture/03-user-flows/` or `surfaces/<surface>/<module>/user-flows/`.
- Convention ID: `FLOW-{SURF}-{DOMAIN}-{NN}` (e.g., `FLOW-ADM-AUTH-01`). Strictly do not use `FLOW-{slug}` or other naming conventions.
- Audit: `flowgrid audit flow <path>`.

## Core User Flow Categories
1. **Multi-step Journeys**: Checkout, multi-step onboarding wizard.
2. **State Machines**: Order state transitions, document review approvals.
3. **Role Branching**: Dedicated branching paths for Admin vs Customer.
4. **Async / Webhooks**: Payment gateways, background asynchronous processing.
5. **Dialog Sub-flows**: Auxiliary modal/drawer dialog flows spanning multiple screens.

---

## Decoupled Hierarchy vs Monolithic Spec Fallacy
- **Monolithic Spec Fallacy:** Dumping multiple screens and APIs into one giant monolithic spec blurs the user flow. AI agents suffer from context saturation and miss cross-screen handoffs, race conditions, and partial failures.
- **FlowGrid's Decoupled Hierarchy:**
  - **Macro Orchestration (`FLOW-*.md`):** High-level roadmap connecting actors, screens (`W-*`), APIs (`API-*`), business rules (`BR-*`), and background workers.
  - **Micro Atomicity (`W-*.bundle.yaml`):** Sharp focus on a **single screen**: layout, columns, field validations, and single-screen UI states (`interactionCases` L2).

---

## The 5 Corner-Case Blindspots Hunting Checklist
1. **Refresh / Back Navigation & State Loss:** Define explicit persistence mode (`URL params`, `sessionStorage`, `Server Draft ID`).
2. **Concurrent Mutation & Race Conditions:** Define Optimistic Locking (`version`/`updated_at`), Idempotency Key, and `409 Conflict` resolution.
3. **Cross-Surface Actor Handoff & Notification Gaps:** Define fallback Worklist Queue on Surface B so tasks are never orphaned when notifications fail.
4. **Partial Failure & Saga Compensation Rollback:** Document rollback sequences in `alt/else` blocks (auto-refund, inventory release).
5. **Data Handoff Schema Drifts:** Field-by-field verification of source screen output vs destination screen input props.

---

## Two Scopes of User Flows Protocol
- **Cross-Surface Architecture Flows (`architecture/03-user-flows/`):** Flows that span multiple surfaces or external systems (Customer Web ➔ Admin Portal ➔ Worker). Documented as technical `sequenceDiagram` with explicit payload compatibility and saga compensation rollback.
- **Module User Flows (`surfaces/<surface>/<module>/user-flows/`):** UI journeys owned by the module where Step 1 occurs (Step 1 Ownership rule: Step 1 determines module ownership). Auto-hidden from sidebar if empty.

---

---

## Rule: Mandatory "Sequence" Priority Lock

> [!CRITICAL]
> **AUTOMATIC ROUTING TO ARCHITECTURE ON "SEQUENCE" PROMPT:**
> Whenever a team member asks for or mentions `"sequence"`, `"sequence diagram"`, `"luồng sequence"`, or `"message flow"`:
> The Agent **MUST AUTOMATICALLY BUILD IT INTO `<docs-hub>/architecture/`**:
> - **Target Path:** **`architecture/03-user-flows/FLOW-*.md`** (or `architecture/04-solution-strategy/index.md` for technical subsystem sequences).
> - **[STRICTLY FORBIDDEN]** The Agent **MUST NOT** wait for member reminders, and **STRICTLY MUST NOT** bury technical sequence diagrams in UI surface leaves (`surfaces/`).

---

## Diagram & Flow Triage Matrix (Surface Use-Case vs Sequence vs Block Diagram)

| Category | Diagram Type | Core Content | Target Placement | What is FORBIDDEN |
| :--- | :--- | :--- | :--- | :--- |
| **Surface Use-Case / User Journey** | UI Flow / Wire steps (`flowchart TD/LR`) | User interactions, button triggers, form inputs, visual states (Loading, Empty, Error, Success) across screens (`W-*`). | `surfaces/<surface>/<module>/user-flows/` | NO raw HTTP verbs, NO SQL queries, NO backend worker queues. |
| **Technical Sequence Diagram** | Mermaid `sequenceDiagram` | Time-ordered message passing across Actor, Frontend, API Gateway, Backend Services, DB transactions, async Queues, external APIs. | **`architecture/03-user-flows/FLOW-*.md`** or `architecture/04-solution-strategy/` | NO UI layout details; focus on protocol timing, DTOs, retries, and rollback branches. |
| **Architecture Block Diagram** | Mermaid `graph TB` / `block-beta` / C4 | Static structural topology: Layers, services, datastores, caches, reverse proxies, and integration boundaries. | **`architecture/04-solution-strategy/index.md`** or `architecture/05-building-blocks/` | NO time-ordered execution steps; focus on static structural wiring. |

