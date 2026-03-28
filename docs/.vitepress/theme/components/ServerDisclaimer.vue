<script setup lang="ts">
interface Props {
  title?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  title: '免责声明',
  icon: 'ℹ️'
})
</script>

<template>
  <div class="server-disclaimer-component">
    <div class="disclaimer-header">
      <span class="disclaimer-icon">{{ icon }}</span>
      <span class="disclaimer-title">{{ title }}</span>
    </div>
    <div class="disclaimer-content">
      <slot>
        <p>"Minecraft" 和 "我的世界" 是 Mojang AB 的注册商标。"XCraft" 与 Mojang 或 Microsoft 无任何关联。</p>
        <p>"XCraft" 是一个独立的社区服务器，非 Minecraft 官方服务器。</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.server-disclaimer-component {
  --disclaimer-bg: color-mix(in srgb, var(--vp-c-brand-1, #18794e) 6%, transparent);
  --disclaimer-border: color-mix(in srgb, var(--vp-c-brand-1, #18794e) 20%, transparent);
  --disclaimer-text: var(--vp-c-text-2, #6a6a6a);
  
  margin: 1.5rem 0;
  background: var(--disclaimer-bg);
  border: 1px solid var(--disclaimer-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.server-disclaimer-component:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.disclaimer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: color-mix(in srgb, var(--vp-c-brand-1, #18794e) 10%, transparent);
  border-bottom: 1px solid var(--disclaimer-border);
}

.disclaimer-icon {
  font-size: 1rem;
}

.disclaimer-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #3c3c3c);
}

.disclaimer-content {
  padding: 1rem;
  font-size: 0.8125rem;
  color: var(--disclaimer-text);
  line-height: 1.7;
}

.disclaimer-content p {
  margin: 0;
  padding: 0.25rem 0;
}

.disclaimer-content p + p {
  margin-top: 0.25rem;
}

.disclaimer-content :deep(a) {
  color: var(--vp-c-brand-1, #18794e);
  text-decoration: none;
  transition: color 0.2s ease;
}

.disclaimer-content :deep(a:hover) {
  color: var(--vp-c-brand-2, #299764);
  text-decoration: underline;
}
</style>
