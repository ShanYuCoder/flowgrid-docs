# Skill: `/qa-review`

## スキル名 (Name)
`qa-review`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/qa-review`
- Used by Senior Engineers or Leads to review QA resolutions or request revisions.

## 入力 (Input)
- QA file: `qa/<SHORT>_NNNN.yaml`.
- Review remarks.

## 出力 (Output)
- Appended `updates[]` entry with `kind: review`.
- Re-opens item (`status: open`) if `needs-change` is indicated.

## 説明・役割 (Description)
- リードや BA が QA 課題に対してレビューコメントを追記。`needs-change` が含まれる場合は課題を未解決ステータスへ自動再開。
---

## プロンプト実行例 (Example Prompt)

```text
/qa-review HOTEL-LIST_0001

needs-change: Add explicit acceptance criteria when the property has no configured timezone.
```

