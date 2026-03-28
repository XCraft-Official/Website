<script setup lang="ts">
interface FooterLink {
  text: string
  url: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface Props {
  sections?: FooterSection[]
  copyright?: string
  icp?: string
}

const props = withDefaults(defineProps<Props>(), {
  copyright: 'XCraft',
  icp: '',
  sections: () => [
    {
      title: '关于',
      links: [
        { text: '关于我们', url: '/about' },
        { text: '游戏规则', url: '/rules' },
        { text: '常见问题', url: '/faq' }
      ]
    },
    {
      title: '社区',
      links: [
        { text: 'QQ 群', url: 'https://qm.qq.com/q/T50fsooFcO' },
        { text: 'Discord', url: 'https://discord.gg/FV7mkArw' },
        { text: 'GitHub', url: 'https://github.com/XCraft-Official' }
      ]
    },
    {
      title: '支持',
      links: [
        { text: '赞助支持', url: '/sponsor' },
        { text: '友情链接', url: '/friends' }
      ]
    }
  ]
})

const currentYear = new Date().getFullYear()

function isExternal(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-brand">
        <div class="brand-logo">
          <img src="/pic/logo.png" alt="XCraft" />
        </div>
        <p class="brand-tagline">生存 · 玩法 · 社区</p>
      </div>
      
      <div class="footer-links">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="footer-section"
        >
          <h4 class="section-title">{{ section.title }}</h4>
          <ul class="section-links">
            <li v-for="link in section.links" :key="link.url">
              <a
                :href="link.url"
                :target="isExternal(link.url) ? '_blank' : undefined"
                :rel="isExternal(link.url) ? 'noopener noreferrer' : undefined"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">
        © {{ currentYear }} {{ copyright }}. All rights reserved.
      </p>
      <p v-if="icp" class="icp">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
          {{ icp }}
        </a>
      </p>
      <p class="disclaimer">
        "Minecraft" 和 "我的世界" 是 Mojang AB 的注册商标。本站与 Mojang 或 Microsoft 无任何关联。
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-border, #e2e2e3);
  background: var(--vp-c-bg, #ffffff);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-brand {
  flex-shrink: 0;
}

.brand-logo {
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
}

.brand-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.brand-tagline {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2, #6a6a6a);
}

.footer-links {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.footer-section {
  min-width: 100px;
}

.section-title {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #3c3c3c);
}

.section-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section-links li {
  margin: 0.375rem 0;
}

.section-links a {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2, #6a6a6a);
  text-decoration: none;
  transition: color 0.2s ease;
}

.section-links a:hover {
  color: var(--vp-c-brand-1, #18794e);
}

.footer-bottom {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid var(--vp-c-divider, #e2e2e3);
  background: var(--vp-c-bg-soft, #f6f6f7);
}

.copyright {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2, #6a6a6a);
}

.icp {
  margin: 0.375rem 0 0;
  font-size: 0.75rem;
}

.icp a {
  color: var(--vp-c-text-3, #8e8e8e);
  text-decoration: none;
}

.icp a:hover {
  color: var(--vp-c-brand-1, #18794e);
}

.disclaimer {
  margin: 0.5rem 0 0;
  font-size: 0.6875rem;
  color: var(--vp-c-text-3, #8e8e8e);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .footer-brand {
    text-align: center;
  }
  
  .brand-logo {
    margin: 0 auto 0.5rem;
  }
  
  .footer-links {
    justify-content: center;
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .footer-links {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
