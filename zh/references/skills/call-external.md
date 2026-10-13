# Skill: `/call-external`

## 名称 (Name)
`call-external`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/call-external`
- Used when an API endpoint interacts with third-party vendors or external SaaS services.

## 输入 (Input)
- Endpoint definition requiring third-party integration (payment gateway, SMS, cloud storage, CRM).

## 输出 (Output)
- Tag `#call-external` configured on the API contract.
- Integration specifications: Timeout thresholds, retry strategies, circuit breakers, fallback responses, and error codes (`#err:external-timeout`, `#err:vendor-error`).

## 描述说明 (Description)
- 针对外部系统（支付网关、物流查询、外部 SaaS）定义专门的防腐层 (ACL)、超时重试策略、熔断降级与模拟数据桩。
---

## 提示词调用示例 (Example Prompt)

```text
/call-external

Endpoint: POST /api/v1/payments/charge
Vendor: Stripe Payment Intent API
Configure 5000ms timeout, 3-step exponential backoff, and idempotent webhook callback handling.
```

