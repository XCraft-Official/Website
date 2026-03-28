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
  address?: string
  port?: number
}

interface Props {
  serverName?: string
  serverAddress?: string
  serverPort?: number
  showPort?: boolean
  apiUrl?: string
  autoRefresh?: boolean
  refreshInterval?: number
  showDisclaimer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  serverName: 'Infinite_Java',
  serverAddress: '',
  serverPort: 25565,
  showPort: false,
  apiUrl: 'https://api.unborder.online',
  autoRefresh: true,
  refreshInterval: 60000,
  showDisclaimer: true
})

const status = ref<ServerStatus | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const lastUpdate = ref<Date | null>(null)
const copySuccess = ref(false)
let refreshTimer: ReturnType<typeof setInterval> | null = null

const displayAddress = computed(() => {
  if (props.serverAddress) {
    if (props.showPort) {
      return `${props.serverAddress}:${props.serverPort}`
    }
    return props.serverAddress
  }
  if (status.value?.address) {
    if (props.showPort) {
      return `${status.value.address}:${status.value.port || 25565}`
    }
    return status.value.address
  }
  return ''
})

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

async function copyAddress() {
  if (!displayAddress.value) return
  
  try {
    await navigator.clipboard.writeText(displayAddress.value)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (e) {
    console.error('复制失败:', e)
  }
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
    
    <div v-if="displayAddress" class="server-address-section">
      <div class="address-label">服务器地址</div>
      <div class="address-box" @click="copyAddress" :title="'点击复制: ' + displayAddress">
        <code class="address-text">{{ displayAddress }}</code>
        <span class="copy-icon" :class="{ 'copy-success': copySuccess }">
          {{ copySuccess ? '✓' : '📋' }}
        </span>
      </div>
      <span v-if="copySuccess" class="copy-hint">已复制到剪贴板</span>
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
    
    <div v-if="showDisclaimer" class="server-disclaimer">
      <span class="disclaimer-icon">ℹ️</span>
      <span class="disclaimer-text">
        数据仅供参考，实际状态以游戏内为准。服务器信息由第三方 API 提供，本站不保证其准确性和实时性。
      </span>
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
  
  margin: 1.5rem 0;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.mc-server-status:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
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
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.server-icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.server-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
}

.icon-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--status-color), var(--vp-c-brand-2, #299764));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

.server-info {
  flex: 1;
  min-width: 0;
}

.server-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.server-meta {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.375rem;
  font-size: 0.8125rem;
}

.server-type {
  background: linear-gradient(135deg, var(--vp-c-brand-1, #18794e), var(--vp-c-brand-2, #299764));
  color: white;
  padding: 0.1875rem 0.625rem;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.server-version {
  color: var(--text-muted);
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  background: color-mix(in srgb, var(--status-color) 15%, transparent);
  color: var(--status-color);
  border: 1px solid color-mix(in srgb, var(--status-color) 25%, transparent);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--status-color);
  animation: pulse 2s infinite;
  box-shadow: 0 0 8px var(--status-color);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.server-address-section {
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.address-label {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.address-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--vp-c-bg-alt, #f1f1f1);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.address-box:hover {
  border-color: var(--vp-c-brand-1, #18794e);
  background: var(--vp-c-bg, #ffffff);
  box-shadow: 0 2px 8px rgba(24, 121, 78, 0.15);
}

.address-text {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  background: transparent;
  padding: 0;
}

.copy-icon {
  font-size: 1rem;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.address-box:hover .copy-icon {
  opacity: 1;
}

.copy-icon.copy-success {
  color: #10b981;
  opacity: 1;
}

.copy-hint {
  display: block;
  font-size: 0.75rem;
  color: #10b981;
  margin-top: 0.375rem;
  text-align: right;
  font-weight: 500;
}

.server-details {
  border-top: 1px solid var(--border-color);
  padding-top: 1.25rem;
}

.players-section {
  margin-bottom: 1.25rem;
}

.players-count {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.625rem;
}

.count-label {
  font-size: 0.9375rem;
  color: var(--text-muted);
  font-weight: 500;
}

.count-value {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-color);
}

.count-max {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-muted);
}

.players-bar {
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.players-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--status-color), var(--vp-c-brand-2, #299764));
  border-radius: 4px;
  transition: width 0.5s ease;
  box-shadow: 0 0 8px color-mix(in srgb, var(--status-color) 50%, transparent);
}

.server-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt, #f1f1f1);
  border-radius: 8px;
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
}

.stat-value {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--text-color);
}

.server-motd {
  background: var(--vp-c-bg-alt, #f1f1f1);
  padding: 1rem;
  border-radius: 10px;
  border-left: 3px solid var(--vp-c-brand-1, #18794e);
}

.motd-label {
  font-size: 0.8125rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.375rem;
  font-weight: 500;
}

.motd-text {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--text-color);
  font-family: inherit;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
}

.server-error {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem;
  background: color-mix(in srgb, #ef4444 10%, transparent);
  border-radius: 10px;
  color: #ef4444;
  font-size: 0.9375rem;
  font-weight: 500;
  border: 1px solid color-mix(in srgb, #ef4444 25%, transparent);
}

.server-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.last-update {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
}

.refresh-btn {
  background: var(--vp-c-bg-alt, #f1f1f1);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
}

.refresh-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-1, #18794e);
  border-color: var(--vp-c-brand-1, #18794e);
  color: white;
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

.server-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  margin-top: 1.25rem;
  padding: 0.875rem 1rem;
  background: color-mix(in srgb, var(--vp-c-brand-1, #18794e) 8%, transparent);
  border-radius: 10px;
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.6;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1, #18794e) 15%, transparent);
}

.disclaimer-icon {
  flex-shrink: 0;
  font-size: 1rem;
  margin-top: 0.125rem;
}

.disclaimer-text {
  flex: 1;
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
