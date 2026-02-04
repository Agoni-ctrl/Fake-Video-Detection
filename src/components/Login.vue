<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// 路由实例
const router = useRouter()
// 登录加载状态
const loading = ref(false)
// 显示/隐藏密码
const showPwd = ref(false)
// 表单数据
const form = reactive({
  username: 'admin',
  password: '123456',
  savePwd: true,
  role: 'detector'
})
// 错误提示
const errorTip = ref('')

// 登录方法
// 登录方法
const handleLogin = () => {
  if (!form.username.trim()) {
    errorTip.value = '请输入用户名'
    return
  }
  if (!form.password.trim()) {
    errorTip.value = '请输入密码'
    return
  }
  errorTip.value = ''
  loading.value = true

  // 模拟登录请求
  setTimeout(() => {
    if (form.username === 'admin' && form.password === '123456') {
      // 🔴 核心添加：存储登录状态到本地（持久化，刷新不丢）
      localStorage.setItem('isLogin', 'true')
      // 跳转到首页（根路由/）
      router.push('/')
    } else {
      errorTip.value = '用户名或密码错误'
    }
    loading.value = false
  }, 800)
}

// 回车登录
const handleEnter = (e) => {
  if (e.keyCode === 13) handleLogin()
}

// 动态粒子背景（外层全屏）
let particlesInstance = null
onMounted(() => {
  // 动态引入particles.js
  import('particles.js').then((particlesJS) => {
    particlesJS.default('particles-bg', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 1200 } },
        color: { value: '#0f88eb' },
        shape: { type: 'circle' },
        opacity: { value: 0.15, random: true },
        size: { value: 4, random: true },
        line_linked: {
          enable: true,
          distance: 180,
          color: '#0f88eb',
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.2 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    })
  })
})

onUnmounted(() => {
  // 销毁粒子实例，防止内存泄漏
  if (particlesInstance) {
    particlesInstance.destroy()
  }
})
</script>

<template>
  <!-- 最外层：全屏动态粒子背景 -->
  <div class="login-page">
    <div id="particles-bg" class="particles-full-bg"></div>

    <!-- 居中登录卡片（核心） -->
    <div class="login-card-wrapper">
      <div class="login-card">
        <!-- 左侧：科技感渐变 + 精致主题图标 + 层次排版【全量美化】 -->
        <div class="login-left">
          <!-- 网格底纹装饰 -->
          <div class="grid-bg"></div>
          <!-- 光效渐变装饰 -->
          <div class="light-gradient"></div>
          <!-- 核心内容 -->
          <div class="left-content">
            <!-- 新版放大镜图标：现代简洁设计 -->
            <div class="logo-container">
              <div class="mag-glass">
                <!-- 放大镜外框 -->
                <div class="glass-circle">
                  <!-- 放大镜内部：视频播放按钮 -->
                  <div class="video-icon">
                    <div class="play-triangle"></div>
                  </div>
                </div>
                <!-- 放大镜手柄 -->
                <div class="glass-handle"></div>
              </div>
              <!-- 扫描环效果 -->
              <!-- <div class="scan-ring scan-ring-1"></div>
              <div class="scan-ring scan-ring-2"></div>
              <div class="scan-ring scan-ring-3"></div> -->
            </div>
            
            <h1 class="project-title">DeepReal</h1>
            <p class="project-subtitle">伪造视频智能检测平台</p>
            <p class="project-desc">AI驱动 · 精准识别 · 安全防护</p>
          </div>
        </div>

        <!-- 右侧：登录表单（完全保留原代码，无修改） -->
        <div class="login-right">
          <div class="card-header">
            <h2 class="login-title">系统登录</h2>
            <p class="login-subtitle">欢迎使用伪造视频智能检测平台</p>
          </div>

          <form class="login-form">
            <!-- 用户名 -->
            <div class="form-item">
              <span class="icon">👤</span>
              <input
                type="text"
                v-model="form.username"
                placeholder="请输入用户名"
                class="form-input"
                @keyup="handleEnter"
                :autocomplete="form.savePwd ? 'username' : 'off'"
              >
            </div>

            <!-- 密码 -->
            <div class="form-item">
              <span class="icon">🔑</span>
              <input
                :type="showPwd ? 'text' : 'password'"
                v-model="form.password"
                placeholder="请输入密码"
                class="form-input"
                @keyup="handleEnter"
                :autocomplete="form.savePwd ? 'current-password' : 'off'"
              >
              <span class="pwd-toggle" @click="showPwd = !showPwd">
                {{ showPwd ? '🙈' : '👁️' }}
              </span>
            </div>

            <!-- 错误提示 -->
            <div class="error-tip" v-if="errorTip">{{ errorTip }}</div>

            <!-- 角色选择 -->
            <div class="role-select">
              <label class="role-option">
                <input
                  type="radio"
                  v-model="form.role"
                  value="detector"
                  class="role-radio"
                >
                <span class="radio-icon"></span>
                检测员
              </label>
              <label class="role-option">
                <input
                  type="radio"
                  v-model="form.role"
                  value="viewer"
                  class="role-radio"
                >
                <span class="radio-icon"></span>
                普通用户
              </label>
            </div>

            <!-- 保存密码 -->
            <div class="form-option">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="form.savePwd"
                  class="custom-checkbox"
                >
                <span class="checkbox-icon"></span>
                保存密码
              </label>
            </div>

            <!-- 登录按钮 -->
            <button
              type="button"
              class="login-btn"
              @click="handleLogin"
              :disabled="loading"
            >
              {{ loading ? '登录中...' : '登录' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 最外层：全屏背景 + 粒子 */
.login-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
}
.particles-full-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* 居中卡片容器 */
.login-card-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  height: auto;
  min-height: 500px;
}

