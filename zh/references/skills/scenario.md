# Skill: `/scenario`

## 名称 (Name)
`scenario`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/scenario`
- Used in Phase 2b to author end-to-end multi-screen scenario test plans.

## 输入 (Input)
- User flow specification: `FLOW-*.md` from Docs Hub.
- Screen list touched by the user journey (`screens: [W-*, ...]`).

## 输出 (Output)
- Scenario plan YAML: `scenarios/**/SC-*.yaml`.

## 描述说明 (Description)
- 根据 Docs 中的 `FLOW-*.md`，在 tests-docs 中编写跨屏幕场景测试计划 (`SC-*.yaml`)，串联各页面的 `TC` 测试用例。
## 相关技能 (Related Skills)
- **Preceding:** `/user-flow`.
- **Subsequent:** `/testcase` (per screen) → `audit scenario`.

---

## 提示词调用示例 (Example Prompt)

```text
/scenario FLOW-ADM-AUTH-01

Author cross-screen scenario plan for login, two-factor OTP verification, and first-time password reset.
```

