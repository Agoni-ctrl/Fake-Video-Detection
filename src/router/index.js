import { createRouter, createWebHistory } from 'vue-router'
// 引入你的所有组件
import Login from '../components/Login.vue'
import MainHome from '../components/MainHome.vue'
import Detect from '../components/Detect.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { noNeedAuth: true } // 无需登录即可访问（仅登录页）
  },
  {
    path: '/', // 根路由=首页，核心！
    name: 'MainHome',
    component: MainHome,
    meta: { requireAuth: true } // 需要登录才能访问
  },
  {
    path: '/mainhome', // 保留原首页路由，重定向到根路由（防止旧路径失效）
    redirect: '/',
    meta: { requireAuth: true }
  },
  {
    path: '/detect', // 检测页，需要登录
    name: 'Detect',
    component: Detect,
    meta: { requireAuth: true }
  },
  // 404路由：访问不存在的路径，跳登录/首页
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      const isLogin = localStorage.getItem('isLogin') === 'true'
      return isLogin ? '/' : '/login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(), // Vue3 Vite环境直接用这个，无需加BASE_URL
  routes
})

// 🔴 全局路由守卫：登录校验核心（未登录拦首页/检测页，已登录拦登录页）
router.beforeEach((to, from, next) => {
  // 从localStorage获取登录状态（持久化，刷新不丢）
  const isLogin = localStorage.getItem('isLogin') === 'true'

  // 规则1：需要登录的路由，未登录 → 强制跳登录页
  if (to.meta.requireAuth && !isLogin) {
    next('/login')
  }
  // 规则2：无需登录的路由（仅登录页），已登录 → 强制跳首页（防止回退/手动输入）
  else if (to.meta.noNeedAuth && isLogin) {
    next('/')
  }
  // 规则3：正常情况，直接放行
  else {
    next()
  }
})

export default router