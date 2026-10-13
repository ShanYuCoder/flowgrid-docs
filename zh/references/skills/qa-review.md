# Skill: `/qa-review`

## 名称 (Name)
`qa-review`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/qa-review`
- Used by Senior Engineers or Leads to review QA resolutions or request revisions.

## 输入 (Input)
- QA file: `qa/<SHORT>_NNNN.yaml`.
- Review remarks.

## 输出 (Output)
- Appended `updates[]` entry with `kind: review`.
- Re-opens item (`status: open`) if `needs-change` is indicated.

## 描述说明 (Description)
- 技术主管或 BA 对已记录的 QA 事项追加评审意见；若包含 `needs-change` 则自动将状态重置为待解决。
---

## 提示词调用示例 (Example Prompt)

```text
/qa-review HOTEL-LIST_0001

needs-change: Add explicit acceptance criteria when the property has no configured timezone.
```

