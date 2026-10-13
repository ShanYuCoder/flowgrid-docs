# Skill: `/grill-wire`

## Tên
`grill-wire`

## Cách dùng
- Slash: `/grill-wire` — **sau** `/wire` (API thật, mock production đã gỡ, auth restore).
- Khác **`/wire`**: `/wire` = implement; `/grill-wire` = chỉ audit + routing gap (không sửa code hàng loạt).

## Audit bắt buộc (chuỗi)

```bash
flowgrid audit e2e --e2e-root <path> --tests-docs "$FLOWGRID_TESTS_DOC" --screen <W-*>
flowgrid audit fe-be <bundle.yaml>
flowgrid audit scenario <SC.yaml> --tests-docs "$FLOWGRID_TESTS_DOC"   # khi SC có màn scope
```

## Output
- Bảng gap từ JSON (`gaps[]`, `FEBE_*`, `SC_SCREEN_NO_TC`).
- Handoff có owner:
  - Code/PO/spec Playwright → `/test` → `/grill-test`
  - Plan TC thiếu facet post-wire → tests-hub `/grill-testcase`
  - Spec/UX sai → docs `/update-spec`
  - Contract `01` sai → docs `/api-update` → BE → `/wire` lại

## Liên kết
- Workflow: [wire.md § grill/gates](../../workflows/wire.md#wire-gates)
- Extract: `harness/fe/extracts/wire-audit-loop.md`
- Harness: `harness/fe/skills/grill-wire/SKILL.md`

## Example prompt

```text
/grill-wire

Screen: W-HOTEL-LIST
Bundle: surfaces/.../hotel-list.bundle.yaml
SC (if any): scenarios/.../SC-booking.yaml

Run audit chain; list critical/warning with handoff lane.
Do not patch bundle from FE repo.
```
