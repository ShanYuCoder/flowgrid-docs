# Skill: `/user-flow`

**SSOT:** `harness/docs/skills/user-flow/SKILL.md`

Skill for designing detailed end-to-end user flows, acting as an overarching roadmap connecting screens (`W-*`) and APIs (`API-*`).

- Author `FLOW-*.md` under `architecture/03-user-flows/` or `**/common/user-flows/`.
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

## Cross-Flow Deep Analysis Protocol
- **Tier A (Cross-Surface):** Handoff between $\ge 2$ distinct runtimes or actors (Customer Web ➔ Admin Portal ➔ Worker). Audits field-by-field payload compatibility, idempotency keys, and saga/compensation rollback.
- **Tier B (Surface-Shared):** Journeys shared across multiple modules in the same surface (Safe entity deletion, bulk export).
- **Tier C (Module-Scope):** Local journeys within a single component cluster (3-step creation wizard).

---

## Diagram Decision Matrix: When to Use What

| Diagram Type | Notation | When to Use | Mandatory Elements |
| :--- | :--- | :--- | :--- |
| **Sequence Diagram** | `sequenceDiagram` | Temporal interactions across $\ge 2$ lifelines (Actors, FE, Gateway, BE, DB, Workers, 3rd-party). | `autonumber`, `alt/else` (error paths), `rect` (async worker blocks), `-->>` returns. |
| **Block Diagram / Flowchart** | `flowchart TD/LR` | Complex decision trees (`IF/ELSE` branching), screen navigation graphs, data pipelines. | `([Start/End])`, `{Condition?}` diamonds, labeled edges (`-->|Yes|`). |
| **State Machine** | `stateDiagram-v2` | Entity lifecycle status transitions (e.g. Order: `DRAFT ➔ PENDING ➔ PAID / CANCELLED`). | `[*] --> State`, transition labels (`Event [Guard]`), terminal states. |
