<template>
  <div class="admin-animal-page">
    <h2>动物信息管理</h2>
    <el-button type="primary" @click="openAddDialog">新增动物</el-button>
    <el-table :data="animalList" style="width: 100%; margin-top: 10px;">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="species" label="种类" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="gender" label="性别" width="80" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button type="text" @click="openEditDialog(row)">编辑</el-button>
          <el-button type="text" style="color: red;" @click="confirmDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑动物 对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form :model="editForm" label-width="80px" style="margin-top: 10px;">
        <el-form-item label="名称">
          <el-input v-model="editForm.name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="种类">
          <el-input v-model="editForm.species" placeholder="种类（如猫/狗）" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.number="editForm.age" type="number" placeholder="年龄" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="editForm.gender" placeholder="公/母" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="可领养" value="available" />
            <el-option label="已领养" value="adopted" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.description" type="textarea" placeholder="动物描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAnimal">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getAnimals, createAnimal, updateAnimal, deleteAnimal } from '@/api/animal';

const animalList = ref([]);
const dialogVisible = ref(false);
const dialogTitle = ref('');
const editForm = reactive({
  id: null,
  name: '',
  species: '',
  age: 0,
  gender: '',
  status: 'available',
  description: ''
});

async function fetchAnimals() {
  try {
    const res = await getAnimals(1, 1000);  // 假设管理员可一次获取所有动物
    const data = res.data;
    animalList.value = data.records || data.animals || [];
  } catch (error) {
    ElMessage.error('获取动物列表失败');
  }
}

function openAddDialog() {
  dialogTitle.value = '新增动物';
  // 清空表单
  editForm.id = null;
  editForm.name = '';
  editForm.species = '';
  editForm.age = 0;
  editForm.gender = '';
  editForm.status = 'available';
  editForm.description = '';
  dialogVisible.value = true;
}

function openEditDialog(animal) {
  dialogTitle.value = '编辑动物';
  // 填充表单为选中动物的信息
  editForm.id = animal.id;
  editForm.name = animal.name;
  editForm.species = animal.species;
  editForm.age = animal.age;
  editForm.gender = animal.gender;
  editForm.status = animal.status;
  editForm.description = animal.description;
  dialogVisible.value = true;
}

async function saveAnimal() {
  try {
    if (editForm.id) {
      // 编辑模式
      await updateAnimal(editForm.id, {
        name: editForm.name,
        species: editForm.species,
        age: editForm.age,
        gender: editForm.gender,
        status: editForm.status,
        description: editForm.description
      });
      ElMessage.success('动物信息已更新');
    } else {
      // 新增模式
      await createAnimal({
        name: editForm.name,
        species: editForm.species,
        age: editForm.age,
        gender: editForm.gender,
        status: editForm.status,
        description: editForm.description
      });
      ElMessage.success('动物已新增');
    }
    dialogVisible.value = false;
    fetchAnimals(); // 刷新列表
  } catch (error) {
    ElMessage.error(`保存失败: ${error.response?.data?.message || '请检查输入'}`);
  }
}

async function confirmDelete(animal) {
  if (!confirm(`确定删除动物 "${animal.name}" 吗？`)) return;
  try {
    await deleteAnimal(animal.id);
    ElMessage.success('动物已删除');
    fetchAnimals();
  } catch (error) {
    ElMessage.error('删除失败');
  }
}

onMounted(() => {
  fetchAnimals();
});
</script>

<style scoped>
.admin-animal-page {
  padding: 20px;
}
.dialog-footer {
  text-align: right;
}
</style>
