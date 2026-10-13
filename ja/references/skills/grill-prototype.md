# Skill: `/grill-prototype`

## スキル名 (Name)
`grill-prototype`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/grill-prototype`
- Executed immediately following `/prototype` before test lane handoff.

## 入力 (Input)
- Implemented prototype code in FE repository.
- Original design spec: `ir/design.yaml`.

## 出力 (Output)
- UI audit report covering layout fidelity, empty/loading/error states, long text overflow, and testIds.
- Remediation patches applied to prototype code.

## 説明・役割 (Description)
- 生成された画面プロトタイプと仕様書を比較し、再現度、文言の完全性、モック境界、`data-testid` 付与状況をレビュー。
---

## プロンプト実行例 (Example Prompt)

```text
/grill-prototype order-list

Verify layout responsiveness, empty state handling, and data-testid presence on W-ADM-ORD-01 prototype.
```

