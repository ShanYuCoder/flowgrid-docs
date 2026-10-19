# Cấu trúc Workspace & Tài nguyên SSOT

Khi chạy lệnh `flowgrid setup [workspace]` và khởi chạy `pnpm docs:dev` (hoặc `flowgrid dev`), FlowGrid sinh ra bộ khung cấu trúc **SSOT (Single Source of Truth)** chuẩn mực.

Giao diện web VitePress sẽ đọc trực tiếp các thư mục và file Markdown này trên máy local để toàn bộ team (BA, Dev, QA, Lead) cùng tra cứu và làm việc trên một nguồn thông tin duy nhất.

---

## Tổng quan cấu trúc thư mục trên Disk

```text
my-workspace/
├── overview/               # Tầm nhìn, mục tiêu sản phẩm và phạm vi phát hành
├── architecture/           # Tài liệu kiến trúc hệ thống chuẩn Arc42 & ERD
├── surfaces/               # Phân vùng bề mặt ứng dụng, màn hình & common
│   ├── common/             # UI Patterns, model-data, rules dùng chung hệ thống (1 cấp phẳng .md)
│   └── <surface-name>/     # Từng bề mặt nghiệp vụ cụ thể (admin, portal, mobile,...)
│       ├── common/         # (Tùy chọn) Dùng chung trong surface (tự động ẩn nếu rỗng)
│       └── <module-name>/  # Module nghiệp vụ (CMP-*)
│           ├── common/     # (Tùy chọn, tự động ẩn nếu rỗng)
│           ├── user-flows/ # Các User Flows có Step 1 bắt đầu tại module này (tự động ẩn nếu rỗng)
│           └── <feature>/  # Màn hình/tính năng (phẳng 1 cấp, chứa bundle.yaml & spec.md)
├── .flowgrid/registries/   # Danh mục Design Tokens, UI Components và Capabilities trong Workspace SSOT
├── qa/                     # Hòm thư giải quyết thắc mắc nghiệp vụ giữa các thành viên
├── source-code/            # Mã nguồn chính đang hoạt động & phát triển (Submodules)
└── source-legacy/          # Mã nguồn cũ phục vụ khảo cổ (STRICTLY READ-ONLY)
```

---

## Ý nghĩa từng thư mục hiển thị trên Docs Web

### 1. `overview/` — Tầm nhìn & Phạm vi sản phẩm
- **Nội dung:** Chứa file `overview/index.md` định nghĩa tổng quan về sản phẩm.
- **Vai trò:**
  - Định nghĩa mục tiêu kinh doanh, bài toán sản phẩm cần giải quyết.
  - Phân loại các nhóm người dùng (*Actors & Personas*).
  - Ranh giới phạm vi tính năng theo từng mốc phát hành (Release Scope / Milestones).
- **Người phụ trách chính:** Product Owner (PO), Business Analyst (BA), Project Manager.

