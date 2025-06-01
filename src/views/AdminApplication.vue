<template>
  <div>
    <h3>领养申请审核</h3>
    <el-table :data="applications" style="width: 100%">
      <el-table-column prop="id" label="申请ID" width="80"></el-table-column>
      <el-table-column prop="animalName" label="动物"></el-table-column>
      <el-table-column prop="userName" label="申请用户"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button v-if="row.status === '待审核'" size="small" type="success" @click="approve(row.id)">批准</el-button>
          <el-button v-if="row.status === '待审核'" size="small" type="danger" @click="reject(row.id)">拒绝</el-button>
          <span v-else>
            <el-tag :type="row.status === '批准' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const applications = ref([])

// 获取所有领养申请列表
const fetchApplications = async () => {
  try {
    const res = await axios.get('/api/adoptions')  // 或许是 /api/applications 列表
    applications.value = res.data.applications || res.data
  } catch (err) {
    console.error('获取申请列表失败:', err)
  }
}

onMounted(fetchApplications)

// 批准申请
const approve = async (appId) => {
  try {
    await axios.put(`/api/adoptions/${appId}/approve`)
    // 更新状态后刷新列表
    fetchApplications()
  } catch (err) {
    console.error('批准失败:', err)
  }
}

// 拒绝申请
const reject = async (appId) => {
  try {
    await axios.put(`/api/adoptions/${appId}/reject`)
    fetchApplications()
  } catch (err) {
    console.error('拒绝失败:', err)
  }
}
</script>

