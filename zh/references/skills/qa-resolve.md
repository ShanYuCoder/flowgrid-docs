# Skill: `/qa-resolve`

## 名称 (Name)
`qa-resolve`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/qa-resolve`
- Used when a pending QA tech debt or open question has been answered by stakeholders.

## 输入 (Input)
- QA file: `qa/<SHORT>_NNNN.yaml`.
- Decision text and target specification path.

## 输出 (Output)
- Appended `updates[]` entry with `kind: answer`.
- Status updated: `status: closed`.
- Surgical patch applied to the target bundle or API contract.

## 描述说明 (Description)
- 读取 `qa/` 中的未决问题，追加最终决策解答，自动将补丁更新回目标 Bundle/01 规范文件，并将状态置为已关闭。
---

## 提示词调用示例 (Example Prompt)

```text
/qa-resolve HOTEL-LIST_0001

Decision: Timezone filtering defaults to property local timezone; display UTC+7 label on UI.
Patch target bundle at surfaces/admin/CMP-HOTEL/01/hotel-list.bundle.yaml.
```

