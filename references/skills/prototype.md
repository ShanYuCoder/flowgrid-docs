# Lệnh: `portal:gen` & Kỹ năng `/prototype`

## Tên
`portal:gen` (Script) và `/prototype`, `/grill-prototype` (Skills).

## Cách dùng (Command/Trigger)
- Lệnh chạy CLI:
  ```bash
  pnpm portal:gen
  pnpm portal:unit-gen
  ```
- Gọi qua slash command: `/prototype` và `/grill-prototype`.

## Input (Dữ liệu đầu vào)
- Đọc đặc tả giao diện (`ir/design.yaml`) sau khi `flowgrid split` thành công.
- Các thẻ tags `#needs-component:*`, `#custom-slot:*`.

## Output (Kết quả mong đợi)
- **`portal:gen`**: Sinh ra (Scaffold) các giao diện Vue/React dạng thô (Cells/Pages) chứa sẵn `data-testid` và gắn tag `#needs-component` nếu thiếu các thành phần UI nhỏ (Molecules/Organisms).
- **`/prototype`**: Lập trình viên AI hoặc người dùng sẽ nhảy vào viết code chi tiết cho các thành phần UI bị thiếu (Molecules/DataCells). Quá trình này dùng API Mock giả lập hoàn toàn.
- **`/grill-prototype`**: Soi lỗi lại xem bản code Prototype có khớp với Design Spec gốc không, giao diện có bị sai lệch không.

## Description / Ý nghĩa
- Nằm ở **Phase 2a (Scaffold)**.
- Thay vì bắt AI phải tự viết toàn bộ trang web từ con số 0 dẫn đến rác code, FlowGrid ép buộc dùng `portal:gen` để đẻ ra cấu trúc chuẩn trước. AI (`/prototype`) chỉ đóng vai trò "thợ xây" điền vào các chỗ trống (những Component chưa tồn tại trong Design System).
- Ở phase này, UI chạy độc lập hoàn toàn, không cần gọi Backend thật.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Spec đã approve (qua grill nếu phức tạp).

```text
/prototype

Function slug: {hotel-list}
Spec: prefer `--id {W-*}`

Order:
1. Read spec tags — `#needs-component` inventory (Mo* names from grill)
2. Implement missing Mo* molecules in /prototype (gen does not emit stubs)
3. Registry promote reusable Mo* — `registries/design.registry.json` on FE base ([custom-base](../../workflows/custom-base.md)); hub `common/` is Markdown only (`patterns/`, `processes/`).
4. pnpm portal:gen --id {W-*} --force
5. HANDOFF *Prototype next* = remaining slots only; wire-only / manual-composable

Scope IN: components (Mo* only if tagged), wire generated pages, mocks boundary, testId
Scope OUT: hand-write models/service/composable/page if gen already emitted them
```

**Variant — chỉ một màn:**

```text
/prototype

Function slug: {hotel-create}
Chỉ form create + validation inline alert. Không làm list trong session này.
```

---
