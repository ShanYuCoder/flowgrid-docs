# Skill: `/grill-dev`

## スキル名 (Name)
`grill-dev`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-dev`
- Triggered after `/grill-bqa` completes with `bqaOpen: done`.

## 入力 (Input)
- `*.bundle.yaml` with completed BQA facts.
- Sibling API contract: `api/<seq>/01-backend-spec.yaml`.

## 出力 (Output)
- Enriched `bundle.gen` block with codegen profiles, entity definitions, and target frameworks.
- Hashtags assigned: `#gen:*`, `#needs-component:*`, and action mappings.
- Status flag set: `grillStatus.dev: done`.

## 説明・役割 (Description)
- バンドルのコード生成準備状況をレビュー：`codegen.profile`、コンポーネント対応、`#gen:*` タグ、バックエンド契約との接続性を検証し、`flowgrid split` を保証。
## 関連スキル (Related Skills)
- **Preceding:** `/grill-bqa`.
- **Subsequent:** `flowgrid gen:dry` → `/prototype`.

---

## プロンプト実行例 (Example Prompt)

```text
/grill-dev

Surface: admin-portal · Module: CMP-ADM-ORD · Screen: W-ADM-ORD-01
Verify codegen profile, action bindings, and ensure all component tags match design registry.
```

