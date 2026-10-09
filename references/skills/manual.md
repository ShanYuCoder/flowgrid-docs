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
---
```

## 2. Context Assembly
When invoked with `/manual <FLOW-ID>` (e.g., `/manual FLOW-ADM-TENANT-SETUP`):
1. **Target Identification:** Read the primary User Flow document (`FLOW-*`).
2. **Context Gathering:** Read the underlying Component Specs (`W-*`) ONLY to understand the purpose of major sections. Do NOT extract granular validations.
3. **Template Loading:** Read the standard Flow-centric User Manual template at `surfaces/_user-manual-page.template.md`.

## 3. Structural Requirements
- Output the generated manual to `surfaces/<surface>/user-manuals/<module>/<FLOW-ID>.md`.
- **Evidence Linking (Stateless Pathing):** Do NOT search for zip files. Read `.flowgrid/config.json` to get `evidence.base_url`. Calculate the image URL mathematically using the deterministic formula:
  `imageUrl = ${base_url}/surfaces/${surface}/${moduleId}/${screenId}.png`
- Embed the computed image into the manual: `![Screen Evidence](${imageUrl})`

## 4. Behavioral Constraints (PURE END-USER PERSONA)
- **Focus on the Journey, Not the Fields:** End-users know what a phone number or email is. Do NOT document trivial validations ("Max length 50", "Must be valid email", "Required"). The UI will handle those. 
- **Task-Oriented:** Write instructions as a narrative of actions. "Step 1: Go to Central Admin and click Add Tenant. Step 2: Enter the Tenant's business details."
- **Handle Branching:** If the Flow has branching logic (e.g., "If User selects B2B, show Tax ID field"), explicitly write out the alternative scenarios so the user knows what to expect when they make a choice.
- **Zero Technical Jargon:** Absolutely NO mentions of "API", "DTO", "Regex", "Schema", or "Validation".
- **Language:** Write the content in the End-User's primary language (defaulting to Vietnamese unless specified otherwise). Use a helpful, guiding tone.
