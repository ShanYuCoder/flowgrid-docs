# Skill: `/openapi`

## Name
`openapi`

## Usage (Command/Trigger)
- CLI command: `flowgrid openapi_gen --spec <path-to-01>`
- Slash command: `/openapi <page-id/slug>`

## Input
- Backend contract: `01-backend-spec.yaml`.

## Output
- OpenAPI specification: `02-openapi.yaml` and mock bundle: `03-mock.yaml`.

## Description
- Compiles human-authored backend contract YAML specifications into OpenAPI 3.0 / 3.1 compliant YAML files.
- Generates mock response files for frontend prototype isolation.

---

## Example Prompt

```text
/openapi surfaces/admin/CMP-ADM-ORD/01/01/api/01/01-backend-spec.yaml
```
