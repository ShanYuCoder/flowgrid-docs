# Skill: `/test-api`

**API Hook / Partner / Webhook** — tests-docs `genType: api-e2e` + CLI `testcase:gen:api`.

Grill Workflow: [test.md § API Hook](../../workflows/test.md#grill-api-hook) · Artifact Guide: [tests-docs § API Hook](../../artifacts/tests-docs.md#api-hook-tc).

## When to Use

- HTTP integration **without** coupling portal steps into the same TC file (webhooks, partner exports, public APIs).
- HTTP steps inside **long scenario flows (SC)** — dedicated TC file (`api-e2e`) sharing `refs.scenario` with UI TCs (`e2e`).

## Docs Prerequisites

- `01-backend-spec.yaml` already exists — author via `/api-spec`, `/grill-api-spec` ([backend.md](../../workflows/backend.md)).
- `refs.screen`: `API-*` matching leaf contract.

## Authoring (Tests-Docs Hub)

- `schemaVersion: 2`, `genType: api-e2e`, `api` + `apiSteps[]`, `testMatrix`, human-readable `steps[]`.
- Template: `harness/tests/templates/TC.example-api.yaml`.
- Plan grilling: `/grill-testcase` + `cases:gate --strict` (shares rules with UI TCs).

## Playwright Execution (FlowGrid Standard)

```bash
flowgrid testcase:gen:api --testcase cases/.../TC-....yaml
flowgrid testcase:gen:api:dry --id TC-...
```

- Output: `<e2eRoot>/tests/api-e2e/<module>/<id>.api.spec.ts` (Playwright `request`).
- Environment: `FLOWGRID_API_TEST_BASE_URL` or key defined in `api.baseUrlEnv`.
- Post-generation: Adjust authentication/HMAC in spec — secrets stored strictly in CI env.

## Newman (Optional)

- **Does not replace** `TC-*.yaml` SSOT — utilized when partners provide Postman collections or complex HMAC scripts.
- Tag TC: `contract-postman`; run `newman` in separate CI job; retain `api-e2e` TC for gates/traceability.
- Details: [test.md § API Hook](../../workflows/test.md#grill-api-hook).

## Related Skills & Commands

| Task | Skill / Command |
| --- | --- |
| Single Screen UI Plan | `/testcase`, [Single Screen Grilling](../../workflows/test.md#grill-single-screen) |
| Multi-Screen Scenario Flow | `/scenario`, [Scenario Grilling](../../workflows/test.md#grill-scenario-flow) |
| Hub Plan Grilling | `/grill-testcase` |
| Edit Playwright Spec | `/test` (FE repo) — UI lane; API hooks rarely use Page Objects, edit `.api.spec.ts` directly |
