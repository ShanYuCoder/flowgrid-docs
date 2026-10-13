# Skill: `/trace`

## スキル名 (Name)
`trace`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/trace`
- Exclusively designed for **Maintain Mode** (extending and maintaining existing codebases).

## 入力 (Input)
- Active source code in `source-code/`.
- Target screen or feature under inspection.

## 出力 (Output)
- Synchronized specification bundle in `surfaces/` reflecting active codebase behavior.
- Reverse-engineered Data Model, API contracts, and validation rules.
- Patches applied cleanly to active code in `source-code/`.

## 説明・役割 (Description)
- 既存コードベースを自律解析し、未文書化の仕様、暗黙のルール、実稼働 API を逆コンパイルして標準 FlowGrid 仕様書へ昇華。
## 関連スキル (Related Skills)
- **Preceding:** `/init` (Repository discovery).
- **Combined with:** `/spec` or `/update-spec` to draft/update specs grounded in existing code.
- **Workflow Orchestration:** `/help-plan` (Phase 1 baseline archaeology).

## 注意事項 (Important Notes)
- **Autonomous Fact-Finding Guard:** Never ask the user where files are located or what endpoints exist; inspect the codebase autonomously.
- **5-Link User Flow Chain:** Must trace Upstream, Primary, Downstream side-effects, Failure/Rollback, and System/Security boundaries.
- **Ground Truth Priority:** Active code execution is ground truth; document discrepancies with requirements immediately.
- **Strict Isolation:** Inspects `source-code/` only; never touches `source-legacy/`.

---

## プロンプト実行例 (Example Prompt)

```text
/trace

Target: source-code/admin-fe/src/views/orders/OrderDetail.vue and OrderController.php
Scan the corresponding controller and view in source-code/ to extract complete specification, data model, and active API contracts.
```

