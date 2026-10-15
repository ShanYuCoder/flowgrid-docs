---
name: manual
description: "/manual — Generates End-User Documentation (User Manuals / Help Center guides) anchored on User Flows and E2E Evidences."
disable-model-invocation: true
extractBundle: spec-core
---

# `/manual` - 用户手册生成技能 (User Manual Generation Skill)

本技能用于生成全面、纯非技术性的最终用户操作手册（使用指南/帮助中心文章）。采用以**用户流程为中心（Flow-Centric）**的设计理念，引导用户完成特定任务（Use Case），而非机械罗列页面字段。

## 1. Frontmatter 规范（用于 Google Docs 同步）
生成的每个 Markdown 文件必须以以下 YAML frontmatter 块开头：
```yaml
---
gdoc_id: "" # Populated by adapter
gdrive_image_id: "" # Populated by adapter
content_hash: "" # Populated by adapter
locale: "zh" # 目标文档语言 (BCP-47)
---
```

## 2. 多语言范围与选择 (Multi-Language Scope & Selection)
1. **配置检查:** 读取 `docs/ssot-docs.locale.yaml`，检查支持的文档语言列表（`docsProseLocales`）及默认语言（`defaultDocsProseLocale`）。
2. **命令行参数检查:**
   - 若附带 `--locale=all`: 为 `docsProseLocales` 中的所有语言批量生成手册。
   - 若附带 `--locale=<code >`（例如 `--locale=zh`）: 仅为指定语言生成手册。
3. **交互式询问弹窗 (`AskQuestion`):**
   - 若未提供 `--locale` 参数且配置了多种语言:
     AI Agent 使用 `AskQuestion` 提示用户:
     > *"请选择需要生成的说明手册语言 (Select User Manual language):"*
     > - `(Recommended) [All] 为所有已配置语言生成 (${docsProseLocales.join(', ')})`
     > - `${locale_1}`
     > - `${locale_2}`
     > - ...
   - 若仅配置单语言，则自动采用该语言，无需二次确认。

## 3. 上下文收集 (Context Assembly)
当通过 `/manual <FLOW-ID>`（例如 `/manual FLOW-ADM-TENANT-SETUP`）调用时：
1. **目标定位:** 读取主要用户流程文档（`FLOW-*`）。
2. **上下文提炼:** 仅读取组件规范（`W-*`）以理解主要模块的业务目的，严禁提取具体校验规则。
3. **加载模板:** 读取 `surfaces/_user-manual-page.template.md` 标准用户手册模板。

## 4. 智能证据图链接（无状态路径与自适应回退）
严禁搜索压缩包。读取 `.flowgrid/config.json` 获取 `evidence.base_url`，并从 `.flowgrid/product-i18n.yaml`（或 `config.productI18n`）获取产品界面支持语言（`languages`）和默认语言（`defaultLocale`）。

针对每种目标文档语言 `targetLocale`：
1. **情况 A — 产品界面支持该语言 (`targetLocale ∈ productI18n.languages`) 且截图存在:**
   - 计算 URL: `${base_url}/surfaces/${surface}/${moduleId}/${screenId}.${targetLocale}.png`
   - 嵌入图片: `![Screen Evidence (${targetLocale.toUpperCase()})](${imageUrl})`
   - 图注: `*(系统界面截图: ${targetLocale.toUpperCase()})*`
2. **情况 B — 产品界面支持但尚未捕获截图 (`targetLocale ∈ productI18n.languages`):**
   - 安全回退到默认产品界面截图: `${base_url}/surfaces/${surface}/${moduleId}/${screenId}.png`
   - 嵌入图片: `![Screen Evidence (${defaultLocale.toUpperCase()})](${imageUrl})`
   - 图注: `*(系统真实截图 - 默认界面 ${defaultLocale.toUpperCase()}，暂无 ${targetLocale.toUpperCase()} 截图)*`
3. **情况 C — 产品界面不支持该语言 (`targetLocale ∉ productI18n.languages`):**
   - 应用程序本身无该语言界面翻译，强制使用默认界面截图:
   - 嵌入图片: `![Screen Evidence (${defaultLocale.toUpperCase()})](${imageUrl})`
   - 图注: `*(系统真实截图 - 界面语言 ${defaultLocale.toUpperCase()}，产品不支持 ${targetLocale.toUpperCase()} 界面)*`

## 5. 输出文件结构
- 在多语言工作区中，输出路径为:
  `surfaces/<surface>/user-manuals/<module>/<FLOW-ID>.<targetLocale>.md`
  *(例如 `FLOW-ADM-TENANT-SETUP.zh.md`, `FLOW-ADM-TENANT-SETUP.en.md`)*
- 若工作区仅配置单语言，可省略语言后缀（`<FLOW-ID>.md`）以保持向后兼容。

## 6. 行为约束（纯最终用户视角）
- **聚焦操作旅程，不堆砌字段:** 最终用户清楚电话或邮箱的含义。切勿罗列细碎校验（如“最大50字符”、“必填”），界面自会提示。
- **任务导向叙述:** 按照实际操作动作编写（“第1步：进入管理后台点击添加租户。第2步：输入基本信息...”）。
- **处理分支场景:** 若流程包含条件分支（如“选择企业则显示税号”），务必明确说明替代路径。
- **杜绝技术黑话:** 严禁出现“API”、“DTO”、“Regex”、“Schema”、“Validation”等术语。
- **语言风格统一:**
  - 日语 (`ja`): 标准敬语（丁寧語），礼貌清晰。
  - 中文 (`zh`): 自然流畅、通俗易懂的指导风格。
  - 英语 (`en`): 简练直接，以行动动词为主。
  - 越南语 (`vi`): 亲切友好、步骤明了。

