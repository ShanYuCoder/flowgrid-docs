# Workflow: Building End-User Documentation (User Manuals)

Within the **FlowGrid** ecosystem, end-user manuals are never written purely by hand. Instead, they represent an automated synthesis between **Technical Specifications (Spec)** and **Automated Testing Evidence (E2E Screenshots)**, guaranteeing 100% parity with active systems.

This guide details the complete workflow from AI-assisted draft generation to synchronizing live deliverables on **Google Docs** for end users and stakeholders.

---

## 1. Prerequisites

Before building a User Manual, verify the following:
1. **Spec & Flow Finalized:** User Flow documentation exists (e.g., `surfaces/admin/user-flows/FLOW-ADM-TENANT-SETUP.md`).
2. **Automated Testing (Phase 4):** Automation tests (Playwright/Cypress) have executed cleanly, saving actual visual screenshot evidence under `qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png`.
3. **Google Docs API Configured:** System has access to the organization's Google Workspace via a Service Account.
   - Download the Service Account JSON Key from Google Cloud Console.
   - Rename the key to `google-credentials.json` and place it in the workspace root (or `.secrets/`).
   - **CRITICAL SECURITY NOTE:** Ensure `google-credentials.json` and `.secrets/` are added to `.gitignore` to prevent committing secrets to GitHub.
   - The FlowGrid Adapter automatically detects this credential (via `GOOGLE_APPLICATION_CREDENTIALS` or workspace root lookup).

---

## 2. Step 1: Local Generation

All User Manuals originate locally as Markdown documents acting as the **Single Source of Truth (SSOT)**. Documentation is structured around **User Flows (Business Journeys)** rather than exhausting individual screen field inventories.

**Execution Command:**
```bash
flowgrid docs /manual FLOW-ADM-TENANT-SETUP
```

**What the AI Agent Does:**
1. **Parses User Flow:** Extracts user journey steps and decision branches (e.g. "If Enterprise selected, proceed to Step X") from `FLOW-*.md`.
2. **References Technical Spec (High-Level):** Inspects the Technical Spec (`W-*`) to capture high-level semantic purposes. Bypasses trivial form validations (e.g. required, email format, phone digits, max-length 50) as these are self-explanatory or handled by UI prompts.
3. **Translates to End-User Language:** Focuses on human-oriented guides: "Step 1: Navigate to Section X... Step 2: Input details for Y".
4. **Embeds E2E Visual Evidence:** Automatically injects markdown image links referencing `qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png`.
5. **Initializes Tracking Metadata:** Appends YAML Frontmatter metadata headers.

**Deliverable:**
Generated at `surfaces/admin/user-manuals/tenant/FLOW-ADM-TENANT-SETUP.md`.

```markdown
---
gdoc_id: "" 
gdrive_image_id: "" 
content_hash: ""
---
# Order Creation Guide
Below is the live application interface:
![Screen Evidence](../../../qa/e2e/evidence/W-ADM-ORD-01-main.png)
...
```

---

## 3. Step 2: Publishing to Google Docs

End users do not browse raw markdown files. They expect a polished, shareable Google Doc link.

**Execution Command:**
```bash
flowgrid publish manual W-ADM-ORD-01 --target=gdocs
```

**Publisher Adapter Architecture (`gdocs-adapter.mjs`):**

1. **Change Detection (Hash Bypass):**
   - The adapter combines Markdown content + binary image data to compute an MD5 hash.
   - Compares the hash with `content_hash` recorded during previous runs.
   - **Benefit:** If no content or images changed, execution exits cleanly. This shields projects with hundreds of screens from **hitting Google Docs API quota rate limits**.

2. **Uploads E2E Screenshots to Google Drive:**
   - The Google Docs API does not embed local binary files directly.
   - The adapter uploads the `.png` image to Google Drive, acquiring a temporary public URL.

3. **Updates Google Doc (Clear & Replace):**
   - If `gdoc_id` is missing: Creates a new Google Doc and writes the document ID back to the local Markdown frontmatter.
   - If `gdoc_id` exists: Calls `batchUpdate` -> wipes existing contents (`deleteContentRange`) -> writes updated content and embeds new images.
   - **Benefit:** Preserves a permanent, static Google Doc link shared with clients or team members without link breakage.

---

## 4. Update Strategy

> **Fundamental Rule:** Documents published to Google Docs are **Strictly Read-Only**.

If stakeholders (BAs, Customer Success leads) wish to modify the manual, changes must flow from the source:
1. Update business logic in the Technical Spec (or edit local `.md` prose directly for wording adjustments).
2. Re-run E2E tests to refresh visual screenshot evidence (if UI layout changed).
3. Execute `flowgrid publish`.

**Never edit document text directly inside the Google Docs web UI.** Because the publishing adapter utilizes a *Clear & Replace* mechanism, direct cloud edits will be permanently overwritten upon the next local publish. This rule protects the single source of truth (SSOT) integrity of the FlowGrid repository.
