# Workflow — Design

**Phạm vi (SSOT):** lane **Design** (macro) — từ phân tích / spec đến prototype đã grill, sẵn sàng codegen dry-run.

**Không viết ở đây:** cấu trúc bundle/IR → [artifacts/docs.md](../artifacts/docs.md) · DNA/tag → [artifacts/dsl.md](../artifacts/dsl.md).

**Thuộc macro:** [index.md](./index.md#ba-macro-phase-release) · Phase 0 gate: [index.md#architecture-gate](./index.md#architecture-gate) · Grill: [grill-and-human-review.md](./grill-and-human-review.md) · Legacy: [legacy-brownfield.md](./legacy-brownfield.md).

---

## Design cycle (Phase 1) {#design-cycle}

Gam **emerald** khớp [full cycle](./index.md#full-cycle). Optional `/grill-docs` = amber trong diagram (không default).

Prep SSOT (registry / adopt): [spec-ssot-prep.md](./spec-ssot-prep.md) — **trước** entry dưới (custom-base · `/adopt` · `registry:sync`).

```mermaid
flowchart TD
  subgraph IN["Entry"]
    LEG["/legacy /spec\ntrace + bundle"]
    SPEC["/spec\nspecOrigin: requirement"]
  end

  subgraph CORE["Bundle → grill → dry"]
    BUNDLE["*.bundle.yaml"]
    SPLIT["flowgrid split"]
    BQA["/grill-bqa"]
    DEV["/grill-dev\nbundle.gen"]
    DRY["flowgrid gen:dry\nir/design.yaml"]
  end

  subgraph OUT["Prototype → handoff"]
    PR["/prototype"]
    GEN["flowgrid gen"]
    GP["/grill-prototype"]
    NEXT["Phase 2 Tests + API"]
  end

  GW["/grill-docs\noptional"]
  US["/update-spec"]
  QA["AskQuestion → qa"]

  LEG --> BUNDLE
  SPEC --> BUNDLE
  BUNDLE --> SPLIT --> BQA --> DEV --> DRY --> PR --> GEN --> GP --> NEXT
  %% PR = /prototype session (gen:dry đầu session, gen, implement Mo*). GP = checklist UI sau code prototype.
  DEV -.->|optional| GW --> DRY
  BQA -.->|gap| US
  DEV -.->|gap| US
  BQA -.->|Tech Debt| QA
  DEV -.->|Tech Debt| QA
  US --> BQA

  classDef entry fill:#A7F3D0,stroke:#047857,color:#064E3B
  classDef core fill:#D1FAE5,stroke:#059669,color:#064E3B
  classDef out fill:#ECFDF5,stroke:#10B981,color:#065F46
  classDef opt fill:#FEF3C7,stroke:#B45309,color:#78350F
  classDef gap fill:#FECDD3,stroke:#BE123C,color:#881337
  classDef qa fill:#FDE68A,stroke:#D97706,color:#92400E

  class LEG,SPEC entry
  class BUNDLE,SPLIT,BQA,DEV,DRY core
  class PR,GEN,GP,NEXT out
  class GW opt
  class US gap
  class QA qa
```

### `#needs-component` (trong `/prototype`)

```mermaid
flowchart TD
  P["portal:gen /prototype"] --> S["Scan #needs-component:*"]
  S --> F{"Component exists?"}
  F -->|no| B["Build Mo* / Data*"]
  B --> P
  F -->|yes| G["Generate page/cell"]
  G --> W{"#wire-only?"}
  W -->|yes| ST["Stub at prototype"]
  W -->|no| OK["Done"]
```

`portal:gen` **không** tự implement Mo* — placeholder + HANDOFF; lặp với `/prototype` đến khi không còn `#needs-component` unresolved.

### Promote design registry (cuối `/prototype`)

Component **tái sử dụng** hoặc shell/widget chuẩn (không domain-only) phải **promote** `registries/design.registry.json` (`planned` → `implemented`, `aliasIndex`, `portal:registry` pass), rồi grill spec lại với `#widget:` / `#shell:` thay `#needs-*`. Domain-only / `#wire-only` giữ trong feature — không promote.

Tiêu chí promote, map hashtag và review PR: [artifacts/dsl.md — Registry & promote](../artifacts/dsl.md#registry--promote).

---

## Điều kiện (repo code FE)

- **Standard base:** FE đã `flowgrid registry:sync` (init hoặc sau đổi UI/composables) — `/spec` map `#ui:`, `#shell:`, `#composable:` từ `registries/design.registry.json` trên checkout FE ([dsl.md](../artifacts/dsl.md#registry--script-sau-init-repo-code)).
- **Trước `gen:dry`:** `grillStatus.dev: done` + `flowgrid split` / `check` không lỗi trên bundle leaf.

## Bước trong lane

| Thứ tự | Việc | Vai trò | Skill / gate (ví dụ) |
|--------|------|---------|----------------------|
| 0b | ERD / ownership (khi entity hoặc bảng mới) | Lead / Dev data | `/db-erd` → `common/db-erd.md` — xem [architecture-data.md](./architecture-data.md) |
| 1 | Phân tích phạm vi, module, luồng | Lead / BA | `/overview`, `/module`, `/user-flow` |
| 2 | Spec bundle + IR (gồm **bind/db** trên field) | BA / Dev | `/spec`, `/legacy /spec`, đọc ERD LCA, `audit spec`, `split` + `render` |
| 3 | Grill nghiệp vụ / kỹ thuật / hòa giải | BA + Dev | `/grill-bqa`, `/grill-dev`, `/grill-docs` (optional) — sau mỗi patch bundle: **split lại** |
| 4 | Chốt codegen readiness (docs hub) | Dev | `flowgrid gen:dry` trên `ir/design.yaml` (FE repo, `FLOWGRID_DOCS_ROOT`) |
| 5 | Prototype UI (mock API) + promote registry Mo* tái dùng | Dev FE | `flowgrid gen` → `/prototype` → `portal:registry` / `flowgrid registry` validate |
| 6 | Grill prototype (checklist UI) | Dev FE / BA | `/grill-prototype` **sau** bước 5 — layout, copy VI, mock boundary, testIds (không Playwright) |

Song song (không chặn emerald): sau grill round 1 có thể bắt đầu `/testcase` trên tests-docs hub ([gates.md](./gates.md)).

### Data model — hai tầng {#data-model-two-stages}

| Tầng | Artifact | Ai |
|------|----------|-----|
| ERD tổng (Phase 0) | `<LCA>/common/db-erd.md` | `/db-erd` trước leaf mới |
| Chi tiết màn (Phase 1) | `spec.entities`, `design.sections[].db`, `spec.ui.list` columns | `/spec` — [bundle-authoring § Data](../../templates/shared/bundle-authoring.md#data-model--phase-0-erd-vs-screen-detail) |
| Contract BE | `api/.../01-backend-spec.yaml` | `/api-spec`, `/grill-dev` |

`/spec` **không** tạo `db-erd.md`; **bắt buộc đọc** ERD đã có khi khai báo `db.schema` / `db.field`. Cột list/detail/form: `key` + `meaning` + (nếu persisted) `db` hoặc `#derived-data`.

### `/spec` — đầu ra kỹ thuật

- Input thô (bullet, ảnh, legacy) + ERD LCA → `*.bundle.yaml` (user stories, screen access, **entities + db binding**, dictionary, validation, action flows, state matrix).
- `flowgrid split` + `flowgrid render` → `ir/generated/spec.md` (mục lục, overview, metrics, non-goals) cho review BA — không viết `.md` tay.
- Câu treo: `qa/*.yaml` → `/qa-resolve`.
- **Sign-off (tùy team):** rubric 6 mục [design-leaf-signoff.md](./design-leaf-signoff.md) — voluntary, không engine gate grill order.

### Grill trong Design

- **Nghiệp vụ:** 5 tầng validation, optimistic locking, ma trận HTTP (409, 422, 403 IDOR), `#reuse-api`.
- **Prototype:** mock đủ Empty/Loading/Error, long text, pagination; `data-testid` sớm.
- **Grill-prototype:** session riêng **sau** `/prototype` — checklist UI (xem bước 6); không thay `gen:dry` (bước 4). Trong session `/prototype`, chạy `gen:dry` đầu tiên theo [team-flow-prototype](../../harness/fe/rules/team-flow-prototype.mdc).

Chi tiết audit + zone + AskQuestion, **load policy** grill và `grillStatus`: [grill-and-human-review.md](./grill-and-human-review.md#design-grill-chain).

### Một session = một command

Đổi phase (spec → prototype → test) → **chat mới**. Không gộp implementation lane vào cùng session Design.

---

## Handoff ra lane khác

- **Backend** → [backend.md](./backend.md) khi `api/<seq>/01` và actions trong `ir/design.yaml` đã rõ.
- **Test** → [test.md](./test.md) khi bắt đầu `TC-*.yaml` (có thể song song sau prototype round 1).
- **Wire** — chỉ sau grill API + testcase scope; xem [wire.md](./wire.md).
