# Skill: `/legacy`

## スキル名 (Name)
`legacy`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/legacy`
- Exclusively designed for **Rebase / Modernization** (rebuilding modern systems from legacy systems).

## 入力 (Input)
- Legacy codebase directory: `source-legacy/` (**STRICTLY READ-ONLY**).
- Legacy functional inventory extracted via `/extract-legacy`.

## 出力 (Output)
- Target codebase directory: `source-code/`.
- Clean specifications: `.bundle.yaml`, `ir/`, and `01-backend-spec.yaml`.
- 100% extraction of core business logic, validation rules, state machines, and DTOs into modern architecture.

## 厳格な不変ルール (Inviolable Rules)
- **`source-legacy/` is STRICTLY READ-ONLY:** Never modify, add, or delete files within this folder.
- **Strictly prohibit raw copy-pasting:** Never transfer legacy code directly into new repos. Re-architect logic cleanly according to project golden samples.
- **All outputs write to `source-code/`:** New code and SSOT specs live exclusively in modern directories.

## 説明・役割 (Description)
- 既存コードをベースに新仕様を策定（`specOrigin: legacy` 付与）。過去の暗黙的ルールを継承しながらモダンアーキテクチャへ刷新。
---

## プロンプト実行例 (Example Prompt)

```text
/legacy /spec

Screen: Customer Management
Read legacy logic from source-legacy/app/Http/Controllers/CustomerController.php to extract all validation, business rules, and API specifications into the new architecture under source-code/.
```

