# Skill: `/trace`

## 名称 (Name)
`trace`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/trace`
- Exclusively designed for **Maintain Mode** (extending and maintaining existing codebases).

## 输入 (Input)
- Active source code in `source-code/`.
- Target screen or feature under inspection.

## 输出 (Output)
- Synchronized specification bundle in `surfaces/` reflecting active codebase behavior.
- Reverse-engineered Data Model, API contracts, and validation rules.
- Patches applied cleanly to active code in `source-code/`.

## 描述说明 (Description)
- 针对已有存量项目，自动反向扫描分析代码库中的既有逻辑、未文档化规则与接口，提炼生成标准 FlowGrid 规范文件。
## 相关技能 (Related Skills)
- **Preceding:** `/init` (Repository discovery).
- **Combined with:** `/spec` or `/update-spec` to draft/update specs grounded in existing code.
- **Workflow Orchestration:** `/help-plan` (Phase 1 baseline archaeology).

## 注意事项 (Important Notes)
- **Autonomous Fact-Finding Guard:** Never ask the user where files are located or what endpoints exist; inspect the codebase autonomously.
- **5-Link User Flow Chain:** Must trace Upstream, Primary, Downstream side-effects, Failure/Rollback, and System/Security boundaries.
- **Ground Truth Priority:** Active code execution is ground truth; document discrepancies with requirements immediately.
- **Strict Isolation:** Inspects `source-code/` only; never touches `source-legacy/`.

---

## 提示词调用示例 (Example Prompt)

```text
/trace

Target: source-code/admin-fe/src/views/orders/OrderDetail.vue and OrderController.php
Scan the corresponding controller and view in source-code/ to extract complete specification, data model, and active API contracts.
```

