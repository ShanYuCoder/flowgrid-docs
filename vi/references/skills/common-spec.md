# Skill: `/common-spec` — DEPRECATED

**Không dùng trên hub mới.** Common không còn `common/yaml`, bundle CMN, hay `ir/design` riêng cho molecule.

| Nhu cầu | Thay thế |
|---------|----------|
| Quy tắc UX/nghiệp vụ Markdown | [`/common`](./common.md) → `common/*.md` |
| Cross-flow | `architecture/03-user-flows/FLOW-*.md` hoặc `surfaces/…/<module>/user-flows/FLOW-*.md` |
| Pattern UI (delete flow, badge, flat design, …) | FE **base** + `flowgrid-ux-common.mdc` khi `/spec` / grill |
| Template / registry / Mo* mới | [Workflow Phase 0 — Setup](../../workflows/phase-0-setup.md#5-huan-luyen-template-tu-golden-sample-build-template-code) → `build-template-code` |

Harness skill giữ stub deprecation để agent không author YAML CMN. CLI `gen-common` chỉ legacy repo.
