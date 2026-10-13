# Skill: `/grill-test`

## スキル名 (Name)
`grill-test`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-test`
- Executed on the code repository (e2e-root) after `/test` has achieved a green test pass.

## 入力 (Input)
- Generated Playwright test files (`*.spec.ts`) and Page Objects.
- Source test plan: `TC-*.yaml`.

## 出力 (Output)
- Verification report confirming 1:1 parity across TC ↔ Page Object ↔ Playwright assertions.
- Semantic assertion audit (`#e2e:*` checks, layout integrity, no raw brittle locators).

## 説明・役割 (Description)
- テストがグリーン通過した後に実施。Playwright テストコードの品質を検証：TC ↔ PO ↔ Spec マトリクスの整合性、脆弱なセレクタの排除、見せかけの合格を防止。
---

## プロンプト実行例 (Example Prompt)

```text
/grill-test W-ADM-ORD-01
```

