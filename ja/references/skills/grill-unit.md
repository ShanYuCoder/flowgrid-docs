# Skill: `/grill-unit`

## スキル名 (Name)
`grill-unit`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-unit`
- Quality gate executed before finalizing backend unit test suites.

## 入力 (Input)
- Backend unit test files and source implementation.

## 出力 (Output)
- Unit test quality report (boundary checks, edge-case coverage, mock boundaries).

## 説明・役割 (Description)
- フロントエンド Vitest 単体テストのモック境界、分離度、カバレッジを精査。
---

## プロンプト実行例 (Example Prompt)

```text
/grill-unit source-code/backend/tests/Unit/OrderServiceTest.php
```

