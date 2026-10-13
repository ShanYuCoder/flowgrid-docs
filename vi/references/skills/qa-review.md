# Skill: `/qa-review`

## Tên
`qa-review`

## Cách dùng
- Slash: `/qa-review HOTEL-LIST_0001` — senior append `kind: review` trên **cùng file** QA.
- `needs-change` → `status: open`; middle sửa spec rồi append `answer` hoặc `/qa-resolve`.

## Khác `/qa-resolve`
| | `/qa-resolve` | `/qa-review` |
|--|----------------|--------------|
| Việc | Chốt solution + patch SSOT + append answer | Góp ý / approved / needs-change |
| Patch bundle | Có | Không (handoff `/update-spec` nếu patch sai) |

## Workflow team
[workflows/qa-team.md](../../workflows/qa-team.md)
