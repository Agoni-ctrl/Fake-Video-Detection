<script setup>
import { ref } from 'vue'
// 1. 导入useRouter 【新增】
// import { useRouter } from 'vue-router'

defineProps({
  title: {
    type: String,
    default: 'DeepReal'
  }
})

// const router = useRouter()

// 导航激活项Ref，控制点击切换选中状态，默认选中「首页」
const activeNav = ref('首页')
const handleNavClick = (navName) => {
  activeNav.value = navName
  console.log(`点击了导航：${navName}`)
  // 实际项目中这里应该跳转到对应页面
}

// 搜索按钮点击事件
const handleSearch = () => {
  const searchVal = document.querySelector('.search-input').value
  if (searchVal) {
    alert(`开始搜索：${searchVal}`)
  } else {
    alert('请输入搜索内容～')
  }
}

// 3. 登录/注册点击事件 【修改：替换alert为路由跳转】
const handleLogin = () => {
  //  router.replace({ name: 'Login' }) 
   alert("跳转到登录页面")
}

// 检测功能点击
const handleDetectClick = () => {
  alert("跳转到检测页面")
}

// 统计数据
const stats = ref([
  { value: '99.7%', label: '检测准确率' },
  { value: '1M+', label: '已检测视频' },
  { value: '0.5s', label: '单帧分析速度' },
  { value: '50+', label: '支持格式' }
])

// 功能特点
const features = ref([
  {
    icon: '🤖',
    title: 'AI深度分析',
    description: '基于深度学习的多维度检测算法，识别深度伪造和视频篡改'
  },
  {
    icon: '⚡',
    title: '快速检测',
    description: '支持实时分析，单视频检测最快只需30秒'
  },
  {
    icon: '🛡️',
    title: '安全保障',
    description: '端到端加密处理，确保您的数据隐私和安全'
  },
  {
    icon: '📊',
    title: '详细报告',
    description: '生成专业的检测报告，包含风险分析和改进建议'
  }
])

// 工作原理步骤
const workflowSteps = ref([
  { 
    step: 1, 
    title: '上传视频', 
    description: '支持MP4、AVI、MOV、MKV等主流格式',
    icon: '📤'
  },
  { 
    step: 2, 
    title: '智能分析', 
    description: '运用多种AI算法进行帧级分析和特征提取',
    icon: '🧠'
  },
  { 
    step: 3, 
    title: '多维检测', 
    description: '检测面部特征、光照、运动轨迹等多个维度',
    icon: '🔍'
  },
  { 
    step: 4, 
    title: '生成报告', 
    description: '输出详细的检测报告和置信度评分',
    icon: '📋'
  }
])

// 应用场景
const useCases = ref([
  {
    category: '新闻媒体',
    title: '新闻真实性验证',
    description: '帮助新闻机构验证视频素材的真实性，防止虚假新闻传播',
    icon: '📰'
  },
  {
    category: '社交平台',
    title: '内容安全审核',
    description: '自动识别社交平台上的深度伪造内容，维护社区安全',
    icon: '🌐'
  },
  {
    category: '法律取证',
    title: '电子证据鉴定',
    description: '为司法机关提供专业的视频真伪鉴定服务',
    icon: '⚖️'
  },
  {
    category: '商业安全',
    title: '商务视频验证',
    description: '验证商务合作、合同签署等场景的视频真实性',
    icon: '💼'
  }
])

// 新增：视频鉴伪介绍
const videoAuthenticationIntro = ref({
  title: '什么是视频鉴伪？',
  description: '视频鉴伪技术通过分析视频内容的数字特征，识别深度伪造、合成篡改和恶意编辑，确保视频内容的真实性和完整性。',
  keyPoints: [
    '检测深度伪造（Deepfake）技术生成的人脸替换',
    '识别视频内容拼接、篡改和时间轴修改',
    '分析音频视频同步异常和背景不一致',
    '验证视频来源的真实性和原始性'
  ],
  importance: '在虚假信息泛滥的数字时代，视频鉴伪技术已成为维护信息真实性、保护个人隐私和企业安全的关键防线。'
})

