# Skill: `/api`

## 名称 (Name)
`api`

## 使用方式 (Command/Trigger)
- CLI command: `flowgrid api-gen --spec <path-to-01>`
- Slash command: `/api <page-id/slug>`
- Executed in Phase 2c to generate and implement backend controllers, services, and routes.

## 输入 (Input)
- Approved backend contract: `01-backend-spec.yaml` (never uses `ir/design.yaml` as codegen input).

## 输出 (Output)
- Production backend source code in target repository (Controllers, Models, Services, Requests/DTOs).
- Registered routes and middleware configurations.

## 描述说明 (Description)
- Phase 3 后端开发顶层路由命令。根据当前上下文与参数自动分流至 `/api-spec`, `/api-update`, `/grill-api-spec` 或后端代码生成。
## 相关技能 (Related Skills)
- **Preceding:** `/api-spec`, `/grill-api-spec`.
- **Subsequent:** `/unit` → `/audit-api` → `/wire`.

---

## 提示词调用示例 (Example Prompt)

```text
/api W-ADM-ORD-01

Generate and implement backend API endpoints using approved contract at surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml.
```

