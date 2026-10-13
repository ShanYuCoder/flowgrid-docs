# Skill: `/scenario`

## スキル名 (Name)
`scenario`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/scenario`
- Used in Phase 2b to author end-to-end multi-screen scenario test plans.

## 入力 (Input)
- User flow specification: `FLOW-*.md` from Docs Hub.
- Screen list touched by the user journey (`screens: [W-*, ...]`).

## 出力 (Output)
- Scenario plan YAML: `scenarios/**/SC-*.yaml`.

## 説明・役割 (Description)
- Docs 内の `FLOW-*.md` に基づき、tests-docs ハブに画面横断シナリオテスト計画 (`SC-*.yaml`) を作成し、各画面の `TC` を連携。
## 関連スキル (Related Skills)
- **Preceding:** `/user-flow`.
- **Subsequent:** `/testcase` (per screen) → `audit scenario`.

---

## プロンプト実行例 (Example Prompt)

```text
/scenario FLOW-ADM-AUTH-01

Author cross-screen scenario plan for login, two-factor OTP verification, and first-time password reset.
```

