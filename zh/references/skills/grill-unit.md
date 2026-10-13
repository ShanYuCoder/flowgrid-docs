# Skill: `/grill-unit`

## 名称 (Name)
`grill-unit`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-unit`
- Quality gate executed before finalizing backend unit test suites.

## 输入 (Input)
- Backend unit test files and source implementation.

## 输出 (Output)
- Unit test quality report (boundary checks, edge-case coverage, mock boundaries).

## 描述说明 (Description)
- 审查前端 Vitest 单元测试用例的隔离性、Mock 边界及覆盖率。
---

## 提示词调用示例 (Example Prompt)

```text
/grill-unit source-code/backend/tests/Unit/OrderServiceTest.php
```

