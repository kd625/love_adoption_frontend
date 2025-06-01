<template>
  <div class="adoption-form-page">
    <h2>领养申请表</h2>
    <el-form :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="您的姓名" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" placeholder="联系方式" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" placeholder="您的地址" />
      </el-form-item>
      <el-form-item label="领养理由">
        <el-input v-model="form.reason" type="textarea" placeholder="为什么想领养这只动物？" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitApplication">提交申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

// 当前申请对应的动物ID，从路由参数获取
const animalId = route.params.animalId

// 领养申请表单数据
const form = reactive({
  name: '',
  phone: '',
  address: '',
  reason: '',
  animalId: animalId   // 关联所申请的动物
})

const submitApplication = async () => {
  if (!form.name || !form.phone) {
    // 简单必填项校验
    return
  }
  try {
    await axios.post('/api/adoptions', form)
    // 提交成功，跳转到我的申请状态页面
    router.push('/applications')
  } catch (error) {
    console.error('提交申请失败:', error)
    // TODO: 提示错误信息
  }
}
</script>

