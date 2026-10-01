# Skill: `/scenario`

## Tên
`scenario`

## Cách dùng (Command/Trigger)
- Slash: `/scenario` — **tests-docs hub** (`--type=tests`).
- Author **SC-*** (cross-flow) sau khi docs hub có `FLOW-*.md` tương ứng.

## Input
- `FLOW-*.md` trên docs hub (`FLOWGRID_DOCS_ROOT`) — resolve theo LCA `common/user-flows/`.
- Ma trận màn `screens: [W-*]` cho toàn journey.

## Output
- YAML scenario dưới `scenarios/…` **mirror** path FLOW trên tests hub.
- Sau author: `flowgrid audit scenario <SC> --tests-docs <hub>` — sửa `SC_SCREEN_NO_TC` bằng `TC-*.yaml` hoặc defer `QA-*`.

## Description
- Kịch bản **xuyên màn / xuyên module** — không thay `/testcase` (một màn).
- FLOW mỏng hoặc thiếu → handoff docs-hub `/user-flow` hoặc `/update-spec` (prompt `/docs-hub` copy-paste).
- Không invent business từ `common/yaml/` hay patterns.

## Liên quan
- Plan màn: `/testcase` · Grill plan: `/grill-testcase` · Gate: `cases:gate`
- Workflow: [test.md](../../workflows/test.md) · Artifact: [tests-docs.md](../../artifacts/tests-docs.md)

```text
/scenario

FLOW: {FLOW-checkout} · screens: W-*, W-*
Mirror path scenarios/…/FLOW-checkout/SC-*.yaml
Run: flowgrid audit scenario … --tests-docs $FLOWGRID_TESTS_DOC
```
