# Skill: `/qa-resolve`

## スキル名 (Name)
`qa-resolve`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/qa-resolve`
- Used when a pending QA tech debt or open question has been answered by stakeholders.

## 入力 (Input)
- QA file: `qa/<SHORT>_NNNN.yaml`.
- Decision text and target specification path.

## 出力 (Output)
- Appended `updates[]` entry with `kind: answer`.
- Status updated: `status: closed`.
- Surgical patch applied to the target bundle or API contract.

## 説明・役割 (Description)
- `qa/` 内の未決課題に対して最終決定の解答を追記し、対象の仕様バンドルへ自動反映して課題をステータス完了へ更新。
---

## プロンプト実行例 (Example Prompt)

```text
/qa-resolve HOTEL-LIST_0001

Decision: Timezone filtering defaults to property local timezone; display UTC+7 label on UI.
Patch target bundle at surfaces/admin/CMP-HOTEL/01/hotel-list.bundle.yaml.
```

