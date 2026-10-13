# Skill: `/update-spec`

## 名称 (Name)
`update-spec`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/update-spec`
- Used whenever modifying an existing specification bundle based on stakeholder feedback, UAT, or QA discoveries.

## 输入 (Input)
- Target `*.bundle.yaml` and change requests.

## 输出 (Output)
- Updated `*.bundle.yaml`.
- Re-split IR files: `ir/design.yaml` and `ir/spec.yaml`.
- Re-rendered documentation portal: `ir/generated/spec.md`.

## 描述说明 (Description)
- 对既有屏幕规格进行受控修改。强制运行 `flowgrid audit spec`，自动重跑 Split，并向测试端提示用例联动更新。
---

## 提示词调用示例 (Example Prompt)

```text
/update-spec

Target: surfaces/admin/CMP-ADM-ORD/01/01/order-list.bundle.yaml
Change: Add batch order status update action with confirmation modal and reason text field.
```

