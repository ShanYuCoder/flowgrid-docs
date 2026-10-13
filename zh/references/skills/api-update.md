# Skill: `/api-update`

## 名称 (Name)
`api-update`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/api-update`
- Used whenever backend contracts must be updated following UI changes, partner updates, or pending tech debt resolutions.

## 输入 (Input)
- Existing `01-backend-spec.yaml` and requested changes.

## 输出 (Output)
- Updated `01-backend-spec.yaml`.
- Re-generated `02-openapi.yaml` via `flowgrid openapi_gen`.
- Re-rendered documentation: `ir/generated/api.md`.

## 描述说明 (Description)
- 在需求变更或前端联调反馈时，安全更新现有的 `01-backend-spec.yaml` 契约，并触发审计验证。
---

## 提示词调用示例 (Example Prompt)

```text
/api-update W-ADM-ORD-01

Add optional filter parameter 'customerEmail' to GET /api/v1/orders/list endpoint.
```

