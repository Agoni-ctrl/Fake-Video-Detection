// router/index.js 或 router.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // ... 其他路由
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router