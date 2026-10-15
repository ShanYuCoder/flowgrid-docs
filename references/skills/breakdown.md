---
title: "Skill: `/breakdown`"
description: "Decompose system architecture, modules, and screens into atomic 2-4h micro-tasks with parallel/sequential DAG, and bulk-sync to Backlog, Redmine, GitHub, or Jira."
---

# Skill: `/breakdown`

`/breakdown` — FlowGrid Agile Micro-Task Decomposition Engine.

## 🎯 The 2 - 4h Golden Rule

- **Target:** Every task must be micro-sized between **2 to 4 hours**.
- **Restricted:** 6 to 8 hour tasks are only for complex base infrastructure.
- **Strict Prohibition:** **NO task may ever exceed 8 hours**. Larger requirements are automatically split across FlowGrid lifecycle stages.

## 🌊 4-Wave Execution Architecture

1. **Wave 1: Foundation & API Contracts (Parallel ⚡)** — Spec layout (`/spec`) & OpenAPI contracts (`/api-spec`).
2. **Wave 2: Core Implementation (Parallel ⚡)** — Frontend UI (`/wire`) and Backend services (`/service`) executed concurrently.
3. **Wave 3: Integration & User Flow Wiring (Sequential 🔒)** — Live integration and end-to-end user flow verification.
4. **Wave 4: QA Test Matrix & Delivery Gate (Sequential 🔒)** — Automated Playwright testing (`/testcase`) and audit gate.

## 🚀 Usage

```text
/breakdown                   # Decompose all discovered screens
/breakdown W-AUTH-LOGIN      # Decompose a specific screen
/breakdown FLOW-CHECKOUT     # Decompose a user flow
```
