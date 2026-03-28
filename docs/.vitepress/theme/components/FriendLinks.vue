<script setup lang="ts">
interface FriendLink {
  name: string
  url: string
  avatar?: string
  description?: string
}

interface Props {
  links?: FriendLink[]
}

const defaultLinks: FriendLink[] = [
  {
    name: 'XCraft',
    url: 'https://example.com',
    avatar: '/pic/logo.png',
    description: '一个有趣的 Minecraft 服务器'
  }
]

const props = withDefaults(defineProps<Props>(), {
  links: () => defaultLinks
})

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase()
}
</script>

<template>
  <div class="friend-links">
    <div class="links-grid">
      <a
        v-for="link in links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="link-card"
      >
        <div class="link-avatar">
          <img v-if="link.avatar" :src="link.avatar" :alt="link.name" />
          <div v-else class="avatar-placeholder">
            {{ getInitial(link.name) }}
          </div>
        </div>
        <div class="link-info">
          <h3 class="link-name">{{ link.name }}</h3>
          <p v-if="link.description" class="link-desc">{{ link.description }}</p>
        </div>
        <span class="link-arrow">→</span>
      </a>
    </div>
    
    <div class="apply-section">
      <h3>申请友链</h3>
      <p>欢迎交换友情链接！请通过以下方式联系我：</p>
      <ul>
        <li>在 GitHub 提交 Issue</li>
        <li>通过 QQ 群联系管理员</li>
        <li>通过 Discord 联系管理员</li>
      </ul>
      <p class="apply-note">申请时请提供：网站名称、网站地址、头像链接、网站简介</p>
    </div>
  </div>
</template>

<style scoped>
.friend-links {
  margin: 1.5rem 0;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.link-card:hover {
  border-color: var(--vp-c-brand-1, #18794e);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.link-avatar {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, var(--vp-c-brand-1, #18794e), var(--vp-c-brand-2, #299764));
}

.link-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}

.link-info {
  flex: 1;
  min-width: 0;
}

.link-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #3c3c3c);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-desc {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2, #6a6a6a);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.link-arrow {
  font-size: 1.25rem;
  color: var(--vp-c-text-3, #8e8e8e);
  transition: transform 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(4px);
  color: var(--vp-c-brand-1, #18794e);
}

.apply-section {
  margin-top: 2.5rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 12px;
}

.apply-section h3 {
  margin: 0 0 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #3c3c3c);
}

.apply-section p {
  margin: 0 0 0.5rem;
  font-size: 0.9375rem;
  color: var(--vp-c-text-2, #6a6a6a);
}

.apply-section ul {
  margin: 0.5rem 0 1rem;
  padding-left: 1.25rem;
  font-size: 0.9375rem;
  color: var(--vp-c-text-2, #6a6a6a);
}

.apply-section li {
  margin: 0.25rem 0;
}

.apply-note {
  font-size: 0.8125rem !important;
  color: var(--vp-c-text-3, #8e8e8e) !important;
  font-style: italic;
}

@media (max-width: 640px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .link-card {
    padding: 0.875rem 1rem;
  }
  
  .link-avatar {
    width: 40px;
    height: 40px;
  }
}
</style>
