<template>
  <div>
    <!-- 筛选和搜索栏 -->
    <div class="filters" style="margin-bottom: 1em;">
      <el-select v-model="filterType" placeholder="类别" @change="handleFilterChange" style="width: 120px; margin-right: 8px;">
        <el-option label="全部" value=""></el-option>
        <el-option label="猫" value="cat"></el-option>
        <el-option label="狗" value="dog"></el-option>
        <!-- 可根据接口文档扩展其他类别选项 -->
      </el-select>
      <el-input v-model="searchTerm" placeholder="搜索动物..." style="width: 200px;">
        <template #append>
          <el-button icon="Search" @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
    </div>
    <!-- 动物卡片列表 -->
    <el-row :gutter="20" class="animal-list">
      <el-col :span="6" v-for="animal in animals" :key="animal.id">
        <el-card :body-style="{ padding: '10px' }" shadow="hover">
          <el-image :src="animal.imageUrl" style="width: 100%; height: 150px; object-fit: cover;" :alt="animal.name" />
          <h3>{{ animal.name }}</h3>
          <p>{{ animal.breed }} / {{ animal.age }}岁</p>
          <el-button type="primary" @click="$router.push('/animal/' + animal.id)">查看详情</el-button>
        </el-card>
      </el-col>
    </el-row>
    <!-- 分页组件 -->
    <el-pagination 
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalItems"
      @current-change="handlePageChange"
      style="margin-top: 1em; text-align: center;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const animals = ref([])
const filterType = ref('')      // 筛选类别，如 "cat"/"dog"，空字符串表示全部
const searchTerm = ref('')      // 搜索关键词
const currentPage = ref(1)      // 当前页码
const pageSize = 8              // 每页显示数量
const totalItems = ref(0)       // 总动物数，用于分页计算

// 获取动物列表数据
const fetchAnimals = async () => {
  const params = {
    page: currentPage.value,
    pageSize: pageSize,
    type: filterType.value,
    search: searchTerm.value
  }
  try {
    const res = await axios.get('/api/animals', { params })
    animals.value = res.data.animals   // 接口假定返回 { animals: [...], total: ... }
    totalItems.value = res.data.total
  } catch (err) {
    console.error('获取动物列表失败:', err)
  }
}

// 筛选条件变化处理
const handleFilterChange = () => {
  currentPage.value = 1        // 改变筛选时重置到第1页
  fetchAnimals()
}

// 点击搜索按钮
const handleSearch = () => {
  currentPage.value = 1
  fetchAnimals()
}

// 分页页码改变处理
const handlePageChange = (page) => {
  currentPage.value = page
  fetchAnimals()
}

// 初始挂载时获取第一页数据:contentReference[oaicite:14]{index=14}
onMounted(fetchAnimals)
</script>

