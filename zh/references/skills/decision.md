# Skill: `/decision`

## 名称 (Name)
`decision`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/decision`
- Used to record Architecture Decision Records (ADR) under `architecture/09-architectural-decisions/`.

## 输入 (Input)
- Architectural dilemma, evaluated alternatives, selected decision, technical justification.

## 输出 (Output)
- ADR document: `ADR-{NNNN}-{slug}.md` adhering to Michael Nygard's standard ADR template (Status, Context, Decision, Consequences).

## 描述说明 (Description)
- 在 `architecture/09-decisions/` 归档正式的架构技术决策 (`ADR-{NNN}-{slug}.md`)，详细记录决策背景、备选方案优劣对比与最终裁决理由。
---

## 提示词调用示例 (Example Prompt)

```text
/decision Use PostgreSQL JSONB for Dynamic Product Attributes

Record ADR evaluating MongoDB vs PostgreSQL JSONB; decide on PostgreSQL JSONB due to transactional consistency requirements.
```

