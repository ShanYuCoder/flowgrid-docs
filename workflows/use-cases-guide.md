# Hướng dẫn Workflow Chi tiết theo 3 Ngữ cảnh Triển khai (Use Cases)

Tài liệu này hướng dẫn chi tiết từng bước (step-by-step) từ lúc khởi tạo `flowgrid init`, chọn cấu hình, trỏ liên kết multi-repo (`configure-repo-maps`), đến các bước triển khai chi tiết (`overview`, `architecture`, `legacy`, `adopt`, `spec detail`, `testcase`, `wire`) cho **3 ngữ cảnh triển khai thực tế** của FlowGrid được nêu trong README & Overview:

1. **Case 1: Greenfield** — Dự án mới hoàn toàn, áp dụng Stack Adapter chuẩn (`standard`).
2. **Case 2: Modernization / Re-platform (Brownfield)** — Khảo cổ code cũ (`/legacy`), trích xuất Common Catalog (`/adopt`), xây hệ thống mới.
3. **Case 3: Maintain / Custom Base** — Dự án sẵn có / UI library tùy biến (`custom`), huấn luyện Agent qua Golden Sample.

---

## 🚀 Case 1: Greenfield (Dự án mới hoàn toàn, Stack chuẩn Adapter)

**Bối cảnh:** Xây dựng sản phẩm phần mềm mới từ đầu. Đã chốt công nghệ thuộc các khung adapter chuẩn được FlowGrid hỗ trợ (`nuxt4`, `nextjs`, `nestjs`, `fastapi`).

```mermaid
flowchart TD
  A["1. flowgrid init<br/>(Standard Profile + Stack Adapter)"] --> B["2. configure-repo-maps<br/>(Liên kết Docs-hub & Test-hub)"]
  B --> C["3. /overview & /architecture<br/>(Tầm nhìn, Data Model, ERD)"]
  C --> D["4. /spec (Leaf Bundle)<br/>(Spec chi tiết + Grill BQA/Dev)"]
  D --> E["5. /prototype & /api-spec<br/>(Render HTML UI & REST/DTO API)"]
  E --> F["6. /testcase & Codegen / Wire<br/>(TC-*.yaml, Playwright TS & Final Integration)"]
```

### Các bước thực hiện chi tiết:

#### Bước 1: Khởi tạo với `flowgrid init`
Mở terminal tại root repository và chạy:
```bash
flowgrid init
```
*Chọn các tham số wizard:*
- **Select Agents/Skills:** Chọn Agent IDE team sử dụng (vd: `antigravity`, `cursor`, `gemini`).
- **Select project type:** Chọn `Frontend`, `Backend`, hoặc `Fullstack` (nếu dựng repo Docs-hub riêng thì chọn `Document`).
- **Base Architecture Profile:** Chọn **`standard`** (kích hoạt tính năng tự động chạy `registry:sync` quét components/API).
- **Frontend / Backend technology (Adapter):** Chọn adapter tương ứng (`nuxt4`, `nextjs`, `nestjs`, `fastapi`).
- **Docs-hub location:**
  - *Multi-repo (khuyên dùng):* Chọn `Other location` → trỏ path sang repo `base_docs` (`FLOWGRID_DOCS_ROOT`).
  - *Single-repo:* Chọn `This repository` → scaffold thư mục `docs/` tại chỗ.
- **Tests-docs hub location:**
  - *Multi-repo:* Chọn `Other location` → trỏ path sang repo `base-test-docs` (`FLOWGRID_TESTS_DOC`).
  - *Single-repo:* Chọn `This repository` → scaffold thư mục `tests/`.
- **Automation e2e-root:** Giữ mặc định (`tests/e2e` cho FE, `tests/api-e2e` cho BE).
- **Confirm:** Chọn `Yes` để CLI tạo `.flowgrid/config.json` và đồng bộ registry ban đầu.

#### Bước 2: Liên kết Multi-repo Maps (`/configure-repo-maps`)
Khi mô hình triển khai tách thành nhiều repo (Docs-hub + Tests-hub + Code FE/BE):
- Dùng skill **`/configure-repo-maps`** để Agent hỗ trợ tạo cấu hình.
- Hoặc tạo/sửa file `platform-repos.local.json`:
```json
{
  "docsRoot": "/absolute/path/to/docs-hub",
  "testsRoot": "/absolute/path/to/tests-docs"
}
```
Sau đó kiểm tra và đồng bộ liên kết bằng CLI:
```bash
flowgrid repo-maps check
flowgrid repo-maps align
```

