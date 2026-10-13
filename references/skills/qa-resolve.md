# Skill: `/qa-resolve`

## Name
`qa-resolve`

## Usage (Command/Trigger)
- Call via slash command: `/qa-resolve <QA-ID>`
- Used when a pending QA tech debt or open question has been answered by stakeholders.

## Input
- QA file: `qa/<SHORT>_NNNN.yaml`.
- Decision text and target specification path.

## Output
- Appended `updates[]` entry with `kind: answer`.
- Status updated: `status: closed`.
- Surgical patch applied to the target bundle or API contract.

## Description
- Closes open items in the QA inbox.
- Applies the agreed business decision directly to the SSOT specification file, maintaining full historical audit trails.

---

## Example Prompt

```text
/qa-resolve HOTEL-LIST_0001

Decision: Timezone filtering defaults to property local timezone; display UTC+7 label on UI.
Patch target bundle at surfaces/admin/CMP-HOTEL/01/hotel-list.bundle.yaml.
```
