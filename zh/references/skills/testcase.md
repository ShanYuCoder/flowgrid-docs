# Skill: `/testcase`

## 名称 (Name)
`testcase`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/testcase`
- Authoring skill in **Phase 2b (Tests)** on the tests-docs hub (`FLOWGRID_TESTS_DOC`).

## 输入 (Input)
- Full leaf specification: `*.bundle.yaml` (`userStories`, `acceptanceCriteria`, actions, `testIds`).
- Rendered specification: `ir/generated/spec.md`.

## 输出 (Output)
- Test case plan YAML: `cases/**/TC-*.yaml` (`schemaVersion: 2`).
- Rendered human-readable test case: `TC-*.md` via `flowgrid cases:render`.

## 描述说明 (Description)
- 读取 `*.bundle.yaml`，在 tests-docs hub 编写符合 Schema v2 的 `TC-*.yaml` 测试计划，确保 100% 溯源至验收标准 AC。
## 相关技能 (Related Skills)
- **Preceding:** `/spec`, `/grill-bqa`.
- **Subsequent:** `/grill-testcase` → `flowgrid testcase:gen` → `/test`.

---

## 提示词调用示例 (Example Prompt)

```text
/testcase W-ADM-ORD-01

Author full testcase plan for Order Listing screen covering pagination, status filtering, empty search results, and CSV export.
```

