<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'DeepReal'
  }
})

// 导航激活项Ref
const activeNav = ref('首页')

// 点击事件处理
const handleDetectClick = () => {
  alert("跳转到检测页面")
}

const handleLearnMore = () => {
  alert("跳转到AI技术页面")
}

// 核心优势 - 紧凑版
const advantages = ref([
  {
    icon: '🎯',
    title: '智能识别',
    description: '基于先进的AI算法，自动检测视频异常'
  },
  {
    icon: '⚡',
    title: '快速响应',
    description: '实时分析处理，快速给出检测结果'
  },
  {
    icon: '🛡️',
    title: '安全可靠',
    description: '保护用户隐私，确保数据安全'
  }
])

// 应用场景 - 精简版
const useCases = ref([
  {
    category: '媒体验证',
    title: '内容真实性审核',
    description: '帮助媒体机构验证视频素材的真实性',
    icon: '📰',
    color: '#0f88eb'
  },
  {
    category: '社交平台',
    title: '虚假内容识别',
    description: '自动检测社交平台上的伪造视频',
    icon: '🌐',
    color: '#10b981'
  },
  {
    category: '商业安全',
    title: '商务文件验证',
    description: '验证商务合作场景的视频真实性',
    icon: '💼',
    color: '#8b5cf6'
  }
])

// 工作原理步骤
const workflowSteps = ref([
  { 
    step: 1, 
    title: '上传', 
    description: '支持多种格式',
    icon: '📤'
  },
  { 
    step: 2, 
    title: 'AI分析', 
    description: '深度算法检测',
    icon: '🧠'
  },
  { 
    step: 3, 
    title: '报告', 
    description: '专业检测报告',
    icon: '📋'
  }
])
</script>

