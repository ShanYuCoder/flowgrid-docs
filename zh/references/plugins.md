# 🔌 多 Agent 插件与 IDE 原生集成指南

FlowGrid 不仅支持**工作区脚手架物化**（通过 `flowgrid init` / `harness sync`），还全面支持现代 AI 编程生态中的**原生多 Agent 插件（Native Multi-Agent Plugins）**标准。

通过遵循各平台的标准插件规范，FlowGrid 可以直接安装到您常用的 AI 编程智能体或 IDE 中，无需向每个代码仓库反复手动复制代码。

---

## 1. 支持的 AI Agents 与 IDE 一览

| Agent / IDE | 插件清单 / 配置文件 | 安装与调用命令 |
| :--- | :--- | :--- |
| **Google Antigravity IDE** | `.antigravity-plugin/plugin.json` | `agy plugin install https://github.com/ShanYuCoder/flowgrid` |
| **Claude Code** | `.claude-plugin/plugin.json`<br>`.claude-plugin/marketplace.json` | `/plugin marketplace add ShanYuCoder/flowgrid`<br>`/plugin install flowgrid@flowgrid-marketplace` |
| **Cursor** | `.cursor-plugin/plugin.json`<br>`hooks/hooks-cursor.json` | `/add-plugin flowgrid` 或工作区自动检测识别 |
| **Gemini CLI** | `gemini-extension.json`<br>`AGENTS.md` | `gemini extensions install https://github.com/ShanYuCoder/flowgrid` |
| **OpenAI Codex** | `.codex-plugin/plugin.json` | `/plugins install flowgrid` |
| **Devin CLI** | `.devin-plugin/plugin.json` | `devin plugins install ShanYuCoder/flowgrid` |
| **标准 Agents** | `.agents/plugins/marketplace.json` | 在 `.agents/plugins/` 目录下自动发现 |

---

## 2. 平台专属安装步骤

### Google Antigravity IDE
直接从 GitHub 仓库安装 FlowGrid 官方插件：
```bash
agy plugin install https://github.com/ShanYuCoder/flowgrid
```
Antigravity 将自动载入所有核心技能（`/help-plan`, `/spec`, `/update-spec`, `/grill`, `/trace` 等）并提供提示词补全。

### Claude Code
添加 FlowGrid 市场源并安装：
```bash
/plugin marketplace add ShanYuCoder/flowgrid
/plugin install flowgrid@flowgrid-marketplace
```
Claude Code 在会话启动时会自动触发 `SessionStart` 生命周期钩子，预热加载 FlowGrid 的工程指令。

### Cursor
在 Cursor 对话窗口中执行：
```text
/add-plugin flowgrid
```
或者直接打开包含 `.cursor-plugin/plugin.json` 的项目，Cursor 将自动识别技能路径并执行启动钩子。

### Gemini CLI
作为 Gemini 扩展安装：
```bash
gemini extensions install https://github.com/ShanYuCoder/flowgrid
```

### Devin CLI
向 Devin 容器环境安装 FlowGrid：
```bash
devin plugins install ShanYuCoder/flowgrid
```

---

## 3. 生命周期钩子 (Lifecycle Hooks)

FlowGrid 提供了标准跨平台的生命周期运行器（Polyglot Runner）：
- **Unix (Linux, macOS, WSL):** `hooks/session-start`
- **Windows (Git Bash, Command Prompt, PowerShell):** `hooks/run-hook.cmd`

在 Agent 启动或工具调用时，钩子会自动向 Agent 注入 FlowGrid 的环境元数据（版本、SSOT 路径状态以及必须遵循的工程规范）。
