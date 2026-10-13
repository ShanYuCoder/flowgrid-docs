# Skill: `/common`

## スキル名 (Name)
`common`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/common`
- Used to document common rules or generate single shared implementations in Phase 0 / Phase 1.

## 入力 (Input)
- Common ID (`CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`).
- Existing code in `shared/` or duplicate candidate code references.

## 出力 (Output)
- Markdown User Stories & Rules: `<LCA>/common/patterns/<CMN-ID>.md`.
- Canonical single implementation in `shared/` (for Duplicate Candidates).
- Registration in Workspace SSOT registry (`.flowgrid/registries/`).

## 説明・役割 (Description)
- コピペ防止ルール (Anti-Copy-Paste Guard) を強制。共有 UI パターン、DTO、業務規約を `<LCA>/common/patterns/` に Markdown 形式で定義し、SSOT レジストリに登録。
- 共通コンポーネントに対して YAML や Bundle を作成することは厳禁。常に `.md` を使用。
- **4 層の品質基準：** 契約不変性、4 つの標準状態、制御の反転、テストシーム。
---

## プロンプト実行例 (Example Prompt)

```text
/common CMN-UI-001

Generate User Stories specification for Confirm Delete Modal and register in design.registry.json.
```

