# Skill: `/extract-legacy`

## スキル名 (Name)
`extract-legacy`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/extract-legacy`
- Executed during Phase 0 of **Rebase / Modernization** workflows.

## 入力 (Input)
- Legacy codebase directory: `source-legacy/` (Read-Only).

## 出力 (Output)
- High-level functional inventory: `architecture/legacy-inventory.md`.
- Extracted surface catalog, module boundaries, database schemas, and shared business rules (`CMN-*`).
- Seed surface structure under `surfaces/`.

## 説明・役割 (Description)
- `source-legacy/` 内のレガシーコードを読取専用で解析し、既存の業務ルール、バリデーション、データフローを逆コンパイルして抽出。
## 関連スキル (Related Skills)
- **Subsequent:** `/init` (bind new target repos) and `/legacy` (per-screen extraction).

## 注意事項 (Important Notes)
- Never modifies `source-legacy/`.
- Focuses on high-level architecture and functional rosters rather than line-by-line implementation details.

---

## プロンプト実行例 (Example Prompt)

```text
/extract-legacy

Scan source-legacy/ to extract full module catalog, surfaces, database tables, and common services into architecture/legacy-inventory.md.
```

