<template>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item>
        <el-input 
            v-model="queryForm.key" 
            placeholder="输入搜索关键字..." 
            :prefix-icon="Search"
            />
      </el-form-item>
      <el-form-item label="题材">
        <el-select v-model="queryForm.theme" placeholder="选择题材" clearable >
          <el-option label="生肖贺岁" value="newYear" />
          <el-option label="风光" value="landscape" />
          <el-option label="动物" value="animal" />
          <el-option label="人物" value="celebrity" />
          <el-option label="宗教" value="religion" />
          <el-option label="体育运动" value="sports" />
          <el-option label="传统文化" value="tradition" />
          <el-option label="纪念日" value="anniversary" />
          <el-option label="其他" value="other" />
        </el-select>
      </el-form-item>
      <el-form-item label="发行年份">
        <el-date-picker
          v-model="queryForm.year"
          type="year"
          placeholder="选择年份"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  
  const queryForm = reactive({
    key: '',
    theme: '',
    year:''
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }
  </script>