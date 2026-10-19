# Skill: `/architecture`

## Name
`architecture`

## Usage (Command/Trigger)
- Call via slash command: `/architecture`
- Executed in Phase 0 to establish system architecture documentation.

## Input
- Technical stack specifications, deployment infrastructure, architectural constraints.

## Output
- Arc42-aligned documentation under `architecture/`:
  - `01-context-and-scope.md`
  - `02-architecture-constraints.md`
  - `03-system-scope-and-context.md`
  - `04-solution-strategy.md`
  - `05-building-block-view.md`
  - `06-runtime-view.md`
  - `07-deployment-view.md`
  - `08-crosscutting-concepts.md`
  - `09-architectural-decisions.md`
  - `10-quality-requirements.md`
  - `11-risks/risk-register.md`

## Description
- Documents the system's structural blueprint following international Arc42 standards.
- Defines technology choices, communication protocols, caching strategies, and resilience patterns.

## Related Skills
- **Paired with:** `/architecture-grill` for technical critique and validation.

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

---

## Example Prompt

```text
/architecture

Generate Arc42 system architecture documentation for microservices platform with NestJS backend, Nuxt frontend, PostgreSQL, and Redis caching.
```

