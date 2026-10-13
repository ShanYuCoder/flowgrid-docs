# Skill: `/model`

## スキル名 (Name)
`model`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/model`
- Used in Phase 2a to generate TypeScript models and DTOs from contracts.

## 入力 (Input)
- `01-backend-spec.yaml` or `02-openapi.yaml`.

## 出力 (Output)
- TypeScript interfaces and DTOs in FE repository (`src/models/`).

## 説明・役割 (Description)
- `01-backend-spec.yaml` または OpenAPI 仕様に基づき、フロントエンド向けに TypeScript の型定義およびモデルクラスを自動生成。
---

## プロンプト実行例 (Example Prompt)

```text
/model surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```

