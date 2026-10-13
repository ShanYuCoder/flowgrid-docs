# Skill: `/audit-api`

## 名称 (Name)
`audit-api`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/audit-api`
- Executed on the backend code repository prior to `/wire`.

## 输入 (Input)
- Backend codebase in `source-code/`.
- Target contract: `01-backend-spec.yaml`.

## 输出 (Output)
- Discrepancy report between actual backend code and the SSOT contract.

## 描述说明 (Description)
- 在前端执行 `/wire` 联调前，自动审计后端实际代码实现与 `01-backend-spec.yaml` 契约的一致性，防止字段缺失。
---

## 提示词调用示例 (Example Prompt)

```text
/audit-api surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```

