<template>
  <div>
    <h3>用户管理</h3>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button size="small" type="danger" @click="deleteUser(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

// 获取用户列表
onMounted(async () => {
  try {
    const res = await axios.get('/api/users')
    users.value = res.data.users || res.data
  } catch (err) {
    console.error('获取用户列表失败:', err)
  }
})

const deleteUser = async (userId) => {
  try {
    await axios.delete(`/api/users/${userId}`)
    // 前端自行从列表移除，优化体验
    users.value = users.value.filter(u => u.id !== userId)
  } catch (err) {
    console.error('删除用户失败:', err)
  }
}
</script>

