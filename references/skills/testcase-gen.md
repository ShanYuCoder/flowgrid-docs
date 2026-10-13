# Codegen Commands — `testcase:gen` · `testcase:gen:api`

CLI commands on the **code repository** (e2e-root). Planning SSOT: `FLOWGRID_TESTS_DOC` → `cases/**/TC-*.yaml`.

Extract: [testcase-gen-cli.md](../../../harness/tests/extracts/testcase-gen-cli.md)

---

## UI E2E — `flowgrid testcase:gen`

**TC Prerequisites:** `genType: e2e`, `route`, `testIds`, `schemaVersion: 2`, `testMatrix`, `steps`.

```bash
# Resolve by identifier (W-*, TC-*, CMP-*, SC-*, smoke, etc.)
flowgrid testcase:gen --id W-ADM-AUTH-01
flowgrid testcase:gen --id TC-LOGIN-VALID

# By path on tests hub
flowgrid testcase:gen --testcase cases/admin/CMP-*/02/01/login/TC-LOGIN-01.yaml

# All E2E TCs for a single screen
flowgrid testcase:gen --feature W-ADM-AUTH-01

# Entire hub (e2e only)
flowgrid testcase:gen --all

# Dry-run (alias flowgrid testcase:gen:dry)
flowgrid testcase:gen --dry-run --id TC-*
flowgrid testcase:gen:dry --testcase cases/.../TC-*.yaml
```

| Flag | Meaning |
|------|---------|
| `--force` | Overwrite existing spec and Page Object files |
| `--tests-docs <path>` | Hub path when different from `FLOWGRID_TESTS_DOC` |
| `--dry-run` / `--dry` | Print target paths without writing files to disk |

**Output:** Page Objects + `*.spec.ts` files under `frontend.e2eRoot` (typically `tests/e2e/`).

**Pre-Generation:** `cases:gate --strict` (policy) · `portal:gen` / UI testIds · [Single Screen Grilling](../../workflows/test.md#grill-single-screen).

**Post-Generation:** `/test` → `/grill-test` · `flowgrid audit e2e`.

---

## API Hook — `flowgrid testcase:gen:api`

**TC Prerequisites:** `genType: api-e2e`, `refs.screen` = `API-*`, `api`, `apiSteps[]` (minimum 1 step).

```bash
flowgrid testcase:gen:api --testcase cases/.../TC-PARTNER-EXPORT.yaml
flowgrid testcase:gen:api --id TC-PARTNER-EXPORT
flowgrid testcase:gen:api --all
flowgrid testcase:gen:api:dry --id TC-*
```

**Output:** `tests/api-e2e/<module>/<TC-id>.api.spec.ts` (Playwright `request`).

**Environment:** `FLOWGRID_API_TEST_BASE_URL` or key defined in `api.baseUrlEnv`.

**Newman:** Not generated via CLI — tag `contract-postman` on TC; execute dedicated collection runner ([test-api](./test-api.md)).

---

## Hub Commands (No Playwright Code Generation)

Execute from tests-docs root (or cwd + env):

```bash
flowgrid cases:check
flowgrid cases:render
flowgrid cases:coverage
flowgrid cases:gate --strict --docs-root "$FLOWGRID_DOCS_ROOT"
```

---

## Related Skills & Workflows

| Task | Skill |
|------|-------|
| Author UI Plan | `/testcase` |
| Author API Plan | `/test-api` |
| Grill Test Plan | `/grill-testcase` |
| Fix Spec / Test Implementation | `/test` (UI) · API specs usually edited directly in `.api.spec.ts` post-generation |

Workflow: [test.md](../../workflows/test.md)
