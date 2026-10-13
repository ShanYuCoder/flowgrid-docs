# Skill: `/grill-api-spec`

## 名称 (Name)
`grill-api-spec`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-api-spec`
- Triggered after `/api-spec` or `/api-update` completes.

## 输入 (Input)
- `01-backend-spec.yaml` contract.
- Portal design: `ir/design.yaml` (if portal-backed).

## 输出 (Output)
- Verified API contract meeting all schema quality gates.
- Sets `approval.status: approved` on `01-backend-spec.yaml` when all criteria pass.

## 描述说明 (Description)
- 在文档中心对编写好的 `01-backend-spec.yaml` 执行深度质询，审查 HTTP 状态码、分页参数及报错结构合理性。
## 相关技能 (Related Skills)
- **Preceding:** `/api-spec`.
- **Subsequent:** `flowgrid api-gen:dry` → `/api`.

---

## 提示词调用示例 (Example Prompt)

```text
/grill-api-spec surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```