### 2. `architecture/` — Kiến trúc hệ thống (Chuẩn Arc42)
- **Nội dung:** Khung tài liệu kiến trúc kỹ thuật tiêu chuẩn quốc tế Arc42 gồm trọn vẹn **12 phân hệ chuyên sâu** cùng mô hình dữ liệu lõi:
  - **`01-introduction/` (Giới thiệu, Mục tiêu & Hotspots):** Tổng quan bối cảnh hệ thống, mục tiêu kinh doanh cốt lõi, phạm vi kỹ thuật và phân tích các vùng rủi ro cao (*Technical Hotspots* / điểm nghẽn chịu tải, các module nghiệp vụ phức tạp nhất).
  - **`02-constraints/` (Ràng buộc kiến trúc):** Các ràng buộc kỹ thuật bất biến: công nghệ bắt buộc, giới hạn phần cứng, hạ tầng mạng, ngân sách, quy chuẩn tuân thủ pháp lý (GDPR, ISO, PCI-DSS) và tiêu chuẩn văn hóa tổ chức.
  - **`03-user-flows/` (Bối cảnh hệ thống & Luồng nghiệp vụ vĩ mô):**
    > **Phân biệt rạch ròi với `surfaces/<surface>/<module>/user-flows/`:**
    > - **`architecture/03-user-flows/`** là **Luồng nghiệp vụ tổng thể cấp hệ thống (Macro System Flows / System Context)**. Mô tả quy trình vận hành dữ liệu giữa các dịch vụ, các bounded context, hệ thống phụ hoặc đối tác bên thứ ba (ví dụ: chu trình đối soát thanh toán ngân hàng, luồng đồng bộ đơn hàng sang ERP, luồng xử lý async event-driven qua Message Queue). Tập trung vào giao thức kỹ thuật, logic dữ liệu và sự tương tác giữa các hệ thống — **hoàn toàn độc lập và không phụ thuộc vào giao diện hay màn hình người dùng**.
    > - Trong khi đó, **`surfaces/<surface>/<module>/user-flows/`** là **Hành trình thao tác trực tiếp của người dùng (UI User Journeys)**. Gắn liền với các màn hình, tương tác giao diện (click button, submit form, navigation, hiển thị modal/thông báo) xuyên qua các bề mặt ứng dụng (`portal`, `admin`, `mobile`).
  - **`04-solution-strategy/` (Chiến lược giải pháp):** Các quyết định chiến lược định hình cấu trúc toàn hệ thống: lựa chọn mô hình kiến trúc (Clean Architecture, DDD, Event-Driven, Microservices vs Monolith), chiến lược phân vùng dữ liệu (SQL vs NoSQL), chiến lược cache đa tầng và sơ đồ luồng dữ liệu (*Data Flow Mermaid*).
  - **`05-building-blocks/` (Khối cấu trúc tĩnh / Building Block View):** Phân rã cấu trúc tĩnh của hệ thống theo cấp độ (C4 Model Containers & Components): danh sách các service, module, thư viện nội bộ, trách nhiệm của từng khối và quan hệ phụ thuộc tĩnh giữa chúng.
  - **`06-runtime/` (Khung cảnh thời gian thực / Runtime View):** Mô tả hành vi động và tương tác runtime giữa các khối kiến trúc trong các kịch bản quan trọng: sơ đồ tuần tự (*Sequence Diagram*), luồng khởi động hệ thống, cơ chế đồng bộ/bất đồng bộ, xử lý tranh chấp dữ liệu khi concurrency cao.
  - **`07-deployment/` (Kiến trúc triển khai / Deployment View):** Mô tả hạ tầng máy chủ vật lý/ảo hóa, các môi trường (Dev, Staging, Production), cấu hình container (Docker, Kubernetes), mạng (VPC, Load Balancer, CDN, API Gateway) và quy trình tự động hóa CI/CD.
  - **`08-cross-cutting/` (Các quy chuẩn xuyên suốt / Cross-Cutting Concepts):** Bộ tài liệu quy chuẩn kỹ thuật áp dụng thống nhất cho toàn bộ hệ thống:
    - `security.md`: Cơ chế xác thực (Authentication), phân quyền (RBAC/ABAC), mã hóa dữ liệu (at-rest & in-transit), phòng chống tấn công OWASP.
    - `integration.md`: Quy tắc gọi API nội bộ và tích hợp bên thứ ba (REST, gRPC, Webhook, Retry, Circuit Breaker).
    - `observability.md`: Tiêu chuẩn ghi log tập trung, theo dõi số liệu (Metrics) và truy vết phân tán (Tracing OpenTelemetry).
    - `conventions.md`: Coding convention, quy tắc đặt tên, cấu trúc commit Git và quy trình Review/PR.
    - `configuration.md`: Cơ chế quản lý biến môi trường, bảo mật secrets (Vault, Secrets Manager) và dynamic configuration.
  - **`09-decisions/` (Sổ quyết định kiến trúc — ADR):** Lưu trữ các bản ghi quyết định kiến trúc (*Architecture Decision Records* — `ADR-{NNN}-{slug}.md`). Ghi nhận lại bối cảnh, các phương án cân nhắc, lý do đưa ra quyết định kỹ thuật và hệ quả của nó — giúp toàn team hiểu rõ "vì sao hệ thống lại làm như vậy".
  - **`10-quality/` (Mục tiêu chất lượng):** Yêu cầu phi chức năng (Non-Functional Requirements - NFR) được lượng hóa cụ thể: thời gian phản hồi (p95, p99 latency), thông lượng chịu tải (Throughput/RPS), tính sẵn sàng (Availability 99.99%), khả năng mở rộng (Scalability) và khả năng phục hồi thảm họa (Disaster Recovery RTO/RPO).
  - **`11-risks/` (Rủi ro & Nợ kỹ thuật — Risk Register):** Sổ theo dõi rủi ro kiến trúc (*Risk Register*), các điểm nghẽn tiềm ẩn và danh mục nợ công nghệ (*Technical Debt*) kèm theo phương án dự phòng và lộ trình khắc phục.
  - **`12-glossary/` (Từ điển thuật ngữ):** Chuẩn hóa ngôn ngữ chung (*Ubiquitous Language*): định nghĩa chính xác và thống nhất các thuật ngữ chuyên ngành kỹ thuật và danh từ nghiệp vụ trong dự án, đảm bảo PO, BA, Dev, QA và AI Agent đều hiểu đúng một nghĩa duy nhất, triệt tiêu mọi nhầm lẫn.
  - **`model/` (Mô hình dữ liệu & C4 DSL):**
    - `data-models.md`: Sơ đồ thực thể quan hệ ERD (`erDiagram` Mermaid) định nghĩa toàn bộ bảng, trường dữ liệu, khóa chính/ngoại và quan hệ ràng buộc.
    - `workspace.dsl`: Mô hình cấu trúc kiến trúc hệ thống theo chuẩn C4 Model bằng Structurizr DSL.
