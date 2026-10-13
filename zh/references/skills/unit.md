# Skill: `/unit`

## 名称 (Name)
`unit`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/unit`
- Used in Phase 2c to generate and run unit tests for backend modules.

## 输入 (Input)
- Backend service / controller implementation files in `source-code/`.
- Target contract: `01-backend-spec.yaml`.

## 输出 (Output)
- Unit test suites (PHPUnit / Vitest / Jest / PyTest depending on tech stack).
- High-coverage unit test verification.

## 描述说明 (Description)
- 在后端代码库中运行或生成单元测试 (PHPUnit/pytest/Jest)，验证业务计算逻辑与领域实体行为。
---

## 提示词调用示例 (Example Prompt)

```text
/unit source-code/backend/app/Services/OrderService.php
```

