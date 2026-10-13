# Skill: `/testcase`

## スキル名 (Name)
`testcase`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/testcase`
- Authoring skill in **Phase 2b (Tests)** on the tests-docs hub (`FLOWGRID_TESTS_DOC`).

## 入力 (Input)
- Full leaf specification: `*.bundle.yaml` (`userStories`, `acceptanceCriteria`, actions, `testIds`).
- Rendered specification: `ir/generated/spec.md`.

## 出力 (Output)
- Test case plan YAML: `cases/**/TC-*.yaml` (`schemaVersion: 2`).
- Rendered human-readable test case: `TC-*.md` via `flowgrid cases:render`.

## 説明・役割 (Description)
- `*.bundle.yaml` を読み込み、tests-docs ハブに Schema v2 準拠の `TC-*.yaml` テスト計画を作成。受入基準 AC への完全な追跡性を保証。
## 関連スキル (Related Skills)
- **Preceding:** `/spec`, `/grill-bqa`.
- **Subsequent:** `/grill-testcase` → `flowgrid testcase:gen` → `/test`.

---

## プロンプト実行例 (Example Prompt)

```text
/testcase W-ADM-ORD-01

Author full testcase plan for Order Listing screen covering pagination, status filtering, empty search results, and CSV export.
```

