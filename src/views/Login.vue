<template>
  <el-form :model="loginForm" class="login-form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="loginForm.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
      <router-link to="/register">没有账号？去注册</router-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loginForm = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    // 简单校验：用户名密码非空
    return
  }
  try {
    const res = await axios.post('/api/login', loginForm)
    // 假设后端返回 token 和用户角色
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userRole', res.data.role)
    // 跳转到首页或之前尝试访问的页面
    router.push('/')
  } catch (err) {
    console.error('登录失败:', err)
    // TODO: 提示用户错误信息，例如使用 Element Plus 的 ElMessage
  }
}
</script>

