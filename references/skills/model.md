# Skill: `/model`

## Tên
`model`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/model <function-slug hoặc --id W-*|API-*>`
- **Sau** `/prototype` (hoặc khi spec đã rõ contract), **trước** `/wire` / parser unit.

## Input (Dữ liệu đầu vào)
- `ir/design.yaml` / API spec liên quan slug.
- Portal workspace: chỉ tầng `models/`.

## Output (Kết quả mong đợi)
- Zod schema + `z.infer` types; key khớp spec/API/BE.
- Không `$apiFetch`; không sửa service/composable/page/test trong session này.

## Description / Ý nghĩa
- Implementation lane — chỉ contract types ở `models/{entity}/`.
- Validation UI thuộc `validations/` (session khác nếu cần).

---

## Example prompt (mẫu gọi)

**Khi nào:** Cần Zod/types trước wire hoặc unit parser.

```text
/model

Function slug: {hotel-list}
Spec: prefer `--id {W-*|API-*}`

Scope: CHỈ models/{entity}/
- Zod API contract + z.infer types
- Key khớp spec/API/BE; validation UI để validations/
- Không $apiFetch; không sửa service/composable/page/test

Done: schema compile, types export, không import ngược tầng trên

Handoff: /wire hoặc /unit (parser) sau khi có API thật
```

