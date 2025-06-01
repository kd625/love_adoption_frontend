// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

// 导入各页面组件
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import AnimalListView from '@/views/AnimalListView.vue';
import AnimalDetailView from '@/views/AnimalDetailView.vue';
import MyApplicationsView from '@/views/MyApplicationsView.vue';
import AdminAnimalList from '@/views/AdminAnimalList.vue';
import AdminApplications from '@/views/AdminApplications.vue';
import AdminUsers from '@/views/AdminUsers.vue';

const routes = [
  { path: '/', redirect: '/animals' }, 
  { path: '/register', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/animals', component: AnimalListView },
  { path: '/animals/:id', component: AnimalDetailView, props: true },
  { path: '/my-applications', component: MyApplicationsView, meta: { requiresAuth: true } },  // 我的领养申请列表，需要登录
  { path: '/admin/animals', component: AdminAnimalList, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/applications', component: AdminApplications, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/users', component: AdminUsers, meta: { requiresAuth: true, adminOnly: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.token) {
    return '/login';
  }
  if (to.meta.adminOnly && (!userStore.user || userStore.user.role !== 'admin')) {
  }
});

export default router;
