// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',            // 从 localStorage 加载保存的 token（如果有）
    user: JSON.parse(localStorage.getItem('user')) || null // 当前用户信息（包含角色等），尝试从 localStorage 恢复
  }),
  actions: {
    setUser(token, userInfo) {
      // 登录成功后调用，保存 token 和用户信息
      this.token = token;
      this.user = userInfo;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userInfo));
    },
    clearUser() {
      // 登出或用户信息失效时调用，清除状态
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  getters: {
    isAdmin: (state) => state.user && state.user.role === 'admin'
  }
});
