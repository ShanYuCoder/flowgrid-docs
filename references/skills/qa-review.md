# Skill: `/qa-review`

## Name
`qa-review`

## Usage (Command/Trigger)
- Call via slash command: `/qa-review <QA-ID>`
- Used by Senior Engineers or Leads to review QA resolutions or request revisions.

## Input
- QA file: `qa/<SHORT>_NNNN.yaml`.
- Review remarks.

## Output
- Appended `updates[]` entry with `kind: review`.
- Re-opens item (`status: open`) if `needs-change` is indicated.

## Description
- Manages peer review on QA inbox items without modifying specification files directly.

---

## Example Prompt

```text
/qa-review HOTEL-LIST_0001

needs-change: Add explicit acceptance criteria when the property has no configured timezone.
```
