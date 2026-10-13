# Skill: `/model`

## 名称 (Name)
`model`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/model`
- Used in Phase 2a to generate TypeScript models and DTOs from contracts.

## 输入 (Input)
- `01-backend-spec.yaml` or `02-openapi.yaml`.

## 输出 (Output)
- TypeScript interfaces and DTOs in FE repository (`src/models/`).

## 描述说明 (Description)
- 根据 `01-backend-spec.yaml` 或 OpenAPI 规范，在前端代码库自动生成 TypeScript 强类型接口与数据模型定义。
---

## 提示词调用示例 (Example Prompt)

```text
/model surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```

