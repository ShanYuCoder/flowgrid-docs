# Skill: `/business-impact-review`

## スキル名 (Name)
`business-impact-review`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/business-impact-review`
- Used prior to major production releases or architectural refactoring.

## 入力 (Input)
- Scope of planned changes, database migrations, breaking API changes.

## 出力 (Output)
- Business impact analysis report: Downtime risk, data migration windows, backward compatibility matrix, rollback strategies.

## 説明・役割 (Description)
- 大規模リリースやリファクタリングに先立ち、既存業務フロー、外部 API 契約、既存データ移行、SLA への影響範囲を総合評価。
---

## プロンプト実行例 (Example Prompt)

```text
/business-impact-review

Scope: Migrating Order status enum to dynamic status state machine table.
Assess database lock times, backward compatibility with mobile apps, and rollback plan.
```

