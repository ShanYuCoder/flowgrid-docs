# 🛠 CLI Commands & Agent Skills Reference

This document catalogs the complete suite of execution commands (Commands), Model Context Protocol (MCP) tools, and AI Skills (Skills) provided by FlowGrid.

## Installing the FlowGrid CLI

**Prerequisites:** Node.js **≥ 24**. Installing from **npm** does not pull VitePress/esbuild; installing from **Git** requires `--allow-build=@shanyucoder/flowgrid`.

**Team Workflow:** Install globally (or use `npx -y -p @shanyucoder/flowgrid@latest flowgrid …`) → **`cd` into target project repository** → **`flowgrid init`** (or `flowgrid setup`). Invoking `flowgrid` without arguments prints help text; it does not automatically execute init in the current directory.

**Recommended — Global via pnpm from npm registry** (Linux, macOS, WSL, **Windows PowerShell** — identical commands):

```bash
pnpm add -g @shanyucoder/flowgrid@latest
```

| OS | Post-Installation Steps |
| --- | --- |
| Linux / macOS / WSL | Run `pnpm setup` if necessary; binaries are typically linked to `~/.local/share/pnpm`. |
| Windows | Run `pnpm setup` → open a new terminal → verify with `where.exe flowgrid` or `flowgrid --version`. |

| Alternative Methods | Command |
| --- | --- |
| **GitHub global** (development / unreleased) | `pnpm add -g github:ShanYuCoder/flowgrid --allow-build=@shanyucoder/flowgrid` |
| **npx (on-demand)** | `npx -y -p @shanyucoder/flowgrid@latest flowgrid <command>` |
| **npm global** | `npm install -g @shanyucoder/flowgrid@latest` |
| **Dev dependency** | `pnpm add -D @shanyucoder/flowgrid@latest` → `pnpm exec flowgrid …` |
| **Bash script** (Unix / WSL / Git Bash) | `curl -fsSL https://raw.githubusercontent.com/ShanYuCoder/flowgrid/main/install.sh \| bash` |

| **CLI Updates** | `flowgrid update` — updates via npm `@latest` if installed from registry; or Git / `install.sh` / dev clone |
| **Check Before Update** | `flowgrid update --check` |

Uninstall: `flowgrid uninstall`.

For detailed initialization steps: [README § Installation](/readme).

---

## ⚙️ Core Processing Commands (FlowGrid CLI)

FlowGrid organizes development execution into three primary engines: **Docs Engine**, **Code Engine**, and **Test Engine**:

### Docs Engine (Specification & Documentation Management)
Commands managing documentation assets, splitting specification bundles, and rendering Markdown/OpenAPI interfaces.

| FlowGrid Command | Description |
|------------------|-------------|
| `flowgrid split` | Splits `.bundle.yaml` → `ir/design.yaml`, `ir/spec.yaml`, `ir/generated/spec.md` (+ `data-model.md`). |
| `flowgrid split_all` | Scans and splits all Bundle YAML files across the repository. |
| `flowgrid render` | Re-renders UI Design Specs from YAML into Markdown (Data Dictionary & State Matrix). |
| `flowgrid dev` | VitePress dev server: reads `.flowgrid/config.json` — `frontend.docsRoot` or `backend.docsRoot` (port **5173**), and/or corresponding `testsRoot` (port **5174**). Backend-only projects still utilize the docs hub (SSOT `01-backend-spec`, OpenAPI, surfaces) under the same command. |
| `flowgrid build` | Runs `vitepress build` sequentially for each `docsRoot` / `testsRoot` declared in config (output: individual `<hub>/.vitepress/dist`). |
| `flowgrid publish` | Publishes documentation assets and generates `CATALOG.md`. |
| `flowgrid publish manual` | Synchronizes User Manual (`.md`) files to Google Docs with quota protection and E2E visual evidence. |
| `flowgrid openapi_gen` | Generates or updates OpenAPI fragments from `01-backend-spec.yaml` (`--spec` path). |
| `flowgrid openapi_render` | Consolidates individual OpenAPI YAML fragments into `docs/openapi/api.yaml`. |
| `flowgrid openapi_build_ui` | Builds a static Swagger UI interface for the Documentation Hub. |
| `flowgrid api:check` | Validates `01-backend-spec.yaml` prior to backend code generation. Defaults cwd to docs hub. |

*(Example: `flowgrid split_all`)*

### Hub Paths Resolution Order (Config, Env, CLI)

Codegen, `dev`/`build`, `api:check`, and engine scripts resolve root pointers in the following order:

