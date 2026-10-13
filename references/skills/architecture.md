# Skill: `/architecture`

## Name
`architecture`

## Usage (Command/Trigger)
- Call via slash command: `/architecture`
- Executed in Phase 0 to establish system architecture documentation.

## Input
- Technical stack specifications, deployment infrastructure, architectural constraints.

## Output
- Arc42-aligned documentation under `architecture/`:
  - `01-context-and-scope.md`
  - `02-architecture-constraints.md`
  - `03-system-scope-and-context.md`
  - `04-solution-strategy.md`
  - `05-building-block-view.md`
  - `06-runtime-view.md`
  - `07-deployment-view.md`
  - `08-crosscutting-concepts.md`
  - `09-architectural-decisions.md`
  - `10-quality-requirements.md`
  - `11-risks/risk-register.md`

## Description
- Documents the system's structural blueprint following international Arc42 standards.
- Defines technology choices, communication protocols, caching strategies, and resilience patterns.

## Related Skills
- **Paired with:** `/architecture-grill` for technical critique and validation.

---

## Example Prompt

```text
/architecture

Generate Arc42 system architecture documentation for microservices platform with NestJS backend, Nuxt frontend, PostgreSQL, and Redis caching.
```
