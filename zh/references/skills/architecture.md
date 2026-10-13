# Skill: `/architecture`

## 名称 (Name)
`architecture`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/architecture`
- Executed in Phase 0 to establish system architecture documentation.

## 输入 (Input)
- Technical stack specifications, deployment infrastructure, architectural constraints.

## 输出 (Output)
- Arc42-aligned documentation under `architecture/`:
  - `01-context-and-scope.md`
  - `02-architecture-constraints.md`
  - `03-system-scope-and-context.md`
  - `04-solution-strategy.md`
  - `05-building-block-view.md`
  - `06-runtime-view.md`
  - `07-deployment-view.md`
  - `08-crosscutting-concepts.md`
  - `09-architectural-decisions.md`
  - `10-quality-requirements.md`
  - `11-risks/risk-register.md`

## 描述说明 (Description)
- 遵循国际标准 Arc42 框架，在 Phase 0 建立系统全局技术架构蓝图（含 12 个核心专业板块与数据模型）。
## 相关技能 (Related Skills)
- **Paired with:** `/architecture-grill` for technical critique and validation.

---

## 提示词调用示例 (Example Prompt)

```text
/architecture

Generate Arc42 system architecture documentation for microservices platform with NestJS backend, Nuxt frontend, PostgreSQL, and Redis caching.
```

