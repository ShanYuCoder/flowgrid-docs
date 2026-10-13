# Skill: `/surfaces`

## 名称 (Name)
`surfaces`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/surfaces`
- Executed during Phase 0 project setup.

## 输入 (Input)
- High-level system architecture and target client platforms.

## 输出 (Output)
- Surface catalog definitions under `surfaces/` (e.g., `surfaces/admin/`, `surfaces/portal/`, `surfaces/mobile/`).
- Navigation models and layout boundaries per client application.

## 描述说明 (Description)
- 在 Phase 0 划分逻辑端（如 `admin`, `portal`, `mobile`），明确各端的用户群体、鉴权模式与共享资源层级。
## 相关技能 (Related Skills)
- **Preceding:** `/overview`.
- **Subsequent:** `/module`, `/user-flow`.

---

## 提示词调用示例 (Example Prompt)

```text
/surfaces

Define application surfaces for E-Commerce platform: Web Admin (admin), Customer Storefront (shop), and Mobile Delivery Driver App (driver).
```

