# Skill: `/db-erd`

## スキル名 (Name)
`db-erd`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/db-erd`
- Executed in Phase 0 whenever introducing new modules, shared entities, or altering table relationships.

## 入力 (Input)
- Domain models, entity relationships, ownership boundaries across modules.

## 出力 (Output)
- Lowest Common Ancestor (LCA) ERD document: `<LCA>/common/db-erd.md`.
- Mermaid `erDiagram`, logical entity descriptions, primary keys, relationships, and owning module tags.

## 説明・役割 (Description)
- Phase 0 においてモジュールまたはシステムのコア ER 図 (Mermaid erDiagram) を LCA スコープに作成。画面バインディングや DB 実装の基盤となる。
## 関連スキル (Related Skills)
- **Preceding:** `/module`, `/user-flow`.
- **Subsequent:** `/spec` (binds UI controls to ERD tables).

## 注意事項 (Important Notes)
- Screen-level specifications (`/spec`) **never** create `db-erd.md` — they read this existing ERD.

---

## プロンプト実行例 (Example Prompt)

```text
/db-erd

Location: surfaces/admin/common/db-erd.md
Define ERD for Hotel and Reservation domains: Hotel, RoomType, Room, Booking, Customer, and Payment entities with relationships.
```

