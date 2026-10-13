# Skill: `/common`

## 名称 (Name)
`common`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/common`
- Used to document common rules or generate single shared implementations in Phase 0 / Phase 1.

## 输入 (Input)
- Common ID (`CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`).
- Existing code in `shared/` or duplicate candidate code references.

## 输出 (Output)
- Markdown User Stories & Rules: `<LCA>/common/patterns/<CMN-ID>.md`.
- Canonical single implementation in `shared/` (for Duplicate Candidates).
- Registration in Workspace SSOT registry (`.flowgrid/registries/`).

## 描述说明 (Description)
- 强化防复制粘贴红线 (Anti-Copy-Paste Guard)。为共享 UI 模式、DTO、业务规则在 `<LCA>/common/patterns/` 生成 Markdown 规范并录入 SSOT 注册表。
- **严禁**为通用组件创建 YAML/Bundle，严格仅使用 `.md` 规范说明。
- **4 层质量标准：** 契约不变性、4 种标准状态、控制反转、测试接缝。
---

## 提示词调用示例 (Example Prompt)

```text
/common CMN-UI-001

Generate User Stories specification for Confirm Delete Modal and register in design.registry.json.
```

