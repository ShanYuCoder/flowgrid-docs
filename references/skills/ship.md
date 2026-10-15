---
title: "Skill: `/ship`"
description: "Run pre-flight audits, commit & push changes, open Pull Request / Merge Request via GitHub/GitLab/Backlog, and transition ticket status to In Review."
---

# Skill: `/ship`

`/ship` — Quality Gate, Git Push, PR Creation & Ticket Delivery.

## 🛡️ Pre-Flight Quality Gate

The `/ship` skill enforces **zero-bypass verification** before pushing code:
- Schema validation (`flowgrid:audit spec`)
- FE-BE alignment (`flowgrid:audit fe-be`)
- Automated test checks (`flowgrid:cases-check`)

## 🚢 Delivery Workflow

1. **Audit Check:** Halt if critical errors exist.
2. **Commit:** Generate structured Conventional Commit referencing ticket ID.
3. **Git Push:** Push branch to remote repository.
4. **Pull Request:** Open PR on GitHub, Backlog, or GitLab with formatted audit table.
5. **Tracker Update:** Transition ticket status to "In Review" and post comment with PR URL.

## 🚀 Usage

```text
/ship                        # Run quality audit, commit, push, and open PR
```
