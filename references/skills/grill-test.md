# Skill: `/grill-test`

## Tên
`grill-test`

## Cách dùng
- Slash: `/grill-test` — **sau** `/test` và scoped `test:e2e` green (hoặc failure đã ghi nhận).
- **Owner:** repo **e2e-root** (FE/code) — không author `TC-*.yaml` ở đây.

## Input
- Plan SSOT: `cases/**/TC-*.yaml` trên `FLOWGRID_TESTS_DOC` (không `testcases/` cạnh code).
- Docs: `*.bundle.yaml` + `ir/design.yaml` (`testIds`, actions).
- Automation: Page Objects + `*.spec.ts` under e2e-root.

## Output
- Ma trận 4 chiều: bundle AC ↔ TC plan ↔ PO ↔ spec.
- Gap list — patch qua `/test` (code) hoặc `/grill-testcase` / `/update-spec` (plan/spec).

## Gates
```text
flowgrid audit e2e --id <TC-id> --tests-docs "$FLOWGRID_TESTS_DOC" --e2e-root <path>
```

## Description
- Audit only — **no** bulk `testcase:gen`, **no** production fix như `/test`.
- `#e2e:*` semantic / a11y trên TC phải có trong spec hoặc defer `QA-*`.
- Gap plan vs bundle → handoff tests-hub `/grill-testcase` hoặc docs `/update-spec`.
- Post-wire plan/API mismatch → `wire-test-handoff.md` trên tests hub.
- Sau `/wire` cần fe-be + scenario gate → `/grill-wire` (không thay `/grill-test` khi chỉ matrix E2E).

## Liên quan
- **Trước:** `testcase:gen`, `/test`
- **Sau:** lifecycle `test` · wire scoped E2E

Workflow: [test.md § E2E](../../workflows/test.md#test-e2e-lane) · harness: `harness/fe/skills/grill-test/SKILL.md`

---

## Example prompt

```text
/grill-test

TC-id: TC-LOGIN-VALID
Run audit e2e with FLOWGRID_TESTS_DOC and e2e-root tests/e2e
Build 4-way matrix; handoff /test for missing PO/testId
```
