<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 导入 useRouter

defineProps({
  title: {
    type: String,
    default: 'DeepReal'
  }
})

const router = useRouter() // 获取路由实例
const activeNav = ref('首页')

const handleNavClick = (navName) => {
  activeNav.value = navName
  console.log(`点击了导航：${navName}`)
  if(navName=="检测"){
    router.push('./detect')
    // alert('跳转成功')
  }
  if (navName=="首页"){
    router.push('./mainhome')
  }

}

const handleSearch = () => {
  const searchVal = document.querySelector('.search-input').value
  if (searchVal) {
    alert(`开始搜索：${searchVal}`)
  } else {
    alert('请输入搜索内容～')
  }
}

// 修改退出登录点击事件，使用路由跳转
const handleReturn = () => {
  localStorage.removeItem('isLogin')
  router.push('/login') // 跳转到登录页面
  // 或者使用命名路由：
  // router.push({ name: 'Login' })
}
</script>

<template>
  <!-- 顶部导航栏容器 -->
  <header class="zhihu-header">
    <!-- 左侧：Logo + 导航菜单 -->
    <div class="header-left">
      <div class="zhihu-logo">{{ title }}</div>
      <nav class="nav-menu">
        <span 
          class="nav-item" 
          :class="{active: activeNav === '首页'}"
          @click="handleNavClick('首页')"
        >首页</span>
        <span 
          class="nav-item" 
          :class="{active: activeNav === '检测'}"
          @click="handleNavClick('检测')"
        >检测</span>
        <span 
          class="nav-item" 
          :class="{active: activeNav === '专栏'}"
          @click="handleNavClick('专栏')"
        >专栏</span>
        <span 
          class="nav-item" 
          :class="{active: activeNav === 'AI'}"
          @click="handleNavClick('AI')"
        >AI</span>
        <span 
          class="nav-item" 
          :class="{active: activeNav === '关于我们'}"
          @click="handleNavClick('关于我们')"
        >关于我们</span>
        <span 
          class="nav-item" 
          :class="{active: activeNav === '。。。'}"
          @click="handleNavClick('。。。')"
        >。。。</span>
        <span 
          class="nav-item" 
          :class="{active: activeNav === '。。。'}"
          @click="handleNavClick('。。。')"
        >。。。</span>
      </nav>
    </div>

    <!-- 中间：搜索框（图标已调整靠右贴边） -->
    <div class="header-middle">
      <input 
        type="text" 
        class="search-input" 
        placeholder="什么是伪造视频？"
        @keyup.enter="handleSearch" 
      >
      <span class="search-icon" @click="handleSearch">🔍</span>
    </div>

    <!-- 右侧：登录/注册按钮 -->
    <div class="header-right">
      <button class="return" @click="handleReturn">退出登录</button>
    </div>
  </header>
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
  padding: 0 36px 0 20px; /* 原44px → 36px，同步匹配图标位置，避免内容重叠 */
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
  right: 8px; /* 原16px → 8px，图标右移贴紧搜索框右端，间距缩小一半 */
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

.return {
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
.return:hover {
  background: #0d77d0;
  box-shadow: 0 2px 4px rgba(15, 136, 235, 0.2);
}
.return:active {
  transform: scale(0.98);
}

/* 适配小屏幕：导航栏不挤 */
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
}
</style>