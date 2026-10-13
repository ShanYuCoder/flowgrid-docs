# Skill: `/grill-testcase`

## 名称 (Name)
`grill-testcase`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-testcase`
- Executed on the tests-docs hub prior to E2E codegen.

## 输入 (Input)
- `cases/**/TC-*.yaml` plan file.
- Owning specification bundle: `*.bundle.yaml`.

## 输出 (Output)
- Validated test plan passing `flowgrid cases:gate --strict`.
- Identification of missing facets, untraced steps, or invalid selector references.

## 描述说明 (Description)
- 在 tests-docs hub 审查 `TC-*.yaml` 测试计划：运行 `cases:gate --strict`，检查全维度矩阵覆盖、逆向追溯至 Bundle，发现规格缺失回传 Docs。
## 相关技能 (Related Skills)
- **Preceding:** `/testcase`.
- **Subsequent:** `flowgrid testcase:gen` → `/test`.

---

## 提示词调用示例 (Example Prompt)

```text
/grill-testcase TC-ADM-ORD-01

Verify testcase plan coverage, facet completeness, and traceability against W-ADM-ORD-01 bundle.
```

