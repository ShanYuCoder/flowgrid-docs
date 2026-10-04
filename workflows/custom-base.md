# Workflow — Custom base & maintain

**Phạm vi (SSOT):** dự án **không** dùng base mặc định (Nuxt4+shadcn, Nest CQRS, …) — đồng bộ template, DSL registry, ArtifactGraph qua **Golden Sample**.

**Hướng dẫn từng bước + sơ đồ:** [3 Ngữ cảnh Triển khai § Case 3 Maintain Custom Base](./use-cases-guide.md#️-case-3-maintain--custom-base-base-dự-án-tùy-biến--golden-sample).

**Trước `/spec`:** nhánh **B** trong [spec-ssot-prep.md](./spec-ssot-prep.md). Brownfield: làm sau `/adopt` hoặc song song lead — cùng drill SSOT với [legacy-brownfield.md](./legacy-brownfield.md).

**Không viết ở đây:** lệnh `build-template-code` chi tiết → [references/cli-and-commands.md](../references/cli-and-commands.md) · skill → [references/skills/build-templates.md](../references/skills/build-templates.md).

---

## Vấn đề

- Template mặc định lệch UI library / kiến trúc dự án.
- Component có sẵn (`el-table`, …) không có trong `design.registry.json` → tag `#needs-component` ảo.
- Spec và code thật lệch nhau.

---

## Tam giác đồng bộ (Tri-Sync)

```text
flowgrid init (Custom Base) + Golden Sample (1 màn chuẩn)
        │
        ▼
flowgrid build-template-code
        │
   ┌────┼────┐
   ▼    ▼    ▼
Templates  Registry  Lexicon/Graph
(.hbs)     (design)   (SQLite index)
```

---

## Ba bước vận hành

| # | Việc | Kết quả |
|---|------|---------|
| 1 | `flowgrid init` — profile **Custom** + Golden Sample path | `.flowgrid/config.json` (`baseProfile: custom`, `goldenSample`) |
| 2 | `flowgrid build-template-code` (`--dry-run` trước) | Templates `.hbs`, `design.registry.json`, lexicon/graph |
| 3 | Feature mới qua SSOT chuẩn | `/spec`, `/prototype`, `gen` dùng adapter custom — giảm `#needs-component` ảo |

### Init (wizard)

1. Chọn **Custom / Existing Base** (maintain hoặc stack khác Nuxt+shadcn / Nest CQRS mặc định).
2. Nhập path Golden Sample (màn chuẩn nhất, ví dụ `src/pages/users/UserList.vue`).
3. Adapter nằm dưới `.flowgrid/adapters/custom/` (templates, registries).

### `build-template-code`

- Học pattern UI (Element Plus, Ant Design, …) và đăng ký component vào registry.
- ArtifactGraph nạp lexicon → giảm cảnh báo orphan trên code có sẵn.

Sau đó workflow feature **giống greenfield**: [index.md](./index.md) (Design → Code+test → Wire) · prep drill: [spec-ssot-prep.md](./spec-ssot-prep.md). Skill: [build-templates](../references/skills/build-templates.md).

### Standard base (Nuxt4 / Next + adapter mặc định)

Không cần Golden Sample: `flowgrid init` với **Standard Base** tự chạy **`registry:sync`** — quét `components/ui` (shadcn), molecules/organisms, shells có trên disk → `registries/design.registry.json`; repo BE → `registries/be-capabilities.registry.json`. Agent `/spec` trên docs hub tham chiếu registry qua checkout FE.

---

## Common trên docs hub (không còn gen-common)

Trước đây team author `common/yaml` + `flowgrid gen-common` để sinh molecule/API CMN. **Hiện tại:**

| Việc | SSOT |
|------|------|
| Luồng cross-flow | `…/common/user-flows/FLOW-*.md` (product) |
| Quy tắc UX/nghiệp vụ lặp | `…/common/patterns/*.md` — skill [`/common`](../references/skills/common.md) |
| Delete flow, badge, flat design, list toolbar, … | Đã **implement trong FE base** + rule `flowgrid-ux-common.mdc` — agent áp khi `/spec` / grill, **không** gen từ hub |
| Component / template / registry mới | **Custom base** (`build-template-code`) hoặc implement trong `/prototype` (`#needs-component`) |

**Không dùng:** `/gen-common`, `/common-spec`, `/grill-common-spec`, thư mục `common/yaml` trên hub mới. Skeleton init cũ có thể còn file mẫu — không copy sang dự án greenfield.
