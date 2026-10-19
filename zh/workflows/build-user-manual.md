# 工作流：自动构建最终用户手册 (User Manuals)

在 **FlowGrid** 体系中，面向最终用户的操作手册从来不是纯手工编写的。它是**技术规格说明 (Spec)** 与**自动化测试实证 (E2E 截图)** 的自动化合成产物，确保操作手册与当前运行的生产系统百分之百吻合。

本文档详细说明从 AI 辅助生成本地手册草稿，到自动同步发布至 **Google Docs** 供最终用户与业务干系人查阅的完整闭环流程。

---

## 1. 准入前提

在构建用户手册前，请确认以下前提已就绪：
1. **规格与业务流已定稿：** 存在业务流规范文档（例如 `surfaces/admin/tenant/user-flows/FLOW-ADM-TENANT-SETUP.md`）。
2. **自动化测试已执行 (Phase 4)：** Playwright/Cypress 自动化测试已绿灯运行完毕，并在 `qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png` 下保存了真实界面的截图实证。
3. **Google Docs API 凭证配置：** 通过服务账号 (Service Account) 获取访问组织 Google Workspace 的权限。
   - 从 Google Cloud 控制台下载服务账号 JSON 私钥文件。
   - 重命名为 `google-credentials.json` 并放置于工作区根目录（或 `.secrets/` 目录中）。
   - **重要安全提示：** 确保将 `google-credentials.json` 和 `.secrets/` 添加到 `.gitignore`，严防私钥被误提交到 Git。
   - FlowGrid 适配器会自动检测此凭据。

---

## 2. 步骤 1：本地手册生成

所有最终用户手册首先在本地生成为 Markdown 文件，作为**单一事实源 (SSOT)**。手册组织围绕**用户旅程 (User Flows)** 展开，而非单纯罗列冰冷的表单字段字典。

**执行命令：**
```bash
flowgrid docs /manual FLOW-ADM-TENANT-SETUP
```

**AI Agent 执行的逻辑：**
1. **解析业务流：** 从 `FLOW-*.md` 中提取用户操作步骤与分支逻辑（例如“若选择企业版，请跳转至第 X 步”）。
2. **参考技术规格：** 阅读页面规格 (`W-*`) 提取宏观语义目的。自动忽略琐碎的表单校验（如必填、邮箱格式、电话位数等界面已内建提示的内容）。
3. **转换为人读操作语言：** 聚焦面向用户的引导：“第 1 步：进入 X 模块…… 第 2 步：填写 Y 信息”。
4. **嵌入 E2E 真实截图：** 自动注入关联 `qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png` 的 Markdown 图片链接。
5. **初始化元数据：** 在文件头部写入 YAML Frontmatter 追踪信息。

**产出文件：**
生成于 `surfaces/admin/user-manuals/tenant/FLOW-ADM-TENANT-SETUP.md`。

```markdown
---
gdoc_id: "" 
gdrive_image_id: "" 
content_hash: ""
---
# 租户配置操作指南
以下为当前系统实际运行界面：
![界面截图](../../../qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png)
...
```

---

## 3. 步骤 2：自动发布至 Google Docs

最终用户通常不习惯查阅原始 Markdown 文件，他们期望直接阅读排版精美的 Google Docs 在线文档。

**执行命令：**
```bash
flowgrid publish manual FLOW-ADM-TENANT-SETUP --target=gdocs
```

**发布适配器架构 (`gdocs-adapter.mjs`)：**

1. **增量变更检测 (Hash 机制)：**
   - 适配器将 Markdown 文本内容与二进制图片数据结合，计算 MD5 哈希值。
   - 对比历史运行记录的 `content_hash`。
   - **优势：** 若内容与图片均未变更，自动跳过发布。保护拥有数百个页面的大型工程免于**超出 Google Docs API 的调用频次配额**。

2. **上传 E2E 截图至 Google Drive：**
   - Google Docs API 无法直接内嵌本地二进制文件。
   - 适配器将 `.png` 截图上传至绑定的 Google Drive 目录，换取临时公开访问 URL。

3. **更新 Google Doc (清空并重写机制 Clear & Replace)：**
   - 若 `gdoc_id` 为空：自动创建全新的 Google Doc，并将生成的文档 ID 回写至本地 Markdown Frontmatter。
   - 若 `gdoc_id` 已存在：调用 `batchUpdate` -> 清空现有内容 (`deleteContentRange`) -> 写入最新图文内容。
   - **优势：** 共享给客户或团队成员的 Google Docs 链接始终保持不变，绝不因文档更新而失效。

---

## 4. 维护与更新策略

> **基本准则：** 发布至 Google Docs 的在线文档**严格属于只读状态 (Read-Only)**。

若产品经理或业务分析师需修改手册内容，修改流向必须自底向上推进：
1. 在技术规格中调整业务逻辑（或直接修改本地 `.md` 文件中的操作文案）。
2. 若界面发生了变化，重新运行 E2E 自动化测试以刷新截图实证。
3. 执行 `flowgrid publish`。

**严禁直接在 Google Docs 网页端手动修改文档内容。** 由于发布适配器采用*清空并重写*机制，下一次本地发布时会彻底覆盖云端手动修改的内容。这一铁律严格保障了 FlowGrid 代码仓库作为单一事实源的权威性。