// 新增：新闻信息推送
const newsUpdates = ref([
  {
    id: 1,
    title: '全球首例AI深度伪造诈骗案曝光',
    summary: '某跨国公司高管遭深度伪造视频诈骗，损失超500万美元',
    source: '网络安全日报',
    time: '2小时前',
    category: '热点',
    isHot: true,
    tags: ['深度伪造', '金融诈骗']
  },
  {
    id: 2,
    title: '社交媒体平台加强对AI生成内容的监管',
    summary: '多家主流社交平台宣布将使用DeepReal技术检测虚假视频',
    source: '科技前沿',
    time: '昨天',
    category: '政策',
    isHot: true,
    tags: ['平台监管', '内容审核']
  },
  {
    id: 3,
    title: '新型视频伪造技术挑战现有检测方法',
    summary: '研究团队发现能绕过传统检测的对抗性生成技术',
    source: 'AI研究简报',
    time: '3天前',
    category: '技术',
    isHot: false,
    tags: ['对抗攻击', '检测技术']
  },
  {
    id: 4,
    title: '欧盟出台AI生成内容强制标注法规',
    summary: '要求所有AI生成的视频内容必须明确标注',
    source: '国际新闻',
    time: '1周前',
    category: '法规',
    isHot: false,
    tags: ['法规', '内容标注']
  },
  {
    id: 5,
    title: '年度虚假视频排行榜发布',
    summary: '2024年十大最具迷惑性的深度伪造视频案例',
    source: '数字安全',
    time: '2周前',
    category: '报告',
    isHot: true,
    tags: ['案例', '排行榜']
  }
])

// 新增：新闻分类
const newsCategories = ref(['全部', '热点', '技术', '政策', '法规', '案例'])

// 新增：当前选中的新闻分类
const activeNewsCategory = ref('全部')

// 新增：筛选新闻
const filteredNews = ref(() => {
  if (activeNewsCategory.value === '全部') {
    return newsUpdates.value
  }
  return newsUpdates.value.filter(news => news.category === activeNewsCategory.value)
})

// 新增：切换新闻分类
const switchNewsCategory = (category) => {
  activeNewsCategory.value = category
}
</script>

