# Design leaf — sign-off rubric (voluntary)

**Phạm vi:** một function leaf (`surfaces/<surface>/CMP-*/<NN…>/<slug>.bundle.yaml`) **trước** lane Test / codegen production.

**Không phải engine gate** — lead/BA ký khi member đã tuân [design.md](./design.md) và skill grill. Chat-only “done” không thay checklist.

**Liên quan:** [gates.md](./gates.md) · [grill-and-human-review.md](./grill-and-human-review.md) · audit `flowgrid audit spec` (structural).

---

## Khi dùng

- Đóng Design cho một `W-*` / leaf bundle.
- Handoff sang `/testcase`, BE `/api-spec`, FE `/prototype` (theo policy team).
- Review nội bộ mục tiêu chất lượng SSOT **~9** (đủ trace, đủ codegen, BA đọc được).

---

## Rubric — 6 mục (tất cả phải OK)

| # | Mục | Kiểm tra |
|---|-----|----------|
| 1 | **Audit structural** | `flowgrid audit spec <bundle> --type <profile>` — không còn `gaps[]` chưa xử lý; `confirms[]` đã chốt hoặc chuyển `qa` có chủ đích. |
| 2 | **Business readable** | **VitePress** `ir/generated/spec.md` (+ `data-model.md` nếu có DB): stories, **list columns**, scenarios, AC — không chỉ placeholder. |
| 3 | **Trace UI ↔ story** | Spot 2–3 scenario: thao tác map được từ `design.actions` / `design.sections` (handoff, validation messages VI). |
| 4 | **API contract** | `api/<seq>/01-backend-spec.yaml` khớp `ir/design.yaml` `apiRef`; nếu có BE trong scope: `flowgrid audit fe-be` không blocker. |
| 5 | **Codegen readiness** | `grillStatus.dev: done` (theo flow); `flowgrid gen:dry` (FE policy) pass; `gen.codegen` + tags grill-dev đã ghi. |
| 6 | **QA inbox** | `qa` rỗng hoặc chỉ debt đã accept; không `openQuestions` ẩn trong bundle thay QA file. |

### Tùy chọn (khuyến nghị, không chặn sign-off)

| # | Mục | Kiểm tra |
|---|-----|----------|
| 7 | **Data model** | LCA `db-erd.md` đọc được; persisted controls có `db.schema`/`db.field`; `spec.entities` không rỗng khi form/list có nhiều field DB; list column computed → `#derived-data`. [architecture-data.md](./architecture-data.md) |

- `/grill-prototype` không còn issue **SSOT** (copy, state, mock) trước test lane.
- `registry:sync` trên FE base đã chạy; DSL tag khớp `design.registry.json`.
- Đọc `ir/generated` dictionary/matrix với BA non-tech.

---

## Ghi nhận sign-off (thủ công)

Gợi ý một dòng trên bundle hoặc PR description:

```text
Design sign-off: <page-id> | reviewer: <name> | date: YYYY-MM-DD | rubric: 6/6
```

Không bắt buộc field YAML — tránh engine phụ thuộc thứ tự grill.

---

## Không dùng rubric để

- Fail `split` khi `grillStatus.dev: done` nhưng `bqaOpen` chưa done (engine lock — **out of scope**).
- Thay grill BQA/Dev — rubric là **sau** khi flow đã chạy.
