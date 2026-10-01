# Skill: `/docs-hub` — bộ docs (tra cứu & CLI)

## Tên
**Bộ docs** của FlowGrid — skill tra cứu Document Hub và các lệnh CLI `flowgrid split` / `render` / `publish`.

## Cách dùng (Command/Trigger)
- Slash command: **`/docs-hub`** (index arc42/C4, routing ID, validate link).
- CLI (repo Document Hub hoặc sau `flowgrid init`):

| Việc | Lệnh | Alias `package.json` (sau init) |
|------|------|----------------------------------|
| Split một bundle | `flowgrid split <bundle.yaml>` | `pnpm flowgrid:split` |
| Split toàn repo | `flowgrid split_all` | `pnpm flowgrid:split_all` |
| Render spec MD | `flowgrid render` | `pnpm flowgrid:render` |
| Publish catalog | `flowgrid publish` | `pnpm flowgrid:publish` / `pnpm flow:publish` |

## MCP (server `flowgrid`)
Nhóm tool **`flowgrid_docs_*`**: `flowgrid_docs_list_ids`, `flowgrid_docs_route`, `flowgrid_docs_get_element`, `flowgrid_docs_bundle_split`, `flowgrid_docs_docs_render`, …

Biến môi trường: **`FLOWGRID_DOCS_ROOT`** — đường dẫn tuyệt đối tới repo Document Hub (có `architecture/`).

## Input / Output
- **split:** `*.bundle.yaml` → `ir/design.yaml`, `ir/spec.yaml`, …
- **render:** `ir/*.yaml` → `ir/generated/*.md`, `qa/index.md`
- **publish:** Markdown hiện có → `CATALOG.md` + link đầu `README.md`

## Ý nghĩa
- Bộ docs là SSOT kiến trúc & spec; không trộn với symbol graph của repo code.
- **Index routing:** ID kiến trúc → bộ docs; symbol/call graph → CodeGraph repo tương ứng; gap/tag → ArtifactGraph local.
- Authoring skills (`/spec`, `/grill-bqa`, …) kết thúc bằng `flowgrid split` (+ `render` khi cần review).

## Liên quan
- **Trước:** `/spec`, `/update-spec`, `/api-spec`, …
- **Sau:** `flowgrid render` → `flowgrid dev` (VitePress)

## Chú ý
- Không sửa tay `ir/generated/*.md`; sửa bundle/IR rồi `split` + `render`.
- Agent đọc `ir/design.yaml` sau split thay vì đọc cả `bundle.yaml` khổng lồ.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/docs-hub

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

