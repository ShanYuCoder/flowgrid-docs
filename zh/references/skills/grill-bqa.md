# Skill: `/grill-bqa`

## 名称 (Name)
`grill-bqa`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-bqa`
- Automatically triggered after completing `/spec` or via `/grill` handoff.

## 输入 (Input)
- `*.bundle.yaml` containing UI design and business rules.
- Intermediate IR files: `ir/design.yaml` and `ir/spec.yaml`.

## 输出 (Output)
- Refined `*.bundle.yaml` with validated business rules, UX copy, and validation logic.
- QA Tech Debt files (`qa/<SHORT>_NNNN.yaml`) if open items are deferred.
- Status flags set: `grillStatus.bqaFacts: done` and `grillStatus.bqaOpen: done`.

## 描述说明 (Description)
- Phase 1 设计核心质询。锁定业务事实，挑战 User Stories、状态机分支、验收条件 AC 及 UX 交互盲区。未决问题通过 AskQuestion 确认或记录为技术债务。
## 注意事项 (Important Notes)
- **Tech Debt Rule:** AskQuestion options in Step B must always include `"Log as Tech Debt"`. Selecting this routes the item directly to `qa/`.
- Reads only `ir/design.yaml` and the original bundle — never reads rendered `*.md` files.

---

## 提示词调用示例 (Example Prompt)

```text
/grill-bqa

Surface: admin-portal · Module: CMP-ADM-ORD · Scope: Order Listing Screen (W-01)
```

