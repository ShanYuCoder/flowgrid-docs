# Skill: `/surfaces`

## Name
`surfaces`

## Usage (Command/Trigger)
- Call via slash command: `/surfaces`
- Executed during Phase 0 project setup.

## Input
- High-level system architecture and target client platforms.

## Output
- Surface catalog definitions under `surfaces/` (e.g., `surfaces/admin/`, `surfaces/portal/`, `surfaces/mobile/`).
- Navigation models and layout boundaries per client application.

## Description
- Defines the top-level application surfaces (Web Admin, Client Portal, Mobile App, Partner API).
- Isolates distinct user experiences, permissions, and deployment targets within the unified Docs Hub.

## Related Skills
- **Preceding:** `/overview`.
- **Subsequent:** `/module`, `/user-flow`.

---

## Example Prompt

```text
/surfaces

Define application surfaces for E-Commerce platform: Web Admin (admin), Customer Storefront (shop), and Mobile Delivery Driver App (driver).
```
