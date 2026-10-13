# Overview

This document is for software development teams: explaining **why** a complete, structured artifact repository is critical, the **role of SSOT** in high-velocity projects, **how SDLC phases are often cut corners on** during crunch periods — and **how FlowGrid combined with AI rectifies this** to retain rigor without paying the prohibitive cost of manual documentation. The toolkit standardizes formats on repository disk, aligns AI agents with engineering lanes, provides deterministic audit gates, and automates codegen and E2E test suites — allowing teams to focus on **adversarial grilling, reviews, and sign-offs** instead of abandoning documentation.

## Three Core Operational Principles

FlowGrid combines **deterministic scripts** and **AI agents** on the same SSOT disk layer — complementary, never replacing each other:

1. **Separation of Concerns (Quantity vs. Quality)** — `flowgrid audit *` and `cases:gate` report missing fields, schemas, and trace gaps (`gaps[]`, `confirms[]`) using pure Node.js determinism; human grilling (`/grill-bqa`, `/grill-dev`) and member reviews resolve domain logic, UI ↔ API ↔ testcase consistency. Agents strictly adhere to skills (`/spec`, `/legacy`, `/update-spec`), never filling gaps silently without explicit confirmation.
2. **Anti-Copy-Paste Guard & Common Catalog** — eradicate code duplication: skill `/init` scans and extracts candidate common components (`CMN-UI-*`, `CMN-API-*`, `CMN-DTO-*`), enforces standardization via `/common`, consolidates a single implementation in `shared/`, and strictly forbids copying legacy code into new modules.
3. **SDLC Phase Discipline** — when open issues (`gaps[]` + `confirms[]`) exceed thresholds (~10), avoid ad-hoc polling; split execution into structured sub-phases. Large complex screens are broken down into **zones** (header, toolbar, table/form, footer) to prevent lost-in-the-middle context issues.

## Three Implementation Contexts

| Context | Characteristics | Standard Workflow (Phase 0 ➔ Feature) |
| --- | --- | --- |
| **1. Greenfield** | Brand new product built from ground zero | `flowgrid setup` ➔ `/init` ➔ `/spec` ➔ `/prototype` ➔ `/api-spec` ➔ `/testcase` ➔ `/wire` |
| **2. Maintain** | Brownfield maintenance and evolution of existing codebase | `flowgrid setup` ➔ place code into `source-code/` ➔ `/init` maps surfaces ➔ use `/trace` with `/spec` to align implicit logic |
| **3. Rebase / Modernization** | Complete rewrite or migration from legacy tech stack | Place legacy code in `source-legacy/` (READ-ONLY) ➔ `/init` extracts `CMN-*` activating Anti-Copy-Paste Guard ➔ select Golden Sample for `build-template-code` ➔ use `/legacy` with `/spec` |
