<template>
  <div style="margin-top: 20px;">
    <el-form 
      inline
      :model="queryForm" 
      class="demo-form-inline"
    >
      <el-form-item>
        <el-input 
            v-model="queryForm.key" 
            placeholder="输入搜索关键字..." 
            :prefix-icon="Search"
            />
      </el-form-item>
      <el-form-item label="题材">
        <el-select v-model="queryForm.theme" placeholder="选择题材" clearable >
          <el-option 
            v-for="item in themeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发行年份">
        <el-date-picker
          v-model="queryForm.year"
          type="year"
          :disabled-date="disabledYear"
          value-format="YYYY"
          placeholder="选择年份"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(queryForm)">查询</el-button>
        <el-button type="primary" plain @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import { reactive,  } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { themeOptions } from '../../plugins/optionTyping';
import { it } from 'element-plus/es/locale';
export default {
  setup(props, {emit}){
    const queryForm = reactive({
      key: '',
      theme: '',
      year:''
    })

    const disabledYear = (date)=>{
      return Date.now < date
    }
    
    const onSubmit = (queryForm) => {
      emit('getQuery', queryForm)
    }

    const resetForm = () => {
      queryForm.key = '',
      queryForm.theme = ''
      queryForm.year = ''
    }
    return { queryForm, onSubmit, disabledYear, resetForm, Search, themeOptions}
  }
}

</script>