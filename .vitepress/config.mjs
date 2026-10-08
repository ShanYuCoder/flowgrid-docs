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
const skillSidebarGroups = skillGroups.map((group) => ({
  ...group,
  collapsed: true,
}));

export default withMermaid(
  defineConfig({
    title: 'FlowGrid Docs',
    ignoreDeadLinks: true,
    srcExclude: ['README.md'],
    description:
      'Enterprise Disciplined AI Engineering Platform (Graph, DNA, Docs, Test, Codegen)',
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Overview', link: '/overview/' },
      ],
      sidebar: [
        { text: 'README', link: '/readme' },
        { text: 'Overview', link: '/overview/' },
        {
          text: 'Cấu trúc Workspace',
          link: '/artifacts/',
        },
        {
          text: 'Workflows',
          link: '/workflows/',
          collapsed: true,
          items: [
            { text: 'Tổng thể (phase & vai trò)', link: '/workflows/' },
            { text: 'Phase 0 — Setup', link: '/workflows/phase-0-setup' },
            { text: 'Design', link: '/workflows/design' },
            { text: 'Backend', link: '/workflows/backend' },
            { text: 'Test', link: '/workflows/test' },
            { text: 'Wire', link: '/workflows/wire' },
            { text: 'Gate & audit', link: '/workflows/gates' },
            { text: 'Grill & review', link: '/workflows/grill-and-human-review' },
            { text: 'QA inbox (team)', link: '/workflows/qa-team' },
          ],
        },
        {
          text: 'References',
          collapsed: true,
          items: [
            { text: 'CLI & Commands', link: '/references/cli-and-commands' },
            { text: 'Audit & gap check', link: '/references/audit-commands' },
            {
              text: 'Skills',
              collapsed: true,
              items: skillSidebarGroups,
            },
          ],
        },
      ],
    },
    mermaid: {},
    vite: {
      optimizeDeps: {
        include: ['mermaid', 'fastdom'],
      },
    },
  }),
);
