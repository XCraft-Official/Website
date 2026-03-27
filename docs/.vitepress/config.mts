import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "XCraft",
  description: "Official Website",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XCraft-Official/Website' },
      { icon: 'qq', link: 'https://qm.qq.com/q/T50fsooFcO' },
      { icon: 'discord', link: 'https://discord.gg/FV7mkArw' }
    ]
  }
})
