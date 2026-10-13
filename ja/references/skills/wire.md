# Skill: `/wire`

## スキル名 (Name)
`wire`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/wire`
- Primary convergence skill in **Phase 3 (Wire)**.

## 入力 (Input)
- Prototype code in FE repository.
- Real backend API contracts (`01-backend-spec.yaml`) and endpoints.
- Integration tags: `#wire-only`, `#manual-composable`.

## 出力 (Output)
- 4-layer integration in FE repository: Models → Services → Composables → Pages.
- Complete removal of production mock boundaries.
- Re-activated authentication, middlewares, and RBAC guards.

## 説明・役割 (Description)
- Phase 3 の統合連携中核スキル。フロントエンドからモックやスタブを撤去し、実バックエンド API に接続、RBAC 権限を復元して統合後 E2E テストを実行。
## 関連スキル (Related Skills)
- **Preceding:** Prototype passed `/grill-prototype`, Backend passed `/audit-api`, Tests passed `cases:gate --strict`.
- **Subsequent:** Scoped E2E tests → `/grill-wire`.

---

## プロンプト実行例 (Example Prompt)

```text
/wire W-ADM-ORD-01

Connect Order Listing screen to real backend API endpoints, remove mock data, and wire pagination/sorting.
```