<template>
  <!-- 顶部导航栏容器 -->

  <!-- 主要内容区域 -->
  <main class="home-main">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            用<span class="highlight">AI技术</span>识别视频真实性
          </h1>
          <p class="hero-subtitle">
            DeepReal 采用先进的深度学习算法，精准检测深度伪造、视频篡改和合成内容，
            为数字世界的真实性保驾护航
          </p>
          <div class="hero-actions">
            <button class="btn-primary" @click="handleDetectClick">
              立即检测
              <span class="btn-icon">→</span>
            </button>
            <button class="btn-secondary">
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
                        <div class="point" v-for="n in 8" :key="n" :style="{
                          left: `${20 + 60 * Math.random()}%`,
                          top: `${20 + 60 * Math.random()}%`
                        }"></div>
                      </div>
                    </div>
                    <div class="analysis-wave"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 统计数据 -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-item" v-for="stat in stats" :key="stat.label">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：视频鉴伪介绍区 -->
    <section class="intro-section">
      <div class="intro-container">
        <!-- 左侧：介绍内容 -->
        <div class="intro-content">
          <div class="intro-header">
            <span class="intro-badge">技术科普</span>
            <h2 class="intro-title">{{ videoAuthenticationIntro.title }}</h2>
          </div>
          
          <p class="intro-description">{{ videoAuthenticationIntro.description }}</p>
          
          <div class="key-points">
            <h3 class="points-title">主要检测内容：</h3>
            <div class="points-grid">
              <div class="point-item" v-for="(point, index) in videoAuthenticationIntro.keyPoints" :key="index">
                <div class="point-icon">✓</div>
                <span class="point-text">{{ point }}</span>
              </div>
            </div>
          </div>
          
          <div class="importance-note">
            <div class="note-icon">💡</div>
            <p class="note-text">{{ videoAuthenticationIntro.importance }}</p>
          </div>
          
          <button class="learn-more-btn">
            了解更多技术细节
            <span class="btn-arrow">→</span>
          </button>
        </div>
        
        <!-- 右侧：技术示意图 -->
        <div class="intro-visual">
          <div class="visual-card">
            <div class="tech-demo">
              <div class="demo-header">
                <div class="demo-title">AI检测过程演示</div>
                <div class="demo-status">
                  <span class="status-dot"></span>
                  实时分析中
                </div>
              </div>
              
              <div class="demo-content">
                <!-- 真实视频 vs 伪造视频对比 -->
                <div class="comparison-container">
                  <div class="comparison-video real">
                    <div class="video-label">
                      <span class="label-icon">✅</span>
                      <span class="label-text">真实视频</span>
                    </div>
                    <div class="video-preview"></div>
                    <div class="video-stats">
                      <div class="stat">
                        <span class="stat-label">一致性：</span>
                        <span class="stat-value good">98%</span>
                      </div>
                      <div class="stat">
                        <span class="stat-label">自然度：</span>
                        <span class="stat-value good">96%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="comparison-divider">
                    <div class="vs-text">VS</div>
                  </div>
                  
                  <div class="comparison-video fake">
                    <div class="video-label">
                      <span class="label-icon">⚠️</span>
                      <span class="label-text">伪造视频</span>
                    </div>
                    <div class="video-preview">
                      <div class="warning-overlay">
                        <div class="warning-icon">!</div>
                        <div class="warning-text">检测到异常</div>
                      </div>
                    </div>
                    <div class="video-stats">
                      <div class="stat">
                        <span class="stat-label">一致性：</span>
                        <span class="stat-value warning">67%</span>
                      </div>
                      <div class="stat">
                        <span class="stat-label">自然度：</span>
                        <span class="stat-value warning">52%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 检测指标 -->
                <div class="detection-metrics">
                  <h4 class="metrics-title">关键检测指标</h4>
                  <div class="metrics-grid">
                    <div class="metric-item">
                      <div class="metric-name">面部特征分析</div>
                      <div class="metric-bar">
                        <div class="metric-fill high"></div>
                      </div>
                      <div class="metric-value">94%</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-name">光照一致性</div>
                      <div class="metric-bar">
                        <div class="metric-fill medium"></div>
                      </div>
                      <div class="metric-value">87%</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-name">音频同步</div>
                      <div class="metric-bar">
                        <div class="metric-fill low"></div>
                      </div>
                      <div class="metric-value">73%</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-name">背景稳定性</div>
                      <div class="metric-bar">
                        <div class="metric-fill high"></div>
                      </div>
                      <div class="metric-value">91%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：新闻信息推送区 -->
    <section class="news-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">📰</span>
          视频伪造最新动态
        </h2>
        <p class="section-subtitle">关注全球视频伪造相关新闻与安全事件</p>
      </div>
      
      <div class="news-container">
        <!-- 新闻分类 -->
        <div class="news-categories">
          <div class="categories-scroll">
            <button 
              class="category-btn" 
              v-for="category in newsCategories" 
              :key="category"
              :class="{ active: activeNewsCategory === category }"
              @click="switchNewsCategory(category)"
            >
              {{ category }}
              <span v-if="category === '热点'" class="hot-badge">🔥</span>
            </button>
          </div>
        </div>
        
        <!-- 新闻列表 -->
        <div class="news-list">
          <div 
            class="news-item" 
            v-for="news in filteredNews" 
            :key="news.id"
            :class="{ 'hot-news': news.isHot }"
          >
            <div class="news-content">
              <div class="news-header">
                <span class="news-category" :class="news.category">
                  {{ news.category }}
                </span>
                <span class="news-time">{{ news.time }}</span>
                <span v-if="news.isHot" class="hot-tag">热点</span>
              </div>
              
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-summary">{{ news.summary }}</p>
              
              <div class="news-footer">
                <span class="news-source">{{ news.source }}</span>
                <div class="news-tags">
                  <span class="news-tag" v-for="tag in news.tags" :key="tag">
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="news-actions">
              <button class="news-action-btn">
                <span class="action-icon">📖</span>
                阅读
              </button>
              <button class="news-action-btn">
                <span class="action-icon">🔗</span>
                分享
              </button>
            </div>
          </div>
        </div>
        
        <!-- 新闻轮播指示器 -->
        <div class="news-indicators">
          <div class="indicators-container">
            <div 
              class="indicator" 
              v-for="(category, index) in newsCategories" 
              :key="category"
              :class="{ active: activeNewsCategory === category }"
              @click="switchNewsCategory(category)"
            ></div>
          </div>
        </div>
      </div>
      
      <!-- 新闻订阅 -->
      <div class="news-subscription">
        <div class="subscription-content">
          <div class="subscription-text">
            <h4>订阅最新动态</h4>
            <p>获取视频伪造领域最新研究、法规和案例</p>
          </div>
          <div class="subscription-form">
            <input type="email" placeholder="输入您的邮箱地址" class="subscription-input">
            <button class="subscription-btn">订阅</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能介绍区域 -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">为什么选择 DeepReal</h2>
        <p class="section-subtitle">我们提供业界领先的视频真实性检测解决方案</p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 工作原理区域 -->
    <section class="workflow-section">
      <div class="section-header">
        <h2 class="section-title">工作原理</h2>
        <p class="section-subtitle">四步轻松完成视频真实性检测</p>
      </div>
      
      <div class="workflow-steps">
        <div class="step-card" v-for="step in workflowSteps" :key="step.step">
          <div class="step-header">
            <div class="step-number">{{ step.step }}</div>
            <div class="step-icon">{{ step.icon }}</div>
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
          <div class="step-connector" v-if="step.step < 4">
            <div class="connector-line"></div>
            <div class="connector-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 应用场景区域 -->
    <section class="usecases-section">
      <div class="section-header">
        <h2 class="section-title">应用场景</h2>
        <p class="section-subtitle">服务于各行各业的真实性验证需求</p>
      </div>
      
      <div class="usecases-grid">
        <div class="usecase-card" v-for="usecase in useCases" :key="usecase.title">
          <div class="usecase-category">{{ usecase.category }}</div>
          <div class="usecase-icon">{{ usecase.icon }}</div>
          <h3 class="usecase-title">{{ usecase.title }}</h3>
          <p class="usecase-description">{{ usecase.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">开始保护你的数字世界</h2>
        <p class="cta-description">
          立即上传视频进行检测，获取专业的真实性分析报告
        </p>
        <div class="cta-actions">
          <button class="btn-primary btn-large" @click="handleDetectClick">
            免费体验检测
          </button>
          <button class="btn-secondary btn-large">
            查看演示视频
          </button>
        </div>
      </div>
    </section>
  </main>

  <!-- 页脚 -->
  <footer class="home-footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-logo">{{ title }}</div>
        <p class="footer-description">
          基于深度学习的视频真实性检测平台，致力于维护数字世界的真实性
        </p>
      </div>
      
      <div class="footer-links">
        <div class="link-column">
          <h4>产品</h4>
          <a href="#">视频检测</a>
          <a href="#">API接口</a>
          <a href="#">企业版</a>
          <a href="#">定价</a>
        </div>
        <div class="link-column">
          <h4>资源</h4>
          <a href="#">技术文档</a>
          <a href="#">博客专栏</a>
          <a href="#">案例分析</a>
          <a href="#">帮助中心</a>
        </div>
        <div class="link-column">
          <h4>公司</h4>
          <a href="#">关于我们</a>
          <a href="#">联系我们</a>
          <a href="#">加入我们</a>
          <a href="#">媒体报道</a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2024 DeepReal. 保留所有权利。</p>
      <div class="legal-links">
        <a href="#">隐私政策</a>
        <a href="#">服务条款</a>
        <a href="#">Cookie政策</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 顶部导航栏整体样式 */
.zhihu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 40px;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 999;
}

/* 左侧区域：Logo + 导航 */
.header-left {
  display: flex;
  align-items: center;
  gap: 48px;
}

.zhihu-logo {
  color: #0f88eb;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 15px;
}

.nav-item {
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;
  user-select: none;
  position: relative;
}

/* 导航项hover效果 */
.nav-item:hover {
  color: #0f88eb;
}

/* 导航项选中active样式（点击切换） */
.nav-item.active {
  color: #0f88eb;
  font-weight: 700;
}
.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #0f88eb;
  border-radius: 1px;
}

