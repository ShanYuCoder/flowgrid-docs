# Skill: `/cross-service`

## 名称 (Name)
`cross-service`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/cross-service`
- Used when a business transaction coordinates operations across multiple microservices or bounded contexts.

## 输入 (Input)
- Distributed business workflow spanning 2 or more distinct service domains.

## 输出 (Output)
- Distributed transaction specification (Saga choreography / orchestration, outbox events, compensating transactions).
- Tag `#cross-service` assigned to contract and architecture files.

## 描述说明 (Description)
- 规范微服务架构下服务间的 RPC/REST 调用、事件驱动发布订阅协议、分布式事务 Saga 补偿流程。
---

## 提示词调用示例 (Example Prompt)

```text
/cross-service

Workflow: Order Checkout
Services: Order Service, Inventory Service, Billing Service, Notification Service
Define Saga orchestration and rollback compensations when payment fails.
```

