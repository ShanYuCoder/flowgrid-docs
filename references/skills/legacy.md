# Skill: `/legacy`

## Name
`legacy`

## Usage (Command/Trigger)
- Call via slash command: `/legacy` or in combination: `/legacy /spec`.
- Exclusively designed for **Rebase / Modernization** (rebuilding modern systems from legacy systems).

## Input
- Legacy codebase directory: `source-legacy/` (**STRICTLY READ-ONLY**).
- Legacy functional inventory extracted via `/extract-legacy`.

## Output
- Target codebase directory: `source-code/`.
- Clean specifications: `.bundle.yaml`, `ir/`, and `01-backend-spec.yaml`.
- 100% extraction of core business logic, validation rules, state machines, and DTOs into modern architecture.

## Inviolable Rules
- **`source-legacy/` is STRICTLY READ-ONLY:** Never modify, add, or delete files within this folder.
- **Strictly prohibit raw copy-pasting:** Never transfer legacy code directly into new repos. Re-architect logic cleanly according to project golden samples.
- **All outputs write to `source-code/`:** New code and SSOT specs live exclusively in modern directories.
- **External API Taxonomy (Zero Internal-External Confusion):** When discovering outbound calls to 3rd-party services (Payment, SMS, Email, OAuth, Couriers, ERP), documentation and user flows MUST explicitly state `Call External API: <Provider>`. Strictly forbidden to vaguely write "calls api" or confuse with internal `API-*`.
- **Mandatory Model/Entity Deep-Dive for Database Mapping:** Never stop at legacy Controllers. Must inspect Model/Entity classes (`app/Models/*`) and database migrations to extract physical table names, column types, `$fillable`, `$casts`, relationships (`belongsTo`, `hasMany`), and accessors (`$appends`). Must declare `design.dataModel.tables[]` and `db:` bindings in the target specs.

## Description
- In modernization projects, the greatest challenge is preserving intricate legacy business rules while eliminating accumulated technical debt.
- `/legacy` acts as a business logic distillation filter: reads domain behavior from legacy files, removes legacy workarounds, and outputs clean modern code.


---

## Example Prompt

```text
/legacy /spec

Screen: Customer Management
Read legacy logic from source-legacy/app/Http/Controllers/CustomerController.php to extract all validation, business rules, and API specifications into the new architecture under source-code/.
```
