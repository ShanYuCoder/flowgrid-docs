# QA file template (`flowgrid-qa-item/v1`)

## Toolkit (sau `flowgrid init`)

| File | Vai trò |
|------|---------|
| `.flowgrid/templates/qa-item.yaml` | Golden YAML — copy khi mở QA |
| `.flowgrid/templates/qa-authoring.md` | Quy tắc field, naming, timeline |
| `.flowgrid/schemas/qa-item.schema.json` | JSON Schema (validate) |

Repo FlowGrid: [`templates/shared/qa-item.yaml`](../../../templates/shared/qa-item.yaml) · [`qa-authoring.md`](../../../templates/shared/qa-authoring.md).

## Helper (CLI / test / agent)

`engines/docs/lib/qa-item.mjs`:

- `formatQaAt()` — timestamp `YYYYMMDD HH:mm`
- `suggestQaShort('W-HOTEL-LIST')` → `HOTEL-LIST`
- `nextQaId(hubRoot, SHORT)` → `HOTEL-LIST_0002`
- `validateQaItem(doc)` / `validateQaItemFile(path)`

## Skills

- Mở: `/spec`, grill-* — extract `qa-inbox.md`
- Đóng: `/qa-resolve` · Review: `/qa-review`
- Workflow: [qa-team.md](../../workflows/qa-team.md)
