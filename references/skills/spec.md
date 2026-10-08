# Skill: `/spec`

## Tên
`spec`

## Prep (trước session spec)

Quy trình chuẩn bị Phase 0: [phase-0-setup.md](../../workflows/phase-0-setup.md) — `/init` → Phase 0 → `/spec` hoặc `/legacy /spec`.

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/spec <module-id/slug/draft-id>`
- Kích hoạt bằng `@flowgrid` (hoặc tên bot tương ứng) khi cần tạo bản đặc tả ban đầu (design bundle).
- Khi có thêm cờ `/legacy`: Đọc source cũ và ghi `specOrigin: legacy`.

## Input (Dữ liệu đầu vào)
- User Prompt (mô tả yêu cầu bằng text).
- Draft ID (ví dụ: `1-1-1`, `2-1-2`) hoặc Slug, Module ID (ví dụ: `CMP-ADM-ORD-01`).
- File requirement dạng Markdown (nếu có) được tạo sẵn trong thư mục ứng với ID (ví dụ: `01/01/02.md`).
- File template mẫu toolkit: [`templates/shared/feature.bundle.yaml`](../../../templates/shared/feature.bundle.yaml) + [`bundle-authoring.md`](../../../templates/shared/bundle-authoring.md) (sau `flowgrid init` → `.flowgrid/templates/`). **`design-spec.yaml` deprecated** — không author leaf mới.
- PRD map: harness `spec-prd-lite.md` · fields `successMetrics`, `nonGoals` (tùy chọn khi có thông tin).

## Output (Kết quả mong đợi)
- File `*.bundle.yaml` chứa thông tin chức năng tại thư mục `surfaces/<surface>/CMP-*/<numeric-path>/`. (Tuân thủ cấu trúc [feature.bundle.yaml](../../../templates/shared/feature.bundle.yaml).)
- Thư mục được tự động sinh dựa trên số của Draft ID.
- Quá trình chạy tool `flowgrid split` sẽ sinh ra các file trung gian trong `ir/` và `flowgrid render` sinh ra `ir/generated/spec.md`.

## Description / Ý nghĩa
- Chuyên dùng để khởi tạo hoặc viết đặc tả chi tiết cho một chức năng/màn hình cụ thể (Function Detail).
- Brainstorm 2 mặt dữ liệu cốt lõi: 
  - **Business:** Khối `userStories` chuyên sâu (Primary Story, `screenAccess` hỗ trợ 3 loại: `directRoute` cho URL trực tiếp, `sidebarMenu` cho menu trái đa cấp + text label, `contextualAction` cho nút bấm kích hoạt từ màn hình A, Screen Handoff từ màn nào sang màn nào, 5 kịch bản chi tiết: Tải dữ liệu, Nhập liệu/Validate, Nộp thành công, Ngoại lệ/Lỗi, Tác vụ ngầm, và Acceptance Criteria).
  - **Kỹ thuật:** Phân định rõ ràng trên từng element giữa `meaning` (**Ý nghĩa nghiệp vụ**) và `purpose` (**Mục đích thao tác**).
- Mọi rule validation bắt buộc đi kèm trường `messages` tiếng Việt cụ thể.
- Mọi hành động tương tác (Actions) phải định nghĩa rõ: `validateFormBeforeSubmit`, `feedback` (loadingText, disableWhileSubmitting), `apiRefs`, `onSuccess` (toast, navigation handoff, backgroundTrigger), `onSpecificError` (map lỗi 422, 409 conflict, 403), `onCommonError`.
- **Tuyệt đối không** sinh nội dung ra file `.md` bằng tay, mà phải luôn ghi vào YAML và để engine `flowgrid split` lo việc chuyển đổi sang `ir/spec.yaml` và `ir/generated/spec.md`.

## Data model (Phase 0 → leaf)

- **Phase 0:** ERD tổng = `/db-erd` → `<LCA>/common/db-erd.md` — **không** thay bằng `entities: []` trên bundle. Workflow: [architecture-data.md](../../workflows/architecture-data.md).
- **Trên bundle:** `spec.entities` / `spec.relationships` (subset ER) + `design.sections[].items[].db` (`schema`, `field`, `enumMapping`) + list `columns[].key` ↔ DB hoặc `#derived-data`. Chi tiết: [bundle-authoring.md § Data model](../../../templates/shared/bundle-authoring.md#data-model--phase-0-erd-vs-screen-detail).
- Sau `split`: entity + `db` → `ir/design.yaml` (BA `ir/generated/spec.md` không render cột DB).

## Các Skill liên quan
- **Trước đó:** `/db-erd` (khi entity/bảng mới) · `/module` · `/user-flow`.
- **Sau đó:**
  - Kéo theo `/testcase` để đội test chuẩn bị kịch bản E2E.
  - Sẽ bị review và xác nhận lại bởi `/grill-bqa` (về Business), `/grill-dev` (về Gen Code), `/grill-docs` (Xung đột).
  - Update sau này sẽ dùng `/update-spec`.

## Chú ý quan trọng
- **Luật AskQuestion Tech Debt:** Nếu gặp thông tin phân vân, phải hiển thị Form hỏi người dùng (phải bao gồm tuỳ chọn `"Log as Tech Debt"`). Nếu người dùng chọn ghi nợ, phải đẩy thông tin vào file `qa/<SHORT>_NNNN.yaml` thay vì cố tình tự suy diễn (Hallucinate).
- Không được đưa cấu hình CSS cụ thể (màu sắc, border, padding) vào spec trừ khi là case cực kỳ đặc biệt.
- Yêu cầu dùng ngoặc kép hoặc block YAML (`|`) cho tất cả các chuỗi chứa dấu hai chấm `:` hoặc ngoặc vuông `[]`.
- Việc tìm kiếm và sử dụng template có sẵn (Common Pattern như Delete Flow, CRUD) là điều bắt buộc.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Có requirement mới, hoặc refine spec đã có.

```text
/spec

Surface: {admin-web}
Module: {CMP-…}
Function slug: {hotel-list}
Requirement: {mô tả ngắn: list + search + pagination + row actions}

Tham chiếu:
- Common UI: --id {UI-CMN-*} (surfaces/common/code/…)
- 1 slug = 1 function; không gộp create/update vào cùng folder

Scope IN: `base-docs` + `base-tests`, harness notes
Scope OUT: pages/, components/, mocks/, E2E, unit

Làm:
1. Nếu ir/design.yaml đã có → verify gap (layout, actions, validation)
2. Nếu mới → draft bundle dưới …/CMP-*/<NN…>/
3. Testcase round 1 khớp acceptance
4. pnpm flowgrid:render && pnpm flowgrid:publish
5. Câu treo → qa/<SHORT>_… (không openQuestions trên YAML)

Handoff: gap chưa rõ → /grill-with-docs · UI → /prototype
```

**Variant — tách function slug:**

```text
/spec

Tách slug mới: {hotel-create} từ {hotel-list} trong cùng CMP-*.
Chỉ scope create form + validation + API POST. Link dependency trong notes của list.
```

---
