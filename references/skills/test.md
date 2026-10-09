---
name: test
description: /test — Playwright E2E from ssot-docs plan YAML (FE only).
disable-model-invocation: true
---

# /test

**Owner:** ssot-docs hub (`--type=fe`)

```bash
flowgrid testcase:gen:dry --docs-root=/path/to/docs-hub -- --id TC-…
flowgrid testcase:gen --docs-root=/path/to/docs-hub -- --id TC-…
```

Use `FLOWGRID_DOCS_ROOT` (or `--docs-root`) when the ssot-docs hub is not local.
docs hub, and symbols or call graphs for repo X through the Platform DNA-wired
`codegraph-<repo-key>` server for checkout X. Never use a workspace-parent
graph or ask the member to hand-edit MCP configuration.
## Playwright Visual Regression (VRT) Rules
When generating Playwright E2E code, the Agent MUST enforce the stateless evidence path convention:
1. Do NOT use `toHaveScreenshot` directly.
2. MUST import and use `expectSmartVisualMatch` from `visual-helpers.ts`.
3. MUST pass the exact `surface`, `moduleId`, and `screenId` (e.g. `expectSmartVisualMatch(page, 'admin', 'CMP-ADM-AUTH-01', 'W-ADM-AUTH-01')`) so the helper can mathematically compute the screenshot path as `evidence/surfaces/<surface>/<module-id>/<screen-id>.png`.

### Playwright Configuration Interlock
- **[MANDATORY]** The Agent MUST ensure that the FE project's `playwright.config.ts` includes `snapshotPathTemplate: '{arg}'`. Without this, Playwright will incorrectly nest screenshots inside `<test-name>-snapshots/` folders. (See `harness/tests/templates/playwright.config.example.ts` for reference).

## Accelerators (optional)

```text
if local ArtifactGraph available: recommend/check generation allowlist (this repo)
else: local deterministic search, then run flowgrid testcase:gen directly
```

ArtifactGraph never follows `FLOWGRID_DOCS_ROOT`; plan
YAML and docs evidence flow only through those ssot-docs hub pointers.

Assign one stable `runId` at run start. If ArtifactGraph is missing, complete
the local fallback, count successful file reads and exact raw bytes read into
context, then emit exactly one `flowgrid.missing-optional` JSON event for the
`runId` + `artifactgraph` pair. Deduplicate retries. Validate against
`.cursor/schemas/flowgrid-test/missing-optional-event.schema.json`; report only actual
`fileReads` and `contextBytes`, never estimated token or savings claims.
