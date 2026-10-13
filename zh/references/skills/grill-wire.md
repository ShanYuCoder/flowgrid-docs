# Skill: `/grill-wire`

## 名称 (Name)
`grill-wire`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-wire`
- Executed on the FE repository following `/wire` implementation.

## 输入 (Input)
- Wired frontend application code.
- Test suite in `tests/e2e/`.

## 输出 (Output)
- Convergence audit execution report:
  - `flowgrid audit e2e --screen <W-*>`
  - `flowgrid audit fe-be <path-to-bundle>`
  - `flowgrid audit scenario <SC.yaml>` (if part of scenario journey)

## 描述说明 (Description)
- 在 `/wire` 联调后执行全链路审计：运行 `audit e2e` + `audit fe-be` + `audit scenario`，确保生产代码无残留 Mock，鉴权健全且端到端绿灯。
---

## 提示词调用示例 (Example Prompt)

```text
/grill-wire W-ADM-ORD-01
```

