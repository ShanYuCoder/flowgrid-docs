# Skill: `/architecture-grill`

## 名称 (Name)
`architecture-grill`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/architecture-grill`
- Executed after drafting architecture documents in Phase 0.

## 输入 (Input)
- Documents in `architecture/` and system constraints.

## 输出 (Output)
- Architecture critique report, identifying scalability bottlenecks, single points of failure, and security risks.
- Actionable revisions applied to `architecture/` files.

## 描述说明 (Description)
- 对 `architecture/` 下的 Arc42 设计文档进行深度技术质询，审查并发瓶颈、技术选型合理性与安全边界。
## 相关技能 (Related Skills)
- **Preceding:** `/architecture`.
- **Subsequent:** `/db-erd`, `/module`.

---

## 提示词调用示例 (Example Prompt)

```text
/architecture-grill

Critique architecture/ files focusing on high-concurrency payment processing, idempotent webhooks, and distributed transaction boundaries.
```

