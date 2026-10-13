# Skill: `/grill-dev`

## 名称 (Name)
`grill-dev`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-dev`
- Triggered after `/grill-bqa` completes with `bqaOpen: done`.

## 输入 (Input)
- `*.bundle.yaml` with completed BQA facts.
- Sibling API contract: `api/<seq>/01-backend-spec.yaml`.

## 输出 (Output)
- Enriched `bundle.gen` block with codegen profiles, entity definitions, and target frameworks.
- Hashtags assigned: `#gen:*`, `#needs-component:*`, and action mappings.
- Status flag set: `grillStatus.dev: done`.

## 描述说明 (Description)
- 审查 Bundle 的代码生成准备度：验证 `codegen.profile`、组件映射、`#gen:*` 标签、与后端契约的衔接，确保通过 `flowgrid split`。
## 相关技能 (Related Skills)
- **Preceding:** `/grill-bqa`.
- **Subsequent:** `flowgrid gen:dry` → `/prototype`.

---

## 提示词调用示例 (Example Prompt)

```text
/grill-dev

Surface: admin-portal · Module: CMP-ADM-ORD · Screen: W-ADM-ORD-01
Verify codegen profile, action bindings, and ensure all component tags match design registry.
```

