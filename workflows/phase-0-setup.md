# Phase 0 — Setup & Khởi tạo dự án

Tài liệu này hướng dẫn bước khởi tạo đầu tiên (Phase 0) với lệnh `flowgrid setup` và phân bổ luồng làm việc theo **3 ngữ cảnh thực tế của dự án**:
1. **Greenfield:** Làm sản phẩm mới hoàn toàn.
2. **Maintain:** Tiếp tục phát triển và bảo trì codebase hiện có.
3. **Rebase / Modernization:** Đập đi làm lại từ hệ thống legacy cũ.

---

## Sơ đồ điều hướng Phase 0

```mermaid
flowchart TD
  START(["Bắt đầu: flowgrid setup [workspace]"]) --> CHOICE{"Ngữ cảnh dự án?"}

  %% Nhánh 1: Greenfield
  CHOICE -->|1. Greenfield<br/>(Làm mới tinh)| GF_DOCS["Phát triển overview, architecture<br/>Liệt kê surfaces"]
  GF_DOCS --> GF_REPO["Tạo các repo code mới<br/>vào source-code/"]
  GF_REPO --> GF_INIT["Chạy /init<br/>(Lập bản đồ repo & surfaces)"]
  GF_INIT --> NEXT_PHASE

  %% Nhánh 2: Maintain
  CHOICE -->|2. Maintain<br/>(Phát triển dự án cũ)| MT_REPO["Đưa repo code hiện tại<br/>vào source-code/"]
  MT_REPO --> MT_INIT["Chạy /init<br/>(Quét & nhận diện cấu hình)"]
  MT_INIT --> MT_NEXT["Sang Phase Design:<br/>Dùng kèm /trace khảo cổ chi tiết"]
  MT_NEXT --> NEXT_PHASE

  %% Nhánh 3: Rebase
  CHOICE -->|3. Rebase<br/>(Đập đi làm lại)| RB_LEGACY["Đưa code cũ vào source-legacy/<br/>(STRICTLY READ-ONLY)"]
  RB_LEGACY --> RB_EXTRACT["Chạy /extract-legacy<br/>(Bóc tách modules & surfaces cũ)"]
  RB_EXTRACT --> RB_NEW["Khởi tạo repo code mới<br/>đưa vào source-code/"]
  RB_NEW --> RB_INIT["Chạy /init<br/>(Cấu hình dự án mới)"]
  RB_INIT --> RB_NEXT["Sang Phase Design:<br/>Dùng kèm /legacy trích xuất tính năng"]
  RB_NEXT --> NEXT_PHASE

  NEXT_PHASE(["Chuyển sang chu kỳ tính năng:<br/>Design ➔ Codegen ➔ Test ➔ Wire"])
```

---

## Chi tiết từng kịch bản

### 1. Kịch bản Greenfield (Dự án mới hoàn toàn)

Áp dụng khi bắt đầu một sản phẩm mới từ con số 0.

- **Bước 1: Khởi tạo khung workspace**
  ```bash
  flowgrid setup my-project
  ```
  CLI tự động sinh khung cấu trúc SSOT chuẩn (`architecture/`, `overview/`, `surfaces/`, `registries/`, `source-code/`, `source-legacy/`).
- **Bước 2: Xây dựng tài liệu định hướng cấp cao**
  - Viết tài liệu tại `overview/index.md` (Tầm nhìn, Persona, Mục tiêu phát hành).
  - Khai báo kiến trúc tại `architecture/` (Arc42, Ràng buộc kỹ thuật, ERD cơ sở dữ liệu).
  - Định nghĩa danh mục bề mặt ứng dụng tại `surfaces/` (Liệt kê các surfaces: Web Admin, Mobile App, Portal,...).
- **Bước 3: Khởi tạo repo mã nguồn**
  - Tạo hoặc clone các repository mã nguồn mới vào thư mục `source-code/` (khuyến nghị dưới dạng Git Submodule).
- **Bước 4: Nhận diện cấu hình**
  - Mở Agent AI và chạy skill **`/init`** để quét workspace, tạo file cấu hình liên kết `platform-repos.local.json` và map toàn bộ surfaces.
- **Tiếp theo:** Thành viên chuyển sang tham khảo các phase tiếp theo trong workflow: [Design](./design.md) ➔ [Backend](./backend.md) ➔ [Test](./test.md) ➔ [Wire](./wire.md).

---

