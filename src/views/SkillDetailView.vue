<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const skill = ref({})
const loading = ref(true)

const getDetailSkill = async () => {
  try {
    const response = await api.get(`/skills/${route.params.id}`)
    skill.value = response.data.data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getDetailSkill()
})
</script>

<template>
  <div class="page">

    <div v-if="loading" class="card">
      <div class="card-hero">
        <div class="accent-line" />
        <div class="skel skel-badge" />
        <div class="skel skel-title" />
        <div class="skel skel-text" />
        <div class="skel skel-text short" />
      </div>
      <div class="card-meta">
        <div class="skel skel-meta" />
      </div>
      <div class="card-actions">
        <div class="skel skel-btn" />
        <div class="skel skel-btn" />
      </div>
    </div>

    <div v-else class="card">
      <div class="card-hero">
        <div class="accent-line" />
        <div class="badge">
          <span class="badge-dot" />
          {{ skill.category || 'Skill' }}
        </div>
        <h1 class="skill-title">{{ skill.name }}</h1>
        <p class="skill-desc">{{ skill.description }}</p>
      </div>

      <div class="card-meta">
        <span class="meta-item">⭐ {{ skill.rating ?? '—' }}</span>
        <span class="meta-sep">·</span>
        <span class="meta-item">🕐 {{ skill.duration ?? 'Fleksibel' }}</span>
        <span class="meta-sep">·</span>
        <span class="meta-item">🔄 Barter tersedia</span>
      </div>

      <div class="card-actions">
        <button class="btn btn-chat" @click="router.push('/chat')">
          <span>💬</span> Chat
        </button>
        <button class="btn btn-barter" @click="router.push('/barter')">
          <span>🤝</span> Aju Barter
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: 100vh;
  background: #0f1117;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}

.card {
  width: 100%;
  max-width: 480px;
  background: #1a1d27;
  border-radius: 24px;
  border: 1px solid #2a2d3a;
  overflow: hidden;
}

.card-hero {
  background: #16192a;
  padding: 28px 28px 24px;
  border-bottom: 1px solid #2a2d3a;
  position: relative;
}

.accent-line {
  position: absolute;
  top: 0;
  left: 28px;
  right: 28px;
  height: 2px;
  background: linear-gradient(90deg, #6c7dd4, #4f7cff, transparent);
  border-radius: 0 0 4px 4px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #252a3d;
  border: 1px solid #3a3f55;
  color: #8b95c9;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 99px;
  margin-bottom: 14px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #6c7dd4;
  border-radius: 50%;
  flex-shrink: 0;
}

.skill-title {
  font-size: 22px;
  font-weight: 700;
  color: #eef0f8;
  line-height: 1.3;
  margin-bottom: 10px;
}

.skill-desc {
  font-size: 13.5px;
  color: #7a7f9a;
  line-height: 1.7;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  border-bottom: 1px solid #2a2d3a;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 12px;
  color: #5a6080;
}

.meta-sep {
  color: #2a2d3a;
  font-size: 14px;
}

.card-actions {
  padding: 20px 28px;
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px;
  border-radius: 14px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  color: #fff;
  transition: opacity 0.15s, transform 0.1s;
}

.btn:hover { opacity: 0.88; }
.btn:active { transform: scale(0.97); }

.btn-chat { background: #22c55e; }
.btn-barter { background: #4f7cff; }

/* Skeleton */
.skel {
  background: linear-gradient(90deg, #1e2235 25%, #252a3d 50%, #1e2235 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
  border-radius: 8px;
}

.skel-badge { height: 22px; width: 90px; margin-bottom: 14px; border-radius: 99px; }
.skel-title { height: 26px; width: 75%; margin-bottom: 12px; }
.skel-text { height: 13px; width: 100%; margin-bottom: 8px; }
.skel-text.short { width: 60%; margin-bottom: 0; }
.skel-meta { height: 13px; width: 200px; }
.skel-btn { flex: 1; height: 46px; border-radius: 14px; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>