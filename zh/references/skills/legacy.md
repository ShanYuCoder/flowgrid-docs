# Skill: `/legacy`

## 名称 (Name)
`legacy`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/legacy`
- Exclusively designed for **Rebase / Modernization** (rebuilding modern systems from legacy systems).

## 输入 (Input)
- Legacy codebase directory: `source-legacy/` (**STRICTLY READ-ONLY**).
- Legacy functional inventory extracted via `/extract-legacy`.

## 输出 (Output)
- Target codebase directory: `source-code/`.
- Clean specifications: `.bundle.yaml`, `ir/`, and `01-backend-spec.yaml`.
- 100% extraction of core business logic, validation rules, state machines, and DTOs into modern architecture.

## 不可违背原则 (Inviolable Rules)
- **`source-legacy/` is STRICTLY READ-ONLY:** Never modify, add, or delete files within this folder.
- **Strictly prohibit raw copy-pasting:** Never transfer legacy code directly into new repos. Re-architect logic cleanly according to project golden samples.
- **All outputs write to `source-code/`:** New code and SSOT specs live exclusively in modern directories.

## 描述说明 (Description)
- 以老代码为基线编写新规范（标记 `specOrigin: legacy`），在不丢失历史隐式规则的前提下实现架构升级。
---

## 提示词调用示例 (Example Prompt)

```text
/legacy /spec

Screen: Customer Management
Read legacy logic from source-legacy/app/Http/Controllers/CustomerController.php to extract all validation, business rules, and API specifications into the new architecture under source-code/.
```