<template>
  <main class="home-main">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            用<span class="highlight">AI技术</span><br>守护视频真实性
          </h1>
          <p class="hero-subtitle">
            专业的视频真实性检测平台，快速识别深度伪造和内容篡改
          </p>
          <div class="hero-actions">
            <button class="btn-primary" @click="handleDetectClick">
              立即检测
              <span class="btn-icon">→</span>
            </button>
            <button class="btn-secondary" @click="handleLearnMore">
              了解更多
            </button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="visual-container">
            <div class="video-preview">
              <div class="preview-screen">
                <div class="screen-content">
                  <div class="detection-animation">
                    <div class="face-frame">
                      <div class="face-outline"></div>
                      <div class="detection-points">
                        <div class="point" v-for="n in 6" :key="n" :style="{
                          left: `${20 + 60 * Math.random()}%`,
                          top: `${20 + 60 * Math.random()}%`
                        }"></div>
                      </div>
                    </div>
                    <div class="analysis-wave"></div>
                  </div>
                </div>
              </div>
              <div class="preview-label">
                <div class="label-real">真实视频</div>
                <div class="label-fake">AI检测中</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心优势 + 工作原理 + 应用场景 紧凑布局 -->
    <section class="compact-section">
      <div class="compact-grid">
        <!-- 核心优势 -->
        <div class="compact-block">
          <div class="block-header">
            <h2 class="block-title">核心优势</h2>
            <p class="block-subtitle">高效精准的检测能力</p>
          </div>
          <div class="advantages-grid">
            <div class="advantage-item" v-for="advantage in advantages" :key="advantage.title">
              <div class="advantage-icon">{{ advantage.icon }}</div>
              <div class="advantage-content">
                <h3 class="advantage-title">{{ advantage.title }}</h3>
                <p class="advantage-description">{{ advantage.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 工作原理 -->
        <div class="compact-block">
          <div class="block-header">
            <h2 class="block-title">工作原理</h2>
            <p class="block-subtitle">简单三步，快速检测</p>
          </div>
          <div class="workflow-compact">
            <div class="workflow-step" v-for="step in workflowSteps" :key="step.step">
              <div class="step-circle">
                <span class="step-number">{{ step.step }}</span>
                <div class="step-icon">{{ step.icon }}</div>
              </div>
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
              <div class="step-arrow" v-if="step.step < 3">→</div>
            </div>
          </div>
        </div>

        <!-- 应用场景 -->
        <div class="compact-block">
          <div class="block-header">
            <h2 class="block-title">应用场景</h2>
            <p class="block-subtitle">多领域真实验证</p>
          </div>
          <div class="usecases-compact">
            <div class="usecase-item" v-for="usecase in useCases" :key="usecase.title">
              <div class="usecase-icon" :style="{ background: usecase.color }">
                {{ usecase.icon }}
              </div>
              <div class="usecase-content">
                <span class="usecase-category">{{ usecase.category }}</span>
                <h3 class="usecase-title">{{ usecase.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* 主要内容区域 */
.home-main {
  min-height: 100vh;
}

/* 英雄区域 - 更加紧凑 */
.hero-section {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 60px 40px 40px;
  position: relative;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.hero-text {
  padding-right: 20px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #1e293b;
  margin-bottom: 16px;
}

.highlight {
  color: #0f88eb;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  height: 6px;
  background: rgba(15, 136, 235, 0.2);
  border-radius: 3px;
  z-index: -1;
}

.hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #64748b;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-primary {
  background: linear-gradient(135deg, #0f88eb, #0a6dc2);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(15, 136, 235, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(15, 136, 235, 0.4);
}

.btn-secondary {
  background: white;
  color: #0f88eb;
  border: 2px solid #0f88eb;
  padding: 10px 28px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #f0f9ff;
  transform: translateY(-2px);
}

/* 视觉元素 */
.hero-visual {
  position: relative;
}

.visual-container {
  position: relative;
  perspective: 600px;
}

.video-preview {
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  transform: rotateY(-5deg);
  transition: transform 0.3s ease;
}

.video-preview:hover {
  transform: rotateY(0deg);
}

.preview-screen {
  background: linear-gradient(135deg, #1e293b, #334155);
  border-radius: 10px;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
  margin-bottom: 12px;
}

.screen-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.detection-animation {
  width: 100%;
  height: 100%;
  position: relative;
}

.face-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 120px;
  border: 2px solid rgba(15, 136, 235, 0.8);
  border-radius: 40px 40px 60px 60px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { border-color: rgba(15, 136, 235, 0.8); }
  50% { border-color: rgba(15, 136, 235, 0.3); }
}

.face-outline {
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 32px 32px 48px 48px;
}

.detection-points {
  position: absolute;
  inset: 0;
}

.point {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #0f88eb;
  border-radius: 50%;
  box-shadow: 0 0 6px #0f88eb;
  animation: pointGlow 1.5s infinite alternate;
}

@keyframes pointGlow {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}

.analysis-wave {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  height: 24px;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(15, 136, 235, 0.3) 25%,
    rgba(15, 136, 235, 0.6) 50%,
    rgba(15, 136, 235, 0.3) 75%,
    transparent 100%
  );
  animation: waveMove 3s linear infinite;
}

@keyframes waveMove {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.preview-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.label-real, .label-fake {
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 600;
}

.label-real {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.label-fake {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* 紧凑布局区域 */
.compact-section {
  padding: 40px 40px 60px;
  background: white;
}

.compact-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.compact-block {
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.compact-block:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 136, 235, 0.1);
  border-color: #cbd5e1;
}

.block-header {
  margin-bottom: 24px;
}

.block-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
  background: linear-gradient(135deg, #1e293b, #334155);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.block-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

/* 核心优势紧凑版 */
.advantages-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.advantage-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.advantage-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.advantage-content {
  flex: 1;
}

.advantage-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2px;
}

.advantage-description {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
}

/* 工作原理紧凑版 */
.workflow-compact {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.workflow-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.workflow-step:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.step-circle {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.step-number {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #0f88eb, #4fc3f7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(15, 136, 235, 0.3);
}

.step-icon {
  width: 100%;
  height: 100%;
  background: #e0f2fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2px;
}

.step-description {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
}

.step-arrow {
  color: #cbd5e1;
  font-weight: 700;
  font-size: 1rem;
  opacity: 0.6;
}

/* 应用场景紧凑版 */
.usecases-compact {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.usecase-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.usecase-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.usecase-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
}

.usecase-content {
  flex: 1;
}

.usecase-category {
  display: block;
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 2px;
}

.usecase-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.3;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
  
  .hero-text {
    padding-right: 0;
  }
  
  .compact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .compact-block:last-child {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 20px 30px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .compact-section {
    padding: 30px 20px 40px;
  }
  
  .compact-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .compact-block:last-child {
    grid-column: span 1;
  }
  
  .cta-section {
    padding: 40px 20px;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .block-title {
    font-size: 1.25rem;
  }
  
  .advantage-item,
  .workflow-step,
  .usecase-item {
    padding: 10px;
  }
}
</style>