# Skill: `/update-spec`

## スキル名 (Name)
`update-spec`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/update-spec`
- Used whenever modifying an existing specification bundle based on stakeholder feedback, UAT, or QA discoveries.

## 入力 (Input)
- Target `*.bundle.yaml` and change requests.

## 出力 (Output)
- Updated `*.bundle.yaml`.
- Re-split IR files: `ir/design.yaml` and `ir/spec.yaml`.
- Re-rendered documentation portal: `ir/generated/spec.md`.

## 説明・役割 (Description)
- 既存の画面仕様に対して安全な差分更新を実施。`flowgrid audit spec` を強制実行し、Split 同期とテストケースへの影響を連携通知。
---

## プロンプト実行例 (Example Prompt)

```text
/update-spec

Target: surfaces/admin/CMP-ADM-ORD/01/01/order-list.bundle.yaml
Change: Add batch order status update action with confirmation modal and reason text field.
```

