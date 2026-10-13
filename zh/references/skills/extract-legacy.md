# Skill: `/extract-legacy`

## 名称 (Name)
`extract-legacy`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/extract-legacy`
- Executed during Phase 0 of **Rebase / Modernization** workflows.

## 输入 (Input)
- Legacy codebase directory: `source-legacy/` (Read-Only).

## 输出 (Output)
- High-level functional inventory: `architecture/legacy-inventory.md`.
- Extracted surface catalog, module boundaries, database schemas, and shared business rules (`CMN-*`).
- Seed surface structure under `surfaces/`.

## 描述说明 (Description)
- 只读分析 `source-legacy/` 中的老系统代码，提取既有业务规则、表单逻辑和数据流，为重构提供事实依据。
## 相关技能 (Related Skills)
- **Subsequent:** `/init` (bind new target repos) and `/legacy` (per-screen extraction).

## 注意事项 (Important Notes)
- Never modifies `source-legacy/`.
- Focuses on high-level architecture and functional rosters rather than line-by-line implementation details.

---

## 提示词调用示例 (Example Prompt)

```text
/extract-legacy

Scan source-legacy/ to extract full module catalog, surfaces, database tables, and common services into architecture/legacy-inventory.md.
```

