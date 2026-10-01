# Skill: `/common-spec` — DEPRECATED

**Không dùng trên hub mới.** Common không còn `common/yaml`, bundle CMN, hay `ir/design` riêng cho molecule.

| Nhu cầu | Thay thế |
|---------|----------|
| Quy tắc UX/nghiệp vụ Markdown | [`/common`](./common.md) → `common/patterns/` |
| Cross-flow | `common/user-flows/FLOW-*.md` |
| Pattern UI (delete flow, badge, flat design, …) | FE **base** + `flowgrid-ux-common.mdc` khi `/spec` / grill |
| Template / registry / Mo* mới | [Workflow custom-base](../../workflows/custom-base.md) → `build-template-code` |

Harness skill giữ stub deprecation để agent không author YAML CMN. CLI `gen-common` chỉ legacy repo.
