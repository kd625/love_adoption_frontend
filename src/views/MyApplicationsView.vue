<template>
  <div class="my-applications-page">
    <h2>我的领养申请</h2>
    <el-table :data="applications" style="width: 100%">
      <el-table-column prop="id" label="申请ID" width="80" />
      <el-table-column prop="animalName" label="动物名称" />
      <el-table-column prop="status" label="申请状态" width="100">
        <template #default="{ row }">
          <el-tag v-if="row.status === 'pending'" type="warning">待审核</el-tag>
          <el-tag v-else-if="row.status === 'approved'" type="success">已通过</el-tag>
          <el-tag v-else type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="applyDate" label="申请日期" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="primary" text @click="viewAnimal(row.animalId)">查看动物</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="applications.length === 0" description="暂无申请记录" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getMyApplications } from '@/api/adoption';

const router = useRouter();
const applications = ref([]);

onMounted(async () => {
  try {
    const res = await getMyApplications();
    // 假设返回 data 列表，其中包含 animalId、animalName、status、applyDate 等
    applications.value = res.data || [];
  } catch (error) {
    ElMessage.error('无法获取申请列表');
  }
});

function viewAnimal(animalId) {
  router.push({ path: `/animals/${animalId}` });
}
</script>

<style scoped>
.my-applications-page {
  padding: 20px;
}
</style>
