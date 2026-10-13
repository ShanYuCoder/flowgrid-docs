# Skill: `/architecture-grill`

## スキル名 (Name)
`architecture-grill`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/architecture-grill`
- Executed after drafting architecture documents in Phase 0.

## 入力 (Input)
- Documents in `architecture/` and system constraints.

## 出力 (Output)
- Architecture critique report, identifying scalability bottlenecks, single points of failure, and security risks.
- Actionable revisions applied to `architecture/` files.

## 説明・役割 (Description)
- `architecture/` 配下の Arc42 設計文書に対するディープな技術レビューを実施。負荷ボトルネック、技術選定の妥当性、セキュリティ境界を精査。
## 関連スキル (Related Skills)
- **Preceding:** `/architecture`.
- **Subsequent:** `/db-erd`, `/module`.

---

## プロンプト実行例 (Example Prompt)

```text
/architecture-grill

Critique architecture/ files focusing on high-concurrency payment processing, idempotent webhooks, and distributed transaction boundaries.
```

