<template>
  <div>
    <h2>我的领养申请</h2>
    <el-table :data="applications" style="width: 100%">
      <el-table-column prop="animalName" label="动物"></el-table-column>
      <el-table-column prop="submittedDate" label="申请日期"></el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <!-- 使用标签颜色区分状态 -->
          <el-tag :type="row.status === '批准' ? 'success' 
                         : row.status === '拒绝' ? 'danger' 
                         : 'warning'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const applications = ref([])

// 获取当前用户的所有领养申请列表
onMounted(async () => {
  try {
    const res = await axios.get('/api/users/me/applications')
    applications.value = res.data.applications || res.data  // 根据接口返回结构调整
  } catch (err) {
    console.error('获取申请列表失败:', err)
  }
})
</script>

