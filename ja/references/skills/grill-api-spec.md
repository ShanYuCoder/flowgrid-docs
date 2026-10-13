# Skill: `/grill-api-spec`

## スキル名 (Name)
`grill-api-spec`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-api-spec`
- Triggered after `/api-spec` or `/api-update` completes.

## 入力 (Input)
- `01-backend-spec.yaml` contract.
- Portal design: `ir/design.yaml` (if portal-backed).

## 出力 (Output)
- Verified API contract meeting all schema quality gates.
- Sets `approval.status: approved` on `01-backend-spec.yaml` when all criteria pass.

## 説明・役割 (Description)
- `01-backend-spec.yaml` 契約書に対してディープなレビューを実施。HTTP ステータスコード、ページネーション、エラー形式の妥当性を精査。
## 関連スキル (Related Skills)
- **Preceding:** `/api-spec`.
- **Subsequent:** `flowgrid api-gen:dry` → `/api`.

---

## プロンプト実行例 (Example Prompt)

```text
/grill-api-spec surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```

