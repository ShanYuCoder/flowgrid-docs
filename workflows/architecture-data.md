# Phase 0 — Data Model & ERD

**Scope:** Modeling data structures **prior to** authoring leaf specifications via `/spec` — part of the Phase 0 group alongside `/overview`, `/surfaces`, `/module`, and `/user-flow`.

**Not covered here:** Screen-level fields/columns (Design phase) · Complete backend contracts (Phase 2c `01`) · SQL database migrations.

**Part of Macro Workflows:** [index.md § Phase 0](./index.md#phase-0-data-model) · Design Handoff: [design.md § Data](./design.md#data-model-two-stages).

---

## Three Tiers (Kept in Separate Artifacts)

| Tier | When | Skill / Artifact | Level of Granularity |
|------|------|------------------|----------------------|
| **1 — Global ERD** | New module, new entities/tables, ownership shifts, cross-module relationships | `/db-erd` → `<LCA>/common/db-erd.md` | Entities, relationships, **primary** fields, owning `CMP-*` / surface |
| **2 — Screen Binding** | Individual `W-*` / leaf bundle | `/spec` → `spec.entities` + `design.sections[].db` | Columns/forms ↔ **table.column**; list `columns[].key` ↔ DB or `#derived-data` |
| **3 — BE Contract** | Following stable design inventory | `/api-spec` → `01-backend-spec.yaml` | `modules[].entities[]`, `fields[]`, endpoints — SSOT for BE codegen |

Tier 1 = **Phase 0**. Tier 2 = **Phase 1 Design**. Tier 3 = **Phase 2c** (can be drafted early in grill-dev).

Supplementary prose (does not replace the ERD): [`model-derived-data.md`](../../templates/project-skeleton/surfaces/common/model-derived-data.md).

---

## Recommended Phase 0 Sequence

```text
/overview (+ operational areas)
    → /surfaces (if necessary)
    → /module (CMP-* boundaries, dependencies)
    → /user-flow (FLOW-* touching data)
    → /db-erd (ERD at LCA — see common-scope)
    → (optional) /cross-service when invoking external services/aggregates
```

**LCA Scope** for `db-erd.md`: [common-scope.md](../../harness/docs/extracts/common-scope.md) — follows identical scoping rules as `common/`.

---

## When `/db-erd` is Mandatory

- **New** module / cluster or introducing shared **tables/entities**.
- Modifying **cardinality** (1-to-many, many-to-many) or **ownership** boundaries (tenants, aggregate roots).
- Legacy adoption: mapping legacy schemas → business entities (`/legacy /db-erd`).

**When it can be skipped** (jumping directly to Design): Modifying a screen in a CMP with a stable, existing `db-erd.md`, where **no new persisted tables/columns** are introduced — pure UI/validation/copy changes.

---

## Minimum Content Requirements for `db-erd.md`

- Mermaid `erDiagram`.
- Per entity: Business name, **owner** (module/surface), logical primary key, key domain attributes.
- Cardinality + notes regarding hard/soft deletion where relevant to product behavior.
- Links to consumer `FLOW-*` / `CMP-*` — **never** duplicate the ER diagram inside individual bundles.

---

## Handoff to Design (`/spec`)

The AI Agent **reads** (walking up the LCA path) `common/db-erd.md` before populating `db:` fields.

On the leaf bundle:

1. **`spec.entities` / `spec.relationships`** — subset of entities relevant to the screen (summary; never replaces the ERD).
2. **`design.sections[].db`** — `schema` (table or ER entity name), `field` (column name), `enumMapping` if applicable.
3. **`spec.ui.list.columns[].key`** — corresponds to `field` or `#derived-data` declared in `common/model-derived-data.md`.
4. **`bind.field`** — payload/API field name; aligned across grill-dev and `01`.

Authoring specifications: [bundle-authoring.md § Data model](../../templates/shared/bundle-authoring.md#data-model--phase-0-erd-vs-screen-detail).

Post-split: `entities` + layout `db` → **`ir/design.yaml`** (excluded from `ir/spec.yaml` business prose).

**Team Review:** `ir/generated/data-model.md` (aggregated by table, supporting multi-table views) + optional `design.dataModel.tables[]` on the bundle — [tpl-screen-data-model.md](../../templates/shared/tpl-screen-data-model.md). Automated audits: `flowgrid audit spec` → `warnings` under `category: db`.

---

## Three Distinct Naming Roles

| Concept | Example | Responsibility |
|---------|---------|----------------|
| Entity ER (Diagram) | `Customer`, `Order` | `db-erd.md` |
| Table / Schema (Physical) | `customers`, `orders` | `design.db.schema`, `01` `table:` |
| Codegen Entity | `CustomerEntity` | `gen.codegen.entity`, OpenAPI model identifier |

Maintain mappings within `01` or as concise comments on the bundle — not strictly enforced by engine scripts.

---

## Known Process Gaps (Guidelines, Not Gates)

- `audit spec` does not yet verify ERD ↔ `db:` correspondence (may report **warnings** in future versions).
- **VitePress Team Review:** `spec.md` (including **list column tables**) + sibling `data-model.md` — BAs are never required to open `ir/design.yaml`. Implementation engineers consume `ir/design` + `01`.

---

## Skills & References

- Harness: `/db-erd` · Documentation Hub: [references/skills/db-erd.md](../references/skills/db-erd.md)
