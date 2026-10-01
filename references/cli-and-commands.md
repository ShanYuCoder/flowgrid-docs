# 🛠 Danh sách Lệnh CLI & Agent Skills (Usage)

Tài liệu này liệt kê toàn bộ các lệnh thực thi (Commands) và bộ Kỹ năng (Skills) của FlowGrid.

## Cài FlowGrid CLI

**Yêu cầu:** Node.js **≥ 24**. Cài từ **npm** không kéo VitePress/esbuild; cài từ **Git** cần `--allow-build=@shanyucoder/flowgrid`.

**Quy trình member:** cài global (hoặc `npx -p @shanyucoder/flowgrid flowgrid …`) → **`cd` repo đích** → **`flowgrid init`**. Gọi `flowgrid` không đối số chỉ in help (từ 0.1.5); không chạy init trong cwd hiện tại.

**Khuyến nghị — pnpm global từ npm** (Linux, macOS, WSL, **Windows PowerShell** — lệnh giống nhau):

```text
pnpm add -g @shanyucoder/flowgrid
```

| OS | Sau cài |
| --- | --- |
| Linux / macOS / WSL | `pnpm setup` nếu cần; bin thường trong `~/.local/share/pnpm`. |
| Windows | `pnpm setup` → mở terminal mới → `where.exe flowgrid` hoặc `flowgrid --version`. |

