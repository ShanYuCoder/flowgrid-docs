# Skill: `/cross-service`

## Name
`cross-service`

## Usage (Command/Trigger)
- Call via slash command: `/cross-service`
- Used when a business transaction coordinates operations across multiple microservices or bounded contexts.

## Input
- Distributed business workflow spanning 2 or more distinct service domains.

## Output
- Distributed transaction specification (Saga choreography / orchestration, outbox events, compensating transactions).
- Tag `#cross-service` assigned to contract and architecture files.

## Description
- Models distributed workflows without resorting to brittle two-phase commits.
- Specifies eventual consistency policies, event payloads, and failure compensation logic.

---

## Example Prompt

```text
/cross-service

Workflow: Order Checkout
Services: Order Service, Inventory Service, Billing Service, Notification Service
Define Saga orchestration and rollback compensations when payment fails.
```