- **Vai trò:** Bản đồ kỹ thuật số toàn diện chuẩn quốc tế giúp định hình toàn bộ chuẩn mực kỹ thuật của hệ thống, bảo đảm mọi lập trình viên và Agent AI phát triển mã nguồn đồng nhất, tránh việc mỗi người code một kiểu.
- **Người phụ trách chính:** Solution Architect, Technical Lead.

### 3. `surfaces/` — Phân vùng Bề mặt, Tính năng & Cấu trúc Phẳng
- **Nội dung:** Quản lý toàn bộ cấu trúc giao diện người dùng và nghiệp vụ tương tác, chia thành các bề mặt cụ thể (`admin`, `portal`, `mobile`,...) cùng các module nghiệp vụ (`CMP-*`) và tính năng/màn hình phẳng 1 cấp (`<feature-slug>/`).
- **Cấu trúc `common/` tinh gọn (1 cấp phẳng .md):**
  - Tại `surfaces/common/`: Chứa các quy tắc dùng chung cho **toàn bộ hệ thống** dưới dạng các file `.md` phẳng (không lồng thư mục con `patterns/`, `yaml/`, `code/`, `data-model/`). Bao gồm: UI Patterns, `model-data.md`, `model-derived-data.md`, `api-health.md`, `ui-empty-state.md`.
  - Tại `surfaces/<surface>/common/` hoặc `<module>/common/`: (Tùy chọn) Chứa quy tắc dùng chung cho riêng surface hoặc module đó. **Tự động ẩn khỏi sidebar VitePress nếu thư mục rỗng**.
- **Cấu trúc `user-flows/` và Quy tắc Phân định Sở hữu (Step 1 Ownership):**
  - **Không để `user-flows/` ở cấp root `surfaces/` hay `<surface>/`**:
    - **Luồng toàn hệ thống / Cross-surface**: Được lưu trữ tập trung tại [`architecture/03-user-flows/FLOW-*.md`](../../architecture/03-user-flows/) dưới dạng Technical `sequenceDiagram`.
    - **Luồng người dùng thuộc Module**: Lưu trữ tại `surfaces/<surface>/<module>/user-flows/FLOW-*.md`.
    - **Quy tắc Step 1 Ownership**: Bước đầu tiên (màn hình bắt đầu trigger luồng) thuộc module nào thì toàn bộ file flow và scenario của luồng đó nằm trong thư mục `user-flows/` của module đó.
    - Thư mục `user-flows/` của module sẽ **tự động ẩn khỏi sidebar VitePress nếu rỗng**.
- **Cấu trúc Màn hình trong Module (Phẳng 1 Cấp — 1-Tier Flat):**
  - Tất cả các màn hình/tính năng trong module đều nằm trực tiếp ở tầng 1: `surfaces/<surface>/<module>/<feature-slug>/` (không chia nhỏ 3 cấp số như `01/01/02`).
  - Màn hình phụ/con (Create, Edit, Detail, Drawer) khai báo rõ luồng truy cập trong §1 Overview của spec (VD: "Vào từ màn hình danh sách ➔ Bấm nút [Tạo mới]").
- **Người phụ trách chính:** BA, Frontend Dev, Backend Dev, QA.

### 4. `.flowgrid/registries/` — Danh mục Linh kiện & Capabilities dùng chung (Workspace SSOT)
- **Nội dung:** Chứa các file từ điển JSON (`design.registry.json`, `be-capabilities.registry.json`). Toàn bộ lưu trữ tập trung tại Workspace SSOT, không lưu vào repo code.
- **Vai trò:**
  - Lưu trữ danh sách các linh kiện giao diện sẵn có của dự án (`components/ui`, layout, buttons, table).
  - Lưu trữ danh mục các capability/service backend có thể tái sử dụng.
  - Giúp Agent AI nhận diện được những gì dự án đã có để ưu tiên tái sử dụng, không sinh thừa hoặc cảnh báo sai.

### 5. `qa/` — Hòm thư Thắc mắc & Đóng câu hỏi
- **Nội dung:** Chứa file `qa/index.md` tổng hợp các câu hỏi mở (*Open Questions*).
- **Vai trò:**
  - Nơi QA hoặc Dev ghi nhận các điểm mơ hồ về mặt nghiệp vụ khi đọc spec.
  - BA hoặc PO phản hồi và chốt phương án trực tiếp tại đây với skill `/qa-resolve`.
  - Đảm bảo mọi thắc mắc đều có lời giải đáp và được lưu vết rõ ràng trước khi đóng tính năng.

---

## Hai thư mục Mã nguồn trong Workspace

| Thư mục | Trạng thái | Mục đích & Quy tắc |
| :--- | :--- | :--- |
| **`source-code/`** | **Read / Write** | Chứa các repository mã nguồn chính đang chạy (FE, BE, Microservices). Đây là nơi toàn bộ code mới sinh ra và các thay đổi được commit. |
| **`source-legacy/`** | **Strictly READ-ONLY** | Chứa mã nguồn cũ để phục vụ việc khảo cổ nghiệp vụ trong kịch bản Rebase. **Tuyệt đối cấm sửa đổi hoặc copy code thô** từ thư mục này. |