1. Explicit command-line flags: `--docs-root`, `--tests-docs`, `--e2e-root`, `--project-root`
2. MCP environment variables: `FLOWGRID_DOCS_ROOT`, `FLOWGRID_TESTS_DOC`, `FLOWGRID_E2E_ROOT`, `FLOWGRID_PROJECT_ROOT`
3. Configuration file `.flowgrid/config.json`: `frontend.docsRoot` / `backend.docsRoot` (and corresponding tests/e2e paths)

Example: `flowgrid gen:dry --docs-root docs/integration`.

### Audit & Harness (PR Workflow)

**SSOT Audit Matrix:** [audit-commands.md](./audit-commands.md). **Release Gates:** [workflows/gates.md](../workflows/gates.md). Output: JSON stdout with `gaps[]`.

| Command | Summary |
|---------|---------|
| `flowgrid audit` | Displays help: `spec`, `flow`, `api`, `testcase`, `fe-be`, `scenario`, `e2e`, `legacy`. |
| `flowgrid audit spec …` | Audits UI/spec bundle + UX affordances. Supports `--type` page profile. |
| `flowgrid audit api …` | Audits `01-backend-spec.yaml` / API contract specifications. |
| `flowgrid audit flow …` | Audits `FLOW-*.md` user journey sections and screen references. |
| `flowgrid audit testcase …` | Audits `TC-*.yaml`; cross-references bundles via `--bundle`. |
| `flowgrid audit fe-be …` | Validates alignment between `apiRef` in UI spec and `01-backend-spec.yaml`. |
| `flowgrid audit scenario …` | Audits scenario `screens[]` vs `cases/**`; `--tests-docs` / `FLOWGRID_TESTS_DOC`. |
| `flowgrid audit e2e …` | Audits test plan coverage against Playwright test files; `--e2e-root`. |
| `flowgrid audit legacy …` | Audits legacy adoption inventory. |
| `flowgrid harness sync` | Synchronizes skills, rules, and MCP configurations from `.flowgrid/config.json` (`agents[]`). |
| `flowgrid harness sync --full-docs` | On FE/BE repos: syncs the complete docs harness (default syncs only consumer subset). |
| `flowgrid harness sync --agent=cursor` | Syncs only the specified agent. |
| `flowgrid doctor` | Validates `.flowgrid/config.json`, MCP env, repo-map drift, skills, and toolkit health. |
| `flowgrid doctor --fix` | Runs `harness sync` (+ creates `AGENTS.md` if missing) then re-verifies. |
| `flowgrid update` | Updates CLI package version. |
| `flowgrid update --check` | Checks current version against latest without downloading. |

---

### Harness Architecture (Common + Per-Agent)

| Layer | Source | Destination |
|-------|--------|-------------|
| **Common** | `harness/common`, `shared`, `docs`/`fe`/`be`/`tests` | `.flowgrid/harness/staging/<cache>/bundle` (built once per config) |
| **Materialize** | Staging bundle | `.cursor/`, `.claude/`, `.agents/`, `.antigravity/` |
| **Agent Overlay** | `harness/agents/<agent>/` (supplemental rules/skills) | Merged into corresponding agent directory |
| **MCP** | `agent-profiles` | Cursor/Claude/Kiro → `mcp.json`; Gemini → `.agents/mcp.json`; Antigravity IDE → `.antigravity/mcp_config.json` |

---

### Skills — Harness (Agent) vs Web Documentation {#skills-harness-vs-docs}

| Layer | Location | Audience & Purpose |
| --- | --- | --- |
| **Agent Runtime** | `harness/**/SKILL.md` in FlowGrid package → synchronized to `.cursor/skills`, `.agents/`, `.antigravity/skills` | Executed via slash commands inside IDE/CLI chat |
| **Human Documentation** | [references/skills/](./skills/spec.md) (VitePress) — outlines slash command syntax, inputs/outputs, prompt templates | Onboarding reference for BAs, QAs, and Developers |

---

### Test Engine (Testing & Quality Assurance)
Analyzes YAML test scenario matrices, generating Markdown reports and measuring test coverage.

| FlowGrid Command | Description |
|------------------|-------------|
| `flowgrid cases:render` | Renders Testplan YAML matrices into Markdown on the Tests Hub. |
| `flowgrid cases:check` | Validates YAML syntax and schema compliance for testplans. |
| `flowgrid cases:gate` | Quality release gate: schema v2 + TC audit + bundle trace (`--strict`, `--docs-root`, `--json`). |
| `flowgrid cases:coverage` | Computes test coverage to detect specifications missing test scenarios. |
| `flowgrid testcase:gen` | Scaffolds Playwright E2E UI automation from TC YAML (`genType: e2e`). |
| `flowgrid testcase:gen:api` | Scaffolds Playwright API test hooks (`request`) from TC YAML (`genType: api-e2e`) → `tests/api-e2e/`. |
| `flowgrid e2e-registry` | Inspects and validates Playwright test registries. |
| `flowgrid tests:publish` | Publishes tests-docs hub artifacts and catalogs. |
| `flowgrid testcase:gen --id TC-*` | Resolves testcase from hub → emits Playwright code according to `e2eRoot`. |
| `flowgrid repo-maps check` | Verifies hub config pointers against `platform-repos.local.json`. |
| `flowgrid repo-maps align` | Interactive alignment wizard updating both config and local repo maps. |
| `flowgrid repo-maps sync --from-config` | Writes repo maps from `.flowgrid/config.json`. |
| `flowgrid repo-maps fanout` | Broadcasts repo mappings from docs hub across all initialized checkouts. |

