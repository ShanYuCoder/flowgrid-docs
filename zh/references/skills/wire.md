# Skill: `/wire`

## 名称 (Name)
`wire`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/wire`
- Primary convergence skill in **Phase 3 (Wire)**.

## 输入 (Input)
- Prototype code in FE repository.
- Real backend API contracts (`01-backend-spec.yaml`) and endpoints.
- Integration tags: `#wire-only`, `#manual-composable`.

## 输出 (Output)
- 4-layer integration in FE repository: Models → Services → Composables → Pages.
- Complete removal of production mock boundaries.
- Re-activated authentication, middlewares, and RBAC guards.

## 描述说明 (Description)
- Phase 3 核心联调技能。在前端代码库中将模拟 Mock/桩数据拆除，对接真实的后端服务，恢复 RBAC 鉴权机制，并执行联调后 E2E 回归。
## 相关技能 (Related Skills)
- **Preceding:** Prototype passed `/grill-prototype`, Backend passed `/audit-api`, Tests passed `cases:gate --strict`.
- **Subsequent:** Scoped E2E tests → `/grill-wire`.

---

## 提示词调用示例 (Example Prompt)

```text
/wire W-ADM-ORD-01

Connect Order Listing screen to real backend API endpoints, remove mock data, and wire pagination/sorting.
```

