# 🛠 CLI 命令与 Agent 技能手册 (References)

本文档整理了 FlowGrid 提供的完整命令行工具（CLI Commands）、模型上下文协议工具（MCP Tools）以及 AI 智能体技能库（Skills）。

---

## 快速安装 FlowGrid CLI

**运行环境要求：** Node.js **≥ 24**。

**推荐安装方式 — 通过 pnpm 全局安装**（Linux, macOS, WSL, Windows PowerShell 通用）：

```bash
pnpm add -g @shanyucoder/flowgrid@latest
```

| 常用替代安装方式 | 命令 |
| :--- | :--- |
| **GitHub 全局安装（开发分支）** | `pnpm add -g github:ShanYuCoder/flowgrid --allow-build=@shanyucoder/flowgrid` |
| **npx 即时调用** | `npx -y -p @shanyucoder/flowgrid@latest flowgrid <command>` |
| **npm 全局安装** | `npm install -g @shanyucoder/flowgrid@latest` |
| **Bash 脚本一键安装** | `curl -fsSL https://raw.githubusercontent.com/ShanYuCoder/flowgrid/main/install.sh \| bash` |

- **CLI 更新：** `flowgrid update`
- **检查新版本：** `flowgrid update --check`
- **卸载：** `flowgrid uninstall`

---

## ⚙️ 核心处理引擎命令 (FlowGrid CLI)

FlowGrid 组织了三大底层处理引擎：**文档引擎 (Docs Engine)**、**代码引擎 (Code Engine)** 和 **测试引擎 (Test Engine)**：

### 1. 文档引擎 (Docs Engine — 规格与文档管理)

| FlowGrid 命令 | 功能描述 |
| :--- | :--- |
| `flowgrid split` | 将 `.bundle.yaml` 拆分为 `ir/design.yaml`, `ir/spec.yaml`, `ir/generated/spec.md`。 |
| `flowgrid split_all` | 递归扫描并拆分工作区内所有的 Bundle YAML 文件。 |
| `flowgrid render` | 将 UI 设计规范从 YAML 重新渲染为 Markdown（数据字典与状态矩阵）。 |
| `flowgrid dev` | 启动本地 VitePress 文档中心服务（默认端口 **5173**）与测试文档中心（端口 **5174**）。 |
| `flowgrid build` | 执行 `vitepress build` 编译静态文档站点。 |
| `flowgrid publish` | 发布文档资产并生成 `CATALOG.md`。 |
| `flowgrid openapi_gen` | 从 `01-backend-spec.yaml` 自动生成或更新 OpenAPI 片段。 |
| `flowgrid openapi_render` | 将各 OpenAPI YAML 片段整合汇总到 `docs/openapi/api.yaml`。 |
| `flowgrid openapi_build_ui`| 为文档中心构建静态 Swagger UI 在线交互界面。 |
| `flowgrid api:check` | 在生成后端代码前校验 `01-backend-spec.yaml` 的合法性。 |

### 2. 审计与安全防护命令 (PR 审核与静态质量门禁)

| 命令 | 概述 |
| :--- | :--- |
| `flowgrid audit` | 显示审计帮助信息。 |
| `flowgrid audit spec …` | 审计前端 UI/spec bundle 规格文件及交互状态完整度。 |
| `flowgrid audit api …` | 审计 `01-backend-spec.yaml` 后端接口契约规格。 |
| `flowgrid audit flow …` | 审计 `FLOW-*.md` 业务流章节完整性与跨屏引用。 |
| `flowgrid audit testcase …` | 审计 `TC-*.yaml` 测试用例与页面特征包的一致性。 |
| `flowgrid audit fe-be …` | 校验前端 `apiRef` 与后端接口规范的字段映射与对齐。 |
| `flowgrid audit scenario …`| 审计场景覆盖率。 |
| `flowgrid audit e2e …` | 审计 Playwright 自动化测试与测试用例计划的覆盖度。 |
| `flowgrid harness sync` | 从 `.flowgrid/config.json` 自动同步技能、规则与 MCP 配置到各 IDE。 |
| `flowgrid doctor` | 全面体检工作区配置、MCP 环境变量及工具链健康度。 |
| `flowgrid doctor --fix` | 自动修复缺失的 `AGENTS.md` 并重新同步治理骨架。 |

### 3. 测试引擎 (Test Engine — 测试与质量保障)

| FlowGrid 命令 | 功能描述 |
| :--- | :--- |
| `flowgrid cases:render` | 在测试文档中心中将 Testplan YAML 矩阵渲染为 Markdown。 |
| `flowgrid cases:check` | 验证测试计划 YAML 的语法及 JSON Schema 合规性。 |
| `flowgrid cases:gate` | CI/CD 质量准入强关卡（Schema v2 + TC 审计 + 追溯性检查）。 |
| `flowgrid cases:coverage` | 计算测试场景覆盖率，快速发现无测试用例的规格页面。 |
| `flowgrid testcase:gen` | 根据 TC YAML 自动生成 Playwright E2E UI 自动化测试用例代码。 |
| `flowgrid testcase:gen:api`| 根据 TC YAML 自动生成 Playwright API 自动化测试用例钩子。 |

### 4. 代码引擎 (Code Engine — 代码与单元测试自动生成)

| FlowGrid 命令 | 功能描述 |
| :--- | :--- |
| `flowgrid gen` | 根据 `ir/design.yaml` 自动生成前端 UI 页面与组件代码。 |
| `flowgrid unit-gen` | 自动生成前端组件单元测试用例套件（Jest / Vitest）。 |
| `flowgrid api-gen` | 根据 `ir/spec.yaml` 自动生成后端路由、控制器与服务代码。 |
| `flowgrid api-unit-gen` | 自动生成后端单元测试用例套件（Pytest, PHPUnit, xUnit）。 |
| `flowgrid contract-gen` | 自动生成共享 TypeScript 接口类型与 DTO 契约。 |
| `flowgrid build-template-code --sample=<dir>` | 深度学习既有黄金样例（Golden Sample）模块的 AST 结构与代码习惯。 |
| `flowgrid build-template-code --yes` | 将训练好的自定义模板写入 `.flowgrid/adapters/` 适配器中。 |
