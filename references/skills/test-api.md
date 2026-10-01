# Skill: `/test-api`

**API hook / partner / webhook** — tests-docs `genType: api-e2e` + CLI `testcase:gen:api`.

Workflow grill: [test.md § API hook](../../workflows/test.md#grill-api-hook) · artifact: [tests-docs § API hook](../../artifacts/tests-docs.md#api-hook-tc).

## Khi dùng

- HTTP integration **không** gộp bước portal trong cùng file TC (webhook, partner export, public API).
- Bước HTTP trong **SC flow dài** — file TC riêng (`api-e2e`) cùng `refs.scenario` với TC UI (`e2e`).

## Điều kiện docs

- `01-backend-spec.yaml` đã có — `/api-spec`, `/grill-api-spec` ([backend.md](../../workflows/backend.md)).
- `refs.screen`: `API-*` khớp contract leaf.

## Author (tests-docs)

- `schemaVersion: 2`, `genType: api-e2e`, `api` + `apiSteps[]`, `testMatrix`, `steps[]` (human).
- Mẫu: `harness/tests/templates/TC.example-api.yaml`.
- Grill plan: `/grill-testcase` + `cases:gate --strict` (cùng rule UI TC).

## Playwright (chuẩn FlowGrid)

```bash
flowgrid testcase:gen:api --testcase cases/.../TC-....yaml
flowgrid testcase:gen:api:dry --id TC-...
```

- Output: `<e2eRoot>/tests/api-e2e/<module>/<id>.api.spec.ts` (Playwright `request`).
- Env: `FLOWGRID_API_TEST_BASE_URL` hoặc tên trong `api.baseUrlEnv`.
- Sau gen: chỉnh auth/HMAC trong spec — secret chỉ trên CI.

## Newman (tùy chọn)

- **Không** thay `TC-*.yaml` SSOT — dùng khi đối tác bàn giao collection hoặc script phức tạp.
- Tag TC: `contract-postman`; chạy `newman` job CI riêng; vẫn giữ `api-e2e` TC cho gate/trace.
- Chi tiết: [test.md#grill-api-hook](../../workflows/test.md#grill-api-hook).

## Liên quan

| Việc | Skill / lệnh |
| --- | --- |
| Plan UI một màn | `/testcase`, [grill màn](../../workflows/test.md#grill-single-screen) |
| Flow dài | `/scenario`, [grill SC](../../workflows/test.md#grill-scenario-flow) |
| Grill plan hub | `/grill-testcase` |
| Sửa spec Playwright | `/test` (FE repo) — UI lane; API hook thường ít PO, sửa trực tiếp `.api.spec.ts` |