/* 中间区域：搜索框【核心修改处】 */
.header-middle {
  position: relative;
  flex: 1;
  max-width: 520px;
  margin: 0 60px;
}

.search-input {
  width: 100%;
  height: 38px;
  padding: 0 36px 0 20px;
  border: 1px solid #e5e7eb;
  border-radius: 19px;
  outline: none;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #333;
  background: #f7f8fa;
}
/* 搜索框聚焦效果 */
.search-input:focus {
  border-color: #0f88eb;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(15, 136, 235, 0.1);
}
/* 搜索框输入提示文字样式 */
.search-input::placeholder {
  color: #909399;
}

.search-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #909399;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s ease;
}
.search-icon:hover {
  color: #0f88eb;
}

/* 右侧区域：登录/注册按钮 */
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.login-register-btn {
  padding: 6px 16px;
  background: #0f88eb;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.login-register-btn:hover {
  background: #0d77d0;
  box-shadow: 0 2px 4px rgba(15, 136, 235, 0.2);
}
.login-register-btn:active {
  transform: scale(0.98);
}

/* 主要内容区域 */
.home-main {
  min-height: calc(100vh - 60px);
}

/* 英雄区域 */
.hero-section {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 80px 40px 60px;
  position: relative;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text {
  padding-right: 40px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #1e293b;
  margin-bottom: 24px;
}

.highlight {
  color: #0f88eb;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  height: 8px;
  background: rgba(15, 136, 235, 0.2);
  border-radius: 4px;
  z-index: -1;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #64748b;
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn-primary {
  background: linear-gradient(135deg, #0f88eb, #0a6dc2);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(15, 136, 235, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(15, 136, 235, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: white;
  color: #0f88eb;
  border: 2px solid #0f88eb;
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #f0f9ff;
  transform: translateY(-2px);
}

.btn-icon {
  font-weight: 700;
}

/* 视觉元素 */
.hero-visual {
  position: relative;
}

.visual-container {
  position: relative;
  perspective: 1000px;
}

.video-preview {
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: rotateY(-10deg) rotateX(5deg);
  transition: transform 0.6s ease;
}

.video-preview:hover {
  transform: rotateY(0deg) rotateX(0deg);
}

.preview-screen {
  background: #1e293b;
  border-radius: 12px;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
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
  width: 120px;
  height: 160px;
  border: 2px solid rgba(15, 136, 235, 0.8);
  border-radius: 60px 60px 80px 80px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { border-color: rgba(15, 136, 235, 0.8); }
  50% { border-color: rgba(15, 136, 235, 0.3); }
}

.face-outline {
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px 50px 70px 70px;
}

.detection-points {
  position: absolute;
  inset: 0;
}

.point {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #0f88eb;
  border-radius: 50%;
  box-shadow: 0 0 12px #0f88eb;
  animation: pointGlow 1.5s infinite alternate;
}

@keyframes pointGlow {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}

.analysis-wave {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  height: 40px;
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

/* 统计数据 */
.stats-section {
  max-width: 1200px;
  margin: 80px auto 0;
  padding-top: 40px;
  border-top: 1px solid #e2e8f0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 3rem;
  font-weight: 800;
  color: #0f88eb;
  margin-bottom: 8px;
  line-height: 1;
}

.stat-label {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

/* 功能介绍区域 */
.features-section {
  padding: 80px 40px;
  background: white;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.feature-card {
  background: #f8fafc;
  border-radius: 20px;
  padding: 40px 24px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: #0f88eb;
  box-shadow: 0 12px 24px rgba(15, 136, 235, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 24px;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}

.feature-description {
  color: #64748b;
  line-height: 1.6;
}

/* 工作原理区域 */
.workflow-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.workflow-steps {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  position: relative;
}

.step-card {
  background: white;
  border-radius: 20px;
  padding: 40px 24px;
  text-align: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.step-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.step-number {
  width: 48px;
  height: 48px;
  background: #0f88eb;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
}

.step-icon {
  font-size: 2.5rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.step-description {
  color: #64748b;
  line-height: 1.6;
}

.step-connector {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
}

.connector-line {
  width: 24px;
  height: 2px;
  background: #cbd5e1;
}

.connector-arrow {
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  color: #cbd5e1;
  font-weight: 700;
}

/* 应用场景区域 */
.usecases-section {
  padding: 80px 40px;
  background: white;
}

.usecases-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.usecase-card {
  background: #f8fafc;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.usecase-card:hover {
  transform: translateY(-8px);
  border-color: #0f88eb;
  background: white;
  box-shadow: 0 12px 24px rgba(15, 136, 235, 0.1);
}

.usecase-category {
  display: inline-block;
  background: #dbeafe;
  color: #0f88eb;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.usecase-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.usecase-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.usecase-description {
  color: #64748b;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* CTA区域 */
.cta-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #0f88eb, #0a6dc2);
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}

.cta-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-large {
  padding: 16px 40px;
  font-size: 1.125rem;
}

.btn-primary.btn-large {
  background: white;
  color: #0f88eb;
}

.btn-secondary.btn-large {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.btn-secondary.btn-large:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 页脚 */
.home-footer {
  background: #1e293b;
  color: #cbd5e1;
  padding: 60px 40px 30px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
}

.footer-logo {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
}

.footer-description {
  color: #94a3b8;
  line-height: 1.6;
  max-width: 300px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.link-column h4 {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.link-column a {
  display: block;
  color: #94a3b8;
  text-decoration: none;
  margin-bottom: 12px;
  transition: color 0.2s;
}

.link-column a:hover {
  color: white;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.legal-links {
  display: flex;
  gap: 24px;
}

.legal-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
}

.legal-links a:hover {
  color: white;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .zhihu-header {
    padding: 0 20px;
  }
  .header-middle {
    margin: 0 20px;
    max-width: 400px;
  }
  .nav-menu {
    gap: 20px;
  }
  
  .hero-content,
  .features-grid,
  .workflow-steps,
  .usecases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 20px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 20px;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .hero-text {
    padding-right: 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .features-section,
  .workflow-section,
  .usecases-section,
  .cta-section {
    padding: 60px 20px;
  }
  
  .features-grid,
  .workflow-steps,
  .usecases-grid {
    grid-template-columns: 1fr;
  }
  
  .step-connector {
    display: none;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .nav-menu {
    display: none; /* 移动端可能需要汉堡菜单 */
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .stat-value {
    font-size: 2.5rem;
  }
}

/* 视频鉴伪介绍区 */
.intro-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.intro-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.intro-content {
  padding-right: 40px;
}

.intro-header {
  margin-bottom: 24px;
}

.intro-badge {
  display: inline-block;
  background: #e0f2fe;
  color: #0369a1;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.intro-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  margin-bottom: 24px;
}

.intro-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #475569;
  margin-bottom: 32px;
}

.key-points {
  margin-bottom: 32px;
}

.points-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
}

.points-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.point-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.point-item:hover {
  background: #f1f5f9;
  transform: translateX(8px);
}

.point-icon {
  color: #10b981;
  font-size: 1.25rem;
  font-weight: 700;
  flex-shrink: 0;
}

.point-text {
  color: #475569;
  line-height: 1.5;
}

.importance-note {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.note-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.note-text {
  color: #92400e;
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
}

.learn-more-btn {
  background: transparent;
  color: #0f88eb;
  border: 2px solid #0f88eb;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.learn-more-btn:hover {
  background: #f0f9ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 136, 235, 0.15);
}

.btn-arrow {
  font-weight: 700;
  transition: transform 0.3s;
}

.learn-more-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* 技术示意图 */
.intro-visual {
  position: sticky;
  top: 100px;
}

.visual-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.tech-demo {
  padding: 24px;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.demo-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.demo-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #059669;
  font-weight: 500;
  font-size: 0.875rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #059669;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  margin-bottom: 32px;
  align-items: center;
}

.comparison-video {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}

.comparison-video.real {
  border: 2px solid #10b981;
}

.comparison-video.fake {
  border: 2px solid #ef4444;
}

.video-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.label-icon {
  font-size: 1.25rem;
}

.label-text {
  font-weight: 600;
  color: #1e293b;
}

.video-preview {
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 8px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
}

.warning-overlay {
  position: absolute;
  inset: 0;
  background: rgba(239, 68, 68, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.warning-icon {
  width: 48px;
  height: 48px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.warning-text {
  color: #ef4444;
  font-weight: 600;
  font-size: 0.875rem;
}

.video-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.stat {
  text-align: center;
  font-size: 0.875rem;
}

.stat-label {
  color: #64748b;
}

.stat-value {
  font-weight: 600;
}

.stat-value.good {
  color: #10b981;
}

.stat-value.warning {
  color: #ef4444;
}

.comparison-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  background: #64748b;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

/* 检测指标 */
.detection-metrics {
  margin-top: 24px;
}

.metrics-title {
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 16px;
  text-align: center;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-name {
  font-size: 0.875rem;
  color: #64748b;
}

.metric-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  transition: width 1s ease;
}

.metric-fill.high {
  background: linear-gradient(90deg, #10b981, #34d399);
  width: 94%;
}

.metric-fill.medium {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  width: 87%;
}

.metric-fill.low {
  background: linear-gradient(90deg, #ef4444, #f87171);
  width: 73%;
}

.metric-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  text-align: right;
}

/* 新闻信息推送区 */
.news-section {
  padding: 80px 40px;
  background: #f8fafc;
}

.news-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 新闻分类 */
.news-categories {
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.categories-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
}

.categories-scroll::-webkit-scrollbar {
  display: none;
}

.category-btn {
  flex-shrink: 0;
  padding: 10px 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.category-btn:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.category-btn.active {
  background: #0f88eb;
  color: white;
  border-color: #0f88eb;
}

.hot-badge {
  font-size: 0.75rem;
  animation: fire 1s infinite alternate;
}

@keyframes fire {
  0% { transform: scale(1); }
  100% { transform: scale(1.2); }
}

/* 新闻列表 */
.news-list {
  padding: 24px;
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.news-list::-webkit-scrollbar {
  width: 6px;
}

.news-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.news-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 12px;
  background: #f8fafc;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.news-item:hover {
  background: white;
  border-color: #e2e8f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.news-item.hot-news {
  border-left: 4px solid #ef4444;
  background: linear-gradient(to right, rgba(254, 226, 226, 0.1), #f8fafc);
}

.news-content {
  flex: 1;
  padding-right: 20px;
}

.news-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.news-category {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.news-category.热点 {
  background: #fee2e2;
  color: #dc2626;
}

.news-category.政策 {
  background: #dbeafe;
  color: #1d4ed8;
}

.news-category.技术 {
  background: #f0fdf4;
  color: #16a34a;
}

.news-category.法规 {
  background: #fef3c7;
  color: #d97706;
}

.news-category.报告 {
  background: #f3e8ff;
  color: #7c3aed;
}

.news-time {
  font-size: 0.75rem;
  color: #94a3b8;
}

.hot-tag {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 700;
  animation: pulse 2s infinite;
}

.news-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  line-height: 1.4;
}

.news-summary {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.news-source {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.news-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.news-tag {
  font-size: 0.75rem;
  color: #0f88eb;
  background: #e0f2fe;
  padding: 2px 8px;
  border-radius: 10px;
}

.news-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.news-action-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.news-action-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #0f88eb;
}

.action-icon {
  font-size: 1rem;
}

/* 新闻轮播指示器 */
.news-indicators {
  padding: 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.indicators-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.indicator {
  width: 8px;
  height: 8px;
  background: #cbd5e1;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  background: #94a3b8;
}

.indicator.active {
  width: 24px;
  background: #0f88eb;
  border-radius: 4px;
}

/* 新闻订阅 */
.news-subscription {
  max-width: 800px;
  margin: 40px auto 0;
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.subscription-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.subscription-text h4 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  text-align: left;
}

.subscription-text p {
  color: #64748b;
  line-height: 1.6;
  text-align: left;
}

.subscription-form {
  display: flex;
  gap: 8px;
}

.subscription-input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.875rem;
  color: #1e293b;
  transition: all 0.3s ease;
}

.subscription-input:focus {
  outline: none;
  border-color: #0f88eb;
  box-shadow: 0 0 0 3px rgba(15, 136, 235, 0.1);
}

.subscription-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #0f88eb, #0a6dc2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.subscription-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 136, 235, 0.3);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .intro-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .intro-content {
    padding-right: 0;
  }
  
  .intro-visual {
    position: static;
  }
  
  .subscription-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .subscription-text h4,
  .subscription-text p {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .intro-section,
  .news-section {
    padding: 60px 20px;
  }
  
  .comparison-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
  
  .comparison-divider {
    grid-row: 2;
    padding: 12px 0;
  }
  
  .news-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .news-content {
    padding-right: 0;
  }
  
  .news-actions {
    align-self: stretch;
    justify-content: flex-end;
  }
}

@media (max-width: 480px) {
  .intro-title {
    font-size: 2rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .news-item {
    padding: 16px;
  }
  
  .subscription-form {
    flex-direction: column;
  }
  
  .subscription-btn {
    width: 100%;
  }
}
</style>