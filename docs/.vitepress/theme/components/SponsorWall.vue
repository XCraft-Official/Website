<script setup lang="ts">
interface Sponsor {
  name: string
  avatar?: string
  amount?: string
  date?: string
  message?: string
  tier?: 'diamond' | 'gold' | 'silver' | 'bronze'
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

function getTierClass(tier?: string): string {
  return tier || 'default'
}

function getTierLabel(tier?: string): string {
  const labels: Record<string, string> = {
    diamond: '钻石赞助',
    gold: '金牌赞助',
    silver: '银牌赞助',
    bronze: '铜牌赞助'
  }
  return labels[tier || ''] || ''
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
        :class="getTierClass(sponsor.tier)"
      >
        <div class="sponsor-avatar">
          <img v-if="sponsor.avatar" :src="sponsor.avatar" :alt="sponsor.name" />
          <div v-else class="avatar-placeholder">
            {{ getInitial(sponsor.name) }}
          </div>
          <span v-if="sponsor.tier" class="tier-badge" :class="sponsor.tier">
            {{ getTierLabel(sponsor.tier) }}
          </span>
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

.sponsor-card.diamond {
  border-color: #a855f7;
  background: linear-gradient(135deg, color-mix(in srgb, #a855f7 8%, var(--vp-c-bg-soft)), var(--vp-c-bg-soft));
}

.sponsor-card.gold {
  border-color: #f59e0b;
  background: linear-gradient(135deg, color-mix(in srgb, #f59e0b 8%, var(--vp-c-bg-soft)), var(--vp-c-bg-soft));
}

.sponsor-card.silver {
  border-color: #6b7280;
  background: linear-gradient(135deg, color-mix(in srgb, #6b7280 6%, var(--vp-c-bg-soft)), var(--vp-c-bg-soft));
}

.sponsor-card.bronze {
  border-color: #cd7f32;
  background: linear-gradient(135deg, color-mix(in srgb, #cd7f32 6%, var(--vp-c-bg-soft)), var(--vp-c-bg-soft));
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

.tier-badge {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.5625rem;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: 600;
}

.tier-badge.diamond {
  background: #a855f7;
  color: white;
}

.tier-badge.gold {
  background: #f59e0b;
  color: white;
}

.tier-badge.silver {
  background: #6b7280;
  color: white;
}

.tier-badge.bronze {
  background: #cd7f32;
  color: white;
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
