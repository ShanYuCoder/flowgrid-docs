# Skill: `/trace`

## Name
`trace`

## Usage (Command/Trigger)
- Call via slash command: `/trace`
- Exclusively designed for **Maintain Mode** (extending and maintaining existing codebases).

## Input
- Active source code in `source-code/`.
- Target screen or feature under inspection.

## Output
- Synchronized specification bundle in `surfaces/` reflecting active codebase behavior.
- Reverse-engineered Data Model, API contracts, and validation rules.
- Patches applied cleanly to active code in `source-code/`.

## Description
- Inspects existing repositories in-place to understand undocumented logic, implicit validation rules, and database schema mappings.
- Re-architects active code into standardized FlowGrid specs (`W-*.bundle.yaml`, `01-backend-spec.yaml`, `FLOW-*.md`) without breaking implicit behaviors or regressing production features.
- Enables safe feature addition by establishing a complete SSOT before code modification.

## Related Skills
- **Preceding:** `/init` (Repository discovery).
- **Combined with:** `/spec` or `/update-spec` to draft/update specs grounded in existing code.
- **Workflow Orchestration:** `/help-plan` (Phase 1 baseline archaeology).

## Important Notes
- **Autonomous Fact-Finding Guard:** Never ask the user where files are located or what endpoints exist; inspect the codebase autonomously.
- **5-Link User Flow Chain:** Must trace Upstream, Primary, Downstream side-effects, Failure/Rollback, and System/Security boundaries.
- **Ground Truth Priority:** Active code execution is ground truth; document discrepancies with requirements immediately.
- **Strict Isolation:** Inspects `source-code/` only; never touches `source-legacy/`.

---

## Example Prompt

```text
/trace

Target: source-code/admin-fe/src/views/orders/OrderDetail.vue and OrderController.php
Scan the corresponding controller and view in source-code/ to extract complete specification, data model, and active API contracts.
```
