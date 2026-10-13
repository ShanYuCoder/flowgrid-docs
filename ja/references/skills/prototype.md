# Skill: `/prototype`

## スキル名 (Name)
`prototype`

## 使用方法 (Command/Trigger)
- Script commands: `pnpm portal:gen` / `flowgrid gen`
- Slash command: `/prototype`

## 入力 (Input)
- UI design IR: `ir/design.yaml` generated via `flowgrid split`.
- Component tags: `#needs-component:*`, `#ui:*`, `#composable:*`.

## 出力 (Output)
- Scaffolding of Vue/React/Next.js page components with `data-testid` attributes.
- Implementation of missing custom molecules and data cells.
- Functional UI prototype powered by mock API boundaries.

## 説明・役割 (Description)
- Phase 2a の中核スキル。`ir/design.yaml` に基づき、コンポーネントレジストリを活用して動作可能な高精度 UI プロトタイプを自動生成。
---

## プロンプト実行例 (Example Prompt)

```text
/prototype

Function slug: order-list
Screen: W-ADM-ORD-01
Scaffold page using portal:gen and implement missing OrderStatusBadge molecule with mock API.
```

