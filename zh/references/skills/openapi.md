# Skill: `/openapi`

## 名称 (Name)
`openapi`

## 使用方式 (Command/Trigger)
- CLI command: `flowgrid openapi_gen --spec <path-to-01>`
- Slash command: `/openapi <page-id/slug>`

## 输入 (Input)
- Backend contract: `01-backend-spec.yaml`.

## 输出 (Output)
- OpenAPI specification: `02-openapi.yaml` and mock bundle: `03-mock.yaml`.

## 描述说明 (Description)
- 将 FlowGrid 的 `01-backend-spec.yaml` 自动转换为工业标准的 `02-openapi.yaml` (Swagger) 格式。
---

## 提示词调用示例 (Example Prompt)

```text
/openapi surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```

