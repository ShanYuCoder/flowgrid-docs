# Skill: `/surfaces`

## スキル名 (Name)
`surfaces`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/surfaces`
- Executed during Phase 0 project setup.

## 入力 (Input)
- High-level system architecture and target client platforms.

## 出力 (Output)
- Surface catalog definitions under `surfaces/` (e.g., `surfaces/admin/`, `surfaces/portal/`, `surfaces/mobile/`).
- Navigation models and layout boundaries per client application.

## 説明・役割 (Description)
- Phase 0 においてクライアント画面領域（`admin`、`portal`、`mobile` 等）を分割し、ユーザー層、認証方式、共通リソース階層を定義。
## 関連スキル (Related Skills)
- **Preceding:** `/overview`.
- **Subsequent:** `/module`, `/user-flow`.

---

## プロンプト実行例 (Example Prompt)

```text
/surfaces

Define application surfaces for E-Commerce platform: Web Admin (admin), Customer Storefront (shop), and Mobile Delivery Driver App (driver).
```

