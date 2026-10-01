# Artifacts resource

## Artifact trong phát triển phần mềm là gì?

**Artifact** (đầu ra / sản phẩm trung gian) là bất kỳ thứ team **tạo ra và lưu lại** để phát triển và vận hành phần mềm, không chỉ **source code** chạy được. Ví dụ thường gặp:

- tài liệu yêu cầu, đặc tả chức năng, thiết kế giao diện hoặc prototype;
- mô tả API, schema, tích hợp;
- kịch bản kiểm thử, testcase, ma trận coverage;
- cấu hình kiến trúc, quyết định kỹ thuật, ghi nhận technical debt;
- script test tự động, contract E2E — vừa là “tài liệu” vừa gắn repo code.

Code vẫn là artifact quan trọng nhất để **chạy** sản phẩm; các artifact khác giúp team **hiểu đúng**, **kiểm đúng**, và **sửa đúng chỗ** khi thay đổi. Nhiều dự án “chỉ có code” thực ra vẫn có artifact ngầm — ticket, chat, Excel — nhưng không gắn version control và không có chủ sở hữu rõ, nên khó coi là quản lý chuẩn.

## Artifacts resource là gì?

**Artifacts resource** là cách gọi **một nhóm artifact cùng loại** được team (hoặc tổ chức) quy ước đặt ở **một root** — một repo Git, một monorepo package, hoặc một cây thư mục cố định — với **mục đích và quyền sở hữu** thống nhất.

- **Resource** nhấn **tài nguyên** (nơi lấy / nơi ghi), không nhầm với một file lẻ.
- Một dự án thường có **nhiều resource**: tài liệu đặc tả, tài liệu test, code FE, code BE, đôi khi tách repo tài liệu và repo test.
- **Root** là đường dẫn “bắt đầu từ đây” để tool, CI và agent biết đọc/ghi — không phải mỗi người tự chọn folder.

FlowGrid map **bốn nhóm resources** chính: docs, tests-docs, code, DSL/platform. Sau `flowgrid init`, thư mục **`.flowgrid/`** (và `config.json`) ghi **pointer** root từng nhóm và profile adapter — **không** chứa SSOT nghiệp vụ; SSOT nằm trong bốn nhóm dưới.

## Team phần mềm thường quản lý artifacts resource ra sao?

- **Phân tách theo vai trò artifact**
  - Spec / kiến trúc tách khỏi code production khi có thể — tránh “chỉ đọc được trong code”.
  - Thiết kế testcase (document) tách khỏi **chỗ chạy** automation — cùng một ý test có thể được review trước khi gắn Playwright/Cypress.
- **Gắn version control**
  - Artifact quan trọng đi cùng Git (hoặc hệ tương đương) với review merge — không để bản chính trôi trên chat hoặc drive cá nhân.
- **Owner và reviewer**
  - Mỗi resource hoặc nhánh (spec, test plan) có người **chốt**; thay đổi scope có trace (PR, changelog artifact).
- **Traceability**
  - Yêu cầu → spec → testcase → test chạy; API contract → implementation. Mất liên kết thì release và audit khó.
- **Một nơi chốt (SSOT) cho mỗi chủ đề**
  - Tránh hai bản Excel và Confluence cùng mô tả một màn hình; team chọn **một** nguồn để tranh luận và cập nhật (xem [overview § SSOT](../overview/index.md)).
- **Monorepo vs multi-repo**
  - **In-repo:** docs và tests-docs có thể nằm **trong repo FE hoặc BE** (`docs/`, `tests/`) — resource **khác nhau** về nghĩa; BE thường gom surface kênh ngoại vi (webhook/partner) + testcase hook (`genType: api-e2e`).
  - **Lớn / nhiều team:** repo Document, repo Test, repo FE/BE — liên kết bằng tag version, submodule, hoặc cấu hình tool trỏ path.

Quy trình agile (sprint, daily) **không thay** việc quản lý resource; nó chỉ nhịp làm việc. Artifact vẫn cần **capture sau khi chốt** và **gate** trước release (review, test, audit) — FlowGrid hỗ trợ phần gate có cấu trúc trên SSOT.

## Tầm quan trọng của artifacts resource

- **Giảm hiểu lệch** giữa BA, dev, QA, vận hành và stakeholder — mọi người tranh luận trên cùng loại file đã chốt.
- **Onboarding và handoff** — member mới biết “đọc ở đâu, sửa ở đâu” thay vì hỏi vòng vo.
- **Chất lượng release** — testcase document và contract không tách rời code thì regression và lệch FE–BE giảm.
- **Tự động hóa và AI** — agent, codegen, audit chỉ tin được khi **path và schema ổn định**; resource là “địa chỉ” cho harness.
- **Scale team** — tách repo theo resource khi boundary rõ; không bắt buộc từ ngày đầu nhưng **mô hình tư duy** tách sớm giúp sau này không phải migrate đau.

Bỏ hoặc làm sơ artifact để “nhanh” vẫn là trade-off; [overview](../overview/index.md) mô tả cách AI + toolkit lấp **công số** duy trì resource mà không bỏ lane.

