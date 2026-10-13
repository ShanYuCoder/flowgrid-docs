# Skill: `/cross-entity-service`

## スキル名 (Name)
`cross-entity-service`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/cross-entity-service`
- Used when a backend endpoint modifies multiple database entities within the same database transaction boundary.

## 入力 (Input)
- Endpoint modifying multiple domain tables/aggregates (e.g., Order + OrderItems + StockAllocation).

## 出力 (Output)
- Transaction isolation boundary declaration, ACID guarantee rules, and rollback handlers.
- Tag `#cross-entity-service` on `01-backend-spec.yaml`.

## 説明・役割 (Description)
- 複数の集約ルートやエンティティにまたがるドメインサービスの契約を定義。トランザクション境界とデータ整合性を担保。
---

## プロンプト実行例 (Example Prompt)

```text
/cross-entity-service

Endpoint: POST /api/v1/orders/create
Entities: Orders, OrderLineItems, InventoryReservation
Specify ACID transaction rollback rules if inventory reservation fails.
```

