# Skill: `/grill-prototype`

## 名称 (Name)
`grill-prototype`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-prototype`
- Executed immediately following `/prototype` before test lane handoff.

## 输入 (Input)
- Implemented prototype code in FE repository.
- Original design spec: `ir/design.yaml`.

## 输出 (Output)
- UI audit report covering layout fidelity, empty/loading/error states, long text overflow, and testIds.
- Remediation patches applied to prototype code.

## 描述说明 (Description)
- 对比生成的前端交互原型与 Spec 规范，审查视觉还原度、文案完整性、Mock 边界与 `data-testid` 埋点。
---

## 提示词调用示例 (Example Prompt)

```text
/grill-prototype order-list

Verify layout responsiveness, empty state handling, and data-testid presence on W-ADM-ORD-01 prototype.
```

