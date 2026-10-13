# Skill: `/cross-service`

## スキル名 (Name)
`cross-service`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/cross-service`
- Used when a business transaction coordinates operations across multiple microservices or bounded contexts.

## 入力 (Input)
- Distributed business workflow spanning 2 or more distinct service domains.

## 出力 (Output)
- Distributed transaction specification (Saga choreography / orchestration, outbox events, compensating transactions).
- Tag `#cross-service` assigned to contract and architecture files.

## 説明・役割 (Description)
- マイクロサービス間の RPC/REST 通信、イベント駆動の Pub/Sub プロトコル、Saga パターンによる分散トランザクション補償フローを定義。
---

## プロンプト実行例 (Example Prompt)

```text
/cross-service

Workflow: Order Checkout
Services: Order Service, Inventory Service, Billing Service, Notification Service
Define Saga orchestration and rollback compensations when payment fails.
```