## FlowGrid: bốn nhóm resources chính và chi tiết

- **Docs**
  - Bộ artifacts resource về phân tích kỹ thuật, requirement và đặc tả của dự án.
  - Tài liệu **SSOT** của dự án; các nhóm resource khác tham chiếu docs để biết **cần làm gì** và **đúng/sai** so với đã chốt.
  - Khi phát hiện sai lệch hoặc gap ở công đoạn / artifact khác — cập nhật **docs trước** theo quy trình, rồi lan sang tests-docs, code, DSL.
  - **Triển khai:** repo Document riêng, hoặc thư mục in-repo (vd. `docs/`) khi dự án nhỏ.
  - **FlowGrid:** `frontend.docsRoot` / `backend.docsRoot` trong [config](./code.md); `FLOWGRID_DOCS_ROOT`; **Document** → cwd = hub.
  - **Author bundle:** [docs.md § Bundle](./docs.md#bundle--authoring-ssot-spec--gen--design) · [`bundle-authoring.md`](https://github.com/ShanYuCoder/flowgrid/blob/main/templates/shared/bundle-authoring.md) (toolkit).
- **Tests-docs**
  - Bộ artifacts resource về **tài liệu kiểm thử**: scenario, testcase, suite — không thay chỗ **chạy** automation.
  - SSOT cho “cần kiểm gì”; trace về docs để biết kiểm **đúng nghiệp vụ** nào.
  - Gap coverage hoặc lệch ma trận → chỉnh tests-docs; nếu sai **yêu cầu** thì quay về docs trước.
  - **Triển khai:** repo Test riêng, hoặc in-repo (vd. `tests/`) khi dự án nhỏ.
  - **FlowGrid:** `frontend.testsRoot` / `backend.testsRoot`; `FLOWGRID_TESTS_DOC`; gen/audit: `flowgrid testcase:gen --id TC-*`, `flowgrid audit e2e --id …`.
- **Code**
  - Bộ artifacts resource **mã chạy được**: FE, BE, fullstack.
  - Implementation và contract runtime; đối chiếu docs (spec/API) và tests-docs (kỳ vọng kiểm thử).
  - Lệch hành vi hoặc API → xác định sửa code hay cập nhật docs/tests-docs; **đổi nghiệp vụ** thì docs (và testcase liên quan) đi trước code.
  - **e2e-root:** repo/thư mục (thường FE) nơi chạy và lưu spec automation; **khác** root tests-docs (document vs chạy).
  - **FlowGrid:** `e2eRoot` + `FLOWGRID_E2E_ROOT`; harness MCP sync; multi-repo: [configure-repo-maps](../references/skills/configure-repo-maps.md) + `flowgrid repo-maps`.
  - **Contract triển khai:** [field registry & `contract:gen`](./code.md#contract-field-registry) · [Portal ↔ API (envelope, list, wire)](./code.md#portal-api) — chi tiết trên [code.md](./code.md).
  - **E2E (e2e-root):** [Playwright & testId](./code.md#e2e-testids) · [semantic UI / axe](./code.md#e2e-semantic-assertions) — plan testcase trên [tests-docs](./tests-docs.md).
  - **Portal FE (adapter):** [bốn tầng composable → service → store → model](./code.md#portal-fe-layers) · [page lifecycle registry](./code.md#page-lifecycle).
- **DSL & platform**
  - Quy ước chung: DNA kiến trúc, markers/tags trên bundle, registry design/unit, lexicon **ArtifactGraph** — không thay spec nghiệp vụ trong docs.
  - Giúp toolkit và agent đọc/ghi **đúng format** trên các nhóm resource kia.
  - Đổi quy ước platform → cập nhật DSL theo policy team; không dùng DSL để “vá” spec sai trong docs.
  - **FlowGrid:** adapter + **stack preset** (`commands`, `registries`) trong `.flowgrid/config.json`; index ArtifactGraph **`.flowgrid/index.db`**; seed lexicon **`artifactgraph/`**; SSOT registry **`registries/*.json`** trên repo code — không có `FLOWGRID_DSL_ROOT` (xem [dsl.md](./dsl.md)).
  - **Skills agent vs docs web:** harness `SKILL.md` (sau sync) là policy chạy; [references/skills/](../references/skills/spec.md) + [CLI § harness vs web](../references/cli-and-commands.md#skills-harness-vs-docs).

## SSOT lệnh & gate (sau init)

| Tài liệu | Nội dung |
| --- | --- |
| [cli-and-commands.md](../references/cli-and-commands.md) | CLI, MCP env, npm scripts (`flowgrid:*` + alias `spec:*`, `cases:*`) |
| [audit-commands.md](../references/audit-commands.md) | 8 engine `flowgrid audit *`, `cases:gate` |
| [code.md](./code.md) · [tests-docs.md](./tests-docs.md) · [dsl.md](./dsl.md) | Pointer config, testcase plan, DNA/registry |
