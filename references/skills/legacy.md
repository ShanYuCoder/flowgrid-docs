# Kỹ năng: `/legacy`

## Tên
`legacy`

## Cách dùng (Command/Trigger)
- Gọi qua slash command như một **Skill Modifier** (Bộ bổ trợ kỹ năng).
- Phải dùng kết hợp với một skill chuyên môn khác. Ví dụ: `/legacy /spec`, `/legacy /overview`, hoặc `/legacy /user-flow`.

## Input (Dữ liệu đầu vào)
- Dữ liệu đầu vào của base skill (skill đi kèm).
- Mã nguồn và tài liệu của hệ thống cũ, được trỏ từ `legacy-repos.local.json`.

## Output (Kết quả mong đợi)
- Thay đổi hành vi của base skill sang **Chế độ Khảo cổ (Archaeology Mode)**.
- Thay vì sáng tạo logic mới, Agent chỉ trích xuất, ánh xạ và ghi nhận thực tế từ hệ thống cũ.
- Áp dụng metadata cụ thể cho legacy (ví dụ: `specOrigin: legacy`) vào các file thiết kế (bundle YAML).
- Tham chiếu cấu trúc dữ liệu cũ thông qua `legacy.dynamics.yaml` thay vì sử dụng tiêu chuẩn mới.

## Description / Ý nghĩa
- Bản thân `/legacy` không phải là một luồng công việc độc lập. Nó đóng vai trò "công tắc" chuyển bối cảnh (Context Shift) của Agent.
- Khi bật công tắc này, hệ thống FlowGrid hiểu rằng nhiệm vụ hiện tại không phải là xây tính năng mới, mà là "khai quật" và hệ thống hóa lại các tính năng, API, hoặc luồng dữ liệu từ một nền tảng cũ kỹ để chuẩn bị cho quá trình chuyển đổi (migration) hoặc thay thế.
- Giúp bảo vệ tính toàn vẹn của Spec, ngăn chặn Agent "cầm đèn chạy trước ô tô" tự chế logic khi khảo sát hệ thống cũ.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Nguồn sự thật là code/docs legacy, chưa có spec.

**Cách gọi:** modifier **`/legacy`** + skill bộ docs **`/spec`** (hoặc skill khác: `/module`, `/business-process-trace`, …).  
**Prerequisite:** source path do user cung cấp hoặc cấu hình repo đích.

```text
/legacy /spec

Owner surface: {admin-web}
Module: {CMP-…}
Function slug: {hotel-list}
Nguồn legacy: resolve từ platform-repos / legacy-repos — không đoán path ([repo split map](../cli-and-commands.md#repo-split-map)).

Scope:
- Chỉ đọc/phân tích code; KHÔNG sửa production code
- Inventory compact trước; không đọc cả repo
- 1 màn = 1 leaf `CMP-*/<NN…>/` (bundle + ir/ + api/seq)

Output:
- surfaces/<surface>/CMP-*/<NN…>/
- legacy-dynamics/…/_legacy.dynamics.yaml khi cần archaeology
- pnpm flowgrid:render && pnpm flowgrid:publish
- Evidence: inferredFromCode | qa — không bịa business intent

Handoff: gap lớn → /grill-with-docs · refine → /spec · UI → /prototype
```

---
