# Skill: `/api`

## スキル名 (Name)
`api`

## 使用方法 (Command/Trigger)
- CLI command: `flowgrid api-gen --spec <path-to-01>`
- Slash command: `/api <page-id/slug>`
- Executed in Phase 2c to generate and implement backend controllers, services, and routes.

## 入力 (Input)
- Approved backend contract: `01-backend-spec.yaml` (never uses `ir/design.yaml` as codegen input).

## 出力 (Output)
- Production backend source code in target repository (Controllers, Models, Services, Requests/DTOs).
- Registered routes and middleware configurations.

## 説明・役割 (Description)
- Phase 3 バックエンド開発の最上位ルーターコマンド。コンテキストや引数に応じて `/api-spec`、`/api-update`、`/grill-api-spec` またはコード生成へと自動ルーティング。
## 関連スキル (Related Skills)
- **Preceding:** `/api-spec`, `/grill-api-spec`.
- **Subsequent:** `/unit` → `/audit-api` → `/wire`.

---

## プロンプト実行例 (Example Prompt)

```text
/api W-ADM-ORD-01

Generate and implement backend API endpoints using approved contract at surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml.
```

