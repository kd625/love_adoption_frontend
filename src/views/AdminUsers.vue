<template>
  <div class="admin-users-page">
    <h2>用户管理</h2>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" width="100" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="text" style="color: red;" @click="removeUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="userList.length === 0" description="暂无用户" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getAllUsers, deleteUser } from '@/api/user';

const userList = ref([]);

onMounted(() => {
  fetchUsers();
});

async function fetchUsers() {
  try {
    const res = await getAllUsers();
    userList.value = res.data || [];
  } catch (error) {
    ElMessage.error('获取用户列表失败');
  }
}

async function removeUser(user) {
  if (!confirm(`确认删除用户 ${user.username} 吗？`)) return;
  try {
    await deleteUser(user.id);
    ElMessage.success('用户已删除');
    fetchUsers();
  } catch (error) {
    ElMessage.error('删除用户失败');
  }
}
</script>

<style scoped>
.admin-users-page {
  padding: 20px;
}
</style>
