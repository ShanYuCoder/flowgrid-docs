# Skill: `/help-plan`

## Name
`help-plan` (Implementation Planning & User Flow Navigation Advisor)

## Usage (Command/Trigger)
- Call via slash command: `/help-plan <requirement / CR / bug description>`
- Used whenever starting a new requirement, feature, Change Request (CR), or bug fix where you need an actionable, grounded plan adhering to FlowGrid's lifecycle.

## Input
1. **`.flowgrid/config.json`**: Surfaces, code projects, technology stacks.
2. **`inition-inventory.md`** (or `adoption-inventory.md`): Mapping of surfaces, modules (`CMP-*`), screens (`W-*`), active code paths, and common patterns (`CMN-*`).
3. **Workspace Documentation State**: Existing specs under `surfaces/`, user flows under `architecture/03-user-flows/`, data models in `architecture/model/data-models.md` or `common/db-erd.md`.
4. **Active Code Repositories**: Ground-truth implementation files in `source-code/` (or `source-legacy/`).
5. **User Task Description**: Requirement, CR text, or bug report.

## Output
1. **Client-Native Implementation Plan**: A structured markdown plan delivered to the client's native planning interface to activate interactive UI action buttons (**Proceed** in Antigravity, **Build / Do Plan** in Cursor, **Interactive Approval** in Claude Code).
2. **Exhaustive User Flow Trace Proposal**: Mines `inition-inventory.md` to identify and schedule tracing for **as many related user flows as possible — ideally ALL of them** (Cross-surface or Module user-flows) across the 5-link flow chain (Upstream, Primary, Downstream side-effects, Failure/Rollback, System/Security).
3. **DAG Orchestration Plan**: Clearly tags independent steps (`[PARALLEL-SAFE]`) for concurrent subagent dispatch in autonomous agents (Cursor, Claude), and sequential barriers (`[SEQUENTIAL-BARRIER]`) with disk state offloading.
4. **Reality vs Requirement Discrepancy Matrix**: Unveils contradictions between what the requirement assumes and what the active codebase actually does.
5. **Human Decision Checkpoint**: Stops to request member approval via the client interface before code generation.

## Description
- **Core Engineering Philosophy:** Never jump directly into coding or blindly trust requirement descriptions. Requirements and bug tickets frequently misstate how the system currently behaves.
- `/help-plan` structures task execution into FlowGrid's standard 6-phase lifecycle:
  - **Init Inventory Mining (Trace All Related Flows):** Traverses the inventory established during `/init` to uncover all interconnected user flows. Instead of scoping to an isolated screen, it schedules tracing for the complete flow graph to guarantee zero blast radius surprises.
  - **Phase 1: Trace All Related Flows & Baseline Current Reality:** Inspect active code. Reconstruct or verify each discovered flow (`FLOW-*.md`) and screen spec (`W-*.bundle.yaml`) using `/user-flow`, `/trace` (Maintain), or `/legacy` (Rebase). Independent flows execute concurrently in autonomous agents.
  - **Phase 2: Gap Analysis & Spec Delta Update:** Analyze blast radius across all traced flows. Update specs with `/update-spec` (or `/spec`). Run `flowgrid audit spec` and `flowgrid split`.
  - **Phase 3: Decision Gate (Human Checkpoint):**
    - If contradictions or severe risks exist: PAUSE, log to QA inbox (`qa/<SHORT>_NNNN.yaml` with `#tech-debt:QA-*`) to research further.
    - If clear and validated: Member clicks **Proceed / Build / Approve** on the client UI to begin implementation.
  - **Phase 4: Design Grilling & API Contract Freeze:** Run `/grill-bqa` (business rules, 4-tier error handling), `/grill-dev` (technical readiness), and `/api-spec` (or `/api-update`) with `flowgrid api:check`.
  - **Phase 5: Test-Driven Implementation & Wiring:** Micro-granularity TDD steps (Write failing test case -> Verify failure Red -> Minimal code via `/prototype` or `/api` -> Verify pass Green -> Refactor and wire live services via `/wire`).
  - **Phase 6: Quality Gate & Verification:** Execute scoped Playwright E2E tests, `flowgrid audit e2e`, and `flowgrid audit fe-be`.

## Related Skills
- **Baseline Discovery:** `/trace` (Maintain), `/legacy` (Rebase), `/user-flow`.
- **Spec Authoring:** `/spec`, `/update-spec`, `/module`, `/surfaces`.
- **Review & Gates:** `/grill-bqa`, `/grill-dev`, `/api-spec`, `/testcase`, `/wire`.

## Important Notes
- Always mines `inition-inventory.md` to propose tracing **all related user flows**.
- Always delivers to the client's native plan mechanism (Antigravity Artifact `RequestFeedback: true`, Cursor `.cursor/plans/`, or Claude `.claude/plans/`).
- Supports **Autonomous Subagent DAG Execution**: Independent tasks run concurrently via subagents; dependent phases run sequentially with disk state offloading.
- Enforces **Review Focus** identifying top 5 production failure modes (Boundaries, Malformed payloads, Flow chain rollbacks, Concurrency/Race conditions, Multi-tenant security).
- Mandates **TDD micro-granularity** in implementation tasks.
- Never outputs vague conversational brainstorms.
- Always stops for user review and approval before running code generation.

---

## Example Prompt

```text
/help-plan

Goal: Fix order status display bug and add batch cancel order action on Web Admin Order Listing screen.
Analyze inition-inventory.md, discover all related user flows, check current reality against active code, and output an actionable implementation plan.
```
