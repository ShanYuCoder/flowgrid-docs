# Skill: `/cross-cutting`

## Name
`cross-cutting`

## Usage (Command/Trigger)
- Call via slash command: `/cross-cutting`
- Used to document system-wide non-functional concepts in Phase 0 / Phase 4 (`architecture/08-crosscutting-concepts.md`).

## Input
- System requirements for logging, audit trails, multi-tenant isolation, caching, and rate-limiting.

## Output
- Cross-cutting concept specifications and architectural middleware definitions.

## Description
- Defines overarching non-functional behaviors applied uniformly across all endpoints and screens.
- Standardizes structured logging (JSON correlation IDs), distributed tracing, and security headers.

---

## Example Prompt

```text
/cross-cutting

Specify structured logging format with X-Correlation-ID tracing, JWT tenant claim extraction, and Redis rate limiting.
```
