# Skill: `/test`

## Tên
`test`

## Cách dùng
- Slash: `/test` — **e2e-root** (Playwright), sau `testcase:gen`.
- **Không** thay `/testcase` (author plan trên tests-docs hub).

## Input
- `cases/**/TC-*.yaml` trên `FLOWGRID_TESTS_DOC` (resolve qua `--id` hoặc path member cung cấp).
- `ir/design.yaml` — `testIds`, UI sau split.
- PO + `*.spec.ts` đã gen; `portal-e2e-test.registry.json` cho `#e2e:*`.

## Output
- Scoped Playwright **green** (fixtures, mocks, PO gaps).
- Bổ sung `data-testid` trên UI khi plan yêu cầu và DOM thiếu (policy team).

## Description
- Implementation lane — không audit coverage (dùng `/grill-test`).
- Pre-wire: mocks theo TC; post-wire: API thật ([wire.md](../../workflows/wire.md)).
- API hook: chủ yếu sửa `.api.spec.ts` sau `testcase:gen:api` (ít PO).

## Liên quan
- **Trước:** `testcase:gen` hoặc `testcase:gen:api`
- **Sau:** `/grill-test`

Harness: `harness/fe/skills/test/SKILL.md` (nếu synced trên FE repo).

---

## Example prompt

```text
/test

Scope: TC-LOGIN-VALID only (one session)
Fix fixture/session gaps until test:e2e --grep LOGIN passes
Do not regen entire hub via testcase:gen --all
```
