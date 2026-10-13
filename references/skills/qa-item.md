# QA File Template (`flowgrid-qa-item/v1`)

## Toolkit (Initialized via `flowgrid init`)

| File | Responsibility |
|------|----------------|
| `.flowgrid/templates/qa-item.yaml` | Golden YAML template — copy when opening QA items |
| `.flowgrid/templates/qa-authoring.md` | Field rules, naming schemes, timeline updates |
| `.flowgrid/schemas/qa-item.schema.json` | JSON Schema validation |

FlowGrid Workspace: [`templates/shared/qa-item.yaml`](../../../templates/shared/qa-item.yaml) · [`qa-authoring.md`](../../../templates/shared/qa-authoring.md).

## Helper Library (CLI / Test / Agent)

`engines/docs/lib/qa-item.mjs`:

- `formatQaAt()` — timestamp formatted as `YYYYMMDD HH:mm`
- `suggestQaShort('W-HOTEL-LIST')` → `HOTEL-LIST`
- `nextQaId(hubRoot, SHORT)` → `HOTEL-LIST_0002`
- `validateQaItem(doc)` / `validateQaItemFile(path)`

## Associated Skills

- Opening: `/spec`, `grill-*` — see extract `qa-inbox.md`
- Closing: `/qa-resolve` · Reviewing: `/qa-review`
- Workflow: [qa-team.md](../../workflows/qa-team.md)
