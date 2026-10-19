# Skill: `/help-plan`

## 名称 (Name)
`help-plan` (Implementation Planning & User Flow Navigation Advisor)

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/help-plan`
- Used whenever starting a new requirement, feature, Change Request (CR), or bug fix where you need an actionable, grounded plan adhering to FlowGrid's lifecycle.

## 输入 (Input)
1. **`.flowgrid/config.json`**: Surfaces, code projects, technology stacks.
2. **`inition-inventory.md`** (or `adoption-inventory.md`): Mapping of surfaces, modules (`CMP-*`), screens (`W-*`), active code paths, and common patterns (`CMN-*`).
3. **Workspace Documentation State**: Existing specs under `surfaces/`, user flows under `architecture/03-user-flows/`, data models in `architecture/model/data-models.md` or `common/db-erd.md`.
4. **Active Code Repositories**: Ground-truth implementation files in `source-code/` (or `source-legacy/`).
5. **User Task Description**: Requirement, CR text, or bug report.

## 输出 (Output)
1. **Implementation Plan File (`implementation-plan-[task-slug].md`)**: A structured markdown plan with concrete checkboxes `[ ]`, file coordinates, reality checks, and decision gates.
2. **Exhaustive User Flow Trace Proposal**: Mines `inition-inventory.md` to identify and schedule tracing for **as many related user flows as possible — ideally ALL of them** (Cross-surface or Module user-flows) across the 5-link flow chain (Upstream, Primary, Downstream side-effects, Failure/Rollback, System/Security).
3. **Reality vs Requirement Discrepancy Matrix**: Unveils contradictions between what the requirement assumes and what the active codebase actually does.
4. **Human Decision Checkpoint**: Stops to request member approval (`Proceed / Approve` vs `Pause / Research`) before code generation.

## 描述说明 (Description)
- 扫描工作区，生成全景功能清单 (`inition-inventory.md`)，规划端、模块、屏幕与业务流的执行路线图。
## 相关技能 (Related Skills)
- **Baseline Discovery:** `/trace` (Maintain), `/legacy` (Rebase), `/user-flow`.
- **Spec Authoring:** `/spec`, `/update-spec`, `/module`, `/surfaces`.
- **Review & Gates:** `/grill-bqa`, `/grill-dev`, `/api-spec`, `/testcase`, `/wire`.

## 注意事项 (Important Notes)
- Always mines `inition-inventory.md` to propose tracing **all related user flows**.
- Always generates an `implementation-plan-[task-slug].md` file on disk.
- Enforces **Review Focus** identifying top 5 production failure modes (Boundaries, Malformed payloads, Flow chain rollbacks, Concurrency/Race conditions, Multi-tenant security).
- Mandates **TDD micro-granularity** in implementation tasks.
- Never outputs vague conversational brainstorms.
- Always stops for user review and approval before running code generation.

---

## 提示词调用示例 (Example Prompt)

```text
/help-plan

Goal: Fix order status display bug and add batch cancel order action on Web Admin Order Listing screen.
Analyze inition-inventory.md, discover all related user flows, check current reality against active code, and output an actionable implementation plan.
```

