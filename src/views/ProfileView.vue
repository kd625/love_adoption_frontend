<template>
  <div class="profile-page">
    <h2>个人信息</h2>
    <el-form :model="profileForm" label-width="80px" class="profile-form">
      <el-form-item label="用户名">
        <el-input v-model="profileForm.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="profileForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="profileForm.phone" placeholder="请输入联系电话" />
      </el-form-item>
      <!-- 如需更改密码，可增加相关表单项 -->
      <el-form-item>
        <el-button type="primary" @click="updateProfile">保存修改</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import { getUserInfo, updateUserInfo } from '@/api/user';

const userStore = useUserStore();
const profileForm = reactive({
  username: '',
  email: '',
  phone: ''
});

onMounted(async () => {
  // 如果全局已存在用户信息，则直接使用，否则调用接口获取
  if (userStore.user) {
    profileForm.username = userStore.user.username;
    profileForm.email = userStore.user.email || '';
    profileForm.phone = userStore.user.phone || '';
  } else {
    try {
      const res = await getUserInfo();
      const data = res.data;
      profileForm.username = data.username;
      profileForm.email = data.email || '';
      profileForm.phone = data.phone || '';
      // 更新到全局 store
      userStore.user = data;
    } catch (error) {
      ElMessage.error('获取用户信息失败，请重新登录');
    }
  }
});

async function updateProfile() {
  try {
    await updateUserInfo({
      email: profileForm.email,
      phone: profileForm.phone
    });
    ElMessage.success('个人信息已更新');
    // 更新全局存储中的用户信息
    if (userStore.user) {
      userStore.user.email = profileForm.email;
      userStore.user.phone = profileForm.phone;
      localStorage.setItem('user', JSON.stringify(userStore.user));
    }
  } catch (error) {
    ElMessage.error(`更新失败: ${error.response?.data?.message || '服务器错误'}`);
  }
}

function resetForm() {
  if (userStore.user) {
    profileForm.email = userStore.user.email || '';
    profileForm.phone = userStore.user.phone || '';
  }
}
</script>

<style scoped>
.profile-form {
  width: 400px;
  margin: 20px auto;
}
</style>
