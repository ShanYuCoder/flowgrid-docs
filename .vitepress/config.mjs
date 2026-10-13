import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

const skillGroups = [
  {
    text: 'AI Skills (Setup & Discovery)',
    items: [
      { text: '/init', link: '/references/skills/init' },
      { text: '/help-plan', link: '/references/skills/help-plan' },
      { text: '/extract-legacy', link: '/references/skills/extract-legacy' },
    ],
  },
  {
    text: 'AI Skills (Phase 1 — Design)',
    items: [
      { text: '/spec', link: '/references/skills/spec' },
      { text: '/trace (Maintain)', link: '/references/skills/trace' },
      { text: '/legacy (Rebase)', link: '/references/skills/legacy' },
      { text: '/grill-bqa', link: '/references/skills/grill-bqa' },
      { text: '/grill-dev', link: '/references/skills/grill-dev' },
      { text: '/grill-docs', link: '/references/skills/grill-docs' },
      { text: '/update-spec', link: '/references/skills/update-spec' },
      { text: '/qa-resolve', link: '/references/skills/qa-resolve' },
    ],
  },
  {
    text: 'AI Skills (Phase 2)',
    items: [
      { text: '/docs-hub & CLI', link: '/references/skills/docs-hub' },
      { text: '/build-templates', link: '/references/skills/build-templates' },
      { text: '/openapi', link: '/references/skills/openapi' },
    ],
  },
  {
    text: 'AI Skills (Phase 2a - Scaffold FE)',
    items: [
      { text: '/prototype', link: '/references/skills/prototype' },
      { text: '/grill-prototype', link: '/references/skills/grill-prototype' },
      { text: '/model', link: '/references/skills/model' },
    ],
  },
  {
    text: 'AI Skills (Phase 2b - Tests)',
    items: [
      { text: '/grill-testcase', link: '/references/skills/grill-testcase' },
      { text: '/scenario', link: '/references/skills/scenario' },
      { text: 'testcase:gen', link: '/references/skills/testcase' },
      { text: '/test-api', link: '/references/skills/test-api' },
      { text: 'testcase:gen:api', link: '/references/skills/test-api' },
      { text: '/test', link: '/references/skills/test' },
      { text: '/grill-unit', link: '/references/skills/grill-unit' },
      { text: '/grill-test', link: '/references/skills/grill-test' },
    ],
  },
  {
    text: 'AI Skills (Phase 2c - Backend Unit)',
    items: [{ text: '/unit', link: '/references/skills/unit' }],
  },
  {
    text: 'AI Skills (Phase 3 - API & Wire)',
    items: [
      { text: '/api', link: '/references/skills/api' },
      { text: '/grill-api (router)', link: '/references/skills/grill-api' },
      { text: '/api-spec', link: '/references/skills/api-spec' },
      { text: '/grill-api-spec', link: '/references/skills/grill-api-spec' },
      { text: '/audit-api', link: '/references/skills/audit-api' },
      { text: '/api-update', link: '/references/skills/api-update' },
      { text: '/wire', link: '/references/skills/wire' },
      { text: '/grill-wire', link: '/references/skills/grill-wire' },
    ],
  },
  {
    text: 'AI Skills (Phase 4)',
    items: [
      { text: '/decision', link: '/references/skills/decision' },
      { text: '/architecture', link: '/references/skills/architecture' },
      { text: '/architecture-grill', link: '/references/skills/architecture-grill' },
      { text: '/overview', link: '/references/skills/overview' },
      { text: '/surfaces', link: '/references/skills/surfaces' },
      { text: '/module', link: '/references/skills/module' },
      { text: '/user-flow', link: '/references/skills/user-flow' },
      { text: '/background-logic', link: '/references/skills/background-logic' },
      { text: '/db-erd', link: '/references/skills/db-erd' },
    ],
  },
  {
    text: 'AI Skills (Phase 5)',
    items: [
      { text: '/grill', link: '/references/skills/grill' },
      { text: '/call-external', link: '/references/skills/call-external' },
      { text: '/common', link: '/references/skills/common' },
      { text: '/common-spec (deprecated)', link: '/references/skills/common-spec' },
      { text: '/cross-service', link: '/references/skills/cross-service' },
      { text: '/cross-entity-service', link: '/references/skills/cross-entity-service' },
      { text: '/cross-cutting', link: '/references/skills/cross-cutting' },
      { text: '/deployment', link: '/references/skills/deployment' },
    ],
  },
  {
    text: 'AI Skills (Phase 6)',
    items: [
      { text: '/business-impact-review', link: '/references/skills/business-impact-review' },
    ],
  },
];

