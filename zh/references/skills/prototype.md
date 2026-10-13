# Skill: `/prototype`

## 名称 (Name)
`prototype`

## 使用方式 (Command/Trigger)
- Script commands: `pnpm portal:gen` / `flowgrid gen`
- Slash command: `/prototype`

## 输入 (Input)
- UI design IR: `ir/design.yaml` generated via `flowgrid split`.
- Component tags: `#needs-component:*`, `#ui:*`, `#composable:*`.

## 输出 (Output)
- Scaffolding of Vue/React/Next.js page components with `data-testid` attributes.
- Implementation of missing custom molecules and data cells.
- Functional UI prototype powered by mock API boundaries.

## 描述说明 (Description)
- Phase 2a 核心技能。基于 `ir/design.yaml`，使用组件库生成可运行的高保真 UI 交互原型，注入模拟数据与 `data-testid`。
---

## 提示词调用示例 (Example Prompt)

```text
/prototype

Function slug: order-list
Screen: W-ADM-ORD-01
Scaffold page using portal:gen and implement missing OrderStatusBadge molecule with mock API.
```