#### Bước 3: Dựng Overview & Tổng quan Kiến trúc (`/overview`, `/architecture`)
Mở session Agent AI trên Docs-hub:
- **`/overview`**: Xây dựng bức tranh tổng quan hệ thống tại `overview/index.md` (Vision, Actors, Roles, Release Scope).
- **`/architecture`**: Khai báo kiến trúc kỹ thuật (`architecture/01-introduction.md`) và các ràng buộc (`architecture/02-constraints.md`). (Sơ đồ ERD dùng `/db-erd` lưu tại `<LCA>/common/db-erd.md`).

#### Bước 4: Dựng Spec Chi tiết theo Màn hình / Feature (`/spec`)
Dùng slash command `/spec` cho từng chức năng (Leaf Bundle):
- Agent tự đọc `design.registry.json` từ FE repo để thiết kế UI layout.
- Sinh cấu trúc Leaf tại `surfaces/<surface>/CMP-*/<NN...>/`:
  - `<slug>.bundle.yaml` (SSOT chính)
  - `ir/design.yaml`, `ir/spec.yaml`, `ir/generated/spec.md`
  - `data-model.md`, `api.md`
- Chạy `/grill-bqa` và `/grill-dev` để phản biện logic nghiệp vụ, UI rules & edge-cases.

#### Bước 5: Sinh Prototype & API Contract (`/prototype`, `/api-spec`)
- **`/prototype`** (lệnh `gen`): Sinh prototype HTML/Vue/React chạy trực tiếp trên browser để BA & PO UAT giao diện trước khi code.
- **`/api-spec`**: Chạy trên repo BE để định nghĩa chi tiết DTO, REST Endpoints và Open API Spec (`api/<seq>/01-backend-spec.yaml`).

#### Bước 6: Viết Testcase, E2E Automation & Wire (`/testcase`, `/wire`)
- **`/testcase`**: Chạy trên Tests-docs hub để sinh catalog `TC-*.yaml` và kịch bản E2E scenarios.
- **`testcase:gen` / `api-gen`**: Sinh code kiểm thử Playwright TS (`tests/e2e/*.spec.ts`) và Controller/Service stubs cho Backend.
- **`/wire`**: Tiến hành đấu nối FE ↔ API thật, chạy audit regression và hoàn tất UAT đóng màn.

---

## 🔄 Case 2: Modernization / Re-platform (Code cũ làm nguồn, /adopt & /legacy)

**Bối cảnh:** Nâng cấp hệ thống legacy sẵn có (PHP monolith, .NET cũ, WebForms,...) sang hệ thống mới dạng Microservices / Modern SPA. **Nguyên tắc cốt lõi:** Khởi tạo FlowGrid trên cụm repo mới, trỏ liên kết tới repo cũ để khảo cổ & kế thừa 100% rule nghiệp vụ cũ qua Common Catalog (`CMN-*`), cấm copy-paste code rác cũ sang codebase mới.

```mermaid
flowchart TD
  A["1. flowgrid init tại Repo Mới<br/>(Standard Profile trên Docs-hub / Code mới)"] --> B["2. configure-repo-maps<br/>(Khai báo legacyRepoRoot trỏ tới Repo cũ)"]
  B --> C["3. Khảo cổ & Adopt (/legacy, /adopt)<br/>(Đọc tham chiếu Repo cũ → tạo adoption-inventory.md)"]
  C --> D["4. /overview & /spec mới<br/>(Kế thừa CMN-*, audit legacy gap)"]
  D --> E["5. Codegen, Migration Data & E2E Benchmark<br/>(E2E song song Old vs New & Wire)"]
```

### Các bước thực hiện chi tiết:

#### Bước 1: Khởi tạo FlowGrid trên Repo Hệ thống Mới (`flowgrid init`)
Mở terminal tại cụm dự án mới (Docs-hub trung tâm hoặc repository code mới) và chạy:
```bash
cd your-new-project
flowgrid init
```
*Chọn các tham số wizard:*
- **Select project type:** Chọn `Document` (nếu dựng Docs-hub riêng) hoặc `Frontend` / `Backend` / `Fullstack`.
- **Base Architecture Profile:** Chọn `standard` (nếu stack mới chuẩn adapter) hoặc `custom`.

#### Bước 2: Liên kết Repo Maps trỏ sang Repo Legacy cũ (`/configure-repo-maps`)
Dùng skill **`/configure-repo-maps`** hoặc tự tạo 2 file cấu hình tại root repo mới:

