# 审计与缺口检查指令 (CLI ↔ 引擎映射)

**SSOT 参考基准：** `flowgrid audit *` 系列命令是一组确定性的 Node.js 脚本，向标准输出输出结构化的 **JSON**（包含 `gaps[]` 缺口清单、`confirms[]` 待确认项以及引擎专用的缺口错误码）。

**执行时机（质量关卡与阶段）：** [workflows/gates.md](../workflows/gates.md) · **完成关闭功能：** [gates.md § 关闭单项功能](../workflows/gates.md#close-one-function)。

**安装与环境变量：** `FLOWGRID_DOCS_ROOT`、`FLOWGRID_TESTS_DOC`、`--e2e-root` → [cli-and-commands.md](./cli-and-commands.md)。

---

## 命令语法格式

```bash
flowgrid audit <kind> [args…]
flowgrid audit:<kind> [args…]    # 兼容历史别名
flowgrid audit                   # 输出帮助信息
```

在执行 `flowgrid init` 向 `package.json` 注入脚本后，也可使用 `pnpm run flowgrid:audit:<kind>`。

---

## 命令 ↔ 引擎 1:1 映射表

| 检查类型 (Kind) | 执行命令 | 引擎脚本实现 | 核心输入 | 标志参数与环境变量 |
| :--- | :--- | :--- | :--- | :--- |
| **spec** | `flowgrid audit spec` | `engines/spec/lib/audit-bundle-gaps.mjs` | `*.bundle.yaml` (UI/spec) | `--type list \| create \| detail \| admin-crud \| auth \| change-password \| public` |
| **hub-prd** | `flowgrid audit hub-prd` | `engines/docs/lib/audit-hub-prd.mjs` | `overview/index.md`, surface/CMP `index.md` | — |
| **risks** | `flowgrid audit risks` | `engines/docs/lib/audit-risks-catalog.mjs` | **`architecture/11-risks/risk-register.md`** | 风险登记册字段（阈值、诉求、偏差） |
| **flow** | `flowgrid audit flow` | `audit-flow-gaps.mjs` | `FLOW-*.md` | — |
| **api** | `flowgrid audit api` | `audit-api-gaps.mjs` | 接口集成 `*.bundle.yaml` | — |
| **testcase** | `flowgrid audit testcase` | `audit-testcase-gaps.mjs` | `TC-*.yaml` (v2) 或历史用例 | `--bundle <foo.bundle.yaml>` 交叉比对 |
| **fe-be** | `flowgrid audit fe-be` | `audit-fe-be-alignment.mjs` | 前端 UI `*.bundle.yaml` | `--backend-spec …/01-backend-spec.yaml` |
| **scenario** | `flowgrid audit scenario` | `audit-scenario-coverage.mjs` | `SC-*.yaml` / 场景 md | `--tests-docs <hub>` 或 `FLOWGRID_TESTS_DOC` |
| **e2e** | `flowgrid audit e2e` | `audit-e2e-coverage.mjs` | Playwright 代码 + TC 测试计划 | `--id TC-*`, `--tests-docs`, `--screen W-*`, `--strict` |
| **legacy** | `flowgrid audit legacy` | `audit-legacy-gaps.mjs` | `adoption-inventory.md` | `<target-id>` |

---

## 输出与退出代码规则

- 默认向标准输出打印格式化 **JSON** 数据，供 AI 批判性审查技能（Grill Skills）或 Agent 读取 `gaps[]` 自动修复。
- 引擎会区分 `criticalGaps`（阻断性严重缺口）与 `warningGaps`（警告缺口）；CI 流水线中通常使用 **`cases:gate`** 进行测试完备性强卡点。
- UX 规范缺口前缀：`UX_*`、`CONFIRM_UX_*`、`uxAffordanceGaps`。
- 前后端对齐缺口前缀：`FEBE_*`。
- 场景覆盖缺口：当页面未覆盖测试用例时报告 `SC_SCREEN_NO_TC`。

---

## 常用执行示例

```bash
export FLOWGRID_DOCS_ROOT="$(pwd)/docs"
export FLOWGRID_TESTS_DOC="$(pwd)/tests"

# 审计单个页面规格包
flowgrid audit spec surfaces/orders/W-001.bundle.yaml --type list

# 审计测试用例与页面规格的对齐性
flowgrid audit testcase cases/orders/TC-W-001.yaml --bundle surfaces/orders/W-001.bundle.yaml

# 审计前后端 API 字段与契约对齐
flowgrid audit fe-be surfaces/orders/W-001.bundle.yaml
```
