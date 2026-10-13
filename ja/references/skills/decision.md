# Skill: `/decision`

## スキル名 (Name)
`decision`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/decision`
- Used to record Architecture Decision Records (ADR) under `architecture/09-architectural-decisions/`.

## 入力 (Input)
- Architectural dilemma, evaluated alternatives, selected decision, technical justification.

## 出力 (Output)
- ADR document: `ADR-{NNNN}-{slug}.md` adhering to Michael Nygard's standard ADR template (Status, Context, Decision, Consequences).

## 説明・役割 (Description)
- `architecture/09-decisions/` 配下に正式なアーキテクチャ決定記録 (`ADR-{NNN}-{slug}.md`) を起票。背景、代替案の比較、選定理由を恒久記録。
---

## プロンプト実行例 (Example Prompt)

```text
/decision Use PostgreSQL JSONB for Dynamic Product Attributes

Record ADR evaluating MongoDB vs PostgreSQL JSONB; decide on PostgreSQL JSONB due to transactional consistency requirements.
```

