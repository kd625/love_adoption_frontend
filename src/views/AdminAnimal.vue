<template>
  <div>
    <el-button type="primary" @click="openAddDialog">新增动物</el-button>
    <el-table :data="animals" style="width: 100%; margin-top: 1em;">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="editAnimal(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteAnimal(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑动物的对话框 (省略实现) -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const animals = ref([])

// 获取所有动物列表
const fetchAnimals = async () => {
  try {
    const res = await axios.get('/api/animals')
    animals.value = res.data.animals || res.data
  } catch (err) {
    console.error('获取动物列表失败:', err)
  }
}

onMounted(fetchAnimals)

// 打开新增动物表单对话框
const openAddDialog = () => {
  // TODO: 打开一个对话框组件让管理员填写新动物信息
}

// 编辑动物信息
const editAnimal = (animal) => {
  // TODO: 打开编辑对话框，载入 animal 数据
}

// 删除动物
const deleteAnimal = async (id) => {
  try {
    await axios.delete(`/api/animals/${id}`)
    // 删除成功后刷新列表
    fetchAnimals()
  } catch (err) {
    console.error('删除失败:', err)
  }
}
</script>

