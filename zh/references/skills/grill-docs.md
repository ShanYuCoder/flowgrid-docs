# Skill: `/grill-docs`

## 名称 (Name)
`grill-docs`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-docs`
- Optional reconciliation skill used when conflicts arise between BQA and Dev requirements.

## 输入 (Input)
- `*.bundle.yaml`, `ir/spec.yaml`, and `ir/design.yaml`.

## 输出 (Output)
- Reconciled bundle resolving discrepancies between business requirements and technical constraints.

## 描述说明 (Description)
- 当 BQA 业务诉求与 Dev 技术实现产生矛盾时，仲裁并调解规范中的冲突，确保 SSOT 最终一致性。
---

## 提示词调用示例 (Example Prompt)

```text
/grill-docs surfaces/admin/CMP-ADM-ORD/01/01/order-list.bundle.yaml
```

