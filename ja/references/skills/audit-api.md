# Skill: `/audit-api`

## スキル名 (Name)
`audit-api`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/audit-api`
- Executed on the backend code repository prior to `/wire`.

## 入力 (Input)
- Backend codebase in `source-code/`.
- Target contract: `01-backend-spec.yaml`.

## 出力 (Output)
- Discrepancy report between actual backend code and the SSOT contract.

## 説明・役割 (Description)
- フロントエンドの `/wire` 連携に先立ち、バックエンドの実装コードと `01-backend-spec.yaml` 契約の整合性を自動監査し、プロパティ欠落を防止。
---

## プロンプト実行例 (Example Prompt)

```text
/audit-api surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```

