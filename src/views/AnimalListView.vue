<template>
  <div class="animal-list-page">
    <h2>可领养动物列表</h2>
    <el-table :data="animalList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="species" label="种类" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="gender" label="性别" width="80" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag v-if="row.status === 'available'" type="success">可领养</el-tag>
          <el-tag v-else type="info">已领养</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="primary" text @click="viewDetail(row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next, ->, total"
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getAnimals } from '@/api/animal';

const router = useRouter();
const animalList = ref([]);
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
});

async function fetchAnimals() {
  try {
    const res = await getAnimals(pagination.page, pagination.pageSize);
    // 假设后端返回数据格式 { data: { records: [...], total: 100 } } 或直接返回列表
    const data = res.data;
    animalList.value = data.records || data.animals || [];  // 根据实际字段名调整
    pagination.total = data.total || 0;
  } catch (error) {
    ElMessage.error('获取动物列表失败');
  }
}

function viewDetail(animalId) {
  router.push({ path: `/animals/${animalId}` });
}

function handlePageChange(page) {
  pagination.page = page;
  fetchAnimals();
}

function handleSizeChange(size) {
  pagination.pageSize = size;
  pagination.page = 1;
  fetchAnimals();
}

onMounted(() => {
  fetchAnimals();
});
</script>

<style scoped>
.animal-list-page {
  padding: 20px;
}
.pagination {
  margin: 20px 0;
  text-align: right;
}
</style>