---

### Code Engine (Code & Unit Test Generation)
Generates idiomatic frontend components, backend APIs, and unit test suites across supported languages (Node.js, Python, PHP, C#, etc.).

| FlowGrid Command | Description |
|------------------|-------------|
| `flowgrid gen` | Generates frontend UI components. |
| `flowgrid unit-gen` | Generates frontend unit test suites (Jest/Vitest). |
| `flowgrid api-gen` | Generates backend API routes, controllers, and services. |
| `flowgrid api-unit-gen` | Generates backend unit test suites (Pytest, PHPUnit, xUnit). |
| `flowgrid contract-gen` | Generates shared TypeScript types and DTO contracts. |
| `flowgrid gen-css` | Generates CSS Variables from Design Tokens. |
| `flowgrid build-template-code --sample=<dir>` | Analyzes an existing golden sample module to generate code template plans. |
| `flowgrid build-template-code --yes` | Writes code templates (`.hbs`, `.stub`, `.j2`, `.scriban`) into adapter directories. |

*(All code generation commands support `:dry` preview mode without touching the disk, e.g., `flowgrid api-unit-gen:dry`)*

---

## 🛠 Model Context Protocol (MCP) Tools

FlowGrid exposes full platform capabilities through its unified MCP server: **`flowgrid`** (`bin/flowgrid-mcp.mjs`).

```json
{
  "mcpServers": {
    "flowgrid": {
      "command": "node",
      "args": ["/path/to/flowgrid/bin/flowgrid-mcp.mjs"],
      "env": {
        "FLOWGRID_DOCS_ROOT": "/absolute/path/to/docs-hub",
        "FLOWGRID_TESTS_DOC": "/absolute/path/to/tests-hub",
        "FLOWGRID_E2E_ROOT": "/absolute/path/to/automation-root",
        "FLOWGRID_ADAPTER": "nextjs",
        "FLOWGRID_BE_ADAPTER": "nestjs",
        "FLOWGRID_PROJECT_ROOT": "/absolute/path/to/code-repo"
      }
    }
  }
}
```

### 1. Documentation Tools (`flowgrid_docs_*`)
| MCP Tool Name | Key Parameters | Functionality |
|---|---|---|
| `flowgrid_docs_list_ids` | `docsRoot`, `kind`, `prefix` | Scans and lists architectural IDs (`CMP-*`, `FLOW-*`, `W-*`, `API-*`, `DEP-*`, `ADR-*`). |
| `flowgrid_docs_route` | `topic`, `docsRoot` | Routes a business query to the appropriate documentation file in the docs hub. |
| `flowgrid_docs_get_element` | `id`, `docsRoot` | Retrieves detailed information and content for an architectural element by ID. |
| `flowgrid_docs_deps_of` | `id`, `docsRoot` | Traces dependencies that this element relies on. |
| `flowgrid_docs_dependents_of` | `id`, `docsRoot` | Finds other elements depending on this element. |
| `flowgrid_docs_orphans` | `docsRoot` | Identifies orphaned documentation files or unlinked IDs in arc42. |
| `flowgrid_docs_validate_links` | `docsRoot` | Audits and reports broken markdown links in the docs hub. |
| `flowgrid_docs_bundle_split` | `paths`, `projectRoot` | Splits `*.bundle.yaml` into `ir/design.yaml`, `ir/spec.yaml` and emits `ir/generated/<slug>.md`. |
| `flowgrid_docs_bundle_merge` | `paths`, `projectRoot` | Merges IR changes back into the parent `*.bundle.yaml`. |
| `flowgrid_docs_bundle_check` | `paths`, `projectRoot` | Validates synchronization between bundle and IR files in CI. |
| `flowgrid_docs_bundle_split_all` | `projectRoot` | Scans and splits all bundle YAML files across the repository. |
| `flowgrid_docs_docs_render` | `projectRoot`, `yamlRoot`, `mdRoot` | Re-renders UI Design Specs into Markdown Data Dictionaries. |
| `flowgrid_docs_docs_publish` | `projectRoot` | Compiles and emits `CATALOG.md` with links updated in `README.md`. |

### 2. Frontend Codegen Tools (`codegen_*`, `common_*`, `unit_*`)
| MCP Tool Name | Key Parameters | Functionality |
|---|---|---|
| `codegen_gen` | `adapter`, `docsRoot`, `argv` | Generates frontend UI components based on adapter (Next.js, Nuxt4, DotNet Line). |
| `codegen_gen_dry` | `adapter`, `docsRoot`, `argv` | Dry-run frontend UI component generation without writing files. |
| `unit_gen` | `adapter`, `docsRoot`, `argv` | Generates frontend unit tests (Jest/Vitest). |
| `unit_gen_dry` | `adapter`, `docsRoot`, `argv` | Dry-run frontend unit test generation. |
| `common_gen` | `adapter`, `docsRoot`, `argv` | Generates reusable UI molecules from `surfaces/<surface>/common`. |
| `common_gen_dry` | `adapter`, `docsRoot`, `argv` | Dry-run common UI extraction. |
| `codegen_registry_validate` | `projectRoot` | Validates integrity of frontend codegen registry. |
| `unit_registry_validate` | `projectRoot` | Validates integrity of frontend unit test registry. |

### 3. Backend Codegen Tools (`api_*`)
| MCP Tool Name | Key Parameters | Functionality |
|---|---|---|
| `api_gen` | `adapter`, `argv` | Generates backend API Controllers/Routes/Services from `01-backend-spec.yaml`. |
| `api_gen_dry` | `adapter`, `argv` | Dry-run backend API code generation. |
| `api_unit_gen` | `adapter`, `argv` | Generates backend API unit tests (Pytest, PHPUnit, xUnit). |
| `api_unit_gen_dry` | `adapter`, `argv` | Dry-run backend API unit test generation. |
| `api_registry_validate` | `projectRoot` | Validates integrity of backend API codegen registry. |
| `api_unit_registry_validate`| `projectRoot` | Validates integrity of backend API unit test registry. |

### 4. Testing Automation Tools (`cases_*`, `testcase_*`)
| MCP Tool Name | Key Parameters | Functionality |
|---|---|---|
| `cases_render` | `testsRoot`, `docsRoot` | Renders testplan YAML files into Markdown on the Tests Hub. |
| `cases_check_plans` | `testsRoot` | Validates syntax and schema compliance of YAML test scenarios. |
| `cases_check_coverage` | `testsRoot`, `docsRoot` | Identifies specifications lacking corresponding test scenario coverage. |
| `testcase_gen` | `testsRoot`, `docsRoot`, `argv` | Scaffolds Playwright E2E test suites from IEEE 29119 test matrices. |
| `testcase_gen_dry` | `testsRoot`, `docsRoot`, `argv` | Dry-run Playwright E2E code generation. |
| `e2e_registry_validate` | `projectRoot` | Inspects and validates Playwright E2E test registry. |

### 5. ArtifactGraph MCP Tools (`artifactgraph_*`)
| MCP Tool Name | Key Parameters | Functionality |
|---|---|---|
| `artifactgraph_analyze` | `specPath` or `bullets` | Preflight gap and tag analysis prior to review/codegen. |
| `artifactgraph_grill_check` | `specPath`, `bullets` | Checks grill recommendations and `#missing_info` candidates. |
| `artifactgraph_parity_check` | `moduleDir`, `findingsPath` | Detects parity drift across legacy fields. |
| `artifactgraph_recommend_command` | `commandKey`, `spec` | Recommends allowlisted commands (`genDry`, `unitGen`, etc.). |
| `artifactgraph_allowlist_check` | `commandKey` | Verifies commandKey presence in workspace configuration. |
| `artifactgraph_remember` | Decisions payload | Records reviewer choices and consensus decisions. |
| `artifactgraph_rebuild` | — | Rebuilds SQLite cache from `registries/*.json`. |
| `artifactgraph_gaps` | — | Emits gap summary from index. |
| `artifactgraph_api_reuse_check` | `apiPath` | Detects duplicate API routes before authoring new specs. |
| `artifactgraph_suggest_tags` | `text` | Suggests canonical tags from lexicon. |
| `artifactgraph_status` | — | Reports index status and registry counts. |

---

## Quick Execution Examples

```bash
# Split and render specification assets
flowgrid split -- surfaces/admin/CMP-ADM-AUTH-01/01/01/01/<slug>.bundle.yaml
flowgrid render
flowgrid publish
flowgrid dev

# Scaffold Frontend components
flowgrid gen:dry --docs-root ~/workspace/base-docs -- --spec …/ir/design.yaml
flowgrid gen

# Scaffold Backend API code
flowgrid api-gen:dry -- --spec …/api/01/01-backend-spec.yaml
flowgrid api-gen
```
