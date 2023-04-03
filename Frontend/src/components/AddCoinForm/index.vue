<template>
  <el-dialog v-model="dialogOpen" title="添加纪念币/钞">
    <el-form :ref="form" :model="form" label-width="100px">
      <el-form-item label="名称" required>
        <el-input v-model="form.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="类型" required>
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option 
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="材质" >
        <el-input v-model="form.material" placeholder="请输入材质"/>
      </el-form-item>
      <el-form-item label="题材" required>
        <el-select v-model="form.theme" placeholder="请选择题材">
          <el-option 
            v-for="item in themeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="面值" required>
        <el-input v-model="form.value" type="number" placeholder="请输入面值"/>
      </el-form-item>
      <el-form-item label="发行日期" >
        <el-date-picker v-model="form.date" type="date" placeholder="请选择发行日期"/>
      </el-form-item>
      <el-form-item label="发行量" >
        <el-input v-model="form.amount" type="number" placeholder="请输入发行量"/>
      </el-form-item>
      <el-form-item label="图片" >
        <el-upload 
          action="http://localhost:3000/uploadCoinImg" 
          list-type="picture-card" 
          :limit="1"
          :on-success="afterUpload"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog()">取消</el-button>
          <el-button type="primary" @click="submitForm(form)">
            确定
          </el-button>
        </span>
      </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import { typeOptions, themeOptions } from '../../plugins/optionTyping'
import { addCoin } from '../../views/Coins/service'
import { ElMessage } from 'element-plus';

export default {
    name: 'AddCoinForm',
    props: {
      type: String,
      dialogVisible: Boolean,
      // submitForm: Function
    },
    setup(props, {emit}){
      const form = reactive({
        name: '',
        type: props.type,
        material: '',
        theme: '',
        value: '',
        amount: '',   
        date: '',
        image: '',
      })
      const dialogOpen = ref(props.dialogVisible)
      watch(()=>props.dialogVisible, (newV, oldV)=>{
        console.log(newV, oldV);
        dialogOpen.value = newV
      })
      const handleRemove = () => {
        form.image = ''
      }

      const closeDialog = ()=>{
        emit('closeDialog')
      }

      const afterUpload = (res)=>{
        console.log(res);
        form.image = res.data
      }
      const submitForm = (form)=>{
        emit('submitForm', form)
      }

      // const handleSubmit = async (form) =>{
      //   const res = await addCoin(form)
      //   console.log(res);
      //   if(res.code===200){
      //     ElMessage({
      //       message: '添加成功！',
      //       type: 'success'
      //     })
      //     closeDialog()
      //   }else{
      //     Message({
      //       message: '添加失败！',
      //       type: 'warning'
      //     })
      //   }
      // }
      

      return { dialogOpen, closeDialog, typeOptions, themeOptions, form, handleRemove, afterUpload, submitForm, Delete, Plus}
    }
}
</script>

<style lang="scss" scoped>

</style>