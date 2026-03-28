---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "XCraft"
  text: "Official Website"
  tagline: 生存 · 玩法 · 社区
  image:
    src: ./pic/logo.png
    alt: XCraft
  actions:
    - theme: brand
      text: 加入官方Q群
      link: https://qm.qq.com/q/T50fsooFcO
    - theme: alt
      text: 加入官方Discord
      link: https://discord.gg/FV7mkArw

features:
  - icon: 🏰
    title: 多样玩法
    details: 服务器设有小游戏、起床战争、无政府生存等多样玩法供君挑选.
  - icon: 🛡️
    title: 数据安全
    details: 服务器设有数据自动备份、权限管理、数据恢复等机制保障玩家数据安全.
  - icon: 🔗
    title: 多服链接
    details: 旗下多服链接，可快捷加入其他玩法服务器.
---

<MCServerStatus 
  serverAddress="unborder.online" 
  :serverPort="25565"
  :showPort="false"
/>

<ServerDisclaimer />
<SiteFooter 
  copyright="XCraft" 
/>