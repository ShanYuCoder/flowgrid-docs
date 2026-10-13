# Skill: `/prototype`

## Name
`prototype`

## Usage (Command/Trigger)
- Script commands: `pnpm portal:gen` / `flowgrid gen`
- Slash command: `/prototype`

## Input
- UI design IR: `ir/design.yaml` generated via `flowgrid split`.
- Component tags: `#needs-component:*`, `#ui:*`, `#composable:*`.

## Output
- Scaffolding of Vue/React/Next.js page components with `data-testid` attributes.
- Implementation of missing custom molecules and data cells.
- Functional UI prototype powered by mock API boundaries.

## Description
- Core skill of **Phase 2a (Scaffold FE)**.
- Rather than hand-authoring pages from scratch, FlowGrid generates standardized page frames using `portal:gen`.
- Developers and AI agents focus solely on filling custom slots and building missing UI molecules.
- Operates 100% independently of real backend APIs using local mock boundaries.

---

## Example Prompt

```text
/prototype

Function slug: order-list
Screen: W-ADM-ORD-01
Scaffold page using portal:gen and implement missing OrderStatusBadge molecule with mock API.
```
