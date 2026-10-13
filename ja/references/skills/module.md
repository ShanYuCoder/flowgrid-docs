# Skill: `/module`

## スキル名 (Name)
`module`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/module`
- Executed in Phase 0 to define module clusters under specific surfaces.

## 入力 (Input)
- Surface directory and functional domain breakdown.

## 出力 (Output)
- Module-level specification: `CMP-*.module.yaml` and directory structure under `surfaces/<surface>/CMP-*/`.
- Pre-allocation of shared Module APIs under `common/yaml/<slug>/`.
- Screen catalog listing projected leaf screens (`W-*`).

## 説明・役割 (Description)
- Phase 0 において機能モジュール (`CMP-*`) の責務境界、依存関係、内包画面一覧、提供機能を定義。
## 関連スキル (Related Skills)
- **Preceding:** `/surfaces`.
- **Subsequent:** `/user-flow`, `/db-erd`, `/spec`.

---

## プロンプト実行例 (Example Prompt)

```text
/module

Surface: surfaces/admin/
Create module CMP-ADM-HOTEL (Hotel Management) containing screens for Hotel List (W-01), Hotel Detail/Edit (W-02), and Room Allocation (W-03).
```

