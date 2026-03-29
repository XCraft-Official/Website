<script setup lang="ts">
interface Sponsor {
  name: string
  avatar?: string
  amount?: string
  date?: string
  message?: string
}

interface Props {
  sponsors?: Sponsor[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '感谢以下赞助者',
  sponsors: () => []
})

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase()
}
</script>

<template>
  <div class="sponsor-wall">
    <h3 class="wall-title">{{ title }}</h3>
    
    <div v-if="sponsors.length === 0" class="empty-state">
      <span class="empty-icon">💝</span>
      <p>暂无赞助者，成为第一位支持者吧！</p>
    </div>
    
    <div v-else class="sponsors-grid">
      <div
        v-for="(sponsor, index) in sponsors"
        :key="index"
        class="sponsor-card"
      >
        <div class="sponsor-avatar">
          <img v-if="sponsor.avatar" :src="sponsor.avatar" :alt="sponsor.name" />
          <div v-else class="avatar-placeholder">
            {{ getInitial(sponsor.name) }}
          </div>
        </div>
        <div class="sponsor-info">
          <h4 class="sponsor-name">{{ sponsor.name }}</h4>
          <p v-if="sponsor.message" class="sponsor-message">"{{ sponsor.message }}"</p>
          <div class="sponsor-meta">
            <span v-if="sponsor.amount" class="sponsor-amount">{{ sponsor.amount }}</span>
            <span v-if="sponsor.date" class="sponsor-date">{{ sponsor.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sponsor-wall {
  margin: 1.5rem 0;
}

.wall-title {
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #3c3c3c);
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 2.5rem 1rem;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px dashed var(--vp-c-border, #e2e2e3);
  border-radius: 12px;
}

.empty-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.75rem;
}

.empty-state p {
  margin: 0;
  color: var(--vp-c-text-2, #6a6a6a);
  font-size: 0.9375rem;
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.sponsor-card {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.sponsor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.sponsor-avatar {
  position: relative;
  flex-shrink: 0;
}

.sponsor-avatar img,
.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--vp-c-brand-1, #18794e), var(--vp-c-brand-2, #299764));
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
}

.sponsor-info {
  flex: 1;
  min-width: 0;
}

.sponsor-name {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #3c3c3c);
}

.sponsor-message {
  margin: 0.25rem 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2, #6a6a6a);
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sponsor-meta {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-3, #8e8e8e);
}

.sponsor-amount {
  color: var(--vp-c-brand-1, #18794e);
  font-weight: 500;
}

@media (max-width: 640px) {
  .sponsors-grid {
    grid-template-columns: 1fr;
  }
}
</style>
