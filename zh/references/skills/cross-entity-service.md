# Skill: `/cross-entity-service`

## 名称 (Name)
`cross-entity-service`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/cross-entity-service`
- Used when a backend endpoint modifies multiple database entities within the same database transaction boundary.

## 输入 (Input)
- Endpoint modifying multiple domain tables/aggregates (e.g., Order + OrderItems + StockAllocation).

## 输出 (Output)
- Transaction isolation boundary declaration, ACID guarantee rules, and rollback handlers.
- Tag `#cross-entity-service` on `01-backend-spec.yaml`.

## 描述说明 (Description)
- 规范涉及多个聚合根或多个实体协同操作的领域服务接口，明确跨实体事务边界与数据一致性保障机制。
---

## 提示词调用示例 (Example Prompt)

```text
/cross-entity-service

Endpoint: POST /api/v1/orders/create
Entities: Orders, OrderLineItems, InventoryReservation
Specify ACID transaction rollback rules if inventory reservation fails.
```

