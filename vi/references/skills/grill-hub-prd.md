# `/grill-hub-prd`

**Description:** EXCLUSIVE /grill-hub-prd — PRD sections on overview, surface, CMP index.md. Audit-first like grill-bqa.

## Overview

Validates and fills PRD sections (Goals, Background, Scope) in hub Markdown files:
- `overview/index.md`
- `overview/operational-areas/*.md`
- `surfaces/<surface>/index.md`
- `surfaces/.../CMP-*/index.md`

## Workflow
1. Interlocks with `flowgrid audit hub-prd <path-to.md>`.
2. Asks questions or uses Plan Mode based on the number of gaps.
3. Fixes PRD sections by translating business prose into the correct `contentLocale` while keeping Markdown headers in standard English.
4. Leaves no bracket placeholders `[...]` behind.
