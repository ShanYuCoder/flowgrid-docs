# Skill: `/grill-testcase`

## Name
`grill-testcase`

## Usage (Command/Trigger)
- Call via slash command: `/grill-testcase <TC-ID>`
- Executed on the tests-docs hub prior to E2E codegen.

## Input
- `cases/**/TC-*.yaml` plan file.
- Owning specification bundle: `*.bundle.yaml`.

## Output
- Validated test plan passing `flowgrid cases:gate --strict`.
- Identification of missing facets, untraced steps, or invalid selector references.

## Description
- Rigorously validates test case plans against business acceptance criteria and UI designs.
- Audits facet coverage: ensures boundary testing, authorization checks, and error responses are present.
- If specification gaps are discovered, outputs prompts for `/update-spec` rather than fabricating test steps.

## Related Skills
- **Preceding:** `/testcase`.
- **Subsequent:** `flowgrid testcase:gen` → `/test`.

---

## Example Prompt

```text
/grill-testcase TC-ADM-ORD-01

Verify testcase plan coverage, facet completeness, and traceability against W-ADM-ORD-01 bundle.
```
