# Skill: `/unit`

## スキル名 (Name)
`unit`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/unit`
- Used in Phase 2c to generate and run unit tests for backend modules.

## 入力 (Input)
- Backend service / controller implementation files in `source-code/`.
- Target contract: `01-backend-spec.yaml`.

## 出力 (Output)
- Unit test suites (PHPUnit / Vitest / Jest / PyTest depending on tech stack).
- High-coverage unit test verification.

## 説明・役割 (Description)
- バックエンドリポジトリにおいて単体テスト (PHPUnit/pytest/Jest) を実行・生成し、ドメインロジックの計算やエンティティの振る舞いを検証。
---

## プロンプト実行例 (Example Prompt)

```text
/unit source-code/backend/app/Services/OrderService.php
```

