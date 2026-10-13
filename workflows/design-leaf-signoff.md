# Design Leaf — Sign-off Rubric (Voluntary)

**Scope:** A function leaf (`surfaces/<surface>/CMP-*/<NN…>/<slug>.bundle.yaml`) **prior to** Test lane / production codegen.

**Not an engine gate** — Lead/BA signs off once the engineer has followed [design.md](./design.md) and grill skills. Chat-only "done" does not replace this checklist.

**Related:** [gates.md](./gates.md) · [grill-and-human-review.md](./grill-and-human-review.md) · audit command `flowgrid audit spec` (structural).

---

## When to Use

- Closing Design for a `W-*` / leaf bundle.
- Handoff to `/testcase`, BE `/api-spec`, FE `/prototype` (per team policy).
- Internal review aiming for SSOT quality score **~9** (sufficient tracing, ready for codegen, human-readable by BAs).

---

## Rubric — 6 Criteria (All Must Pass)

| # | Item | Verification |
|---|------|--------------|
| 1 | **Structural audit** | `flowgrid audit spec <bundle> --type <profile>` — no unhandled `gaps[]`; `confirms[]` resolved or deliberately routed to `qa`. |
| 2 | **Business readable** | **VitePress** `ir/generated/spec.md` (+ `data-model.md` if DB exists): stories, **list columns**, scenarios, AC — meaningful content, not placeholders. |
| 3 | **Trace UI ↔ story** | Spot-check 2–3 scenarios: user interactions map cleanly to `design.actions` / `design.sections` (handoff, validation messages). |
| 4 | **API contract** | `api/<seq>/01-backend-spec.yaml` matches `ir/design.yaml` `apiRef`; if BE is in scope: `flowgrid audit fe-be` has no blockers. |
| 5 | **Codegen readiness** | `grillStatus.dev: done` (per workflow); `flowgrid gen:dry` (FE policy) passes; `gen.codegen` + grill-dev tags are recorded. |
| 6 | **QA inbox** | `qa` is empty or only contains accepted debt; no hidden `openQuestions` inside the bundle bypassing QA files. |

### Optional (Recommended, Non-blocking)

| # | Item | Verification |
|---|------|--------------|
| 7 | **Data model** | LCA `db-erd.md` is readable; persisted controls define `db.schema`/`db.field`; `spec.entities` is non-empty when form/list includes multiple DB fields; computed list columns → `#derived-data`. See [architecture-data.md](./architecture-data.md). |

- `/grill-prototype` has no remaining **SSOT** discrepancies (copy, state, mock) before entering the test lane.
- `registry:sync` on FE base has completed; DSL tags match `design.registry.json`.
- Review `ir/generated` dictionary/matrix together with non-technical BAs.

---

## Recording Sign-off (Manual)

Suggested single-line log in the bundle or PR description:

```text
Design sign-off: <page-id> | reviewer: <name> | date: YYYY-MM-DD | rubric: 6/6
```

YAML field is not mandatory — prevents the engine from hard-coupling to grill ordering.

---

## Do Not Use This Rubric To

- Fail `split` when `grillStatus.dev: done` but `bqaOpen` is not done (engine lock — **out of scope**).
- Replace BQA/Dev grill skills — the rubric is applied **after** the workflow has run.
