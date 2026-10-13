# Skill: `/grill-test`

## 名称 (Name)
`grill-test`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/grill-test`
- Executed on the code repository (e2e-root) after `/test` has achieved a green test pass.

## 输入 (Input)
- Generated Playwright test files (`*.spec.ts`) and Page Objects.
- Source test plan: `TC-*.yaml`.

## 输出 (Output)
- Verification report confirming 1:1 parity across TC ↔ Page Object ↔ Playwright assertions.
- Semantic assertion audit (`#e2e:*` checks, layout integrity, no raw brittle locators).

## 描述说明 (Description)
- 在 `/test` 绿灯通过后，审查 Playwright 测试代码的健壮性：验证 TC ↔ PO ↔ Spec 矩阵对齐，杜绝脆弱选择器与假绿假通过。
---

## 提示词调用示例 (Example Prompt)

```text
/grill-test W-ADM-ORD-01
```

