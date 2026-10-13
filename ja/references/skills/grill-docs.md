# Skill: `/grill-docs`

## スキル名 (Name)
`grill-docs`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-docs`
- Optional reconciliation skill used when conflicts arise between BQA and Dev requirements.

## 入力 (Input)
- `*.bundle.yaml`, `ir/spec.yaml`, and `ir/design.yaml`.

## 出力 (Output)
- Reconciled bundle resolving discrepancies between business requirements and technical constraints.

## 説明・役割 (Description)
- BQA の業務要求と Dev の技術的制約が衝突した際、仕様間の矛盾を調停し、SSOT の最終整合性を確保。
---

## プロンプト実行例 (Example Prompt)

```text
/grill-docs surfaces/admin/CMP-ADM-ORD/01/01/order-list.bundle.yaml
```

