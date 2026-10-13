# Skill: `/help-plan`

## スキル名 (Name)
`help-plan` (Implementation Planning & User Flow Navigation Advisor)

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/help-plan`
- Used whenever starting a new requirement, feature, Change Request (CR), or bug fix where you need an actionable, grounded plan adhering to FlowGrid's lifecycle.

## 入力 (Input)
1. **`.flowgrid/config.json`**: Surfaces, code projects, technology stacks.
2. **`inition-inventory.md`** (or `adoption-inventory.md`): Mapping of surfaces, modules (`CMP-*`), screens (`W-*`), active code paths, and common patterns (`CMN-*`).
3. **Workspace Documentation State**: Existing specs under `surfaces/`, user flows under `architecture/03-user-flows/`, data models in `architecture/model/data-models.md` or `common/db-erd.md`.
4. **Active Code Repositories**: Ground-truth implementation files in `source-code/` (or `source-legacy/`).
5. **User Task Description**: Requirement, CR text, or bug report.

## 出力 (Output)
1. **Implementation Plan File (`implementation-plan-[task-slug].md`)**: A structured markdown plan with concrete checkboxes `[ ]`, file coordinates, reality checks, and decision gates.
2. **Exhaustive User Flow Trace Proposal**: Mines `inition-inventory.md` to identify and schedule tracing for **as many related user flows as possible — ideally ALL of them** (Tier A Cross-surface, Tier B Surface-shared, Tier C Module-scope) across the 5-link flow chain (Upstream, Primary, Downstream side-effects, Failure/Rollback, System/Security).
3. **Reality vs Requirement Discrepancy Matrix**: Unveils contradictions between what the requirement assumes and what the active codebase actually does.
4. **Human Decision Checkpoint**: Stops to request member approval (`Proceed / Approve` vs `Pause / Research`) before code generation.

## 説明・役割 (Description)
- ワークスペース全体を走査し、全景棚卸し一覧 (`inition-inventory.md`) を生成。画面、モジュール、業務フローの推進計画を策定。
## 関連スキル (Related Skills)
- **Baseline Discovery:** `/trace` (Maintain), `/legacy` (Rebase), `/user-flow`.
- **Spec Authoring:** `/spec`, `/update-spec`, `/module`, `/surfaces`.
- **Review & Gates:** `/grill-bqa`, `/grill-dev`, `/api-spec`, `/testcase`, `/wire`.

## 注意事項 (Important Notes)
- Always mines `inition-inventory.md` to propose tracing **all related user flows**.
- Always generates an `implementation-plan-[task-slug].md` file on disk.
- Enforces **Review Focus** identifying top 5 production failure modes (Boundaries, Malformed payloads, Flow chain rollbacks, Concurrency/Race conditions, Multi-tenant security).
- Mandates **TDD micro-granularity** in implementation tasks.
- Never outputs vague conversational brainstorms.
- Always stops for user review and approval before running code generation.

---

## プロンプト実行例 (Example Prompt)

```text
/help-plan

Goal: Fix order status display bug and add batch cancel order action on Web Admin Order Listing screen.
Analyze inition-inventory.md, discover all related user flows, check current reality against active code, and output an actionable implementation plan.
```

