# Phase 0 — 数据模型与实体关系图 (ERD)

**职责范围：** 在通过 `/spec` 编写具体页面叶子节点规格**之前**完成核心数据建模 —— 与 `/overview`、`/surfaces`、`/module` 和 `/user-flow` 共同构成 Phase 0 基础规划阶段。

**本文档不包含：** 屏幕页面级别的字段映射（Design 阶段）· 完整的后端 API 接口契约（Phase 2c `01`）· 物理数据库 SQL 迁移脚本。

**宏观工作流归属：** [index.md § Phase 0](./index.md#phase-0-data-model) · 设计阶段交接：[design.md § 数据模型](./design.md#data-model-two-stages)。

---

## 数据建模三层分离架构

| 层次 | 触发时机 | 对应技能 / 成果物 | 粒度与关注点 |
|---|---|---|---|
| **1 — 全局 ERD** | 新模块、新增实体/表、数据所有权归属变动、跨模块关联 | `/db-erd` → `<LCA>/common/db-erd.md` | 实体、关联关系、**主要**业务属性、所属 `CMP-*` / Surface |
| **2 — 页面字段绑定** | 单个 `W-*` / 叶子 Bundle 编写 | `/spec` → `spec.entities` + `design.sections[].db` | 表单/列 ↔ **表名.字段名**；列表 `columns[].key` ↔ 数据库字段或 `#derived-data` 计算字段 |
| **3 — 后端接口契约** | 设计规格稳定后 | `/api-spec` → `01-backend-spec.yaml` | `modules[].entities[]`, `fields[]`, API 端点 —— 后端代码生成 SSOT |

第 1 层属于 **Phase 0**。第 2 层属于 **Phase 1 设计**。第 3 层属于 **Phase 2c**（可在 grill-dev 期间提前起草）。

---

## 推荐的 Phase 0 规划顺序

```text
/overview (梳理产品业务愿景与运行领域)
    → /surfaces (划分具体应用端，如 portal, admin, mobile)
    → /module (明确 CMP-* 模块边界与依赖关系)
    → /user-flow (梳理触及数据的 FLOW-* 业务旅程)
    → /db-erd (在 LCA 最近公共祖先作用域生成 ERD)
    → (可选) /cross-service (若涉及外部服务与聚合调用)
```

---

## 何时必须执行 `/db-erd`

- **新建**业务模块/集群，或引入共享的**数据库表/核心实体**。
- 调整**实体关联基数**（一对多、多对多）或**数据所有权**边界（多租户、DDD 聚合根）。
- 遗留系统迁移：映射老系统表结构 → 新系统业务实体 (`/legacy /db-erd`)。

**何时可以跳过：** 在已有稳定 `db-erd.md` 的现有 CMP 模块中调整界面，且**不引入新的持久化数据表/字段**（仅纯 UI、前端校验或文案微调）。

---

## `db-erd.md` 的最低内容规范

- 包含标准的 Mermaid `erDiagram` 图表。
- 每个实体明确：业务名称、**归属模块/端**、逻辑主键、核心业务属性。
- 标明关联基数，并在对业务逻辑有影响时注明物理删除/软删除机制。
- 关联消费该实体的 `FLOW-*` / `CMP-*` —— **严禁在各个页面的 Bundle 内冗余复制全局 ER 图**。

---

## 向设计阶段 (`/spec`) 交接

AI Agent 在填充页面 `db:` 字段时，会沿着 LCA 向上层路径**读取** `common/db-erd.md`。

在叶子节点的 Bundle 中：
1. **`spec.entities` / `spec.relationships`** — 该页面涉及的实体子集。
2. **`design.sections[].db`** — `schema` (表名或 ER 实体名), `field` (列名), 枚举映射 `enumMapping`。
3. **`spec.ui.list.columns[].key`** — 对应数据库字段或标注 `#derived-data`。
4. **`bind.field`** — Payload / API 请求体字段，与后端 `01` 对齐。

Split 分解后：`entities` 与布局相关的 `db` 提取至 **`ir/design.yaml`**。

---

## 三个维度的命名约定

| 概念维度 | 示例 | 职责分工 |
|---|---|---|
| ER 业务实体 (图表) | `Customer`, `Order` | 在 `db-erd.md` 中定义 |
| 物理表 / Schema | `customers`, `orders` | 在 `design.db.schema` 与 `01` 的 `table:` 中定义 |
| 代码生成实体类 | `CustomerEntity` | 在 `gen.codegen.entity` 与 OpenAPI 契约中定义 |
