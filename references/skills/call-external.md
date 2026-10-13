# Skill: `/call-external`

## Name
`call-external`

## Usage (Command/Trigger)
- Call via slash command: `/call-external`
- Used when an API endpoint interacts with third-party vendors or external SaaS services.

## Input
- Endpoint definition requiring third-party integration (payment gateway, SMS, cloud storage, CRM).

## Output
- Tag `#call-external` configured on the API contract.
- Integration specifications: Timeout thresholds, retry strategies, circuit breakers, fallback responses, and error codes (`#err:external-timeout`, `#err:vendor-error`).

## Description
- Establishes resilient external API integration patterns.
- Protects internal services from cascading failures when third-party services degrade.

---

## Example Prompt

```text
/call-external

Endpoint: POST /api/v1/payments/charge
Vendor: Stripe Payment Intent API
Configure 5000ms timeout, 3-step exponential backoff, and idempotent webhook callback handling.
```
