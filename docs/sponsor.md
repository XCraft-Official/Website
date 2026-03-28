---
title: 赞助支持
---

# 赞助支持

感谢您考虑支持 XCraft！您的赞助将帮助我们：

- 🖥️ 维护服务器运行成本
- 🔧 开发新功能和玩法
- 🎨 改善玩家体验
- 📢 推广服务器发展

## 赞助方式

### 💰 爱发电

通过爱发电平台支持我们，支持微信、支付宝等方式。

<a href="https://afdian.net" target="_blank" class="sponsor-btn">
  前往爱发电赞助
</a>

### 💳 其他方式

| 方式 | 账号 | 说明 |
|------|------|------|
| 支付宝 | example@example.com | 请备注游戏ID |
| 微信支付 | 联系管理员 | 请通过QQ群联系 |

## 赞助特权

根据赞助金额，您将获得以下特权：

| 等级 | 金额 | 特权 |
|------|------|------|
| 🥉 铜牌 | ¥10+ | 专属称号、彩色聊天 |
| 🥈 银牌 | ¥50+ | 铜牌特权 + 更多家园区块 |
| 🥇 金牌 | ¥100+ | 银牌特权 + 专属皮肤槽位 |
| 💎 钻石 | ¥500+ | 金牌特权 + VIP专属区域 |

## 赞助者名单

<SponsorWall 
  title="感谢以下赞助者的支持" 
  :sponsors="[
    {
      name: '示例玩家',
      tier: 'gold',
      amount: '¥100',
      date: '2024-01',
      message: '服务器很棒，继续加油！'
    }
  ]"
/>

::: tip 说明
赞助名单将在确认收款后 24 小时内更新。如有疑问，请联系管理员。
:::

## 常见问题

**Q: 赞助后多久生效？**

A: 通常在 24 小时内生效，如遇延迟请联系管理员。

**Q: 赞助可以退款吗？**

A: 赞助为自愿捐赠性质，原则上不支持退款。

**Q: 如何确认赞助到账？**

A: 请保留支付凭证，并联系管理员确认。

---

<ServerDisclaimer />

<style>
.sponsor-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1, #18794e), var(--vp-c-brand-2, #299764));
  color: white;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.sponsor-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 121, 78, 0.4);
}
</style>
