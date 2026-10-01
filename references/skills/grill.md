# Skill: `/grill`

## Tên
`grill`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/grill`
- Dùng khi biết có **gap** nhưng chưa rõ skill grill chuyên — router sẽ chuyển **một** lệnh con.

## Input (Dữ liệu đầu vào)
- Mô tả ngắn gap (UI, API contract, TC plan, Playwright, prototype, architecture…).
- Đường dẫn hoặc ID function (`W-*`, `TC-*`, `CMP-*`) nếu có.

## Output (Kết quả mong đợi)
- **Router only** — không patch SSOT tại `/grill`.
- Chỉ định skill grill chuyên + audit CLI kỳ vọng (`audit spec`, `cases:gate`, `audit e2e`, `audit api`, …).

## Description / Ý nghĩa
- Bám [workflows/grill-and-human-review.md](../../workflows/grill-and-human-review.md) và [gates.md](../../workflows/gates.md#close-one-function).
- **Không** thay `/grill-bqa` + `/grill-dev` cho design; **không** dùng `/grill-docs` cho lần grill đầu (chỉ reconcile BQA↔Dev).

| Gap | Route |
| --- | --- |
| Acceptance, copy, UX | `/grill-bqa` |
| `bundle.gen`, `#gen:*`, `01` actions | `/grill-dev` |
| BQA ↔ Dev mâu thuẫn | `/grill-docs` |
| `01-backend-spec.yaml` | `/grill-api-spec` |
| BE code vs `01` | `/audit-api` |
| Mock / testIds / prototype | `/grill-prototype` |
| Plan `TC-*.yaml` (tests hub) | `/grill-testcase` |
| Playwright ↔ TC ↔ PO | `/grill-test` |
| Post-wire e2e + fe-be + scenario | `/grill-wire` |
| Unit FE/BE | `/grill-unit`, `/grill-api-unit` |
| Architecture boundary | `/architecture-grill` |
| Shared rules (`common/patterns`) | `/common` |

Tech debt: `qa/*.yaml` + `/qa-resolve` — team: `/qa-review` · [qa-team.md](../../workflows/qa-team.md).

## Các Skill liên quan
- Harness SSOT: `harness/docs/skills/grill/SKILL.md`

---

## Example prompt (mẫu gọi)

```text
/grill

Surface: {admin-web} · Function: {W-*} · Gap: {mô tả ngắn — thiếu AC / lệch API / TC không khớp spec}
```
