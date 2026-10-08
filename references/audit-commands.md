# Audit & gap check (CLI ↔ engine)

**SSOT tra cứu:** lệnh `flowgrid audit *` — script deterministic, stdout **JSON** (`gaps[]`, `confirms[]`, mã gap theo engine).

**Khi chạy (gate, phase):** [workflows/gates.md](../workflows/gates.md) · **đóng một function:** [gates.md § close-one-function](../workflows/gates.md#close-one-function).

**Cài / env:** `FLOWGRID_DOCS_ROOT`, `FLOWGRID_TESTS_DOC`, `--e2e-root` → [cli-and-commands.md](./cli-and-commands.md).

---

## Gọi lệnh

```text
flowgrid audit <kind> [args…]
flowgrid audit:<kind> [args…]    # legacy alias
flowgrid audit                   # help
```

`pnpm run flowgrid:audit:<kind>` sau `flowgrid init` (nếu repo inject script npm).

---

## Bảng 1:1 lệnh ↔ engine

| Kind | Lệnh | Engine | Input chính | Flags / env |
| --- | --- | --- | --- | --- |
| **spec** | `flowgrid audit spec` | `engines/spec/lib/audit-bundle-gaps.mjs` | `*.bundle.yaml` (UI/spec) | `--type list \| create \| detail \| admin-crud \| auth \| change-password \| public` |
| **hub-prd** | `flowgrid audit hub-prd` | `engines/docs/lib/audit-hub-prd.mjs` | `overview/index.md`, surface/CMP `index.md` | — |
| **risks** | `flowgrid audit risks` | `engines/docs/lib/audit-risks-catalog.mjs` | **`architecture/11-risks/risk-register.md`** (ưu tiên) hoặc `index.md` | Cột hạn mức / nhu cầu / chênh lệch trên register |
| **flow** | `flowgrid audit flow` | `audit-flow-gaps.mjs` | `FLOW-*.md` | — |
| **api** | `flowgrid audit api` | `audit-api-gaps.mjs` | API / integration `*.bundle.yaml` | — |
| **testcase** | `flowgrid audit testcase` | `audit-testcase-gaps.mjs` | `TC-*.yaml` (v2) hoặc legacy plan | `--bundle <foo.bundle.yaml>` cross-ref bundle |
| **fe-be** | `flowgrid audit fe-be` | `audit-fe-be-alignment.mjs` | UI `*.bundle.yaml` | `--backend-spec …/01-backend-spec.yaml` (mặc định resolve cạnh surface) |
| **scenario** | `flowgrid audit scenario` | `audit-scenario-coverage.mjs` | `SC-*.yaml` / scenario md | `--tests-docs <hub>` hoặc `FLOWGRID_TESTS_DOC` |
| **e2e** | `flowgrid audit e2e` | `audit-e2e-coverage.mjs` | Playwright (`e2eRoot` config/MCP hoặc `--e2e-root`) + TC plan | `--id TC-*` / screen / suite, `--tests-docs`, `--screen W-*`, `--strict`; hoặc `TC-*.yaml` paths |
| **legacy** | `flowgrid audit legacy` | `audit-legacy-gaps.mjs` | `adoption-inventory.md` + optional target id | `<target-id>` |

---

## Output & exit code

- Mặc định in **JSON** pretty-printed ra stdout (dùng trong grill / agent đọc `gaps[]`).
- Engine có thể set `criticalGaps` / `warningGaps`; CI gate thường dùng **`cases:gate`** cho tests-docs, không gộp tất cả audit vào một lệnh.
- Đọc gap UX spec: `UX_*`, `CONFIRM_UX_*`, `uxAffordanceGaps` trong report `audit spec`.
- FE↔BE: mã `FEBE_*` trong `audit fe-be`.
- Scenario: `SC_SCREEN_NO_TC` khi `screens[]` chưa có `TC-*.yaml` (hoặc defer có `QA-*`).

---

## Ví dụ (copy-paste)

### FE / fullstack (portal bundle)

```bash
export FLOWGRID_DOCS_ROOT="$(pwd)/docs"
export FLOWGRID_TESTS_DOC="$(pwd)/tests"

flowgrid audit spec surfaces/foo/W-001.bundle.yaml --type list
flowgrid audit testcase cases/foo/TC-W-001.yaml --bundle surfaces/foo/W-001.bundle.yaml
flowgrid audit fe-be surfaces/foo/W-001.bundle.yaml
flowgrid audit scenario scenarios/admin/SC-login.yaml --tests-docs "$FLOWGRID_TESTS_DOC"
flowgrid audit e2e --id TC-DEMO-001
flowgrid audit e2e --tests-docs "$FLOWGRID_TESTS_DOC" --screen W-001
```

### Backend-only (API spec trên docs-hub)

```bash
export FLOWGRID_DOCS_ROOT="$(pwd)/docs"

flowgrid audit api surfaces/partner-gateway/acme/export/api/01/01-backend-spec.yaml
flowgrid audit spec surfaces/admin/CMP-ADM-ORD-01/02/01/list.bundle.yaml --type list   # nếu có UI portal
flowgrid audit fe-be surfaces/admin/CMP-ADM-ORD-01/02/01/list.bundle.yaml            # khi có cả FE bundle + 01
flowgrid audit testcase cases/partner/TC-partner-export.yaml \
  --bundle surfaces/partner-gateway/acme/export/api/01/01-backend-spec.yaml
```

### Release gate tests-docs (`cases:gate`)

Không thay `audit *` — gom schema v2, audit TC, trace bundle, facets, coverage:

```bash
flowgrid cases:gate --strict --docs-root "$FLOWGRID_DOCS_ROOT"
# hoặc từ repo tests-docs (cwd = hub):
cd tests && flowgrid cases:gate --strict --docs-root ../docs
```

### Legacy

```bash
flowgrid audit legacy my-legacy-target
```

---

## Liên quan (không thay `audit *`)

| Lệnh | Vai trò |
| --- | --- |
| `flowgrid cases:gate` | Release gate tests-docs: schema v2 + `audit testcase` + trace bundle + screen facets + `cases:coverage` (`--strict`, `--docs-root`, `--no-coverage`) |
| `flowgrid cases:check` | Syntax / schema TC nhanh |
| `flowgrid check` / `split` | IR ↔ bundle đồng bộ trước testcase |
| `flowgrid doctor` | Config, MCP, env placeholder |

---

## Skill thường bắt audit (inventory)

| Skill | Audit bắt buộc / khuyến nghị |
| --- | --- |
| `/update-spec`, `/grill-dev` | `audit spec` |
| `/api-spec` | `audit api` |
| `/user-flow` | `audit flow` |
| `/grill-hub-prd` | `audit hub-prd` |
| `/risk-register` | `audit risks` → `risk-register.md` |
| `/testcase`, `/grill-testcase` | `cases:gate`, `audit testcase --bundle`, `audit scenario` |
| `/scenario` | `audit scenario` |
| `/wire` | `audit e2e`, `audit fe-be`, `audit scenario` (khi SC) |
| `/grill-wire` | Cùng chuỗi — verify-only sau `/wire`; gap → `/update-spec`, `/api-update`, `/grill-testcase`, `/test` |
| `/init`, `/legacy` | `audit legacy` |

Cập nhật engine: sửa `bin/lib/audit-run.mjs` (`AUDIT_ENGINES`) + test `test/audit-run.test.mjs` + bảng trên.
