# `/api-unit`

**Description:** /unit — backend API unit test generation via BE code repo adapters.

## Overview
Generates backend API unit tests via BE adapters (FastAPI, Laravel, NestJS). Requires a prior `01-backend-spec.yaml`.

## Usage
Run the codegen scripts first to scaffold the tests:
```bash
flowgrid api-unit-gen --adapter=fastapi -- --spec /path/to/01-backend-spec.yaml
```

## Workflow
1. Locates `01-backend-spec.yaml` using `FLOWGRID_DOCS_ROOT` or platform-dna.
2. Generates test skeletons using the adapter.
3. User must review the generated tests to ensure proper coverage and replace mock stubs with project fixtures.
