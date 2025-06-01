<template>
  <div class="animal-detail-page" v-if="animal">
    <h2>{{ animal.name }} 的详情</h2>
    <el-descriptions border :column="2">
      <el-descriptions-item label="动物ID">{{ animal.id }}</el-descriptions-item>
      <el-descriptions-item label="名称">{{ animal.name }}</el-descriptions-item>
      <el-descriptions-item label="种类">{{ animal.species }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ animal.age }} 岁</el-descriptions-item>
      <el-descriptions-item label="性别">{{ animal.gender }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag v-if="animal.status === 'available'" type="success">可领养</el-tag>
        <el-tag v-else-if="animal.status === 'pending'" type="warning">审核中</el-tag>
        <el-tag v-else type="info">已领养</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ animal.description }}</el-descriptions-item>
      <!-- 如果有图片链接，可展示缩略图 -->
      <el-descriptions-item v-if="animal.imageUrl" label="照片" :span="2">
        <el-image :src="animal.imageUrl" style="max-width: 300px;"></el-image>
      </el-descriptions-item>
    </el-descriptions>
    <div class="actions" v-if="animal.status === 'available'">
      <el-button type="primary" @click="applyForAdoption">申请领养</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import { getAnimalDetail } from '@/api/animal';
import { applyAdoption } from '@/api/adoption';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const animal = ref(null);

onMounted(async () => {
  const id = route.params.id;
  if (!id) return;
  try {
    const res = await getAnimalDetail(id);
    animal.value = res.data;
  } catch (error) {
    ElMessage.error('无法获取动物详情');
  }
});

async function applyForAdoption() {
  if (!userStore.token) {
    ElMessage.warning('请先登录再申请领养');
    router.push('/login');
    return;
  }
  if (!animal.value) return;
  try {
    await applyAdoption(animal.value.id);
    ElMessage.success('领养申请已提交，请等待审核');
    // 提交申请后，可以禁用按钮或者导航到"我的申请"页面
    animal.value.status = 'pending'; // 前端将状态标记为申请中，隐藏按钮
  } catch (error) {
    ElMessage.error(`申请失败: ${error.response?.data?.message || '请稍后重试'}`);
  }
}
</script>

<style scoped>
.animal-detail-page {
  padding: 20px;
}
.actions {
  margin-top: 20px;
}
</style>
