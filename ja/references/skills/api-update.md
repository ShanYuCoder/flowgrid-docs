# Skill: `/api-update`

## スキル名 (Name)
`api-update`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/api-update`
- Used whenever backend contracts must be updated following UI changes, partner updates, or pending tech debt resolutions.

## 入力 (Input)
- Existing `01-backend-spec.yaml` and requested changes.

## 出力 (Output)
- Updated `01-backend-spec.yaml`.
- Re-generated `02-openapi.yaml` via `flowgrid openapi_gen`.
- Re-rendered documentation: `ir/generated/api.md`.

## 説明・役割 (Description)
- 要件変更やフロントエンド統合時のフィードバックに基づき、既存の `01-backend-spec.yaml` 契約を安全に更新し、監査検証をトリガーするスキル。
---

## プロンプト実行例 (Example Prompt)

```text
/api-update W-ADM-ORD-01

Add optional filter parameter 'customerEmail' to GET /api/v1/orders/list endpoint.
```

