# Skill: `/build-templates`

## スキル名 (Name)
`build-templates`

## 使用方法 (Command/Trigger)
- CLI command: `flowgrid build-template-code --sample=<path>`
- Slash command: `/build-templates`

## 入力 (Input)
- Golden Sample module path (e.g., `source-code/src/modules/orders`).

## 出力 (Output)
- Custom templates stored in Workspace SSOT: `.flowgrid/adapters/<target>/custom/`.
- Updated registries in `.flowgrid/adapters/<target>/custom/registries/`.

## 説明・役割 (Description)
- 既存の高品質な標準モジュール (Golden Sample) を直接学習し、プロジェクトに完全準拠したカスタムテンプレートを生成。自動生成コードの一貫性を 100% 保証。
- **4 層の品質基準：** 契約不変性、4 つの標準 UI 状態 (Loading/Empty/Error/Success)、制御の反転 (IoC)、単体テストシーム。
---

## プロンプト実行例 (Example Prompt)

```text
/build-templates --sample=./source-code/admin-fe/src/modules/orders
```