| Cách khác | Lệnh |
| --- | --- |
| **GitHub global** (dev / chưa có npm) | `pnpm add -g github:ShanYuCoder/flowgrid --allow-build=@shanyucoder/flowgrid` |
| **npx (không global)** | `npx -p @shanyucoder/flowgrid flowgrid <command>` |
| **npm global** | `npm install -g @shanyucoder/flowgrid` |
| **Dev dependency** | `pnpm add -D @shanyucoder/flowgrid` → `pnpm exec flowgrid …` |
| **Script bash** (tùy chọn, Unix/WSL/Git Bash) | `curl -fsSL …/install.sh \| bash` |
| **Publish npm (đội toolkit)** | [PUBLISH-NPM.md](https://github.com/ShanYuCoder/flowgrid/blob/main/PUBLISH-NPM.md) (root repo, không trong site docs) |

| **Cập nhật CLI** | `flowgrid update` — npm `@latest` nếu cài từ registry; GitHub / `install.sh` / clone dev nếu không |
| **Kiểm tra trước update** | `flowgrid update --check` |

Gỡ: `pnpm remove -g @shanyucoder/flowgrid` (mọi OS) · `flowgrid uninstall` · `bash install.sh --uninstall` (nếu dùng script).

Chi tiết bước `init`: [README § Cài đặt](/readme).

## ⚙️ Các Lệnh Xử Lý Cốt Lõi (FlowGrid CLI)

FlowGrid chia hệ thống ra làm 3 bộ máy chính: **Bộ Docs**, **Bộ Code**, và **Bộ Test**. Dưới đây là các lệnh thao tác cho từng bộ:

### Bộ Docs (Quản lý Tài liệu & Specs)
Các lệnh thao tác với tài liệu, chia tách Spec và kết xuất giao diện Markdown/OpenAPI.

| Lệnh FlowGrid | Chức năng |
|---------------|-----------|
| `flowgrid split` | Cắt `.bundle.yaml` → `ir/design.yaml`, `ir/spec.yaml`, `ir/generated/spec.md` (+ `data-model.md`). |
| `flowgrid split_all` | Quét và cắt nhỏ toàn bộ Bundle YAML trong repo. |
| `flowgrid render` | Render lại UI Design Specs từ YAML sang MD (Data Dictionary & State Matrix). |
| `flowgrid dev` | VitePress dev: đọc `.flowgrid/config.json` — `frontend.docsRoot` **hoặc** `backend.docsRoot` (port **5173**), và/hoặc `testsRoot` tương ứng (port **5174**). **Backend-only** vẫn cần docs-hub (SSOT `01-backend-spec`, OpenAPI, surfaces) — cùng lệnh, không tách CLI riêng cho BE. |
| `flowgrid build` | `vitepress build` **lần lượt** cho từng `docsRoot` / `testsRoot` có trong config (output: `<hub>/.vitepress/dist` riêng). Repo BE in-repo `docs/` + `tests/` → một lệnh build cả hai hub. |
| `flowgrid publish` | Publish tài liệu lên server hoặc CDN tĩnh, sinh `CATALOG.md`. |
| `flowgrid openapi_gen` | Sinh/cập nhật fragment OpenAPI từ `01-backend-spec.yaml` (`--spec` path). |
| `flowgrid openapi_render` | Gộp các OpenAPI YAML nhỏ thành `docs/openapi/api.yaml`. |
| `flowgrid openapi_build_ui` | Build giao diện Swagger UI tĩnh cho Docs Hub. |
| `flowgrid api:check` | Validate `01-backend-spec.yaml` (portal hoặc `base: none`) trước codegen. Cwd mặc định = docs hub (`--docs-root` / `FLOWGRID_DOCS_ROOT` / `config`). |

*(Ví dụ chạy: `flowgrid split_all`)*

### Hub paths (config, env, CLI)

Codegen, `dev`/`build`, `api:check`, và nhiều engine đọc pointer theo thứ tự:

1. Flag một lần: `--docs-root`, `--tests-docs`, `--e2e-root`, `--project-root`
2. Env MCP (sau `harness sync`): `FLOWGRID_DOCS_ROOT`, `FLOWGRID_TESTS_DOC`, `FLOWGRID_E2E_ROOT`, `FLOWGRID_PROJECT_ROOT`
3. `.flowgrid/config.json`: `frontend.docsRoot` / `backend.docsRoot` (và tests/e2e tương ứng)

Ví dụ: `flowgrid gen:dry --docs-root docs/integration` · Backend-only init với `backend.docsRoot` — `flowgrid contract-gen` resolve docs không cần chỉ `frontend.*`.

### Audit & Harness (PR workflow)

**SSOT audit (bảng engine, ví dụ, skill):** [audit-commands.md](./audit-commands.md). **Khi chạy gate:** [workflows/gates.md](../workflows/gates.md). Output: JSON stdout, trường `gaps[]`.

| Lệnh | Chức năng (tóm tắt) |
|------|-----------|
| `flowgrid audit` | Help: `spec`, `flow`, `api`, `testcase`, `fe-be`, `scenario`, `e2e`, `legacy`. |
| `flowgrid audit spec …` | Bundle UI/spec + UX affordance. `--type` page profile. |
| `flowgrid audit api …` | `01-backend-spec.yaml` / API contract YAML. |
| `flowgrid audit flow …` | `FLOW-*.md` sections. |
| `flowgrid audit testcase …` | `TC-*.yaml`; `--bundle` cross-ref bundle. |
| `flowgrid audit fe-be …` | `apiRef` ↔ `01-backend-spec.yaml`. |
| `flowgrid audit scenario …` | SC `screens[]` vs `cases/**`; `--tests-docs` / `FLOWGRID_TESTS_DOC`. |
| `flowgrid audit e2e …` | Plan TC ↔ Playwright; `--id TC-*` / screen / suite; `--e2e-root` optional (config/MCP `FLOWGRID_E2E_ROOT`); `--tests-docs`, `--screen W-*`. |
| `flowgrid audit legacy …` | Legacy adoption index. |
| `flowgrid harness sync` | Đồng bộ lại skills/rules/MCP từ `.flowgrid/config.json` (`agents[]`). |
| `flowgrid harness sync --full-docs` | Trên FE/BE repo: sync **toàn bộ** bộ docs harness (mặc định chỉ consumer subset). |
| `flowgrid harness sync --agent=cursor` | Chỉ sync một agent đã khai báo lúc init. |
| `flowgrid doctor` | Kiểm tra `.flowgrid/config.json`, MCP env (`FLOWGRID_DOCS_ROOT`, `TESTS_DOC`, `E2E_ROOT`), repo-maps lệch config, skills, toolkit. |
| `flowgrid doctor --fix` | Chạy `harness sync` (+ tạo `AGENTS.md` nếu thiếu) rồi kiểm tra lại. |
| `flowgrid update` | Cập nhật bản CLI (pnpm/npm global, git clone `~/.flowgrid-cli`, hoặc `git pull` khi dev clone / `pnpm link`). |
| `flowgrid update --check` | In phiên bản hiện tại và cách cài; không tải bản mới. |

Sau `flowgrid init`, repo có `AGENTS.md` ở root; overlay agent render sẵn placeholder `FLOWGRID_*` → tool/path thật. Script npm: `flowgrid:doctor`, `flowgrid:doctor:fix`.

### Harness layout (common + per-agent)

| Layer | Nguồn | Đích |
|-------|--------|------|
| **Common** | `harness/common`, `shared`, `docs`/`fe`/`be`/`tests` (theo project type) | `.flowgrid/harness/staging/<cache>/bundle` (build **một lần** / config) |
| **Materialize** | staging bundle | `.cursor/`, `.claude/`, `.agents/`, … |
| **Agent overlay** | `harness/agents/<agent>/` (rules/skills bổ sung) | merge vào thư mục agent tương ứng |
| **MCP** | `agent-profiles` | Cursor/Claude/Kiro → `mcp.json`; **Gemini** → `.agents/mcp.json`; **Antigravity IDE** → `.antigravity/mcp_config.json` |

Chọn nhiều agent lúc init: không đọc lại toàn bộ package N lần — lần 2+ dùng staging cache. Sync một agent: `flowgrid harness sync --agent=cursor`.

**JSON Schema (harness):** chỉ thư mục `flowgrid-*` — ví dụ `schemas/flowgrid-docs/`, `schemas/flowgrid-process/` (bộ code: `harness/shared/schemas/flowgrid-code/`).

### Skills — harness (agent) vs tài liệu web {#skills-harness-vs-docs}

| Lớp | Vị trí | Ai dùng |
| --- | --- | --- |
| **Chạy agent** | `harness/**/SKILL.md` trong package FlowGrid → `flowgrid harness sync` → `.cursor/skills`, `.agents/`, … trên repo dự án | Slash command trong IDE/CLI |
| **Đọc member** | [references/skills/](./skills/spec.md) (VitePress) — mô tả slash command, input/output, mẫu prompt | Onboarding, BA/QA/Dev không mở package |

**Quy ước:**

- Sau `init`, agent đọc **`SKILL.md` đã sync** — đó là nguồn policy thực thi (MANDATORY, load path, handoff).
- Repo FE/BE trỏ docs ngoài repo: subset consumer sync gồm `spec`, `update-spec`, grill BQA/Dev, `api-spec`, `api-update`, **`grill-api-spec`**, **`grill-api`** (router) — xem `CONSUMER_DOC_SKILL_NAMES` trong `bin/lib/harness-sync.mjs`.
- Trang **Skills** trên site là bản **đọc cho người**; giữ đồng bộ ý với slash command toolkit chính (`/spec`, `/testcase`, `/wire`, …). Lệch nhỏ → ưu tiên harness sau `harness sync`.
- **Không** cần trang web cho mọi file harness: skill **theo adapter** (`framework-rules`, `gen-common`, `ui-proposal`, …) chỉ materialize khi project type/adapter chọn — vẫn chỉ trong harness sync.
- Template authoring (vd. [`bundle-authoring.md`](https://github.com/ShanYuCoder/flowgrid/blob/main/templates/shared/bundle-authoring.md)) nằm `templates/shared/` repo toolkit — link GitHub; site docs không build file ngoài `docs/`.

Cập nhật skill trong repo FlowGrid: sửa `harness/…/SKILL.md` + trang `docs/references/skills/<name>.md` tương ứng (nếu có) + sidebar [`.vitepress/config.mjs`](../.vitepress/config.mjs) khi thêm slash command công bố.

### Bộ Test (Kiểm thử & Testcase)
FlowGrid chịu trách nhiệm phân tích kịch bản kiểm thử định dạng YAML để kết xuất ra Markdown hoặc soi chiếu Coverage.

| Lệnh FlowGrid | Chức năng |
|---------------|-----------|
| `flowgrid cases:render` | Dịch toàn bộ Testplan YAML sang Markdown để đọc trên Docs Hub. |
| `flowgrid cases:check` | Kiểm tra cú pháp YAML của Testplan. |
| `flowgrid cases:gate` | Cổng release: schema v2 + audit TC + bundle trace (`--strict`, `--docs-root`, `--json`). |
| `flowgrid cases:coverage` | Quét Coverage để phát hiện các specs chưa có Testplan. |
| `flowgrid testcase:gen` | Sinh Playwright E2E UI từ TC YAML (`genType: e2e`). |
| `flowgrid testcase:gen:api` | Sinh Playwright API hook (`request`) từ TC YAML (`genType: api-e2e`) → `tests/api-e2e/`. |
| `flowgrid e2e-registry` | Kiểm tra/Xác thực registry của Playwright Test. |
| `flowgrid tests:publish` | Publish tests-docs hub (catalog / index artifacts). |
| `flowgrid testcase:gen --id TC-*` | Resolve TC từ tests hub → ghi Playwright theo `e2eRoot` / MCP. |
| `flowgrid repo-maps check` | So config hub pointers vs `platform-repos.local.json`. |
| `flowgrid repo-maps align` | Wizard chốt lệch; cập nhật **cả** config + local map. |
| `flowgrid repo-maps sync --from-config` | Ghi map từ `.flowgrid/config.json` (sau init). |

### Bộ Code (Sinh Mã Nguồn & Unit Test)
FlowGrid kế thừa trọn vẹn sức mạnh sinh mã nguồn và Unit Test đa ngôn ngữ (NodeJS, Python, PHP, C#, v.v.).

| Lệnh FlowGrid | Chức năng |
|---------------|-----------|
| `flowgrid gen` | Sinh mã nguồn UI Component (Frontend). |
| `flowgrid unit-gen` | Sinh mã nguồn Unit Test cho Frontend (Jest/Vitest). |
| `flowgrid api-gen` | Sinh mã nguồn API Route/Controller (Backend). |
| `flowgrid api-unit-gen` | Sinh mã nguồn Unit Test cho API (Backend). |
| `flowgrid contract-gen` | Sinh mã nguồn Type/DTO dùng chung cho Fullstack. |
| `flowgrid gen-css` | Cập nhật CSS Variables từ Design Tokens. |
| `flowgrid build-template-code` | Trích xuất DNA từ Golden Sample và tạo bộ Template + DSL Registry cho dự án khác Base. |

*(Tất cả lệnh trên đều có thể truyền thêm `:dry` để xem trước thay vì ghi file, ví dụ: `flowgrid api-unit-gen:dry`)*

---

## 🛠 Danh sách Kỹ năng (Skills) của Agent

Các kỹ năng (`.mdc` và `SKILL.md`) đã được tổ chức lại chuẩn xác vào 4 thư mục chính dựa trên loại Project:

### 1. Frontend Skills (`harness/fe/`)
Dùng để sinh mã nguồn, component và Unit Test cho UI.
- **Sinh UI/Logic:** `model`, `wire`, `prototype`, `build-template-code` (`gen-common` deprecated).
- **Kiểm thử:** `test`, `unit`.
- **Review (Grill):** `grill-prototype`, `grill-test`, `grill-unit`, `business-impact-review`.

### 2. Backend Skills (`harness/be/`)
Dùng để sinh mã nguồn API và Unit Test Backend.
- **Sinh Code:** `api`, `api-unit`.
- **Review (Grill):** `audit-api`, `grill-api-unit`, `business-impact-review`.

### 3. Docs Skills (`harness/docs/`)
Khối óc trung tâm (bộ docs (SSOT)). Nơi diễn ra 90% việc phân tích hệ thống, thiết kế kiến trúc và luồng dữ liệu trước khi code.
- **Kiến trúc & Sơ đồ:** `architecture`, `architecture-grill`, `docs-hub`, `user-flow`, `background-logic`, `business-process-trace`, `cross-cutting`, `deployment`, `surfaces`, `db-erd`, `flow-trace`.
- **Thiết kế API & Specs:** `api`, `api-spec`, `api-update`, `cross-entity-service`, `cross-service`, `openapi`, `module`, `spec`, `update-spec`, `common` (Markdown patterns only).
- **Quản lý & Review:** `decision`, `overview`, `qa-resolve`, `platform-ai`, `build-templates`, `call-external`.
- **Soi chiếu (Grill):** `grill`, `grill-api` (router → `grill-api-spec`), `grill-api-spec`, `grill-bqa`, `grill-dev`, `grill-docs`.

### 4. Test Skills (`harness/tests/`)
Chuyên thiết kế testplan và kịch bản E2E Playwright.
- **Kỹ năng cốt lõi:** `scenario`, `testcase`.
- **Review (Grill):** `grill-testcase`.

### 5. Common/Shared Skills (`harness/common/` & `harness/shared/`)
Kỹ năng dùng chung bắt buộc cho mọi Agent.
- **Cốt lõi:** `artifactgraph`, `platform-mark`, `docs-mark`, `configure-repo-maps`, `legacy`.
- Các file chuẩn giao tiếp: `SSOT_AGENT_PROTOCOL.md`, `AGENTS.md`.

---

## 🛠 Hướng Dẫn Sử Dụng MCP Tools (Model Context Protocol)

FlowGrid phơi bày toàn bộ khả năng xử lý thông qua máy chủ MCP duy nhất: **`flowgrid`** (`bin/flowgrid-mcp.mjs`). MCP path theo agent: `.cursor/mcp.json`, `.agents/mcp.json` (Gemini CLI/extension), `.antigravity/mcp_config.json` (Antigravity IDE), …

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

### 1. Nhóm Công Cụ Tài Liệu (`flowgrid_docs_*`)
| Tên Tool MCP | Tham số chính | Chức năng chi tiết |
|---|---|---|
| `flowgrid_docs_list_ids` | `docsRoot`, `kind`, `prefix` | Quét và liệt kê danh sách toàn bộ ID kiến trúc (`CMP-*`, `FLOW-*`, `W-*`, `API-*`, `DEP-*`, `ADR-*`). |
| `flowgrid_docs_route` | `topic`, `docsRoot` | Điều hướng chủ đề nghiệp vụ tới đúng file tài liệu tương ứng trong docs hub. |
| `flowgrid_docs_get_element` | `id`, `docsRoot` | Lấy chi tiết thông tin và nội dung của một phần tử kiến trúc theo ID. |
| `flowgrid_docs_deps_of` | `id`, `docsRoot` | Truy vết tất cả các dependency mà ID này phụ thuộc vào. |
| `flowgrid_docs_dependents_of` | `id`, `docsRoot` | Tìm kiếm tất cả các ID khác đang phụ thuộc vào phần tử này. |
| `flowgrid_docs_orphans` | `docsRoot` | Phát hiện các file mồ côi hoặc ID chưa được liên kết vào chương mục arc42. |
| `flowgrid_docs_validate_links` | `docsRoot` | Rà soát toàn bộ các liên kết markdown bị gãy trong docs hub. |
| `flowgrid_docs_bundle_split` | `paths`, `projectRoot` | Chia tách `*.bundle.yaml` ra `ir/design.yaml`, `ir/spec.yaml` và sinh `ir/generated/<slug>.md`. |
| `flowgrid_docs_bundle_merge` | `paths`, `projectRoot` | Gộp dữ liệu từ `ir/*` ngược trở lại file `*.bundle.yaml`. |
| `flowgrid_docs_bundle_check` | `paths`, `projectRoot` | Kiểm tra tính đồng bộ giữa bundle và ir files trên CI. |
| `flowgrid_docs_bundle_split_all` | `projectRoot` | Quét và cắt nhỏ toàn bộ bundle YAML trong toàn bộ repo. |
| `flowgrid_docs_docs_render` | `projectRoot`, `yamlRoot`, `mdRoot` | Render lại toàn bộ UI Design Specs sang Markdown (chuẩn Data Dictionary & State Matrix, không rác YAML). |
| `flowgrid_docs_docs_publish` | `projectRoot` | Tổng hợp và xuất file `CATALOG.md` cùng liên kết đầu trang `README.md`. |

### 2. Nhóm Công Cụ Sinh Mã Nguồn Frontend (`codegen_*`, `common_*`, `unit_*`)
| Tên Tool MCP | Tham số chính | Chức năng chi tiết |
|---|---|---|
| `codegen_gen` | `adapter`, `docsRoot`, `argv` | Sinh mã nguồn UI Component Frontend theo adapter (Next.js, Nuxt4, DotNet Line). |
| `codegen_gen_dry` | `adapter`, `docsRoot`, `argv` | Chạy thử nghiệm sinh FE UI Component (Dry-run, không ghi đè file). |
| `unit_gen` | `adapter`, `docsRoot`, `argv` | Sinh mã nguồn Unit Test cho Frontend (Jest/Vitest). |
| `unit_gen_dry` | `adapter`, `docsRoot`, `argv` | Chạy thử nghiệm sinh Unit Test Frontend (Dry-run). |
| `common_gen` | `adapter`, `docsRoot`, `argv` | Bóc tách và sinh các UI molecules dùng chung từ `surfaces/<surface>/common` hoặc `CMP-*/common`. |
| `common_gen_dry` | `adapter`, `docsRoot`, `argv` | Chạy thử nghiệm trích xuất common UI molecules. |
| `codegen_registry_validate` | `projectRoot` | Kiểm tra tính toàn vẹn của registry codegen FE. |
| `unit_registry_validate` | `projectRoot` | Kiểm tra tính toàn vẹn của registry unit test FE. |

### 3. Nhóm Công Cụ Sinh Mã Nguồn Backend (`api_*`)
| Tên Tool MCP | Tham số chính | Chức năng chi tiết |
|---|---|---|
| `api_gen` | `adapter`, `argv` | Sinh mã nguồn API Controller/Route/Service từ `01-backend-spec.yaml` (FastAPI, Laravel, DotNet). |
| `api_gen_dry` | `adapter`, `argv` | Chạy thử nghiệm sinh API Backend (Dry-run). |
| `api_unit_gen` | `adapter`, `argv` | Sinh mã nguồn Unit Test cho API Backend (Pytest, PHPUnit, xUnit). |
| `api_unit_gen_dry` | `adapter`, `argv` | Chạy thử nghiệm sinh API Unit Test Backend (Dry-run). |
| `api_registry_validate` | `projectRoot` | Xác thực tính hợp lệ của backend API codegen registry. |
| `api_unit_registry_validate`| `projectRoot` | Xác thực tính hợp lệ của backend API unit test registry. |

### 4. Nhóm Công Cụ Quản Lý & Tự Động Hóa Kiểm Thử (`cases_*`, `testcase_*`)
| Tên Tool MCP | Tham số chính | Chức năng chi tiết |
|---|---|---|
| `cases_render` | `testsRoot`, `docsRoot` | Dịch toàn bộ Testplan YAML sang tài liệu Markdown trên Tests Hub. |
| `cases_check_plans` | `testsRoot` | Kiểm tra cú pháp và tính hợp lệ của các file kịch bản kiểm thử YAML. |
| `cases_check_coverage` | `testsRoot`, `docsRoot` | Quét và phát hiện các đặc tả specs chưa có kịch bản testplan tương ứng. |
| `testcase_gen` | `testsRoot`, `docsRoot`, `argv` | Tự động sinh mã nguồn Playwright E2E Testcase từ kịch bản kiểm thử IEEE 29119. |
| `testcase_gen_dry` | `testsRoot`, `docsRoot`, `argv` | Chạy thử nghiệm sinh mã Playwright E2E (Dry-run). |
| `e2e_registry_validate` | `projectRoot` | Kiểm tra và xác thực registry kiểm thử Playwright E2E. |

### 5. Nhóm ArtifactGraph MCP (`artifactgraph_*`)

Cần `.flowgrid/config.json` có `stack` + `commands` (merge từ `stacks/*.json` khi `flowgrid init`). Index: `.flowgrid/index.db`.

| Tên Tool MCP | Tham số chính | Chức năng |
|---|---|---|
| `artifactgraph_analyze` | `specPath` **hoặc** `bullets` | Preflight gap/tags trước grill/gen |
| `artifactgraph_grill_check` | `specPath`, `bullets` | Grill A/B/C, `#missing_info` candidates |
| `artifactgraph_parity_check` | `moduleDir`, `findingsPath` / `findingsJson` | Parity drift (legacy fields) |
| `artifactgraph_recommend_command` | `commandKey`, `spec` | Gợi ý lệnh allowlist (`genDry`, `unitGen`, …) |
| `artifactgraph_allowlist_check` | `commandKey` | Kiểm tra commandKey có trong config |
| `artifactgraph_remember` | grill/parity decisions | Ghi nhớ member chọn mark B |
| `artifactgraph_rebuild` | — | Rebuild SQLite từ `registries/*.json` |
| `artifactgraph_gaps` | — | Gap summary từ index |
| `artifactgraph_api_reuse_check` | `apiPath` | Trùng route API trước khi tạo spec mới |
| `artifactgraph_suggest_tags` | `text` | Gợi ý tag từ lexicon |
| `artifactgraph_status` | — | Trạng thái index / registry counts |
| `artifactgraph_projects` | — | Legacy: cwd project descriptor |
| `artifactgraph_gen` | (deprecated) | Shim — dùng CLI + `recommend_command` |

---

# Feature Artifact — Lệnh Script Thực Thi

> Sau khi chạy `flowgrid init`: Mọi lệnh thực thi quản lý tài liệu được gọi qua CLI `flowgrid <command>`.

---

## Authoring & IR

| Lệnh | Input | Output |
|------|--------|--------|
| `flowgrid split -- <bundle.yaml>` · `pnpm spec:split` | Bundle | `ir/design.yaml`, `ir/spec.yaml`, `ir/generated/<slug>.md` |
| `flowgrid merge -- <bundle.yaml>` · `pnpm spec:merge` | `ir/*` | Bundle |
| `flowgrid check -- <bundle.yaml>` · `pnpm spec:split:check` | Bundle + ir | Fail nếu lệch / common thiếu design |
| `flowgrid split_all` · `pnpm spec:split:all` | Mọi `*.bundle.yaml` dưới surfaces | Split từng file |
| `flowgrid render` · `pnpm flowgrid:render` | `ir/spec.yaml` (skip màn chưa split) | `ir/generated/*.md` + **`qa/index.md`** (bảng Data Dictionary chuẩn) |
| `flowgrid publish` · `pnpm flowgrid:publish` | MD đã có + OpenAPI | **`CATALOG.md`** + link **đầu** README |
| `flowgrid dev` · `pnpm docs:dev` (toolkit: `pnpm -C docs dev`) | VitePress | Sidebar: surfaces (kèm `ir/generated`) + **QA** cuối |

GitHub: README → `CATALOG.md` (platform / product / QA) → click mở trang MD. Không lục YAML.

---

## Common (docs hub — Markdown only)

| Việc | SSOT |
|------|------|
| Cross-flow | `surfaces/…/common/user-flows/FLOW-*.md` |
| Quy tắc dùng chung | `/common` → `…/common/patterns/*.md` |
| UI pattern (delete flow, badge, …) | FE **base** + rule `flowgrid-ux-common.mdc` — **không** `common/yaml` |

**Legacy (không dùng hub mới):** `flowgrid gen-common`, `render --yaml-root surfaces/common/yaml` — chỉ repo cũ còn skeleton CMN. Template/registry mới → [custom-base](../workflows/custom-base.md).

## Registry sync (base → DSL)

| Lệnh | Mục đích |
|------|----------|
| `flowgrid registry:sync` | Sau **init standard** hoặc khi đổi UI/BE base: quét FE (`nuxt4`/`nextjs`) + BE adapter → `registries/design.registry.json`, `registries/be-capabilities.registry.json`; rebuild `.flowgrid/index.db` |
| `flowgrid registry:sync --dry-run` | Xem report, không ghi file |
| `flowgrid registry:sync --fe` / `--be` | Chỉ một lane |
| `flowgrid registry:sync --force` | Chạy quét FE khi `baseProfile: custom` |

npm: `flowgrid:registry-sync` (inject sau init).

## API (Cùng leaf với FE)

| Lệnh | Mục đích |
|------|----------|
| `/api-spec` | Inventory từ **`ir/design.yaml` actions** (`apiRefs` / `#reuse-api` + `reuseFrom`). Unique → `api/<seq>/` trio. Toàn reuse → **zero** `api/` |
| `flowgrid openapi_gen --spec …/01-backend-spec.yaml` | Ghi sibling `02-openapi.yaml` |
| `flowgrid openapi_render` | Gộp toàn bộ OpenAPI specs thành `docs/openapi/api.yaml`. |
| `/qa-resolve QA-…` | Đóng một file `qa`, patch bundle/01, split |

## Codegen — Frontend (`flowgrid gen`)

**Input:** `ir/design.yaml` (`--id` hoặc `--spec`). **Không** `ir/spec.yaml`.

| Lệnh | Mục đích |
|------|----------|
| `flowgrid gen:dry -- --id W-*` / `--spec …/ir/design.yaml` | Gate sau `/grill-dev` |
| `flowgrid gen` | Scaffold FE component vào repo |
| `flowgrid contract-gen` | Sinh FE models từ **design** |

## Codegen — Backend (`flowgrid api-gen`)

**Input:** `…/api/<seq>/01-backend-spec.yaml` only. `--id CMP-*` glob mọi 01 dưới module.

| Lệnh | Mục đích |
|------|----------|
| `flowgrid api-gen:dry -- --spec …/api/01/01-backend-spec.yaml` | Gate sau `/grill-api-spec` |
| `flowgrid api-gen` | Scaffold Backend API controller/route/service |
| `flowgrid api-unit-gen` | Sinh Unit Test cho Backend API |

## Unit & E2E Testing

| Lệnh | Input |
|------|--------|
| `flowgrid unit-gen` | Sinh Unit Test Frontend từ `ir/design.yaml` |
| `flowgrid api-unit-gen` | Sinh Unit Test Backend từ `01-backend-spec.yaml` |
| `flowgrid testcase:gen --id …` | Sinh kịch bản Playwright E2E từ Testplan SSOT |
| `flowgrid cases:render` | Render kịch bản Testplan YAML sang Markdown |

---

## Ví dụ Thực Thi

```bash
# Phân tách và render tài liệu specs
flowgrid split -- surfaces/admin/CMP-ADM-AUTH-01/01/01/01/<slug>.bundle.yaml
flowgrid render
flowgrid publish
flowgrid dev

# Sinh mã nguồn Frontend
flowgrid gen:dry --docs-root ~/workspace/base-docs -- --spec …/ir/design.yaml
flowgrid gen

# Sinh mã nguồn Backend
flowgrid api-gen:dry -- --spec …/api/01/01-backend-spec.yaml
flowgrid api-gen
```

Thứ tự phối hợp trong team: [workflows — full cycle](../workflows/index.md#full-cycle) · [Design cycle](../workflows/design.md#design-cycle)

---

## Repo split map — Factory AI (4 repo) {#repo-split-map}

> Mỗi runtime repo **sở hữu** codegen + test. Docs hub (`base-docs`) giữ bundle + **`ir/design.yaml`** (FE) + **`api/<seq>/01`** (BE).

**Cập nhật:** 2026-08-26

### Bốn repo product

| Repo | Path | Tech | Port | Vai trò |
|------|------|------|------|---------|
| **portal** | `<portal-checkout>` | Next.js · pnpm · VitePress | `:3000` | FE `src/` · `contract:gen` · `portal:gen` · E2E |
| **fast-api-base** | `<fast-api-base-checkout>` | FastAPI · Python + shell · MkDocs | `:4000` | API · `./codegen/runners/generate` · pytest (không E2E) |
| **line** | `<line-checkout>` | .NET 8 · DocFX | — | Line client · `./codegen/runners/generate` · xUnit |
| **integration** | `<integration-checkout>` | .NET 8 · DocFX | `:4100` | OT gateway · `./codegen/runners/generate` · xUnit |

Các repo runtime được checkout độc lập; docs hub không resolve chúng bằng sibling path. Repo URLs và policy: cấu hình **PROJECT-MAPS** / `.flowgrid/config.json` lúc `flowgrid init` (placeholder `FLOWGRID_*` trong template).

### Ai sở hữu artifact gì

| Artifact | Owner | Path |
|----------|-------|------|
| FE bundle + `ir/design.yaml` | **base-docs** | `surfaces/…/CMP-*/NN…/` |
| BE trio | **base-docs** | `…/api/<seq>/01-backend-spec.yaml` |
| `@portal/models` (Zod) | **portal** | `packages/models/` · `pnpm contract:gen` |
| Next app + E2E | **portal** | `src/` · `tests/e2e/` |
| Backend bundle + `ir/spec.yaml` | **fast-api-base** | base-docs Product Code (prefer `--id`) |
| `backend/01-backend-spec.yaml` | **fast-api-base** | mirror từ `spec:split` |
| `backend/02-openapi.yaml` | **fast-api-base** | `./codegen/runners/generate openapi` |
| Fast modules + pytest | **fast-api-base** | `src/app/modules/` |
| Line bundle + `clients.line` | **line** | base-docs / `--id` |
| Line generated C# | **line** | `src/Line.App/Generated/` |
| Integration bundle + adapter spec | **integration** | base-docs Product Code (prefer `--id`) |
| Integration generated C# | **integration** | `src/Integration.*/Generated/` |

**Không đặt trên portal:** `backend/`, `integration/`, line/integration manifests, OpenAPI export.

**Contract keys:** Cùng tên field trên portal `entities` ↔ BE `requests/responses` ↔ line/integration presenter — [artifacts/code.md](../artifacts/code.md#contract-field-registry).

### Feature folder (mỗi repo)

```text
surfaces/<surface>/CMP-*/<NN…>/
  <slug>.bundle.yaml
  ir/design.yaml
  ir/spec.yaml
  ir/generated/<slug>.md
  api/<seq>/01-backend-spec.yaml
```

Line + integration dùng cùng bundle schema do bộ docs sở hữu.

### Lệnh theo repo

#### portal

```bash
pnpm spec:split -- <base-docs …/bundle.yaml>
pnpm contract:gen --spec <base-docs path> / --id
pnpm portal:gen --id W-ADM-AUTH-01
pnpm test:e2e
```

#### fast-api-base

```bash
./scripts/spec-split <base-docs Product Code (prefer --id)>
./codegen/runners/generate write --spec <base-docs Product Code (prefer --id)>
./codegen/runners/generate openapi --spec <base-docs Product Code (prefer --id)>
make test
```

> **Không pnpm** — codegen Python (`codegen/runners/fast_gen`); spec split Python (`tools/fast_spec`).

#### line

```bash
./scripts/spec-split <base-docs Product Code (prefer --id)>
./codegen/runners/generate write --spec <base-docs Product Code (prefer --id)>
./scripts/docs-dev          # DocFX :8081
dotnet test
```

> **Không pnpm** — LineDocs + LineGen (C#) · DocFX · xUnit.

#### integration

```bash
./scripts/spec-split <base-docs Product Code (prefer --id)>
./codegen/runners/generate write --spec <base-docs Product Code (prefer --id)>
./scripts/docs-dev          # DocFX :8082
dotnet test
```

> **Không pnpm** — IntegrationDocs + IntegrationGen (C#) · DocFX · xUnit.

### Tài liệu theo repo runtime

| Doc | Repo |
|-----|------|
| Trang này (CLI hub) | **portal** / docs hub |
| artifact layout · commands · skills `.cursor/skills/` | **line** → [git](https://github.com/raintr91/winform) |
| artifact layout · commands · skills `.cursor/skills/` | **integration** → [git](https://github.com/raintr91/integration) |
| [FastAPI codegen](https://github.com/raintr91/fast-api/blob/v3/docs/operational/FAST-CODEGEN.md) · MkDocs `./scripts/docs-dev` · skills | **fast-api-base** |
