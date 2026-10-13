# Skill: `/openapi`

## スキル名 (Name)
`openapi`

## 使用方法 (Command/Trigger)
- CLI command: `flowgrid openapi_gen --spec <path-to-01>`
- Slash command: `/openapi <page-id/slug>`

## 入力 (Input)
- Backend contract: `01-backend-spec.yaml`.

## 出力 (Output)
- OpenAPI specification: `02-openapi.yaml` and mock bundle: `03-mock.yaml`.

## 説明・役割 (Description)
- FlowGrid の `01-backend-spec.yaml` 契約書から国際標準の `02-openapi.yaml` (Swagger) を自動生成。
---

## プロンプト実行例 (Example Prompt)

```text
/openapi surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```

