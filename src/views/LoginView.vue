<template>
  <div class="login-page">
    <el-form :model="form" label-width="80px" class="login-form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLogin">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import { login } from '@/api/user';

const router = useRouter();
const userStore = useUserStore();
const form = reactive({
  username: '',
  password: ''
});

async function submitLogin() {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }
  try {
    const response = await login({
      username: form.username,
      password: form.password
    });
    // 假设后端返回数据包含 token 和用户信息
    const { token, user } = response.data;
    // 保存到 Pinia 全局状态
    userStore.setUser(token, user);
    ElMessage.success('登录成功');
    // 跳转到首页（动物列表页）
    router.push('/');
  } catch (error) {
    ElMessage.error(`登录失败: ${error.response?.data?.message || '请检查用户名和密码'}`);
  }
}

function resetForm() {
  form.username = '';
  form.password = '';
}
</script>

<style scoped>
.login-form {
  width: 400px;
  margin: 150px auto;
}
</style>
