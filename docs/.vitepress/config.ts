import { defineConfig } from 'vitepress';

const SPECS_BASE =
  'https://github.com/algoux/standard-ranklist/blob/master/specs';

export default defineConfig({
  title: 'Standard Ranklist',
  description: 'A unified data format for competitive programming ranklists',

  locales: {
    // root: {
    //   label: 'English',
    //   lang: 'en',
    // },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '介绍', link: '/zh/introduction/what-is-srk' },
          { text: '指南', link: '/zh/guide/getting-started' },
          { text: '生态', link: '/zh/ecosystem/overview' },
          { text: '参考', link: '/zh/reference/data-types' },
          {
            text: 'Spec',
            link: 'https://github.com/algoux/standard-ranklist/blob/master/specs/README.md',
          },
          { text: 'Playground', link: 'https://rl.algoux.org/playground' },
        ],
        lastUpdated: {
          text: '上次更新',
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        outlineTitle: '本页目录',
        lightModeSwitchTitle: '切换到亮色主题',
        darkModeSwitchTitle: '切换到暗色主题',
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '目录',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
      },
    },
  },

  themeConfig: {
    i18nRouting: true,

    nav: [
      { text: 'Intro', link: '/en/introduction/what-is-srk' },
      { text: 'Guide', link: '/en/guide/getting-started' },
      { text: 'Ecosystem', link: '/en/ecosystem/overview' },
      { text: 'Reference', link: '/en/reference/data-types' },
      {
        text: 'Spec',
        link: 'https://github.com/algoux/standard-ranklist/blob/master/specs/README.md',
      },
      { text: 'Playground', link: 'https://rl.algoux.org/playground' },
    ],

    sidebar: {
      '/en/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is srk?', link: '/en/introduction/what-is-srk' },
            { text: 'Core Concepts', link: '/en/introduction/core-concepts' },
            { text: 'Ecosystem', link: '/en/introduction/ecosystem' },
          ],
        },
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/en/guide/getting-started' },
            { text: 'Contest & Problems', link: '/en/guide/contest-and-problems' },
            { text: 'Participants', link: '/en/guide/participants' },
            { text: 'Rows', link: '/en/guide/rows' },
            { text: 'Series & Segments', link: '/en/guide/series-and-segments' },
            { text: 'Sorting', link: '/en/guide/sorter' },
            { text: 'Markers', link: '/en/guide/markers' },
            { text: 'Advanced', link: '/en/guide/advanced' },
          ],
        },
        {
          text: 'Ecosystem',
          items: [
            { text: 'Toolchain Overview', link: '/en/ecosystem/overview' },
            { text: 'Renderer Component', link: '/en/ecosystem/renderer' },
            { text: 'Utils Library', link: '/en/ecosystem/utils' },
            { text: 'Format Conversion', link: '/en/ecosystem/convert-to' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Data Types', link: '/en/reference/data-types' },
            { text: 'Versioning', link: '/en/reference/versioning' },
          ],
        },
      ],

      '/zh/': [
        {
          text: '介绍',
          items: [
            { text: '什么是 srk？', link: '/zh/introduction/what-is-srk' },
            { text: '核心概念', link: '/zh/introduction/core-concepts' },
            { text: '生态概览', link: '/zh/introduction/ecosystem' },
          ],
        },
        {
          text: '指南',
          items: [
            { text: '快速上手', link: '/zh/guide/getting-started' },
            { text: '比赛信息与题目', link: '/zh/guide/contest-and-problems' },
            { text: '参赛者', link: '/zh/guide/participants' },
            { text: '排名行', link: '/zh/guide/rows' },
            { text: '排名系列与奖区', link: '/zh/guide/series-and-segments' },
            { text: '排序算法', link: '/zh/guide/sorter' },
            { text: '标记系统', link: '/zh/guide/markers' },
            { text: '进阶特性', link: '/zh/guide/advanced' },
          ],
        },
        {
          text: '生态',
          items: [
            { text: '工具链总览', link: '/zh/ecosystem/overview' },
            { text: 'Renderer 渲染组件', link: '/zh/ecosystem/renderer' },
            { text: 'Utils 工具库', link: '/zh/ecosystem/utils' },
            { text: '格式转换工具', link: '/zh/ecosystem/convert-to' },
          ],
        },
        {
          text: '参考',
          items: [
            { text: '数据类型速查', link: '/zh/reference/data-types' },
            { text: '版本与兼容性', link: '/zh/reference/versioning' },
          ],
        },
      ],
    },

    outline: {
      level: [2, 3],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/algoux/standard-ranklist' },
    ],

    editLink: {
      pattern:
        'https://github.com/algoux/standard-ranklist/edit/master/docs/:path',
    },
  },
});
