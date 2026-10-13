# Skill: `/grill-testcase`

## スキル名 (Name)
`grill-testcase`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-testcase`
- Executed on the tests-docs hub prior to E2E codegen.

## 入力 (Input)
- `cases/**/TC-*.yaml` plan file.
- Owning specification bundle: `*.bundle.yaml`.

## 出力 (Output)
- Validated test plan passing `flowgrid cases:gate --strict`.
- Identification of missing facets, untraced steps, or invalid selector references.

## 説明・役割 (Description)
- tests-docs ハブにおいて `TC-*.yaml` テスト計画を精査：`cases:gate --strict` を実行し、観点マトリクスの網羅性、バンドルへの追跡性を検証し、仕様漏れを Docs へ差し戻し。
## 関連スキル (Related Skills)
- **Preceding:** `/testcase`.
- **Subsequent:** `flowgrid testcase:gen` → `/test`.

---

## プロンプト実行例 (Example Prompt)

```text
/grill-testcase TC-ADM-ORD-01

Verify testcase plan coverage, facet completeness, and traceability against W-ADM-ORD-01 bundle.
```