### 2. Kịch bản Maintain (Bảo trì & Phát triển tiếp dự án cũ)

Áp dụng khi đưa một hệ thống đang chạy vào quy chuẩn FlowGrid để tiếp tục mở rộng tính năng mới hoặc nâng cấp mà không viết lại từ đầu.

- **Bước 1: Khởi tạo khung workspace**
  ```bash
  flowgrid setup my-project
  ```
- **Bước 2: Tích hợp mã nguồn hiện có**
  - Clone hoặc đưa toàn bộ repository mã nguồn hiện tại vào thư mục `source-code/`.
- **Bước 3: Cấu hình và nhận diện**
  - Chạy skill **`/init`** trên Agent AI để quét codebase, nhận diện công nghệ, tự động lập repo maps và phân bổ surfaces theo cấu trúc thực tế của code.
- **Bước 4: Sang phase Design & Khảo cổ**
  - Khi bắt tay vào làm tính năng mới hoặc sửa đổi tính năng cũ trong phase [Design](./design.md), **bắt buộc sử dụng kèm skill `/trace`**:
    - Agent sẽ quét trực tiếp mã nguồn trong `source-code/` để đối chiếu logic, trích xuất ngược Data Model, API contract và luồng nghiệp vụ hiện hữu sang file spec chuẩn.
    - Giúp viết spec chuẩn xác mà không sợ làm đứt gãy các logic ngầm của hệ thống cũ.

---

### 3. Kịch bản Rebase / Modernization (Đập đi làm lại từ hệ thống cũ)

Áp dụng khi nâng cấp toàn diện (ví dụ chuyển từ Monolith cũ sang Microservices, hoặc từ PHP/WebForms sang Nuxt/Next/NestJS), giữ nguyên nghiệp vụ nhưng đổi mới công nghệ.

- **Bước 1: Khởi tạo khung workspace**
  ```bash
  flowgrid setup my-project
  ```
- **Bước 2: Cách ly mã nguồn legacy**
  - Đưa toàn bộ repository code cũ vào thư mục `source-legacy/`.
  - **Quy tắc bất biến:** `source-legacy/` là **STRICTLY READ-ONLY**. Tuyệt đối không sửa đổi và không copy-paste code thô từ thư mục này sang code mới.
- **Bước 3: Khảo cổ tổng quan với `/extract-legacy`**
  - Mở Agent AI và chạy skill **`/extract-legacy`**:
    - Agent quét sâu cấu trúc code cũ để bóc tách sơ đồ module, danh sách màn hình, danh mục API và các rule dùng chung (`CMN-*`).
    - Kết xuất danh mục chức năng vào `surfaces/` và `architecture/`.
- **Bước 4: Khởi tạo codebase mới**
  - Tạo repository cho hệ thống công nghệ mới và đặt vào `source-code/`.
  - Chạy skill **`/init`** để kết nối hệ thống mới với tài liệu SSOT vừa bóc tách.
- **Bước 5: Sang phase Design & Phục hồi tính năng**
  - Khi bắt đầu làm từng màn hình/tính năng ở phase [Design](./design.md), **sử dụng kèm skill `/legacy`**:
    - Agent đọc mã nguồn cũ tương ứng từ `source-legacy/`, trích xuất 100% logic nghiệp vụ lõi, DTO, validation rule và trạng thái giao diện vào bản spec mới.
    - Đảm bảo hệ thống mới kế thừa trọn vẹn nghiệp vụ cũ mà mã nguồn sạch 100%, không bị vướng rác kỹ thuật.

---

## Xem tài liệu SSOT trực tiếp trên Local (`pnpm docs:dev`)

Đến đây, quá trình cài đặt và thiết lập Phase 0 đã hoàn tất! Bạn có thể khởi chạy server tài liệu để xem giao diện web trực quan của toàn bộ hệ thống SSOT:

```bash
pnpm docs:dev
# hoặc: flowgrid dev
```

Lệnh này khởi chạy VitePress dev server tại `http://localhost:5173` giúp bạn và toàn bộ team:
- Đọc chi tiết các tài liệu kiến trúc Arc42, cấu trúc surfaces, data model, ERD và API contract dưới dạng web động.
- Tự động cập nhật tức thì (Hot Reload) mỗi khi Agent AI hoặc team chỉnh sửa các file Markdown/YAML trên disk.
- Là nơi đối chiếu trực quan duy nhất giữa BA, Dev và QA trong suốt vòng đời dự án.
