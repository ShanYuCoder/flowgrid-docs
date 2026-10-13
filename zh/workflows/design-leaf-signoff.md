# 页面设计叶子节点 — 签字验收准则 (Design Sign-off)

**职责范围：** 针对功能叶子节点（`surfaces/<surface>/CMP-*/<NN…>/<slug>.bundle.yaml`），在进入测试泳道或执行生产代码生成**之前**的人工签署验收标准。

**非强制性引擎阻断门禁** —— 当工程师完整遵循 [design.md](./design.md) 并执行完各项质询技能后，由技术主管 (Tech Lead) 或 BA 进行人工确认签字。仅在聊天窗口中随口说“搞定了”绝不能替代本清单的逐项核验。

**关联文档：** [gates.md](./gates.md) · [grill-and-human-review.md](./grill-and-human-review.md) · 结构审计命令 `flowgrid audit spec`。

---

## 适用场景

- 关闭单个 `W-*` / 页面叶子节点的设计阶段。
- 移交至测试用例设计 `/testcase`、后端接口契约编制 `/api-spec` 或前端原型开发 `/prototype`。
- 团队内部走查，确保 SSOT 质量达到标准（溯源清晰、就绪可供代码生成、BA 业务可读）。

---

## 6 项核心核准标准 (必须全部通过)

| # | 核准项目 | 验证准则 |
|---|---|---|
| 1 | **结构审计** | 运行 `flowgrid audit spec <bundle> --type <profile>` —— 零未处理阻断项 `gaps[]`；`confirms[]` 均已裁决或明确转入 `qa` 待办。 |
| 2 | **业务可读性** | **VitePress** 中的 `ir/generated/spec.md`（及存在持久化实体时的 `data-model.md`）：包含完整的 User Stories、**数据表格列表字段**、业务场景、验收标准 AC —— 均为实质业务描述，无形式化占位符。 |
| 3 | **UI ↔ 故事追溯** | 抽查 2–3 个业务场景：用户交互操作能精准对应到 `design.actions` / `design.sections`（包含交付边界与校验提示文案）。 |
| 4 | **接口契约一致** | `api/<seq>/01-backend-spec.yaml` 与 `ir/design.yaml` 中的 `apiRef` 吻合；若后端在交付范围内，运行 `flowgrid audit fe-be` 无阻断。 |
| 5 | **代码生成就绪** | 达到 `grillStatus.dev: done` 状态；前端运行 `flowgrid gen:dry` 预检通过；记录了明确的 `gen.codegen` 与开发质询标签。 |
| 6 | **QA 收件箱清理** | `qa` 目录已清空或仅包含团队共识的技术债务；Bundle 内无绕过 QA 机制的私自隐藏疑问。 |

### 建议推荐项 (非阻断)

| # | 核准项目 | 验证准则 |
|---|---|---|
| 7 | **数据模型** | LCA 作用域下的 `db-erd.md` 可读；持久化控件绑定了 `db.schema`/`db.field`；列表计算列标记了 `#derived-data`。详见 [architecture-data.md](./architecture-data.md)。 |

- 在进入测试泳道前，`/grill-prototype` 无残留的 **SSOT** 视觉与文案分歧。
- 前端基础代码库完成 `registry:sync`；DSL 标签与 `design.registry.json` 吻合。

---

## 签字记录方式 (人工签署)

建议在 Bundle 文件或 Git PR 描述中记录单行确认日志：

```text
Design sign-off: <page-id> | reviewer: <姓名> | date: YYYY-MM-DD | rubric: 6/6
```

该字段不作为 YAML 必填项 —— 避免将引擎行为与人工质询顺序强行硬绑定。
