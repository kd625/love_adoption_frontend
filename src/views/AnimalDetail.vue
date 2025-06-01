<template>
  <div class="animal-detail">
    <el-image :src="animal.value.imageUrl" fit="cover" style="width: 400px; height: 300px;" />
    <h2>{{ animal.value.name }}</h2>
    <p>品种：{{ animal.value.breed }}</p>
    <p>年龄：{{ animal.value.age }} 岁</p>
    <p>描述：{{ animal.value.description }}</p>
    <el-button type="primary" @click="applyAdoption">申请领养</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const animal = ref({})

// 通过路由参数获取当前动物ID
const animalId = route.params.id

// 页面加载时获取动物详情数据
onMounted(async () => {
  try {
    const res = await axios.get(`/api/animals/${animalId}`)
    animal.value = res.data  // 假设返回整个动物对象
  } catch (err) {
    console.error('获取动物详情失败:', err)
  }
})

// 点击申请领养
const applyAdoption = () => {
  // 未登录则先要求登录
  if (!localStorage.getItem('token')) {
    router.push('/login')
  } else {
    // 进入领养申请表页面
    router.push(`/apply/${animalId}`)
  }
}
</script>