1. `platform-repos.local.json` (Trỏ tới các hub mới):
```json
{
  "docsRoot": "/path/to/docs-hub",
  "testsRoot": "/path/to/tests-docs"
}
```
2. `legacy-repos.local.json` (Trỏ tới kho mã nguồn legacy cũ):
```json
{
  "projects": {
    "legacy-app": {
      "root": "/path/to/legacy-code-repo"
    }
  }
}
```
Kiểm tra liên kết bằng:
```bash
flowgrid repo-maps check
```

#### Bước 3: Đọc tham chiếu Code cũ, Khảo cổ & Quét chỉ mục (`/legacy`, `/adopt`)
Thực thi các lệnh khảo cổ ngay trên workspace dự án mới; Agent AI sẽ đọc mã nguồn từ `legacyRepoRoot` để phân tích và lập chỉ mục:
- **Khảo cổ 2 tầng (`/legacy`)**: Phân tích chi tiết UI, API, SQL query và luồng liên thông của hệ thống cũ.
- **Quét chỉ mục & Trích xuất Common (`/adopt`)**:
  - **Truy vết sâu User Flow (`FLOW-*`)**: Phân tích 5 nhóm luồng (Hành trình đa bước, State machine, Role branching, Async/Webhooks, Dialog Sub-flows).
  - **Trích xuất Common Catalog (`CMN-*`, `CMN-UI-*`)**: Phát hiện các linh kiện UI và logic nghiệp vụ lặp lại ở code cũ.
- **Kết quả**: Sinh file chỉ mục `adoption-inventory.md` nằm ngay tại root workspace của repo mới.

#### Bước 4: Tái cấu trúc Overview & Dựng Spec Mới (`/spec`)
- **`/overview`**: Xây dựng tầm nhìn re-platform tại `overview/index.md` trên repo mới.
- **`/spec`**: Viết spec cho tính năng mới:
  - Tái sử dụng trực tiếp các `CMN-*` và `CMN-UI-*` trong `adoption-inventory.md`.
  - Tuyệt đối **không copy-paste** class/file lẻ từ repo cũ sang repo mới.
  - Chạy `flowgrid audit legacy` để đảm bảo 100% rule nghiệp vụ cũ đã được bao phủ trong spec mới.

#### Bước 5: Codegen, Migration Data & E2E Validation (`/api-spec`, `/testcase`, `/wire`)
- Sinh API contract mới và schema DB tương thích với dữ liệu cần migrate.
- Chạy **`/testcase`** tạo bộ kịch bản kiểm thử E2E benchmark (chạy song song giữa hệ thống cũ và hệ thống mới để đối chiếu).
- Chạy **`/wire`** tiến hành nghiệm thu hội tụ và chuyển đổi dữ liệu sản xuất.

---

## 🛠️ Case 3: Maintain / Custom Base (Base dự án tùy biến & Golden Sample)

