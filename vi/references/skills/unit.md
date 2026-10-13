# Lệnh: `api:gen` & Kỹ năng `/unit`

## Tên
`api:gen`, `api:unit-gen` (Script) và `/unit`, `/grill-unit` (Skills).

## Cách dùng (Command/Trigger)
- Lệnh chạy CLI:
  ```bash
  pnpm api:gen --spec <path_to_01_backend_spec>
  pnpm api:unit-gen --spec <path_to_01_backend_spec> --force
  ```
- Gọi qua slash command: `/unit` và `/grill-unit`.

## Input (Dữ liệu đầu vào)
- Đọc đặc tả `01-backend-spec.yaml` hoặc `02-openapi.yaml`.
- Đọc các tag `#needs-unit-test:*` hoặc `#gen:test-module`.

## Output (Kết quả mong đợi)
- **`api:gen`**: Sinh ra bộ khung Code Backend (Modules, Prisma, Manifests) và các cấu trúc hàm.
- **`api:unit-gen`**: Sinh ra các file Unit Test rỗng hoặc được làm giàu (`*BehaviorTest.php`) dựa trên cấu trúc API.
- **`/unit`**: Lập trình viên AI vào viết logic bên trong file Unit Test để đảm bảo chạy Pass (Green).
- **`/grill-unit`**: Kiểm toán độ phủ (Coverage) và quét các Request IDs xem code có bị thiếu test case nào so với Spec không. 

## Description / Ý nghĩa
- Nằm ở **Phase 2c (API - Unit Lane)**.
- Backend có một luồng Unit Test riêng biệt, chạy độc lập với E2E Playwright. 
- `/grill-unit` sẽ không vòng lặp (loop) liên tục ép coverage 100%, mà chỉ quét và chỉ ra "Khoảng trống" (Gap) để dev quyết định viết thêm test hay chốt sổ.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

```text
/unit

Function slug: {hotel-list}
Focus: {list composable load + empty state} (1 behavior / session)

Scope: tests/unit/ — logic only, không browser
Good targets: validations/, service parser, composable state, store actions, pure helpers

Rules:
- Test public interface; mock $apiFetch tại service boundary
- Vertical slice: 1 behavior → 1 test → green → tiếp
- Không mock call-count nội bộ

Verify: pnpm test:unit {scoped-path} — báo exit code

Handoff: /grill-unit
```

### Mẫu `/grill-unit`

```text
/grill-unit

Function slug: {hotel-list}

Sau /unit, kiểm tra:
- [ ] Behaviors quan trọng qua public interface
- [ ] Boundary mock đúng; không skip/ignore giả
- [ ] Gap đặt tên file/branch nếu team target 100%
- [ ] Không Playwright ở đây

Không thay /unit
```

---
