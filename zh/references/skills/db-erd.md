# Skill: `/db-erd`

## 名称 (Name)
`db-erd`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/db-erd`
- Executed in Phase 0 whenever introducing new modules, shared entities, or altering table relationships.

## 输入 (Input)
- Domain models, entity relationships, ownership boundaries across modules.

## 输出 (Output)
- Lowest Common Ancestor (LCA) ERD document: `<LCA>/common/db-erd.md`.
- Mermaid `erDiagram`, logical entity descriptions, primary keys, relationships, and owning module tags.

## 描述说明 (Description)
- 在 Phase 0 为模块或系统设计核心实体关系模型 (Mermaid erDiagram)，位于 LCA 作用域，作为后续页面字段绑定与后端数据表的基础。
## 相关技能 (Related Skills)
- **Preceding:** `/module`, `/user-flow`.
- **Subsequent:** `/spec` (binds UI controls to ERD tables).

## 注意事项 (Important Notes)
- Screen-level specifications (`/spec`) **never** create `db-erd.md` — they read this existing ERD.

---

## 提示词调用示例 (Example Prompt)

```text
/db-erd

Location: surfaces/admin/common/db-erd.md
Define ERD for Hotel and Reservation domains: Hotel, RoomType, Room, Booking, Customer, and Payment entities with relationships.
```

