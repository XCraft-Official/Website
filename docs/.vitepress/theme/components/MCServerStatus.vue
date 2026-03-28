<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface ServerPlayers {
  online: number
  max: number
}

interface ServerStatus {
  name: string
  online: boolean
  type: 'java' | 'bedrock'
  version: string
  players: ServerPlayers
  ping: number
  timestamp: number
  motd: string
  icon?: string
}

interface Props {
  serverName?: string
  apiUrl?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  serverName: 'Infinite_Java',
  apiUrl: 'https://api.unborder.online',
  autoRefresh: true,
  refreshInterval: 60000
})

const status = ref<ServerStatus | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const lastUpdate = ref<Date | null>(null)
let refreshTimer: ReturnType<typeof setInterval> | null = null

const onlinePercentage = computed(() => {
  if (!status.value?.players) return 0
  return Math.round((status.value.players.online / status.value.players.max) * 100)
})

const statusText = computed(() => {
  if (loading.value) return '加载中...'
  if (error.value) return '连接失败'
  return status.value?.online ? '在线' : '离线'
})

const statusClass = computed(() => {
  if (loading.value) return 'loading'
  if (error.value || !status.value?.online) return 'offline'
  return 'online'
})

const formattedLastUpdate = computed(() => {
  if (!lastUpdate.value) return ''
  return lastUpdate.value.toLocaleTimeString('zh-CN')
})

async function fetchServerStatus() {
  try {
    error.value = null
    const response = await fetch(`${props.apiUrl}/api/stats/${props.serverName}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data = await response.json()
    status.value = data
    lastUpdate.value = new Date()
  } catch (e) {
    error.value = e instanceof Error ? e.message : '未知错误'
    status.value = null
  } finally {
    loading.value = false
  }
}

function startAutoRefresh() {
  if (props.autoRefresh && !refreshTimer) {
    refreshTimer = setInterval(fetchServerStatus, props.refreshInterval)
  }
}

function stopAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

function manualRefresh() {
  loading.value = true
  fetchServerStatus()
}

onMounted(() => {
  fetchServerStatus()
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<template>
  <div class="mc-server-status" :class="statusClass">
    <div class="server-header">
      <div class="server-icon">
        <img 
          v-if="status?.icon" 
          :src="status.icon" 
          :alt="status.name"
        />
        <div v-else class="icon-placeholder">
          <span>{{ status?.name?.charAt(0) || '?' }}</span>
        </div>
      </div>
      
      <div class="server-info">
        <h3 class="server-name">{{ status?.name || serverName }}</h3>
        <div class="server-meta">
          <span class="server-type">{{ status?.type?.toUpperCase() || 'JAVA' }}</span>
          <span class="server-version">{{ status?.version || '--' }}</span>
        </div>
      </div>
      
      <div class="status-badge" :class="statusClass">
        <span class="status-dot"></span>
        {{ statusText }}
      </div>
    </div>
    
    <div v-if="status?.online" class="server-details">
      <div class="players-section">
        <div class="players-count">
          <span class="count-label">在线玩家</span>
          <span class="count-value">
            {{ status.players.online.toLocaleString() }}
            <span class="count-max">/ {{ status.players.max.toLocaleString() }}</span>
          </span>
        </div>
        <div class="players-bar">
          <div 
            class="players-bar-fill" 
            :style="{ width: `${onlinePercentage}%` }"
          ></div>
        </div>
      </div>
      
      <div class="server-stats">
        <div class="stat-item">
          <span class="stat-label">延迟</span>
          <span class="stat-value">{{ status.ping }}ms</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">版本</span>
          <span class="stat-value">{{ status.version }}</span>
        </div>
      </div>
      
      <div v-if="status.motd" class="server-motd">
        <span class="motd-label">MOTD</span>
        <p class="motd-text">{{ status.motd }}</p>
      </div>
    </div>
    
    <div v-else-if="error" class="server-error">
      <span class="error-icon">⚠️</span>
      <span>无法连接到服务器</span>
    </div>
    
    <div class="server-footer">
      <span class="last-update" v-if="lastUpdate">
        最后更新: {{ formattedLastUpdate }}
      </span>
      <button class="refresh-btn" @click="manualRefresh" :disabled="loading">
        <span :class="{ 'spinning': loading }">🔄</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.mc-server-status {
  --status-color: var(--vp-c-brand-1, #18794e);
  --bg-color: var(--vp-c-bg-soft, #f6f6f7);
  --border-color: var(--vp-c-border, #e2e2e3);
  --text-color: var(--vp-c-text-1, #3c3c3c);
  --text-muted: var(--vp-c-text-2, #6a6a6a);
  
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.mc-server-status:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mc-server-status.online {
  --status-color: #10b981;
}

.mc-server-status.offline {
  --status-color: #ef4444;
}

.mc-server-status.loading {
  --status-color: #f59e0b;
}

.server-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.server-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.server-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  border-radius: 4px;
}

.icon-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--status-color), var(--vp-c-brand-2, #299764));
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
}

.server-info {
  flex: 1;
  min-width: 0;
}

.server-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.server-meta {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
}

.server-type {
  background: var(--vp-c-brand-1, #18794e);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.server-version {
  color: var(--text-muted);
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 500;
  background: color-mix(in srgb, var(--status-color) 15%, transparent);
  color: var(--status-color);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--status-color);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.server-details {
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.players-section {
  margin-bottom: 1rem;
}

.players-count {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.count-label {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.count-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.count-max {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-muted);
}

.players-bar {
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
}

.players-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--status-color), var(--vp-c-brand-2, #299764));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.server-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.stat-value {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-color);
}

.server-motd {
  background: var(--vp-c-bg-alt, #f1f1f1);
  padding: 0.75rem;
  border-radius: 6px;
}

.motd-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.25rem;
}

.motd-text {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-color);
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-word;
}

.server-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: color-mix(in srgb, #ef4444 10%, transparent);
  border-radius: 6px;
  color: #ef4444;
  font-size: 0.875rem;
}

.server-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
}

.last-update {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.refresh-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.375rem 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.refresh-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-alt, #f1f1f1);
  border-color: var(--vp-c-brand-1, #18794e);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinning {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .server-header {
    flex-wrap: wrap;
  }
  
  .status-badge {
    width: 100%;
    justify-content: center;
    order: 3;
    margin-top: 0.5rem;
  }
  
  .server-stats {
    grid-template-columns: 1fr;
  }
}
</style>
