import { defineConfig } from 'vitepress'

const currentYear = new Date().getFullYear()

export default defineConfig({
  lang: 'zh-CN',
  title: "XCraft",
  description: "XCraft Minecraft 服务器官方网站 - 生存 · 玩法 · 社区",
  lastUpdated: true,
  cleanUrls: true,
  
  head: [
    ['link', { rel: 'icon', href: '/pic/logo.png' }],
    ['meta', { name: 'theme-color', content: '#18794e' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:site_name', content: 'XCraft' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  sitemap: {
    hostname: 'https://xcraft.example.com',
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我们', link: '/about' },
      { text: '游戏规则', link: '/rules' },
      { text: '赞助支持', link: '/sponsor' },
      { text: '常见问题', link: '/faq' },
      { text: '友情链接', link: '/friends' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XCraft-Official/Website' },
      { icon: 'qq', link: 'https://qm.qq.com/q/T50fsooFcO' },
      { icon: 'discord', link: 'https://discord.gg/FV7mkArw' }
    ],

    footer: {
      message: '"Minecraft" 和 "我的世界" 是 Mojang AB 的注册商标。本站与 Mojang 或 Microsoft 无任何关联。',
      copyright: `Copyright © 2024-${currentYear} XCraft`
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    lastUpdatedText: '最后更新',
    editLink: {
      pattern: 'https://github.com/XCraft-Official/Website/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
