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

    search: {
      provider: 'algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID || '',
        apiKey: process.env.ALGOLIA_API_KEY || '',
        indexName: 'srk doc website',
        askAi: {
          assistantId: process.env.ALGOLIA_ASSISTANT_ID || '',
        },
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
              modal: {
                searchBox: {
                  // @ts-ignore
                  clearButtonTitle: '清除',
                  clearButtonAriaLabel: '清除查询',
                  closeButtonText: '关闭',
                  closeButtonAriaLabel: '关闭',
                  placeholderText: '搜索文档或向 AI 提问',
                  placeholderTextAskAi: '再问一个问题...',
                  placeholderTextAskAiStreaming: '正在回答...',
                  searchInputLabel: '搜索',
                  backToKeywordSearchButtonText: '返回关键词搜索',
                  backToKeywordSearchButtonAriaLabel: '返回关键词搜索',
                  newConversationPlaceholder: '提问',
                  conversationHistoryTitle: '我的对话历史',
                  startNewConversationText: '开始新的对话',
                  viewConversationHistoryText: '对话历史',
                  threadDepthErrorPlaceholder: '对话已达上限',
                },
                newConversation: {
                  newConversationTitle: '我今天能帮你什么？',
                  newConversationDescription:
                    '我会搜索你的文档，快速帮你找到设置指南、功能细节和故障排除提示。',
                },
                footer: {
                  selectText: '选择',
                  // @ts-ignore
                  submitQuestionText: '提交问题',
                  selectKeyAriaLabel: '回车键',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '向上箭头',
                  navigateDownKeyAriaLabel: '向下箭头',
                  closeText: '关闭',
                  backToSearchText: '返回搜索',
                  closeKeyAriaLabel: 'Esc 键',
                  poweredByText: '由…提供支持',
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查网络连接。',
                },
                startScreen: {
                  recentSearchesTitle: '最近',
                  noRecentSearchesText: '暂无最近搜索',
                  saveRecentSearchButtonTitle: '保存此搜索',
                  removeRecentSearchButtonTitle: '从历史记录中移除此搜索',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除此搜索',
                  // @ts-ignore
                  recentConversationsTitle: '最近对话',
                  removeRecentConversationButtonTitle: '从历史记录中移除此对话',
                },
                noResultsScreen: {
                  noResultsText: '未找到相关结果',
                  suggestedQueryText: '尝试搜索',
                  reportMissingResultsText: '认为此查询应该有结果？',
                  reportMissingResultsLinkText: '告诉我们。',
                },
                resultsScreen: {
                  askAiPlaceholder: '询问 AI：',
                  noResultsAskAiPlaceholder: '文档里没找到？让 Ask AI 帮忙：',
                },
                askAiScreen: {
                  disclaimerText: '回答由 AI 生成，可能会出错。请核实。',
                  relatedSourcesText: '相关来源',
                  thinkingText: '思考中...',
                  copyButtonText: '复制',
                  copyButtonCopiedText: '已复制！',
                  copyButtonTitle: '复制',
                  likeButtonTitle: '喜欢',
                  dislikeButtonTitle: '不喜欢',
                  thanksForFeedbackText: '感谢你的反馈！',
                  preToolCallText: '搜索中...',
                  duringToolCallText: '搜索中...',
                  afterToolCallText: '已搜索',
                  stoppedStreamingText: '你已停止此回复',
                  errorTitleText: '聊天错误',
                  threadDepthExceededMessage: '为保持回答准确，此对话已关闭。',
                  startNewConversationButtonText: '开始新的对话',
                },
              },
            },
            askAi: {
              sidePanel: {
                button: {
                  translations: {
                    buttonText: '询问 AI',
                    buttonAriaLabel: '询问 AI',
                  },
                },
                panel: {
                  translations: {
                    header: {
                      title: '询问 AI',
                      conversationHistoryTitle: '我的对话历史',
                      newConversationText: '开始新的对话',
                      viewConversationHistoryText: '对话历史',
                    },
                    promptForm: {
                      promptPlaceholderText: '提问',
                      promptAnsweringText: '正在回答...',
                      promptAskAnotherQuestionText: '再问一个问题',
                      promptDisclaimerText: '回答由 AI 生成，可能会出错。',
                      promptLabelText: '按回车发送，Shift+回车换行。',
                      promptAriaLabelText: '问题输入',
                    },
                    conversationScreen: {
                      preToolCallText: '搜索中...',
                      searchingText: '搜索中...',
                      toolCallResultText: '已搜索',
                      conversationDisclaimer:
                        '回答由 AI 生成，可能会出错。请核实。',
                      reasoningText: '推理中...',
                      thinkingText: '思考中...',
                      relatedSourcesText: '相关来源',
                      stoppedStreamingText: '你已停止此回复',
                      copyButtonText: '复制',
                      copyButtonCopiedText: '已复制！',
                      likeButtonTitle: '喜欢',
                      dislikeButtonTitle: '不喜欢',
                      thanksForFeedbackText: '感谢你的反馈！',
                      errorTitleText: '聊天错误',
                    },
                    newConversationScreen: {
                      titleText: '我今天能帮你什么？',
                      introductionText:
                        '我会搜索你的文档，快速帮你找到设置指南、功能细节和故障排除提示。',
                    },
                    logo: {
                      poweredByText: '由…提供支持',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