/* 登录卡片：左右分栏，圆角+阴影 */
.login-card {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(15, 136, 235, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 左侧区域：科技感渐变+装饰+精致排版【全量美化改造】 */
.login-left {
  flex: 0 0 45%;
  position: relative;
  background: linear-gradient(160deg, #0974e3 0%, #165dff 50%, #3242f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
  color: #fff;
  overflow: hidden;
}
/* 网格底纹装饰：轻量科技感，不抢主体 */
.grid-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
}
/* 光效渐变装饰：右侧淡入，提升层次感 */
.light-gradient {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 100%);
  z-index: 1;
}
/* 核心内容：相对定位，压在装饰层上 */
.left-content {
  position: relative;
  z-index: 2;
  text-align: center;
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* 新版放大镜图标容器 */
.logo-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 放大镜主体 */
.mag-glass {
  position: relative;
  width: 80px;
  height: 80px;
  z-index: 2;
  transform: rotate(-5deg);
  animation: floatIcon 6s ease-in-out infinite;
}

/* 放大镜圆形部分 */
.glass-circle {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2.5px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  left: 0;
  top: 0;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(2px);
}

/* 放大镜内部的视频图标 */
.video-icon {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 播放三角形 */
.play-triangle {
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-left: 10px solid #0f88eb;
  border-bottom: 6px solid transparent;
  margin-left: 2px;
}

/* 放大镜手柄 */
.glass-handle {
  position: absolute;
  width: 30px;
  height: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  right: 0;
  bottom: 15px;
  transform: rotate(45deg);
  transform-origin: right center;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

/* 扫描环效果 */
/* .scan-ring {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation: scanPulse 3s ease-in-out infinite;
  z-index: 1;
}

.scan-ring-1 {
  width: 70px;
  height: 70px;
  animation-delay: 0s;
}

.scan-ring-2 {
  width: 90px;
  height: 90px;
  animation-delay: 0.3s;
}

.scan-ring-3 {
  width: 110px;
  height: 110px;
  animation-delay: 0.6s;
} */

/* 图标浮动动画 */
@keyframes floatIcon {
  0%, 100% {
    transform: translateY(0) rotate(-5deg);
  }
  50% {
    transform: translateY(-8px) rotate(-5deg);
  }
}

/* 扫描环脉冲动画 */
@keyframes scanPulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/* 保留原淡入动画 */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 主标题：加大字号+字重+字母间距，更醒目 */
.project-title {
  font-size: 40px;
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: 1px;
  line-height: 1.2;
}
/* 副标题：适中字号+轻微透明，层次分明 */
.project-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0 0 12px;
  line-height: 1.4;
}
/* 描述文字：小字号+低透明度，补充信息不抢戏 */
.project-desc {
  font-size: 13px;
  opacity: 0.75;
  margin: 0;
  letter-spacing: 0.5px;
}

/* 右侧区域：白色表单（完全保留原样式，无修改） */
.login-right {
  flex: 1;
  padding: 60px 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 卡片头部 */
.card-header {
  text-align: center;
  margin-bottom: 32px;
}
.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px;
}
.login-subtitle {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

/* 表单项 */
.form-item {
  position: relative;
  margin-bottom: 20px;
  height: 44px;
}
.icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #909399;
  z-index: 1;
}
.form-input {
  width: 100%;
  height: 100%;
  padding: 0 14px 0 44px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
  transition: all 0.2s ease;
  background: #f7f8fa;
}
.form-input:focus {
  border-color: #0f88eb;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(15, 136, 235, 0.1);
}
.pwd-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #909399;
  cursor: pointer;
  transition: color 0.2s ease;
}
.pwd-toggle:hover {
  color: #0f88eb;
}

/* 错误提示 */
.error-tip {
  height: 18px;
  line-height: 18px;
  font-size: 13px;
  color: #f53f3f;
  margin: -8px 0 16px 4px;
}

/* 角色选择 */
.role-select {
  display: flex;
  gap: 32px;
  margin-bottom: 20px;
  padding-left: 4px;
}
.role-option {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  user-select: none;
}
.role-radio {
  display: none;
}
.radio-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s ease;
}
.role-radio:checked + .radio-icon {
  background: #0f88eb;
  border-color: #0f88eb;
}
.role-radio:checked + .radio-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
}

/* 保存密码 */
.form-option {
  margin-bottom: 28px;
  padding-left: 4px;
}
.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  user-select: none;
}
.custom-checkbox {
  display: none;
}
.checkbox-icon {
  width: 16px;
  height: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s ease;
}
.custom-checkbox:checked + .checkbox-icon {
  background: #0f88eb;
  border-color: #0f88eb;
}
.custom-checkbox:checked + .checkbox-icon::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 6px;
  height: 10px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 6px;
  background: #0f88eb;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.login-btn:disabled {
  background: #c9e0f5;
  cursor: not-allowed;
}
.login-btn:not(:disabled):hover {
  background: #0d77d0;
  box-shadow: 0 2px 8px rgba(15, 136, 235, 0.2);
}

/* 响应式适配：小屏幕自动调整（同步优化左栏） */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    min-height: auto;
  }
  .login-left {
    flex: 0 0 220px;
    padding: 30px 20px;
  }
  .logo-container {
    width: 80px;
    height: 80px;
  }
  .mag-glass {
    width: 60px;
    height: 60px;
  }
  .glass-circle {
    width: 50px;
    height: 50px;
  }
  .video-icon {
    width: 22px;
    height: 22px;
  }
  .play-triangle {
    border-top: 5px solid transparent;
    border-left: 8px solid #0f88eb;
    border-bottom: 5px solid transparent;
  }
  .project-title {
    font-size: 32px;
  }
  .login-right {
    padding: 40px 30px;
  }
}
</style>