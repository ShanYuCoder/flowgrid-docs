# Audit & Gap Check (CLI ↔ Engine)

**SSOT Reference:** The `flowgrid audit *` commands — deterministic scripts emitting structured **JSON** to stdout (`gaps[]`, `confirms[]`, engine-specific gap error codes).

**When to Run (Gates & Phases):** [workflows/gates.md](../workflows/gates.md) · **Closing a Function:** [gates.md § close-one-function](../workflows/gates.md#close-one-function).

**Installation & Environment:** `FLOWGRID_DOCS_ROOT`, `FLOWGRID_TESTS_DOC`, `--e2e-root` → [cli-and-commands.md](./cli-and-commands.md).

---

## Command Syntax

```text
flowgrid audit <kind> [args…]
flowgrid audit:<kind> [args…]    # legacy alias
flowgrid audit                   # print help
```

Or `pnpm run flowgrid:audit:<kind>` after `flowgrid init` (when npm scripts are injected into repository).

---

## 1:1 Command ↔ Engine Mapping

| Kind | Command | Engine Script | Primary Input | Flags & Environment |
| --- | --- | --- | --- | --- |
| **spec** | `flowgrid audit spec` | `engines/spec/lib/audit-bundle-gaps.mjs` | `*.bundle.yaml` (UI/spec) | `--type list \| create \| detail \| admin-crud \| auth \| change-password \| public` |
| **hub-prd** | `flowgrid audit hub-prd` | `engines/docs/lib/audit-hub-prd.mjs` | `overview/index.md`, surface/CMP `index.md` | — |
| **risks** | `flowgrid audit risks` | `engines/docs/lib/audit-risks-catalog.mjs` | **`architecture/11-risks/risk-register.md`** (primary) or `index.md` | Risk register columns (threshold / demand / delta) |
| **flow** | `flowgrid audit flow` | `audit-flow-gaps.mjs` | `FLOW-*.md` | — |
| **api** | `flowgrid audit api` | `audit-api-gaps.mjs` | API / integration `*.bundle.yaml` | — |
| **testcase** | `flowgrid audit testcase` | `audit-testcase-gaps.mjs` | `TC-*.yaml` (v2) or legacy plan | `--bundle <foo.bundle.yaml>` cross-ref bundle |
| **fe-be** | `flowgrid audit fe-be` | `audit-fe-be-alignment.mjs` | UI `*.bundle.yaml` | `--backend-spec …/01-backend-spec.yaml` (defaults to adjacent surface resolution) |
| **scenario** | `flowgrid audit scenario` | `audit-scenario-coverage.mjs` | `SC-*.yaml` / scenario md | `--tests-docs <hub>` or `FLOWGRID_TESTS_DOC` |
| **e2e** | `flowgrid audit e2e` | `audit-e2e-coverage.mjs` | Playwright (`e2eRoot` config/MCP or `--e2e-root`) + TC plan | `--id TC-*` / screen / suite, `--tests-docs`, `--screen W-*`, `--strict`; or `TC-*.yaml` paths |
| **legacy** | `flowgrid audit legacy` | `audit-legacy-gaps.mjs` | `adoption-inventory.md` + optional target id | `<target-id>` |

---

## Output & Exit Codes

- By default prints pretty-printed **JSON** to stdout (consumed by adversarial grill skills or agents reading `gaps[]`).
- Engines may set `criticalGaps` / `warningGaps`; CI quality gates typically run **`cases:gate`** for test hubs, rather than combining all audits into one step.
- UX spec gap codes: `UX_*`, `CONFIRM_UX_*`, `uxAffordanceGaps` in the `audit spec` report.
- FE↔BE alignment: codes prefixed with `FEBE_*` in `audit fe-be`.
- Scenario coverage: `SC_SCREEN_NO_TC` when `screens[]` lacks a matching `TC-*.yaml` (or deferred with `QA-*`).

---

## Usage Examples

### Frontend / Fullstack (Portal Bundle)

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

### Backend-Only (API Spec on Docs Hub)

```bash
export FLOWGRID_DOCS_ROOT="$(pwd)/docs"

flowgrid audit api surfaces/partner-gateway/acme/export/api/01/01-backend-spec.yaml
flowgrid audit spec surfaces/admin/CMP-ADM-ORD-01/02/01/list.bundle.yaml --type list   # if portal UI exists
flowgrid audit fe-be surfaces/admin/CMP-ADM-ORD-01/02/01/list.bundle.yaml            # when both FE bundle + 01 exist
flowgrid audit testcase cases/partner/TC-partner-export.yaml \
  --bundle surfaces/partner-gateway/acme/export/api/01/01-backend-spec.yaml
```

### Release Quality Gate (`cases:gate`)

Does not replace `audit *` — consolidates schema v2, TC audit, bundle traceability, matrix facets, and coverage:

```bash
flowgrid cases:gate --strict --docs-root "$FLOWGRID_DOCS_ROOT"
# or run from tests-docs repo (cwd = hub):
cd tests && flowgrid cases:gate --strict --docs-root ../docs
```

### Legacy Migration Inventory

```bash
flowgrid audit legacy my-legacy-target
```

---

## Companion Commands (Distinct from `audit *`)

| Command | Role |
| --- | --- |
| `flowgrid cases:gate` | Release gate for test suites: schema v2 + `audit testcase` + bundle trace + screen facets + `cases:coverage` (`--strict`, `--docs-root`, `--no-coverage`) |
| `flowgrid cases:check` | Fast syntax / schema validation for testcase files |
| `flowgrid check` / `split` | Validates IR ↔ bundle synchronization before generating testcases |
| `flowgrid doctor` | Validates configuration, MCP wiring, and environment placeholders |

---

## Skills Enforcing Audits

| Skill | Mandatory / Recommended Audit |
| --- | --- |
| `/update-spec`, `/grill-dev` | `audit spec` |
| `/api-spec` | `audit api` |
| `/user-flow` | `audit flow` |
| `/grill-hub-prd` | `audit hub-prd` |
| `/risk-register` | `audit risks` → `risk-register.md` |
| `/testcase`, `/grill-testcase` | `cases:gate`, `audit testcase --bundle`, `audit scenario` |
| `/scenario` | `audit scenario` |
| `/wire` | `audit e2e`, `audit fe-be`, `audit scenario` (when SC exists) |
| `/grill-wire` | Verification chain — verify-only following `/wire`; gap → `/update-spec`, `/api-update`, `/grill-testcase`, `/test` |
| `/init`, `/legacy` | `audit legacy` |
