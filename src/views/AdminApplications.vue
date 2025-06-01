<template>
  <div class="admin-applications-page">
    <h2>领养申请审核</h2>
    <el-table :data="applications" style="width: 100%">
      <el-table-column prop="id" label="申请ID" width="80" />
      <el-table-column prop="userName" label="申请用户" />
      <el-table-column prop="animalName" label="动物名称" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag v-if="row.status === 'pending'" type="warning">待审核</el-tag>
          <el-tag v-else-if="row.status === 'approved'" type="success">已通过</el-tag>
          <el-tag v-else type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="applyDate" label="申请日期" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button v-if="row.status === 'pending'" type="primary" size="small" @click="approve(row)">通过</el-button>
          <el-button v-if="row.status === 'pending'" type="danger" size="small" @click="reject(row)">拒绝</el-button>
          <el-button type="text" @click="viewAnimal(row.animalId)">查看动物</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="applications.length === 0" description="暂无领养申请" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getAllApplications, reviewApplication } from '@/api/adoption';

const router = useRouter();
const applications = ref([]);

onMounted(() => {
  fetchApplications();
});

async function fetchApplications() {
  try {
    const res = await getAllApplications();
    applications.value = res.data || [];
  } catch (error) {
    ElMessage.error('获取领养申请失败');
  }
}

async function approve(application) {
  try {
    await reviewApplication(application.id, 'approved');
    ElMessage.success('已批准该申请');
    fetchApplications();
  } catch (error) {
    ElMessage.error('操作失败');
  }
}

async function reject(application) {
  try {
    await reviewApplication(application.id, 'rejected');
    ElMessage.success('已拒绝该申请');
    fetchApplications();
  } catch (error) {
    ElMessage.error('操作失败');
  }
}

function viewAnimal(animalId) {
  router.push({ path: `/animals/${animalId}` });
}
</script>

<style scoped>
.admin-applications-page {
  padding: 20px;
}
</style>
