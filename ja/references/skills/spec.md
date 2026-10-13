# Skill: `/spec`

## スキル名 (Name)
`spec`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/spec`
- Used when authoring functional specifications for a new screen or feature from scratch (Greenfield mode).

## 入力 (Input)
- User requirements, business rules, UI mockups/screenshots, wireframes, or descriptive bullet points.
- Screen context: Owning Surface (`surfaces/<surface>/`), Module (`CMP-*`), and Screen Code (`W-*`).
- Local common components registry (`.flowgrid/registries/design.registry.json`).

## 出力 (Output)
- Leaf Bundle YAML file: `<slug>.bundle.yaml` located at `surfaces/<surface>/CMP-*/<NN...>/<slug>.bundle.yaml`.
- IR artifacts generated via `flowgrid split`: `ir/design.yaml` and `ir/spec.yaml`.
- Rendered business Markdown specification: `ir/generated/spec.md` (and `data-model.md` if persisted entities exist).
- Unresolved questions routed directly to `qa/<SHORT>_NNNN.yaml` (tagged `#tech-debt:QA-*`).

## 説明・役割 (Description)
- Phase 1 設計の中核スキル。業務要件を決定論的な `W-*.bundle.yaml` へ構造化し、データモデル、UI コンポーネント、API 契約を厳格バインド。
- Markdown の直接手動編集は厳禁。`flowgrid render` で自動生成。
- YAML 内への未決事項の残存は厳禁。AskQuestion または `qa/` で解決。
## 関連スキル (Related Skills)
- **Preceding:** `/overview`, `/module`, `/user-flow`, `/db-erd` (Phase 0).
- **Subsequent:** `/grill-bqa` (Business Review), `/grill-dev` (Codegen readiness).

## 注意事項 (Important Notes)
- **Never write Markdown manually** — always generate via `flowgrid render`.
- **Never store `openQuestions` in YAML** — use AskQuestion in-session or record tech debt in `qa/`.
- Always run `flowgrid audit spec <bundle> --type <profile>` to ensure structural compliance before proceeding.

---

## プロンプト実行例 (Example Prompt)

```text
/spec

Surface: admin-portal · Module: CMP-ADM-ORD · Screen: W-ADM-ORD-01 (Order Listing)
Scope: Display paginated order table with date-range filters, order status dropdown, and batch export action.
```

