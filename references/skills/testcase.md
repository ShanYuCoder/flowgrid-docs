# Skill: `/testcase`

## Tên
`testcase`

## Cách dùng
- Slash: `/testcase <W-* | slug | path under cases/>`
- **Owner:** tests-docs hub (`FLOWGRID_TESTS_DOC`) — không sửa Playwright trên e2e-root.

## Input
- **Bắt buộc:** toàn bộ `*.bundle.yaml` cùng function leaf trên docs hub (`FLOWGRID_DOCS_ROOT`).
- Trace từ `userStories`, `acceptanceCriteria`, `spec.ui`, `design.sections`, `design.actions`, `design.stateMatrix`.

## Output
- `cases/<mirror-path>/TC-*.yaml` (`schemaVersion: 2`, `testMatrix`, `traceability`, `steps`, `testIds`).
- Sau handoff: `flowgrid cases:render` → `TC-*.md` (user case VitePress).

## Description
- SSOT **plan** kiểm thử theo function — feed `testcase:gen` và grill.
- Path mirror docs: [artifacts/tests-docs.md](../../artifacts/tests-docs.md).
- Hướng dẫn: [tpl-testcase-plan.md](../../../harness/tests/templates/tpl-testcase-plan.md).

## Gates
- Draft: `flowgrid audit testcase <TC> --bundle <bundle.yaml>`
- Release: `flowgrid cases:gate --strict --docs-root $FLOWGRID_DOCS_ROOT`

## Chú ý
- Bundle thiếu story/AC → **STOP** → `/update-spec` trên docs — không bịa test.
- **Không** sửa `TC-*.md` tay; **không** dùng generated MD làm SSOT.
- YAML thuần — không JS thô trong giá trị (`"a".repeat(256)`).

## Liên quan
- **Trước:** bundle/spec ổn trên docs (có thể song song sau design grill round 1).
- **Sau:** `/grill-testcase` → `cases:render` → `testcase:gen` → `/test`.

---

## Example prompt

```text
/testcase

Target: W-ADM-AUTH-01 · mirror cases path under FLOWGRID_TESTS_DOC
Read full login.bundle.yaml on docs hub before authoring TC-LOGIN-01.yaml
```
