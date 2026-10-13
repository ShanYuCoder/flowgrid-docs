# Skill: `/grill`

## Name
`grill`

## Usage (Command/Trigger)
- Call via slash command: `/grill <target>`
- Router command directing to specialized grilling skills: `/grill-bqa`, `/grill-dev`, `/grill-api-spec`, `/grill-testcase`, `/grill-prototype`, or `/grill-wire`.

## Input
- Specification bundle, API contract, test plan, or prototype code depending on the active lifecycle phase.

## Output
- Routes to the appropriate phase grilling skill.
- Gap reports and interactive AskQuestion wizards.

## Description
- Central entry router for all qualitative review and grilling skills across the FlowGrid lifecycle.
- Evaluates domain logic, consistency, error storming, and edge-case resilience.

---

## Example Prompt

```text
/grill surfaces/admin/CMP-ADM-ORD/01/01/order-list.bundle.yaml
```
