// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 引入各页面组件（可采用懒加载形式）
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AnimalList from '@/views/AnimalList.vue'
import AnimalDetail from '@/views/AnimalDetail.vue'
import AdoptionForm from '@/views/AdoptionForm.vue'
import ApplicationStatus from '@/views/ApplicationStatus.vue'
import AdminAnimals from '@/views/admin/AdminAnimals.vue'
import AdminApplications from '@/views/admin/AdminApplications.vue'
import AdminUsers from '@/views/admin/AdminUsers.vue'

// 定义路由规则
const routes = [
  { path: '/', name: 'Home', component: AnimalList },             // 动物列表主页
  { path: '/animal/:id', name: 'AnimalDetail', component: AnimalDetail }, // 动物详情
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/apply/:animalId', name: 'AdoptionForm', component: AdoptionForm, meta: { requiresAuth: true } }, 
  { path: '/applications', name: 'ApplicationStatus', component: ApplicationStatus, meta: { requiresAuth: true } },
  { 
    path: '/admin',
    // 可选：AdminLayout组件包含导航菜单和 <router-view> 子出口
    // component: AdminLayout,
    // 为简单起见直接指定子路由
    children: [
      { path: 'animals', component: AdminAnimals, meta: { requiresAuth: true, requiresAdmin: true } },
      { path: 'applications', component: AdminApplications, meta: { requiresAuth: true, requiresAdmin: true } },
      { path: 'users', component: AdminUsers, meta: { requiresAuth: true, requiresAdmin: true } }
    ]
  },
  { path: '/:catchAll(.*)', redirect: '/' }  // 未匹配路由重定向到首页
]

// 创建路由实例并配置
const router = createRouter({
  history: createWebHistory(),  // 使用HTML5历史模式
  routes
})

// 全局前置守卫：校验登录和管理员权限:contentReference[oaicite:9]{index=9}
router.beforeEach((to, from) => {
  // 检查需要登录的路由
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    return { path: '/login' }  // 未登录则跳转登录页
  }
  // 检查管理员权限
  // 假设用户角色存储在 localStorage.userRole
  if (to.meta.requiresAdmin && localStorage.getItem('userRole') !== 'admin') {
    return { path: '/' }  // 非管理员则禁止访问，重定向首页
  }
})

export default router

