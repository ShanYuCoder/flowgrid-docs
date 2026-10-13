# Skill: `/common-spec` — DEPRECATED

**Do not use on modern hubs.** Common elements no longer use `common/yaml`, CMN bundles, or separate molecule `ir/design` files.

| Requirement | Modern Replacement |
|-------------|--------------------|
| Markdown UX / Domain Rules | [`/common`](./common.md) → `<LCA>/common/patterns/` |
| Cross-Screen Flows | `common/user-flows/FLOW-*.md` |
| UI Patterns (delete flow, badges, flat design) | FE **base** repository + `flowgrid-ux-common.mdc` during `/spec` / grilling |
| New Templates / Registries / Reusable Components | [Phase 0 Setup Workflow](../../workflows/phase-0-setup.md#5-template-training-from-golden-sample-build-template-code) → `build-template-code` |

The harness skill maintains a deprecation stub preventing AI agents from authoring CMN YAML files. The CLI `gen-common` command exists only for legacy repositories.

