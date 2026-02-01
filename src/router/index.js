// 导入vue-router的核心方法
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import MainHome from '../components/MainHome.vue'

// 配置路由规则：路径 → 对应组件
const routes = [
  {
    path: '/', // 根路径，打开项目默认显示首页
    name: 'MainHome',
    component: MainHome
  },
  {
    path: '/login', // 登录页路径，跳转时用这个路径
    name: 'Login',
    component: Login
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 路由模式（H5历史模式，无#号，推荐）
  routes // 挂载上面的路由规则
})

// 导出路由实例，供main.js使用
export default router