/** Nested sidebar groups need `collapsed` set or VitePress renders them always open (no caret). */
const skillSidebarGroupsEn = skillGroups.map((group) => ({
  ...group,
  collapsed: true,
}));

const skillSidebarGroupsVi = skillGroups.map((group) => ({
  ...group,
  collapsed: true,
  items: group.items.map((item) => ({
    ...item,
    link: `/vi${item.link}`,
  })),
}));

const skillSidebarGroupsZh = skillGroups.map((group) => ({
  ...group,
  collapsed: true,
  items: group.items.map((item) => ({
    ...item,
    link: `/zh${item.link}`,
  })),
}));

const skillSidebarGroupsJa = skillGroups.map((group) => ({
  ...group,
  collapsed: true,
  items: group.items.map((item) => ({
    ...item,
    link: `/ja${item.link}`,
  })),
}));

export default withMermaid(
  defineConfig({
    title: 'FlowGrid Docs',
    ignoreDeadLinks: true,
    srcExclude: ['README.md', 'README.*.md'],
    description:
      'Enterprise Disciplined AI Engineering Platform (Graph, DNA, Docs, Test, Codegen)',
    locales: {
      root: {
        label: 'English',
        lang: 'en-US',
        themeConfig: {
          nav: [
            { text: 'Home', link: '/' },
            { text: 'Overview', link: '/overview/' },
            { text: 'Strengths', link: '/overview/strengths' },
          ],
          sidebar: [
            { text: 'README', link: '/readme' },
            { text: 'Overview', link: '/overview/' },
            { text: 'Architectural Strengths', link: '/overview/strengths' },
            {
              text: 'Workspace Structure',
              link: '/artifacts/',
            },
            {
              text: 'Workflows',
              link: '/workflows/',
              collapsed: true,
              items: [
                { text: 'Overview (Phases & Roles)', link: '/workflows/' },
                { text: 'Phase 0 — Setup', link: '/workflows/phase-0-setup' },
                { text: 'Design', link: '/workflows/design' },
                { text: 'Backend', link: '/workflows/backend' },
                { text: 'Test', link: '/workflows/test' },
                { text: 'Wire', link: '/workflows/wire' },
                { text: 'Gate & Audit', link: '/workflows/gates' },
                { text: 'Grill & Review', link: '/workflows/grill-and-human-review' },
                { text: 'QA Inbox', link: '/workflows/qa-team' },
              ],
            },
            {
              text: 'References',
              collapsed: true,
              items: [
                { text: 'CLI & Commands', link: '/references/cli-and-commands' },
                { text: 'Audit & Gap Check', link: '/references/audit-commands' },
                { text: 'Plugins', link: '/references/plugins' },
                {
                  text: 'Skills',
                  collapsed: true,
                  items: skillSidebarGroupsEn,
                },
              ],
            },
          ],
        },
      },
      vi: {
        label: 'Tiếng Việt',
        lang: 'vi-VN',
        link: '/vi/',
        themeConfig: {
          nav: [
            { text: 'Trang chủ', link: '/vi/' },
            { text: 'Tổng quan', link: '/vi/overview/' },
            { text: 'Điểm mạnh', link: '/vi/overview/strengths' },
          ],
          sidebar: [
            { text: 'README', link: '/vi/readme' },
            { text: 'Tổng quan', link: '/vi/overview/' },
            { text: 'Điểm mạnh Kiến trúc', link: '/vi/overview/strengths' },
            {
              text: 'Cấu trúc Workspace',
              link: '/vi/artifacts/',
            },
            {
              text: 'Quy trình (Workflows)',
              link: '/vi/workflows/',
              collapsed: true,
              items: [
                { text: 'Tổng thể (phase & vai trò)', link: '/vi/workflows/' },
                { text: 'Phase 0 — Setup', link: '/vi/workflows/phase-0-setup' },
                { text: 'Design', link: '/vi/workflows/design' },
                { text: 'Backend', link: '/vi/workflows/backend' },
                { text: 'Test', link: '/vi/workflows/test' },
                { text: 'Wire', link: '/vi/workflows/wire' },
                { text: 'Gate & audit', link: '/vi/workflows/gates' },
                { text: 'Grill & review', link: '/vi/workflows/grill-and-human-review' },
                { text: 'QA inbox (team)', link: '/vi/workflows/qa-team' },
              ],
            },
            {
              text: 'Tra cứu (References)',
              collapsed: true,
              items: [
                { text: 'CLI & Commands', link: '/vi/references/cli-and-commands' },
                { text: 'Audit & gap check', link: '/vi/references/audit-commands' },
                { text: 'Plugins', link: '/vi/references/plugins' },
                {
                  text: 'Kỹ năng (Skills)',
                  collapsed: true,
                  items: skillSidebarGroupsVi,
                },
              ],
            },
          ],
        },
      },
      zh: {
        label: '简体中文',
        lang: 'zh-CN',
        link: '/zh/',
        themeConfig: {
          nav: [
            { text: '首页', link: '/zh/' },
            { text: '概览', link: '/zh/overview/' },
            { text: '核心优势', link: '/zh/overview/strengths' },
          ],
          sidebar: [
            { text: 'README 说明', link: '/zh/readme' },
            { text: '概览', link: '/zh/overview/' },
            { text: '架构核心优势', link: '/zh/overview/strengths' },
            {
              text: '工作区结构',
              link: '/zh/artifacts/',
            },
            {
              text: '工作流 (Workflows)',
              link: '/zh/workflows/',
              collapsed: true,
              items: [
                { text: '全局概览 (阶段与角色)', link: '/zh/workflows/' },
                { text: 'Phase 0 — 初始化设置', link: '/zh/workflows/phase-0-setup' },
                { text: 'Design 设计阶段', link: '/zh/workflows/design' },
                { text: 'Backend 后端开发', link: '/zh/workflows/backend' },
                { text: 'Test 测试阶段', link: '/zh/workflows/test' },
                { text: 'Wire 联调集成', link: '/zh/workflows/wire' },
                { text: 'Gate & 审计检查', link: '/zh/workflows/gates' },
                { text: 'Grill 业务质询 & 评审', link: '/zh/workflows/grill-and-human-review' },
                { text: 'QA 团队收件箱', link: '/zh/workflows/qa-team' },
              ],
            },
            {
              text: '参考手册 (References)',
              collapsed: true,
              items: [
                { text: 'CLI 与命令', link: '/zh/references/cli-and-commands' },
                { text: '审计与缺口检查', link: '/zh/references/audit-commands' },
                { text: 'IDE 与 Agent 插件', link: '/zh/references/plugins' },
                {
                  text: 'Skills 技能库',
                  collapsed: true,
                  items: skillSidebarGroupsZh,
                },
              ],
            },
          ],
        },
      },
      ja: {
        label: '日本語',
        lang: 'ja-JP',
        link: '/ja/',
        themeConfig: {
          nav: [
            { text: 'ホーム', link: '/ja/' },
            { text: '概要', link: '/ja/overview/' },
            { text: '強み・優位性', link: '/ja/overview/strengths' },
          ],
          sidebar: [
            { text: 'README 説明書', link: '/ja/readme' },
            { text: '概要 (Overview)', link: '/ja/overview/' },
            { text: 'アーキテクチャの強み', link: '/ja/overview/strengths' },
            {
              text: 'ワークスペース構造',
              link: '/ja/artifacts/',
            },
            {
              text: 'ワークフロー (Workflows)',
              link: '/ja/workflows/',
              collapsed: true,
              items: [
                { text: '全体像 (フェーズと役割)', link: '/ja/workflows/' },
                { text: 'Phase 0 — セットアップ', link: '/ja/workflows/phase-0-setup' },
                { text: 'Design 設計', link: '/ja/workflows/design' },
                { text: 'Backend バックエンド', link: '/ja/workflows/backend' },
                { text: 'Test テスト', link: '/ja/workflows/test' },
                { text: 'Wire 統合連携', link: '/ja/workflows/wire' },
                { text: 'Gate ＆ 監査チェック', link: '/ja/workflows/gates' },
                { text: 'Grill 業務レビュー ＆ 確定', link: '/ja/workflows/grill-and-human-review' },
                { text: 'QA チーム受信トレイ', link: '/ja/workflows/qa-team' },
              ],
            },
            {
              text: 'リファレンス (References)',
              collapsed: true,
              items: [
                { text: 'CLI コマンド一覧', link: '/ja/references/cli-and-commands' },
                { text: '監査 ＆ ギャップ検出', link: '/ja/references/audit-commands' },
                { text: 'IDE ＆ Agent プラグイン', link: '/ja/references/plugins' },
                {
                  text: 'Skills スキル一覧',
                  collapsed: true,
                  items: skillSidebarGroupsJa,
                },
              ],
            },
          ],
        },
      },
    },
    mermaid: {},
    vite: {
      optimizeDeps: {
        include: ['mermaid', 'fastdom'],
      },
    },
  }),
);
