# Skill: `/user-flow`

**SSOT 准则来源：** `harness/docs/skills/user-flow/SKILL.md`

用于设计端到端用户业务旅程 (User Flows) 的核心技能，作为连接前端屏幕界面 (`W-*`) 与后端服务接口 (`API-*`) 的顶层全局导航路线图。

- 产出规范文件：`architecture/03-user-flows/` 或 `surfaces/<surface>/<module>/user-flows/` 下的 `FLOW-*.md`。
- 命名规范：`FLOW-{SURF}-{DOMAIN}-{NN}`（例如 `FLOW-ADM-AUTH-01`）。严格杜绝使用随意无序的命名。
- 自动化审计：`flowgrid audit flow <path>`。

---

## 核心用户流分类

1. **多步骤业务向导旅程 (Multi-step Journeys)：** 结账下单向导、多步骤用户入驻引导。
2. **业务状态机流转 (State Machines)：** 订单全生命周期状态流转、多级审批流。
3. **角色权限分支 (Role Branching)：** 普通用户端与管理员后台之间严格分离的操作路径。
4. **异步作业与 Webhook (Async / Webhooks)：** 第三方支付回调、后台队列耗时异步批处理。
5. **对话框与子交互流 (Dialog Sub-flows)：** 跨越多个页面的抽屉 (Drawer) 或模态弹窗流程。

---

## 分层解耦 vs 单体规范模式误区 (Monolithic Spec)

- **单体规范模式误区 (Monolithic Spec Fallacy)：** 将多个屏幕、表单和 API 硬塞进单一庞大的单体规范文件中，会导致业务流被严重稀释。AI Agent 会因上下文饱和产生幻觉，漏掉跨屏幕数据交接、并发竞态与局部失败回滚等关键逻辑。
- **FlowGrid 的分层解耦架构：**
  - **宏观编排层 (`FLOW-*.md`)：** 高维度路线图，连接业务角色、页面屏幕 (`W-*`)、接口契约 (`API-*`)、业务规则 (`BR-*`) 与后台异步 Worker。
  - **微观原子层 (`W-*.bundle.yaml`)：** 严格聚焦于**单个屏幕**的原子设计：布局容器、数据表格列、字段校验规则以及单屏内部交互状态 (`interactionCases` L2)。

---

## 5 大业务边缘盲点排查清单

1. **页面刷新 / 后退导航与数据丢失：** 明确定义状态持久化机制（URL 查询参数、`sessionStorage`、服务器草稿 Draft ID）。
2. **并发修改与竞态条件 (Race Conditions)：** 定义乐观锁机制（`version` / `updated_at`）、幂等性标识 (Idempotency Key) 以及 `409 Conflict` 冲突处理。
3. **跨端角色交接与通知丢失兜底：** 在接收端定义降级的工作待办队列 (Worklist Queue)，防止因通知推送失败导致任务沦为孤儿。
4. **部分失败与 Saga 事务补偿回滚：** 在时序图的 `alt/else` 分支中明确记录回滚操作（自动退款、库存解冻）。
5. **数据交接 Schema 漂移：** 逐字段核验源页面的输出 Payload 与目标页面的输入 Props 契约一致性。

---

## 跨流深度分析分级协议

- **Tier A (跨端业务流 Cross-Surface)：** 跨越 $\ge 2$ 个独立运行环境或不同角色的数据流转（买家 Web ➔ 管理后台 Admin ➔ 后台 Worker）。强制逐字段审计 Payload 兼容性、幂等性与补偿回滚。
- **Tier B (端内共享业务流 Surface-Shared)：** 同一端内跨模块复用的通用旅程（如安全删除实体、批量数据导出）。
- **Tier C (模块级业务流 Module-Scope)：** 单个业务模块内部的多步向导（如 3 步创建资源）。

---

## 图表选型决策矩阵：何时使用何种图表

| 图表类型 | Mermaid 语法标识 | 适用场景与时机 | 必须包含的规范要素 |
| :--- | :--- | :--- | :--- |
| **时序图 (Sequence Diagram)** | `sequenceDiagram` | 跨越 $\ge 2$ 个生命周期的时序动态交互（角色、前端、网关、后端、数据库、Worker、第三方）。 | `autonumber`、`alt/else` 异常分支、`rect` 异步处理块、`-->>` 明确的返回响应。 |
| **流程图 / 方块图 (Flowchart)** | `flowchart TD/LR` | 复杂的条件决策树 (`IF/ELSE` 分支)、页面导航路由图、宏观数据处理管线。 | `([开始/结束])`、`{条件判断?}` 菱形节点、带标签的分支边 (`-->|是|`)。 |
| **状态机图 (State Machine)** | `stateDiagram-v2` | 核心实体的生命周期状态跃迁（例如订单：`DRAFT ➔ PENDING ➔ PAID / CANCELLED`）。 | `[*] --> 初始状态`、转移标签 (`事件 [守卫条件]`)、终止状态。 |
