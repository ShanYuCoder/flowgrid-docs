# Cấu trúc Workspace & Tài nguyên SSOT

Khi chạy lệnh `flowgrid setup [workspace]` và khởi chạy `pnpm docs:dev` (hoặc `flowgrid dev`), FlowGrid sinh ra bộ khung cấu trúc **SSOT (Single Source of Truth)** chuẩn mực.

Giao diện web VitePress sẽ đọc trực tiếp các thư mục và file Markdown này trên máy local để toàn bộ team (BA, Dev, QA, Lead) cùng tra cứu và làm việc trên một nguồn thông tin duy nhất.

---

## Tổng quan cấu trúc thư mục trên Disk

```text
my-workspace/
├── overview/               # Tầm nhìn, mục tiêu sản phẩm và phạm vi phát hành
├── architecture/           # Tài liệu kiến trúc hệ thống chuẩn Arc42 & ERD
├── surfaces/               # Phân vùng bề mặt ứng dụng, màn hình + common & user-flows
│   ├── common/             # [Dynamic] Quy tắc UX, patterns, DTO dùng chung xuyên suốt
│   ├── user-flows/         # [Dynamic] Kịch bản luồng nghiệp vụ liên màn hình & liên surface
│   └── <surface-name>/     # Từng bề mặt nghiệp vụ cụ thể (admin, portal, mobile,...)
├── registries/             # Danh mục Design Tokens, UI Components và Capabilities
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
    > **Phân biệt rạch ròi với `surfaces/user-flows/`:**
    > - **`architecture/03-user-flows/`** là **Luồng nghiệp vụ tổng thể cấp hệ thống (Macro System Flows / System Context)**. Mô tả quy trình vận hành dữ liệu giữa các dịch vụ, các bounded context, hệ thống phụ hoặc đối tác bên thứ ba (ví dụ: chu trình đối soát thanh toán ngân hàng, luồng đồng bộ đơn hàng sang ERP, luồng xử lý async event-driven qua Message Queue). Tập trung vào giao thức kỹ thuật, logic dữ liệu và sự tương tác giữa các hệ thống — **hoàn toàn độc lập và không phụ thuộc vào giao diện hay màn hình người dùng**.
    > - Trong khi đó, **`surfaces/user-flows/`** là **Hành trình thao tác trực tiếp của người dùng (UI User Journeys)**. Gắn liền với các màn hình, tương tác giao diện (click button, submit form, navigation, hiển thị modal/thông báo) xuyên qua các bề mặt ứng dụng (`portal`, `admin`, `mobile`).
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

### 3. `surfaces/` — Phân vùng Bề mặt, Tính năng & Hai Thư mục Dynamic Xuyên suốt
- **Nội dung:** Quản lý toàn bộ cấu trúc giao diện người dùng và nghiệp vụ tương tác, chia thành các bề mặt cụ thể (`admin`, `portal`, `mobile`,...) cùng các module nghiệp vụ (`CMP-*`) và màn hình con (`W-*` leaf).
- **Cơ chế Dynamic đa tầng của `common/` và `user-flows/`:**
  Hai thư mục này **không cố định ở một nơi** mà là các thư mục động (*dynamic*), **xuất hiện linh hoạt ở bất kỳ cấp độ nào** trong cây thư mục (từ ngoài `surfaces/` đi sâu vào từng `surface`, vào `module`, hay đến từng `sub-module / cluster`) — miễn là ở cấp độ đó phát sinh nhu cầu dùng chung hoặc có luồng người dùng liên kết:
  - **`common/` (Tài nguyên dùng chung theo phạm vi):**
    - Xuất hiện ở cấp nào thì phục vụ tái sử dụng cho cấp đó:
      - Tại `surfaces/common/`: Dùng chung cho **toàn bộ hệ thống** (Global patterns, chuẩn form chung, dialog xác nhận dùng chung).
      - Tại `surfaces/<surface>/common/`: Dùng chung trong **nội bộ surface đó** (ví dụ: các pattern riêng của trang `admin`).
      - Tại `<module>/common/`: Dùng chung cho **cụm tính năng / cluster đó** (ví dụ: bộ lọc đặc thù của riêng module Đơn hàng).
    - Lưu trữ UI Patterns, validation rules, DTO và layout dùng chung — triệt tiêu 100% thói quen copy-paste code bừa bãi.
  - **`user-flows/` (Luồng trải nghiệm người dùng theo phạm vi):**
    - Chứa các kịch bản hành trình nghiệp vụ (`FLOW-*.md`) kết nối chuỗi thao tác giữa nhiều màn hình:
      - Tại `surfaces/user-flows/`: Mô tả các **luồng xuyên suốt qua nhiều surfaces** (ví dụ: Khách đặt mua trên `portal` ➔ Quản trị viên nhận thông báo và phê duyệt trên `admin`).
      - Tại `surfaces/<surface>/user-flows/`: Mô tả luồng chạy xuyên suốt **nhiều module trong cùng 1 surface**.
      - Tại `<module>/user-flows/`: Mô tả luồng thao tác nhiều bước **nội bộ trong một module** (ví dụ: luồng tạo đơn hàng 3 bước: Nhập thông tin ➔ Chọn thanh toán ➔ Xác nhận).
    - Giúp BA, Dev và QA luôn nắm bắt được bức tranh tương tác End-to-End tổng thể thay vì chỉ nhìn vào từng màn hình lẻ loi.
- **Người phụ trách chính:** BA, Frontend Dev, Backend Dev, QA.

### 4. `registries/` — Danh mục Linh kiện & Capabilities dùng chung
- **Nội dung:** Chứa các file từ điển JSON (`design.registry.json`, `be-capabilities.registry.json`).
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
