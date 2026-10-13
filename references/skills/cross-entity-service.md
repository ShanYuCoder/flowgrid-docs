# Skill: `/cross-entity-service`

## Name
`cross-entity-service`

## Usage (Command/Trigger)
- Call via slash command: `/cross-entity-service`
- Used when a backend endpoint modifies multiple database entities within the same database transaction boundary.

## Input
- Endpoint modifying multiple domain tables/aggregates (e.g., Order + OrderItems + StockAllocation).

## Output
- Transaction isolation boundary declaration, ACID guarantee rules, and rollback handlers.
- Tag `#cross-entity-service` on `01-backend-spec.yaml`.

## Description
- Explicitly models transactional integrity across multiple aggregates.
- Directs backend codegen to wrap operations in database transaction blocks (`DB::transaction` / UnitOfWork).

---

## Example Prompt

```text
/cross-entity-service

Endpoint: POST /api/v1/orders/create
Entities: Orders, OrderLineItems, InventoryReservation
Specify ACID transaction rollback rules if inventory reservation fails.
```
