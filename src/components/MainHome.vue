<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

// 左侧小功能框数据处理
const featureItems = ref([
  {
    id: 1,
    title: "高精度检测",
    icon: "✓"
  },
  {
    id: 2,
    title: "实时响应",
    icon: "⚡"
  },
  {
    id: 3,
    title: "数据安全",
    icon: "🛡️"
  }
])

// 轮播数据
const carouselItems = ref([
  {
    id: 1,
    title: "支持多种视频格式",
    description: "全面兼容主流视频格式，包括MP4, AVI, MOV, WMV等，确保各类视频文件都能进行检测分析",
    color: "#0071b7",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=842&h=1122&fit=crop&auto=format"
  },
  {
    id: 2,
    title: "深度伪造检测",
    description: "基于先进AI算法，精准识别AI生成和深度伪造内容，为视频真实性提供专业保障",
    color: "#478bbf",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=842&h=1122&fit=crop&auto=format"
  },
  {
    id: 3,
    title: "快速响应处理",
    description: "优化的处理流程和并行计算能力，为用户提供高效快速的检测服务体验",
    color: "#6bc5d1",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=842&h=1122&fit=crop&auto=format"
  },
  {
    id: 4,
    title: "专业报告生成",
    description: "详细的图文分析报告，清晰展示各项检测指标和置信度，支持导出与分享",
    color: "#23b9cd",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=842&h=1122&fit=crop&auto=format"
  },
  {
    id: 5,
    title: "安全保障体系",
    description: "端到端的加密保护和隐私计算技术，确保用户数据在检测过程中的绝对安全",
    color: "#00a5c7",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=842&h=1122&fit=crop&auto=format"
  }
])

// 轮播相关状态
const activeIndex = ref(2)
const translateX = ref(0)
const isAutoPlaying = ref(true)
const carouselRef = ref(null)
const slidesRef = ref([])

// Figma风格的轮播效果
const setupCarousel = () => {
  if (!carouselRef.value) return
  
  const slides = carouselRef.value.querySelectorAll('.carousel-slide')
  slidesRef.value = Array.from(slides)
  
  updateCarousel()
}

const updateCarousel = () => {
  const slideWidth = 320
  const centerOffset = -activeIndex.value * slideWidth
  translateX.value = centerOffset
  
  slidesRef.value.forEach((slide, index) => {
    const distance = Math.abs(index - activeIndex.value)
    const scale = distance === 0 ? 1 : distance === 1 ? 0.8 : 0.7
    const opacity = distance <= 1 ? 1 : 0.6
    const translate = (index - activeIndex.value) * 40
    
    if (slide) {
      slide.style.transform = `translateX(${translate}px) scale(${scale})`
      slide.style.opacity = opacity
      slide.style.zIndex = 10 - distance
    }
  })
}

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % carouselItems.value.length
  updateCarousel()
}

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length
  updateCarousel()
}

const goToSlide = (index) => {
  activeIndex.value = index
  updateCarousel()
}

// 自动轮播
let autoPlayInterval

const startAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval)
  autoPlayInterval = setInterval(() => {
    if (isAutoPlaying.value) {
      nextSlide()
    }
  }, 4000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

// 增强粒子效果
onMounted(() => {
  // 设置轮播
  setTimeout(setupCarousel, 100)
  startAutoPlay()
  
  // 增强粒子效果
  const canvas = document.getElementById('particle-canvas')
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  let particles = []
  let mouseX = 0
  let mouseY = 0
  let mouseMoved = false
  
  // 增加粒子数量，设置渐变颜色
  const particleCount = 80
  
  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  
  // 鼠标移动跟踪
  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
    mouseMoved = true
  }
  
  window.addEventListener('mousemove', handleMouseMove)
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = Math.random() * 0.4 - 0.2
      this.speedY = Math.random() * 0.4 - 0.2
      // 更丰富的颜色选择
      const colors = [
        'rgba(0, 113, 183, {{opacity}})',   // 深蓝
        'rgba(35, 185, 205, {{opacity}})',  // 青
        'rgba(107, 197, 209, {{opacity}})', // 浅青
        'rgba(71, 139, 191, {{opacity}})',  // 中蓝
        'rgba(0, 165, 199, {{opacity}})'    // 蓝绿
      ]
      const colorIndex = Math.floor(Math.random() * colors.length)
      this.colorBase = colors[colorIndex]
      this.opacity = Math.random() * 0.3 + 0.1
      this.color = this.colorBase.replace('{{opacity}}', this.opacity)
    }
    
    update() {
      this.x += this.speedX
      this.y += this.speedY
      
      // 边界碰撞
      if (this.x > canvas.width) this.x = 0
      else if (this.x < 0) this.x = canvas.width
      if (this.y > canvas.height) this.y = 0
      else if (this.y < 0) this.y = canvas.height
      
      // 鼠标吸引力效果
      if (mouseMoved) {
        const dx = this.x - mouseX
        const dy = this.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 1500
          this.x -= dx * force
          this.y -= dy * force
        }
      }
    }
    
    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  const initParticles = () => {
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }
  
  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 绘制粒子连接线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(0, 113, 183, ${0.08 * (1 - distance/150)})`
          ctx.lineWidth = 0.8
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    
    particles.forEach(particle => {
      particle.update()
      particle.draw()
    })
    
    requestAnimationFrame(animateParticles)
  }
  
  resizeCanvas()
  initParticles()
  animateParticles()
  
  window.addEventListener('resize', () => {
    resizeCanvas()
    initParticles()
    updateCarousel()
  })
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('resize', updateCarousel)
})
</script>

<template>
  <main class="home-main">
    <!-- 增强动态粒子画布 -->
    <canvas id="particle-canvas" class="particle-canvas"></canvas>
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧内容区域 -->
      <div class="content-left">
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
          
          <!-- 新增左侧小功能框 -->
          <div class="feature-mini-grid">
            <div 
              v-for="feature in featureItems" 
              :key="feature.id"
              class="feature-mini-item"
            >
              <div class="feature-mini-icon">{{ feature.icon }}</div>
              <div class="feature-mini-content">
                <h4 class="feature-mini-title">{{ feature.title }}</h4>
                <p class="feature-mini-desc">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧轮播区域 -->
      <div class="content-right">
        <div class="carousel-container">
          <div class="carousel-wrapper">
            <!-- Figma风格轮播 - 移除颜色覆盖 -->
            <div class="carousel-track" 
                 ref="carouselRef"
                 :style="{ transform: `translate3d(${translateX}px, 0, 0)` }">
              <div 
                v-for="(item, index) in carouselItems" 
                :key="item.id"
                class="carousel-slide"
                :class="{ active: index === activeIndex }"
                @click="goToSlide(index)"
                @mouseenter="stopAutoPlay"
                @mouseleave="startAutoPlay"
              >
                <article class="slide-content">
                  <div class="slide-image-wrapper">
                    <!-- 完全移除slide-bg颜色覆盖层 -->
                    <img 
                      :src="item.image" 
                      :alt="item.title"
                      class="slide-image"
                      loading="lazy"
                    />
                  </div>
                  <div class="slide-text">
                    <h3 class="slide-title">{{ item.title }}</h3>
                    <p class="slide-description">{{ item.description }}</p>
                  </div>
                </article>
              </div>
            </div>
            
            <!-- 轮播控制按钮 -->
            <div class="carousel-controls">
              <button class="carousel-btn prev" @click="prevSlide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="carousel-btn next" @click="nextSlide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            
            <!-- 轮播指示器 -->
            <div class="carousel-indicators">
              <div 
                v-for="(item, index) in carouselItems" 
                :key="item.id"
                class="indicator"
                :class="{ active: index === activeIndex }"
                @click="goToSlide(index)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部Logo区域 - 完全保留原代码 -->
    <div class="logo-section">
      <div class="logo-container">
        <div class="simple-logo">
          <div class="logo-circle"></div>
          <div class="logo-inner"></div>
        </div>
        <div class="logo-text">
          <h3>DeepReal AI</h3>
          <p>智能视觉鉴真 · 守护数字真实</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* 主要样式重置和基础设置 */
.home-main {
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, 
    #81d9e6 0%, 
    #accce6 50%, 
    #d7e6f3 100%);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  box-sizing: border-box;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* 主要内容区域布局 */
.main-content {
  flex: 1;
  display: flex;
  gap: 60px;
  max-width: 1800px;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 120px);
  position: relative;
  z-index: 2;
}

.content-left {
  flex: 1;
  display: flex;
  align-items: center;
  padding-right: 40px;
  max-width: 800px;
}

.content-right {
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
}

/* 左侧内容样式 - 优化文字颜色 */
.hero-text {
  color: #0a2a44; /* 更深的蓝灰色，更高级 */
  max-width: 700px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #0a2a44; /* 深蓝灰，更优雅 */
  letter-spacing: -0.02em;
}

.highlight {
  color: #006994; /* 深海蓝 */
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  height: 12px;
  background: linear-gradient(90deg, 
    rgba(0, 105, 148, 0.2) 0%,
    rgba(0, 105, 148, 0.4) 50%,
    rgba(0, 105, 148, 0.2) 100%);
  border-radius: 6px;
  z-index: -1;
  animation: highlightGlow 3s ease-in-out infinite;
}

.hero-subtitle {
  font-size: 1.3rem;
  line-height: 1.6;
  color: #2c4c6b; /* 中蓝色调，柔和 */
  margin-bottom: 40px;
  font-weight: 400;
}

/* 左侧小功能框样式 - 新增 */
.feature-mini-grid {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.feature-mini-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 20px rgba(0, 105, 148, 0.08);
  transition: all 0.3s ease;
  flex: 1;
}

.feature-mini-item:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 25px rgba(0, 105, 148, 0.15);
  border-color: rgba(0, 105, 148, 0.3);
}

.feature-mini-icon {
  font-size: 1.8rem;
  line-height: 1;
}

.feature-mini-content {
  display: flex;
  flex-direction: column;
}

.feature-mini-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0a2a44;
  margin: 0 0 4px 0;
}

.feature-mini-desc {
  font-size: 0.85rem;
  color: #2c4c6b;
  margin: 0;
}

/* 按钮样式 - 优化颜色 */
.hero-actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.btn-primary {
  background: linear-gradient(135deg, #006994 0%, #008b8b 100%);
  color: white;
  border: none;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 105, 148, 0.25);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 105, 148, 0.35);
  background: linear-gradient(135deg, #005a7b 0%, #007a7a 100%);
}

.btn-secondary {
  background: transparent;
  color: #006994;
  border: 2px solid #006994;
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(0, 105, 148, 0.08);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 105, 148, 0.15);
  border-color: #008b8b;
}

.btn-icon {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-icon {
  transform: translateX(5px);
}

/* 右侧轮播样式 - 移除颜色覆盖 */
.carousel-container {
  width: 100%;
  max-width: 900px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 24px;
}

.carousel-track {
  display: flex;
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  gap: 40px;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

.carousel-slide {
  width: 320px;
  height: 500px;
  flex-shrink: 0;
  position: relative;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.carousel-slide:hover {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.carousel-slide.active {
  cursor: default;
}

.slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.slide-image-wrapper {
  position: relative;
  width: 100%;
  height: 65%;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

/* 完全移除slide-bg样式 */

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.carousel-slide:hover .slide-image {
  transform: scale(1.05);
}

.slide-text {
  padding: 30px;
  background: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slide-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0a2a44;
  margin-bottom: 15px;
  line-height: 1.3;
}

.slide-description {
  font-size: 1rem;
  line-height: 1.5;
  color: #2c4c6b;
  margin: 0;
}

/* 轮播控制按钮 */
.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none;
  z-index: 10;
}

.carousel-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: all;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #006994;
}

.carousel-btn:hover {
  transform: scale(1.1);
  background: #f0f9ff;
  box-shadow: 0 6px 25px rgba(0, 105, 148, 0.2);
  color: #008b8b;
}

/* 轮播指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 10;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 105, 148, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.indicator:hover {
  background: rgba(0, 105, 148, 0.6);
  transform: scale(1.2);
}

.indicator.active {
  background: #006994;
  transform: scale(1.2);
  box-shadow: 0 0 12px rgba(0, 105, 148, 0.5);
}

/* 底部Logo区域 - 完全保留原代码 */
.logo-section {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.simple-logo {
  width: 50px;
  height: 50px;
  position: relative;
}

.logo-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.logo-circle::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(transparent, white, transparent);
  animation: rotate 4s linear infinite;
}

.logo-inner {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.logo-text h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
  background: linear-gradient(135deg, 
    #ffffff 0%,
    #f0f9ff 50%,
    #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-text p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 动画 */
@keyframes highlightGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .main-content {
    gap: 40px;
  }
  
  .hero-title {
    font-size: 3.2rem;
  }
  
  .feature-mini-grid {
    gap: 15px;
  }
  
  .feature-mini-item {
    padding: 14px 16px;
  }
  
  .carousel-container {
    height: 550px;
  }
  
  .carousel-slide {
    width: 300px;
    height: 480px;
  }
}

@media (max-width: 1200px) {
  .main-content {
    flex-direction: column;
    height: auto;
    gap: 60px;
    padding-top: 40px;
  }
  
  .content-left,
  .content-right {
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
  
  .hero-text {
    max-width: 100%;
    text-align: center;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .feature-mini-grid {
    justify-content: center;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .carousel-container {
    max-width: 800px;
    margin: 0 auto;
    height: 500px;
  }
}

@media (max-width: 768px) {
  .home-main {
    padding: 20px;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .feature-mini-grid {
    flex-direction: column;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .feature-mini-item {
    width: 100%;
  }
  
  .carousel-container {
    height: 450px;
  }
  
  .carousel-slide {
    width: 260px;
    height: 420px;
    gap: 20px;
  }
  
  .slide-text {
    padding: 20px;
  }
  
  .slide-title {
    font-size: 1.4rem;
  }
  
  .slide-description {
    font-size: 0.95rem;
  }
  
  .carousel-controls {
    padding: 0 10px;
  }
  
  .carousel-btn {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .carousel-container {
    height: 400px;
  }
  
  .carousel-slide {
    width: 220px;
    height: 380px;
  }
  
  .slide-text {
    padding: 16px;
  }
  
  .slide-title {
    font-size: 1.2rem;
  }
  
  .slide-description {
    font-size: 0.9rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>