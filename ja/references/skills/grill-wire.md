# Skill: `/grill-wire`

## スキル名 (Name)
`grill-wire`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-wire`
- Executed on the FE repository following `/wire` implementation.

## 入力 (Input)
- Wired frontend application code.
- Test suite in `tests/e2e/`.

## 出力 (Output)
- Convergence audit execution report:
  - `flowgrid audit e2e --screen <W-*>`
  - `flowgrid audit fe-be <path-to-bundle>`
  - `flowgrid audit scenario <SC.yaml>` (if part of scenario journey)

## 説明・役割 (Description)
- `/wire` 統合後にフルチェーン監査を実施：`audit e2e` + `audit fe-be` + `audit scenario` を実行し、本番コード内のモック残存ゼロ、認証復元、E2E グリーンを担保。
---

## プロンプト実行例 (Example Prompt)

```text
/grill-wire W-ADM-ORD-01
```

