<template>
  <div class="register-page">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" class="register-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" placeholder="再次输入密码" show-password />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { register } from '@/api/user';

const router = useRouter();
const formRef = ref(null);
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
});

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};
const rules = {
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }]
};

async function submitForm() {
  if (!form.username || !form.password) {
    ElMessage.warning('请填写完整的注册信息');
    return;
  }
  if (form.password !== form.confirmPassword) {
    ElMessage.error('两次密码输入不一致');
    return;
  }
  try {
    await register({
      username: form.username,
      password: form.password,
      email: form.email
    });
    ElMessage.success('注册成功，请前往登录');
    router.push('/login');
  } catch (error) {
    ElMessage.error(`注册失败: ${error.response?.data?.message || '服务器错误'}`);
  }
}

function resetForm() {
  form.username = '';
  form.password = '';
  form.confirmPassword = '';
  form.email = '';
  formRef.value?.resetFields();
}
</script>

<style scoped>
.register-form {
  width: 400px;
  margin: 100px auto;
}
</style>
