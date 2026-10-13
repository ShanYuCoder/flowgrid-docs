# 🔌 Multi-Agent Plugin & IDE Integration Guide

FlowGrid supports both **Workspace Harness Materialization** (via `flowgrid init` / `harness sync`) and **Native Multi-Agent Plugins** across the modern AI coding ecosystem.

By adhering to standard plugin specifications, FlowGrid can be installed directly into your favorite AI agent or IDE without manually copying skill folders into every repository.

---

## 1. Supported AI Agents & IDEs

| Agent / IDE | Plugin Manifest / Config | Installation Command |
| :--- | :--- | :--- |
| **Google Antigravity IDE** | `.antigravity-plugin/plugin.json` | `agy plugin install https://github.com/ShanYuCoder/flowgrid` |
| **Claude Code** | `.claude-plugin/plugin.json`<br>`.claude-plugin/marketplace.json` | `/plugin marketplace add ShanYuCoder/flowgrid`<br>`/plugin install flowgrid@flowgrid-marketplace` |
| **Cursor** | `.cursor-plugin/plugin.json`<br>`hooks/hooks-cursor.json` | `/add-plugin flowgrid` or auto-detected in workspace |
| **Gemini CLI** | `gemini-extension.json`<br>`AGENTS.md` | `gemini extensions install https://github.com/ShanYuCoder/flowgrid` |
| **OpenAI Codex** | `.codex-plugin/plugin.json` | `/plugins install flowgrid` |
| **Devin CLI** | `.devin-plugin/plugin.json` | `devin plugins install ShanYuCoder/flowgrid` |
| **Standard Agents** | `.agents/plugins/marketplace.json` | Auto-discovered in `.agents/plugins/` |

---

## 2. Installation Instructions by Platform

### Google Antigravity IDE
Install FlowGrid as an official plugin directly from the repository:
```bash
agy plugin install https://github.com/ShanYuCoder/flowgrid
```
Antigravity automatically discovers all skills (`/help-plan`, `/spec`, `/update-spec`, `/grill`, `/trace`, etc.) and exposes suggested prompts.

### Claude Code
Add the FlowGrid marketplace and install the plugin:
```bash
/plugin marketplace add ShanYuCoder/flowgrid
/plugin install flowgrid@flowgrid-marketplace
```
Claude Code automatically activates the `SessionStart` lifecycle hook upon launch, priming the agent with FlowGrid's core directives.

### Cursor
In Cursor Agent chat:
```text
/add-plugin flowgrid
```
Or open a project containing `.cursor-plugin/plugin.json`. Cursor will automatically register the skills path and execute `hooks/hooks-cursor.json` on session startup.

### Gemini CLI
Install FlowGrid as a Gemini extension:
```bash
gemini extensions install https://github.com/ShanYuCoder/flowgrid
```

### Devin CLI
Install FlowGrid into Devin:
```bash
devin plugins install ShanYuCoder/flowgrid
```

---

## 3. Lifecycle Hooks (`hooks/`)

FlowGrid includes cross-platform lifecycle hooks in `hooks/`:
- **`hooks/hooks.json`**: Claude Code `SessionStart` configuration.
- **`hooks/hooks-cursor.json`**: Cursor `sessionStart` configuration.
- **`hooks/run-hook.cmd`**: Polyglot wrapper running bash on Unix and finding Git Bash on Windows.
- **`hooks/session-start`**: Injects FlowGrid context at the start of each chat session.

### What the Session-Start Hook Does:
Upon opening a new session, the hook primes the AI agent with FlowGrid's fundamental engineering rules:
1. **The Hard-Gate:** Strictly forbidden to generate code or mutate files before spec approval.
2. **Implementation Planning (`/help-plan`):** Mandates tracing all 5 links of related user flows, baselining active code reality via `/trace`, and evaluating the Top 5 production failure modes.
3. **The Iron Law of Verification:** Forbids subjective claims of task completion without terminal command execution and Exit Code 0 evidence.

---

## 4. Native Plugin vs Workspace Harness (`flowgrid init`)

FlowGrid offers two flexible operational modes:

| Mode | How it works | Best for |
| :--- | :--- | :--- |
| **Native Plugin** | Installed once globally or via Agent Marketplace. Skills trigger across any repository. | Individual developers using Claude Code, Cursor, Antigravity, or Codex across multiple projects. |
| **Workspace Harness (`flowgrid init`)** | Materializes `.flowgrid/config.json`, local MCP servers, and `.cursor/` / `.antigravity/` / `.agents/` inside the repo. | Enterprise teams, CI/CD pipelines, Monorepos, and centralized Documentation Hubs (`FLOWGRID_DOCS_ROOT`). |
