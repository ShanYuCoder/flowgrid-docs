# Skill: `/business-impact-review`

## 名称 (Name)
`business-impact-review`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/business-impact-review`
- Used prior to major production releases or architectural refactoring.

## 输入 (Input)
- Scope of planned changes, database migrations, breaking API changes.

## 输出 (Output)
- Business impact analysis report: Downtime risk, data migration windows, backward compatibility matrix, rollback strategies.

## 描述说明 (Description)
- 在重大版本迭代或架构重构前，评估对现有业务流程、对外 API 契约、存量数据迁移以及 SLA 指标的影响。
---

## 提示词调用示例 (Example Prompt)

```text
/business-impact-review

Scope: Migrating Order status enum to dynamic status state machine table.
Assess database lock times, backward compatibility with mobile apps, and rollback plan.
```

