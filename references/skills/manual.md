---
name: manual
description: "/manual — Generates End-User Documentation (User Manuals / Help Center guides) anchored on User Flows and E2E Evidences."
disable-model-invocation: true
extractBundle: spec-core
---

# `/manual` - User Manual Generation Skill

This skill generates comprehensive, pure non-technical End-User Manuals (Tài liệu hướng dẫn sử dụng). It is fundamentally **Flow-Centric**, meaning it guides the user through completing a task (Use Case) rather than meticulously documenting every field on a screen.

## 1. Frontmatter Requirements (For Google Docs Syncing)
Every generated Markdown file MUST begin with the following YAML frontmatter block.
```yaml
---
gdoc_id: "" # Populated by adapter
gdrive_image_id: "" # Populated by adapter
content_hash: "" # Populated by adapter
locale: "vi" # Target documentation language (BCP-47)
---
```

## 2. Multi-Language Selection & Scope
1. **Config Inspection:** Read `docs/ssot-docs.locale.yaml` to inspect `docsProseLocales` (list of supported docs languages) and `defaultDocsProseLocale`.
2. **Explicit Flag Check:**
   - If invoked with `--locale=all`: Generate manuals for ALL languages in `docsProseLocales`.
   - If invoked with `--locale=<code >` (e.g. `--locale=ja`): Generate manual specifically for `<code >`.
3. **Interactive Language Prompting (`AskQuestion`):**
   - If no `--locale` flag was passed AND `docsProseLocales` contains multiple languages:
     Use `AskQuestion` to prompt the member:
     > *"Chọn ngôn ngữ tài liệu hướng dẫn sử dụng cần xuất bản (Select User Manual language):"*
     > - `(Recommended) [All] Xuất bản cho TẤT CẢ ngôn ngữ (${docsProseLocales.join(', ')})`
     > - `${locale_1}`
     > - `${locale_2}`
     > - ...
   - If `docsProseLocales` has only 1 language: Automatically target that language without prompting.

## 3. Context Assembly
When invoked with `/manual <FLOW-ID>` (e.g., `/manual FLOW-ADM-TENANT-SETUP`):
1. **Target Identification:** Read the primary User Flow document (`FLOW-*`).
2. **Context Gathering:** Read the underlying Component Specs (`W-*`) ONLY to understand the purpose of major sections. Do NOT extract granular validations.
3. **Template Loading:** Read the standard Flow-centric User Manual template at `surfaces/_user-manual-page.template.md`.

## 4. Smart Evidence Linking (Stateless Pathing & Fallback Hierarchy)
Do NOT search for zip files. Read `.flowgrid/config.json` to get `evidence.base_url` (or relative path) and `.flowgrid/product-i18n.yaml` (or `config.productI18n`) for supported UI languages (`languages`) and `defaultLocale`.

For each generated manual language `targetLocale`:
1. **Case A — Supported in Product UI (`targetLocale ∈ productI18n.languages`) & Snapshot Exists:**
   - Calculate URL: `${base_url}/surfaces/${surface}/${moduleId}/${screenId}.${targetLocale}.png`
   - Embed: `![Screen Evidence (${targetLocale.toUpperCase()})](${imageUrl})`
   - Caption: `*(Ảnh chụp màn hình giao diện ${targetLocale.toUpperCase()})*`
2. **Case B — Supported in Product UI BUT Snapshot Missing (`targetLocale ∈ productI18n.languages`):**
   - Fallback safely to default product UI image: `${base_url}/surfaces/${surface}/${moduleId}/${screenId}.png`
   - Embed: `![Screen Evidence (${defaultLocale.toUpperCase()})](${imageUrl})`
   - Caption: `*(Ảnh chụp màn hình từ hệ thống thật - Giao diện mặc định ${defaultLocale.toUpperCase()}, chưa có snapshot ${targetLocale.toUpperCase()})*`
3. **Case C — NOT Supported in Product UI (`targetLocale ∉ productI18n.languages`):**
   - The product application does not have UI translations for `targetLocale`. Strictly fallback to default UI screenshot.
   - Embed: `![Screen Evidence (${defaultLocale.toUpperCase()})](${imageUrl})`
   - Caption: `*(Ảnh chụp màn hình từ hệ thống thật - Giao diện ${defaultLocale.toUpperCase()}, sản phẩm không hỗ trợ UI ${targetLocale.toUpperCase()})*`

## 5. Structural Output Requirements
- In multi-language workspaces, output generated manuals to:
  `surfaces/<surface>/user-manuals/<module>/<FLOW-ID>.<targetLocale>.md`
  *(e.g., `FLOW-ADM-TENANT-SETUP.ja.md`, `FLOW-ADM-TENANT-SETUP.vi.md`, `FLOW-ADM-TENANT-SETUP.en.md`)*.
- If only a single documentation language is configured across the workspace, the extension suffix may be omitted (`<FLOW-ID>.md`) for backward compatibility.

## 6. Behavioral Constraints (PURE END-USER PERSONA)
- **Focus on the Journey, Not the Fields:** End-users know what a phone number or email is. Do NOT document trivial validations ("Max length 50", "Must be valid email", "Required"). The UI will handle those. 
- **Task-Oriented:** Write instructions as a narrative of actions. "Step 1: Go to Central Admin and click Add Tenant. Step 2: Enter the Tenant's business details."
- **Handle Branching:** If the Flow has branching logic (e.g., "If User selects B2B, show Tax ID field"), explicitly write out the alternative scenarios so the user knows what to expect when they make a choice.
- **Zero Technical Jargon:** Absolutely NO mentions of "API", "DTO", "Regex", "Schema", or "Validation".
- **Language & Tone Matching:**
  - Tiếng Nhật (`ja`): Kính ngữ chuẩn (丁寧語 / Keigo: です・ます), hướng dẫn trang nhã, lễ phép.
  - Tiếng Việt (`vi`): Tự nhiên, thân thiện, rõ ràng, hướng dẫn dễ hiểu.
  - Tiếng Anh (`en`): Active voice, action-oriented, clear imperative verbs.
