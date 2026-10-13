# Skill: `/api-spec`

## スキル名 (Name)
`api-spec`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/api-spec`
- **Portal-backed:** Triggered when `ir/design.yaml` has defined actions / `apiRefs` (post `/spec` or `/update-spec` + split).
- **BE-only** (`feature.source.base: none`): Can run without portal screens — authors `01` directly from requirements/partner specs.

## 入力 (Input)
- Portal-backed: Reads `design.actions`, `apiRefs`, and nested items from `ir/design.yaml` (or bundle if un-split).
- Hierarchical reuse search: Sibling `api/<seq>/` → LCA `common/yaml/` → adjacent modules on surface.

## 出力 (Output)
- **System Common APIs (`CMN-API-*`):** Stored under `architecture/04-common-apis/` (Upload, OTP, Master Data, etc.).
- **Domain Shared APIs (`API-{SURF}-{DOMAIN}-{NN}`):** Stored under `architecture/apis/<domain>/` (Shared across Detail, Edit, List screens).
- **Feature Private APIs:** Stored under `surfaces/<Surface>/<CMP-ID>/api/` (Exclusive to a single screen).
- Contract SSOT: `01-backend-spec.yaml` (template `backend-api.yaml`; authoring guide `tpl-api-contract.md`).
- Sibling OpenAPI: `02-openapi.yaml` via `flowgrid openapi_gen`.
- Rendered review view: `ir/generated/api.md` via `flowgrid render`.

## 説明・役割 (Description)
- 契約駆動 (Contract-First) でバックエンド API 仕様書を定義するスキル。
- **レジストリ查重インターロック (Agent Registry Lookup Interlock):** 新規 API ID を発行する前に `api.registry.json` および `architecture/apis/` を自動検索。`/module` 階層で先行定義されたエンドポイントがある場合は既存 ID を強制再利用し、重複や競合を防止。
- アクション接尾辞 (`/create`, `/update`, `/delete`, `/detail`, `/list`) の付与を義務化。
- エラーストーミング：端点特性に応じた `#err:*` タグを付与。
## 関連スキル (Related Skills)
- **Preceding:** `/spec` (portal-backed) or BE requirements.
- **Subsequent:** `/openapi` (generate `02`) → `/grill-api-spec` → `/api`.

## 注意事項 (Important Notes)
- Always resolve questions via AskQuestion / Tech Debt into `qa/` — never write `openQuestions` in YAML.
- **Never author Markdown manually** — compile via `flowgrid render`.
- Validate via `flowgrid audit api <01-path>` — never run `flowgrid check` on `01`.

---

## プロンプト実行例 (Example Prompt)

```text
/api-spec

Surface: admin-portal · Module: CMP-ADM-ORD · Scope: Order Management Endpoints
```

