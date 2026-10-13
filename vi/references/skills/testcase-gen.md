# Lệnh codegen — `testcase:gen` · `testcase:gen:api`

CLI trên **repo code** (e2e-root). Plan SSOT: `FLOWGRID_TESTS_DOC` → `cases/**/TC-*.yaml`.

Extract: [testcase-gen-cli.md](../../../harness/tests/extracts/testcase-gen-cli.md)

---

## UI E2E — `flowgrid testcase:gen`

**Điều kiện TC:** `genType: e2e`, `route`, `testIds`, `schemaVersion: 2`, `testMatrix`, `steps`.

```bash
# Resolve từ id (W-*, TC-*, CMP-*, SC-*, smoke, …)
flowgrid testcase:gen --id W-ADM-AUTH-01
flowgrid testcase:gen --id TC-LOGIN-VALID

# Path trên tests hub
flowgrid testcase:gen --testcase cases/admin/CMP-*/02/01/login/TC-LOGIN-01.yaml

# Mọi TC e2e của một màn
flowgrid testcase:gen --feature W-ADM-AUTH-01

# Toàn hub (e2e only)
flowgrid testcase:gen --all

# Dry-run (alias flowgrid testcase:gen:dry)
flowgrid testcase:gen --dry-run --id TC-*
flowgrid testcase:gen:dry --testcase cases/.../TC-*.yaml
```

| Flag | Ý nghĩa |
|------|---------|
| `--force` | Ghi đè spec/PO đã tồn tại |
| `--tests-docs <path>` | Hub khi khác `FLOWGRID_TESTS_DOC` |
| `--dry-run` / `--dry` | In path sẽ ghi, không ghi file |

**Output:** Page Object + `*.spec.ts` dưới `frontend.e2eRoot` (thường `tests/e2e/`).

**Trước gen:** `cases:gate --strict` (policy) · `portal:gen` / testId trên UI · [grill một màn](../../workflows/test.md#grill-single-screen).

**Sau gen:** `/test` → `/grill-test` · `flowgrid audit e2e`.

---

## API hook — `flowgrid testcase:gen:api`

**Điều kiện TC:** `genType: api-e2e`, `refs.screen` = `API-*`, `api`, `apiSteps[]` (min 1).

```bash
flowgrid testcase:gen:api --testcase cases/.../TC-PARTNER-EXPORT.yaml
flowgrid testcase:gen:api --id TC-PARTNER-EXPORT
flowgrid testcase:gen:api --all
flowgrid testcase:gen:api:dry --id TC-*
```

**Output:** `tests/api-e2e/<module>/<TC-id>.api.spec.ts` (Playwright `request`).

**Env:** `FLOWGRID_API_TEST_BASE_URL` hoặc key trong `api.baseUrlEnv`.

**Newman:** không gen từ CLI — tag `contract-postman` trên TC; chạy collection riêng ([test-api](./test-api.md)).

---

## Hub commands (không sinh Playwright)

Chạy từ tests-docs root (hoặc cwd + env):

```bash
flowgrid cases:check
flowgrid cases:render
flowgrid cases:coverage
flowgrid cases:gate --strict --docs-root "$FLOWGRID_DOCS_ROOT"
```

---

## Liên quan

| Việc | Skill |
|------|--------|
| Author plan UI | `/testcase` |
| Author plan API | `/test-api` |
| Grill plan | `/grill-testcase` |
| Sửa spec | `/test` (UI) · API spec thường sửa tay `.api.spec.ts` sau gen |

Workflow: [test.md](../../workflows/test.md)
