# Skill: `/call-external`

## スキル名 (Name)
`call-external`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/call-external`
- Used when an API endpoint interacts with third-party vendors or external SaaS services.

## 入力 (Input)
- Endpoint definition requiring third-party integration (payment gateway, SMS, cloud storage, CRM).

## 出力 (Output)
- Tag `#call-external` configured on the API contract.
- Integration specifications: Timeout thresholds, retry strategies, circuit breakers, fallback responses, and error codes (`#err:external-timeout`, `#err:vendor-error`).

## 説明・役割 (Description)
- 外部システム（決済代行、配送連携、外部 SaaS）向けの防腐層 (ACL)、タイムアウト・リトライポリシー、サーキットブレーカー、モックスタブを定義。
---

## プロンプト実行例 (Example Prompt)

```text
/call-external

Endpoint: POST /api/v1/payments/charge
Vendor: Stripe Payment Intent API
Configure 5000ms timeout, 3-step exponential backoff, and idempotent webhook callback handling.
```

