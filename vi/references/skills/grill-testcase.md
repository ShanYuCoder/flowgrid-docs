# Skill: `/grill-testcase`

## Tên
`grill-testcase`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/grill-testcase`
- Chạy trên **tests-docs hub** (`FLOWGRID_TESTS_DOC`) — sau khi có `TC-*.yaml` / `SC-*`, trước hoặc cùng lúc `cases:gate --strict`.

## Input (Dữ liệu đầu vào)
- Plan kiểm thử: `cases/**/TC-*.yaml`, scenario `SC-*` (path mirror docs `FLOW-*`).
- **Bundle SSOT** trên docs: đọc **toàn bộ** `*.bundle.yaml` (sibling `ir/`) — không chỉ `ir/spec.yaml` + `ir/design.yaml`.
- Env: `FLOWGRID_DOCS_ROOT`, `FLOWGRID_TESTS_DOC`.

## Output (Kết quả mong đợi)
- Báo gap coverage: scenario ↔ `userStories` / acceptance ↔ `testMatrix` facet.
- Kết quả `flowgrid cases:gate --strict` và `flowgrid audit testcase … --bundle …`.
- Gap **nghiệp vụ / spec** → handoff docs-hub (`/update-spec`, `/grill-bqa`) — **không** bịa acceptance từ tests hub.

## Description / Ý nghĩa
- Kiểm toán **kế hoạch** kiểm thử (YAML), không sửa Playwright trên e2e-root.
- Bắt buộc ma trận đủ facet (`positive_boundary`, `negative_length/format`, `negative_duplicate`, `concurrency_double_submit`, `network_interruption`…) — không chỉ happy path.
- `description` / `story` trên TC phải khớp ngữ nghĩa bundle; YAML không nhúng JS thô (`"a".repeat(256)` không quote).
- Khác **`/grill-test`** (repo FE): `/grill-testcase` = hub tests-docs; `/grill-test` = audit matrix TC ↔ PO ↔ `*.spec.ts` sau `/test`. Lane: [workflows/test.md](../../workflows/test.md).

## Các Skill liên quan
- **Trước đó:** `/testcase`, `/scenario`.
- **Sau đó:** `cases:render`, `cases:gate` · codegen `testcase:gen` trên e2e-root · `/test` → `/grill-test` → FE `/grill-wire` khi post-wire.
- **Từ wire:** gap plan/API thật — extract `harness/tests/extracts/wire-test-handoff.md`.

---

## Example prompt (mẫu gọi)

```text
/grill-testcase

Target: W-ADM-AUTH-01 (resolve path under FLOWGRID_DOCS_ROOT)

Run cases:gate --strict with FLOWGRID_DOCS_ROOT
Spot-check TC-*.yaml vs resolved *.bundle.yaml
Flag thin scenarios → handoff /update-spec if needed
```