**Bối cảnh:** Bảo trì dự án sẵn có hoặc phát triển trên một kiến trúc / UI Library nội bộ tùy biến không nằm trong khung adapter mặc định của FlowGrid (vd: Angular tùy chỉnh, WPF/C#, Go gRPC, Microservices riêng).

```mermaid
flowchart TD
  A["1. flowgrid init (Profile Custom)<br/>(FE/BE Adapter = custom)"] --> B["2. configure-repo-maps & doctor<br/>(Cấu hình liên kết đường dẫn giữa các Repos & Hubs)"]
  B --> C["3. Rà soát & Adopt Catalog (/adopt)<br/>(Quét chỉ mục chức năng, chọn màn mẫu chuẩn)"]
  C --> D["4. Khai báo Golden Sample<br/>(.flowgrid/config.json)"]
  D --> E["5. Học Lexicon (/build-templates)<br/>(Tạo custom-lexicon.json & templates)"]
  E --> F["6. /overview & /spec Feature mới<br/>(Spec bám chuẩn Lexicon & Golden Pattern)"]
  F --> G["7. Codegen, Audit Custom & Wire<br/>(Sinh code đúng style dự án hiện tại & Wire)"]
```

### Các bước thực hiện chi tiết:

#### Bước 1: Khởi tạo với Custom Profile (`flowgrid init`)
Tại repository dự án tùy biến hiện tại, chạy:
```bash
flowgrid init
```
*Chọn các tham số wizard:*
- **Select project type:** Chọn `Frontend`, `Backend`, hoặc `Fullstack`.
- **Base Architecture Profile:** Chọn **`custom`** (báo cho FlowGrid biết đây là dự án có cấu trúc tùy biến).
- **Frontend / Backend technology:** Chọn `custom`.
- **Docs-hub & Tests-docs location:** Chọn `This repository` hoặc `Other location` tùy mô hình lưu trữ tài liệu.

#### Bước 2: Cấu hình Repo Maps (`/configure-repo-maps`)
Ngay sau khi `init`, thực hiện khai báo liên kết đường dẫn giữa dự án và các repo tài liệu/test (nếu dùng multi-repo):
- Dùng skill **`/configure-repo-maps`** hoặc tạo `platform-repos.local.json`.
- Kiểm tra trạng thái liên kết bằng:
```bash
flowgrid repo-maps check
```

#### Bước 3: Rà soát Chức năng hiện có & Trích xuất Catalog (`/adopt`)
Khi đường dẫn liên kết đã sẵn sàng, tiến hành rà soát toàn bộ codebase hiện tại:
- Chạy kỹ năng **`/adopt`** trên codebase để quét và lập chỉ mục toàn bộ các màn hình/chức năng đang hoạt động trong dự án.
- **Truy vết sâu User Flow (`FLOW-*`)**: Quét 5 nhóm luồng (Hành trình đa bước, State machine, Role branching, Async/Webhooks, Dialog Sub-flows).
- **Trích xuất Common Catalog (`CMN-*`)**: Phát hiện các linh kiện UI (`UI-CMN-*`) và logic nghiệp vụ dùng chung (`CMN-*`).
- **Chọn Golden Sample**: Qua kết quả rà soát của `/adopt`, chọn ra 1-2 màn hình/module được viết chuẩn nhất (đầy đủ UI layout, state management, API calling pattern, convention sạch) để làm **Golden Sample**.

#### Bước 4: Khai báo Golden Sample trong Cấu hình
Ghi vị trí một chức năng mẫu chuẩn vừa chọn ở Bước 3 vào file `.flowgrid/config.json` (hoặc truyền qua tham số CLI):
```json
{
  "baseProfile": "custom",
  "goldenSample": "src/modules/golden-feature"
}
```

#### Bước 5: Học Lexicon & Pattern Code (`/build-templates` hoặc `build-template-code`)
Chạy kỹ năng agent **`/build-templates`** hoặc gọi thẳng engine `flowgrid build-template-code --sample=src/modules/golden-feature`:
- Hệ thống tiến hành phân tích sâu cấu trúc của Golden Sample.
- Học từ vựng (lexicon), cấu trúc layer, và mẫu mã.
- Xuất kết quả Adapter tùy biến vào:
  - Registry: `.flowgrid/adapters/custom/registries/design.registry.json`
  - Lexicon: `.flowgrid/adapters/custom/lexicon/registry-tags.en.txt`
  - Templates: `.flowgrid/adapters/custom/templates/list.vue.hbs` (tùy stack)

#### Bước 6: Dựng Overview, Spec cho Tính năng mới (`/overview`, `/spec`)
- **`/overview`**: Định nghĩa module/feature mới cần bổ sung vào hệ thống hiện tại.
- **`/spec`**: Viết spec chi tiết cho tính năng mới. Agent AI sẽ đối chiếu trực tiếp với `custom-lexicon.json` để đưa ra các thiết kế UI và API contract khớp 100% với convention và style hiện tại của dự án.

#### Bước 7: Codegen, Audit Custom & Wire (`flowgrid audit`, `/wire`)
- **Codegen:** Sinh code hoặc prototype tuân thủ đúng pattern đã học từ Golden Sample.
- **Audit:** Chạy các lệnh kiểm tra tiêu chuẩn (như `flowgrid audit fe-be`, `flowgrid audit spec`) để đảm bảo chất lượng.
- **Wire & Test:** Chạy `/testcase` và `/wire` để tích hợp tính năng mới vào codebase đang chạy an toàn.

---

## 📊 Bảng So sánh 3 Ngữ cảnh Triển khai

| Tiêu chí | Case 1: Greenfield | Case 2: Modernization (Brownfield) | Case 3: Maintain (Custom Base) |
| --- | --- | --- | --- |
| **Mục tiêu** | Dựng dự án mới từ đầu | Nâng cấp code cũ sang hệ mới | Bảo trì / phát triển trên base có sẵn |
| **Base Profile (`init`)** | `standard` | `standard` hoặc `custom` | `custom` |
| **Kỹ năng trọng tâm** | `/overview`, `/spec`, `/prototype` | `/legacy`, `/adopt`, `/spec` | `/adopt`, `/build-templates`, `/spec` |
| **Nguồn dữ liệu mẫu** | Framework Adapter mặc định | Code legacy cũ & Common Catalog | Golden Sample (chọn sau khi `/adopt`) |
| **Kiểm tra chất lượng** | `flowgrid audit *` tiêu chuẩn | `flowgrid audit legacy` | `flowgrid audit *` tiêu chuẩn |
