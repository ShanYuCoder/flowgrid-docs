# Skill: `/build-templates`

## 名称 (Name)
`build-templates`

## 使用方式 (Command/Trigger)
- CLI command: `flowgrid build-template-code --sample=<path>`
- Slash command: `/build-templates`

## 输入 (Input)
- Golden Sample module path (e.g., `source-code/src/modules/orders`).

## 输出 (Output)
- Custom templates stored in Workspace SSOT: `.flowgrid/adapters/<target>/custom/`.
- Updated registries in `.flowgrid/adapters/<target>/custom/registries/`.

## 描述说明 (Description)
- 通过直接学习代码库中既有的标杆模块 (Golden Sample)，训练生成贴合项目的定制模板，确保生成的代码 100% 遵从团队既有规范。
- **4 层质量标准：** 契约不变性、4 种标准 UI 状态 (Loading/Empty/Error/Success)、控制反转 (IoC)、单测接缝。
---

## 提示词调用示例 (Example Prompt)

```text
/build-templates --sample=./source-code/admin-fe/src/modules/orders
```

