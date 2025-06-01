<template>
  <el-form :model="registerForm" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="registerForm.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="registerForm.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleRegister">注册</el-button>
      <router-link to="/login">已有账号？去登录</router-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const registerForm = reactive({
  username: '',
  password: '',
  email: ''
})

const handleRegister = async () => {
  if (!registerForm.username || !registerForm.password) {
    return
  }
  try {
    await axios.post('/api/register', registerForm)
    // 注册成功，跳转到登录页面
    router.push('/login')
    // 可使用消息组件提示用户注册成功
  } catch (err) {
    console.error('注册失败:', err)
    // TODO: 错误处理与提示
  }
}
</script>

