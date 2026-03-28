import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "XCraft",
  description: "Official Website",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '赞助支持', link: '/sponsor' },
      { text: '友情链接', link: '/friends' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XCraft-Official/Website' },
      { icon: 'qq', link: 'https://qm.qq.com/q/T50fsooFcO' },
      { icon: 'discord', link: 'https://discord.gg/FV7mkArw' }
    ],

    footer: {
      message: '"Minecraft" 和 "我的世界" 是 Mojang AB 的注册商标。本站与 Mojang 或 Microsoft 无任何关联。',
      copyright: 'Copyright © 2024-present XCraft'
    }
  }
})
