# Skill: `/wire`

## Name
`wire`

## Usage (Command/Trigger)
- Call via slash command: `/wire <W-* or slug>`
- Primary convergence skill in **Phase 3 (Wire)**.

## Input
- Prototype code in FE repository.
- Real backend API contracts (`01-backend-spec.yaml`) and endpoints.
- Integration tags: `#wire-only`, `#manual-composable`.

## Output
- 4-layer integration in FE repository: Models → Services → Composables → Pages.
- Complete removal of production mock boundaries.
- Re-activated authentication, middlewares, and RBAC guards.

## Description
- Replaces simulated mock API boundaries with live backend network communication.
- Implements comprehensive 422 validation response mappings, error toasts, and loading state transitions.
- Restores route authentication guards and RBAC permission checks per specification.

## Related Skills
- **Preceding:** Prototype passed `/grill-prototype`, Backend passed `/audit-api`, Tests passed `cases:gate --strict`.
- **Subsequent:** Scoped E2E tests → `/grill-wire`.

---

## Example Prompt

```text
/wire W-ADM-ORD-01

Connect Order Listing screen to real backend API endpoints, remove mock data, and wire pagination/sorting.
```
