# Skill: `/grill`

## スキル名 (Name)
`grill`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill`
- Router command directing to specialized grilling skills: `/grill-bqa`, `/grill-dev`, `/grill-api-spec`, `/grill-testcase`, `/grill-prototype`, or `/grill-wire`.

## 入力 (Input)
- Specification bundle, API contract, test plan, or prototype code depending on the active lifecycle phase.

## 出力 (Output)
- Routes to the appropriate phase grilling skill.
- Gap reports and interactive AskQuestion wizards.

## 説明・役割 (Description)
- フェーズ横断の汎用レビューツール。対象仕様に対して対話型の突合と整合性チェックを実施。
---

## プロンプト実行例 (Example Prompt)

```text
/grill surfaces/admin/CMP-ADM-ORD/01/01/order-list.bundle.yaml
```

