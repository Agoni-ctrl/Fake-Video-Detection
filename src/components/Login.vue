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
        <!-- 左侧：渐变蓝 + 项目专属SVG图标 -->
        <div class="login-left">
          <div class="left-content">
            <!-- 伪造视频检测专属SVG图标：播放+盾牌+扫描 -->
            <svg class="project-icon" viewBox="0 0 100 100" fill="currentColor">
              <!-- 盾牌轮廓（检测防护） -->
              <path d="M50 5C25 5 10 25 10 50c0 15 8 30 20 40l20 10 20-10c12-10 20-25 20-40C90 25 75 5 50 5z" stroke="currentColor" stroke-width="2" fill="none"/>
              <!-- 视频播放三角（视频检测） -->
              <polygon points="42 38, 62 50, 42 62" fill="currentColor"/>
              <!-- 扫描线条（智能检测） -->
              <path d="M30 40 l40 0" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
              <path d="M30 60 l40 0" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
              <circle cx="50" cy="50" r="25" stroke="currentColor" stroke-width="1" fill="none" stroke-dasharray="8 4"/>
            </svg>
            <h1 class="project-title">DeepReal</h1>
            <p class="project-subtitle">伪造视频智能检测平台</p>
          </div>
        </div>

        <!-- 右侧：登录表单 -->
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

/* 左侧区域：渐变蓝 + 项目信息 */
.login-left {
  flex: 0 0 45%;
  background: linear-gradient(135deg, #0f88eb 0%, #1890ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
}
.left-content {
  text-align: center;
  color: #fff;
}
/* 专属SVG图标样式：适配尺寸和间距 */
.project-icon {
  width: 72px;
  height: 72px;
  margin-bottom: 20px;
  opacity: 0.9;
}
.project-title {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 6px;
  letter-spacing: 0.5px;
}
.project-subtitle {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

/* 右侧区域：白色表单 */
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

/* 响应式适配：小屏幕自动调整 */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    min-height: auto;
  }
  .login-left {
    flex: 0 0 200px;
    padding: 30px 20px;
  }
  .project-icon {
    width: 60px;
    height: 60px;
  }
  .project-title {
    font-size: 28px;
  }
  .login-right {
    padding: 40px 30px;
  }
}
</style>