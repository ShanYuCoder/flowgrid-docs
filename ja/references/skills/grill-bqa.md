# Skill: `/grill-bqa`

## スキル名 (Name)
`grill-bqa`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-bqa`
- Automatically triggered after completing `/spec` or via `/grill` handoff.

## 入力 (Input)
- `*.bundle.yaml` containing UI design and business rules.
- Intermediate IR files: `ir/design.yaml` and `ir/spec.yaml`.

## 出力 (Output)
- Refined `*.bundle.yaml` with validated business rules, UX copy, and validation logic.
- QA Tech Debt files (`qa/<SHORT>_NNNN.yaml`) if open items are deferred.
- Status flags set: `grillStatus.bqaFacts: done` and `grillStatus.bqaOpen: done`.

## 説明・役割 (Description)
- Phase 1 設計の中核レビュー。業務事実を確定し、ユーザーストーリー、状態遷移、受入基準 AC、UX 盲点を徹底質疑。未決事項は AskQuestion または技術的負債へ起票。
## 注意事項 (Important Notes)
- **Tech Debt Rule:** AskQuestion options in Step B must always include `"Log as Tech Debt"`. Selecting this routes the item directly to `qa/`.
- Reads only `ir/design.yaml` and the original bundle — never reads rendered `*.md` files.

---

## プロンプト実行例 (Example Prompt)

```text
/grill-bqa

Surface: admin-portal · Module: CMP-ADM-ORD · Scope: Order Listing Screen (W-01)
```

