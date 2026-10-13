# 工作流 — QA 疑点协作收件箱 (QA Inbox)

**一条 QA 记录 = 一个独立文件。** 文件名即为 **QA 编号代码**（在该问题的整个生命周期中严格不可变）。

**QA 代码格式：** `{页面或模块缩写}_{四位序号}` —— 序号在每个前缀下自增（`0001`, `0002`…）。

| 示例页面 | 推荐缩写标识 | 生成的文件路径 |
|---|---|---|
| `W-HOTEL-LIST` | `HOTEL-LIST` | `qa/HOTEL-LIST_0001.yaml` |
| `cmp-adm-ord-01-02-01-02` | `ADM-AUTH` (团队约定简短标识) | `qa/ADM-AUTH_0001.yaml` |

FlowGrid 早期工作区仍支持 `QA-<page-id>-NNNN` 命名格式 —— 新增条目推荐使用简短缩写。

---

## 收件箱目录结构

```text
qa/
  HOTEL-LIST_0001.yaml    # 单一事实源 (SSOT) — 完整对话决策日志 + 对应规格目标
  ADM-AUTH_0002.yaml
  index.md                # 仅供目录索引 (渲染展示) — 状态 + 链接 + 最新进展
```

**严禁**创建诸如 `qa/open` / `qa/resolved` 等子目录，严禁使用复杂的 `supersedes` 文件链，同一个业务疑点**严禁**拆分为多个文件。

---

## 文件数据结构 (SSOT)

按时间戳追加的 **`updates[]`** 数组 —— **每次事件追加一条记录**（严禁修改或删除已有历史行）：

```yaml
schema: flowgrid-qa-item/v1
id: HOTEL-LIST_0001
screen: W-HOTEL-LIST
status: open          # open (待解决) | closed (已关闭)
target:
  path: surfaces/.../hotel-list.bundle.yaml
  at: design.zones.filter.timezone
updates:
  - at: "20260930 08:00"
    by: middle-dev
    kind: question
    text: |
      时区过滤条件是以当前酒店物业的时区为准，还是以用户的本地设备时区为准？
  - at: "20260930 10:00"
    by: ba-lead
    kind: answer
    text: |
      以物业所在时区为准；UI 界面上显示 UTC+7 标签以供识别。
  - at: "20261001 08:00"
    by: senior
    kind: review
    text: |
      needs-change: 当物业尚未配置时区时，需补充受入验收标准 (AC)。
```

**`at` 时间戳格式：** `YYYYMMDD HH:mm`（团队约定）或 ISO 8601 —— 在整个工作区内保持一致。

| `kind` 类型 | 操作人 / 触发时机 |
|---|---|
| `question` | 新发起 QA 疑点（记录技术债务 / AskQuestion 弹窗确认） |
| `answer` | 敲定最终决策 —— 伴随规范文件打补丁更新 (`/qa-resolve`) |
| `review` | 高级工程师/负责人评审意见；若文本包含 `needs-change` 则将状态重置为 `status: open` |
| `note` | 仅做信息补充说明，不改动规格 |

**`needs-change` 状态流转处理：** 绝不新建文件 —— 仅需**追加** `kind: review`（或 `note`）记录 → 将状态置为 `status: open` → 开发人员更新规格后追加 `answer` 记录并闭环。

---

## `qa/index.md` 索引目录

仅以表格形式呈现全局概览（渲染视图）：

| 编号 ID | 状态 Status | 页面 Screen | 最后更新 Last Updated | 核心摘要 Summary |
|---|---|---|---|---|

真正的 SSOT 内容完整保存在 YAML 文件中；`index.md` **绝不**冗余拷贝原始对话日志正文。

---

## 关联技能

| 技能 | 对应操作 |
|---|---|
| 发起 QA | 创建 `qa/{CODE}_NNNN.yaml`，首条记录 `updates[0]` 类型为 `question` |
| `/qa-resolve` | 追加 `answer` 记录 + 更新 Bundle/01 目标字段 + 将状态标记为 `status: closed` |
| `/qa-review` | 追加 `kind: review` 记录 —— 不直接修改 Bundle（除非后续调用 `/update-spec`） |

---

## 个人独立开发 vs 团队协作

| 维度 | 独立全栈 + AI | 跨职能团队协作 |
|---|---|---|
| 文件管理 | 单问题单文件 | 相同 —— 评审人直接走查 `updates[]` 履历 |
| 追溯审查 | 顺序自顶向下阅读 | Git blame 结合时间线审计 |
| 索引中心 | 选用 | 作为项目技术主管的核心状态监控看板 |
