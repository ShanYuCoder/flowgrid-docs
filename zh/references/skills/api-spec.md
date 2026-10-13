# Skill: `/api-spec`

## 名称 (Name)
`api-spec`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/api-spec`
- **Portal-backed:** Triggered when `ir/design.yaml` has defined actions / `apiRefs` (post `/spec` or `/update-spec` + split).
- **BE-only** (`feature.source.base: none`): Can run without portal screens — authors `01` directly from requirements/partner specs.

## 输入 (Input)
- Portal-backed: Reads `design.actions`, `apiRefs`, and nested items from `ir/design.yaml` (or bundle if un-split).
- Hierarchical reuse search: Sibling `api/<seq>/` → LCA `common/yaml/` → adjacent modules on surface.

## 输出 (Output)
- **System Common APIs (`CMN-API-*`):** Stored under `architecture/04-common-apis/` (Upload, OTP, Master Data, etc.).
- **Domain Shared APIs (`API-{SURF}-{DOMAIN}-{NN}`):** Stored under `architecture/apis/<domain>/` (Shared across Detail, Edit, List screens).
- **Feature Private APIs:** Stored under `surfaces/<Surface>/<CMP-ID>/api/` (Exclusive to a single screen).
- Contract SSOT: `01-backend-spec.yaml` (template `backend-api.yaml`; authoring guide `tpl-api-contract.md`).
- Sibling OpenAPI: `02-openapi.yaml` via `flowgrid openapi_gen`.
- Rendered review view: `ir/generated/api.md` via `flowgrid render`.

## 描述说明 (Description)
- 以契约优先 (Contract-First) 方式编写后端 API 规范。
- **注册表查重拦截 (Agent Registry Lookup Interlock):** 在分配新 API ID 前自动查阅 `api.registry.json` 与 `architecture/apis/`。若端点已在 `/module` 层预先声明，强制复用既有 ID，杜绝冲突。
- 强制显式操作后缀 (`/create`, `/update`, `/delete`, `/detail`, `/list`)。
- 错误风暴 (Error Storming)：针对端点特征标注 `#err:*` 标签。
## 相关技能 (Related Skills)
- **Preceding:** `/spec` (portal-backed) or BE requirements.
- **Subsequent:** `/openapi` (generate `02`) → `/grill-api-spec` → `/api`.

## 注意事项 (Important Notes)
- Always resolve questions via AskQuestion / Tech Debt into `qa/` — never write `openQuestions` in YAML.
- **Never author Markdown manually** — compile via `flowgrid render`.
- Validate via `flowgrid audit api <01-path>` — never run `flowgrid check` on `01`.

---

## 提示词调用示例 (Example Prompt)

```text
/api-spec

Surface: admin-portal · Module: CMP-ADM-ORD · Scope: Order Management Endpoints
```

