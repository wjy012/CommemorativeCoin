<template>
  <el-dialog v-model="dialogOpen" title="添加纪念币/钞" width="45%">
    <el-form :ref="form" :model="form" label-width="100px">
      <el-form-item label="名称" required>
        <el-input v-model="form.name" placeholder="请输入名称" class="input"/>
      </el-form-item>
      <el-form-item label="类型" required>
        <el-select v-model="form.type" placeholder="请选择类型" class="input">
          <el-option 
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="材质" >
        <el-input v-model="form.material" placeholder="请输入材质" class="input"/>
      </el-form-item>
      <el-form-item label="题材" required>
        <el-select v-model="form.theme" placeholder="请选择题材" class="input">
          <el-option 
            v-for="item in themeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="面值" required>
        <el-input v-model="form.value" type="number" placeholder="请输入面值" class="input"/>
      </el-form-item>
      <el-form-item label="发行日期" >
        <el-date-picker v-model="form.date" type="date" placeholder="请选择发行日期" class="input"/>
      </el-form-item>
      <el-form-item label="发行量" >
        <el-input v-model="form.amount" type="number" placeholder="请输入发行量" class="input"/>
      </el-form-item>
      <el-form-item label="价格链接" >
        <el-input v-model="form.pricelink" placeholder="请输入价格链接（非必选，不填则自动寻找，可能不太精确）" class="input"/>
      </el-form-item>
      <el-form-item label="图片" >
        <el-upload 
          action="http://localhost:3000/uploadCoinImg" 
          list-type="picture-card" 
          :limit="2"
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

export default {
    name: 'AddCoinForm',
    props: {
      type: String,
      dialogVisible: Boolean,
    },
    setup(props, {emit}){
      const imgs = ref([])
      const form = reactive({
        name: '',
        type: props.type,
        material: '',
        theme: '',
        value: '',
        amount: '',   
        date: '',
        pricelink: '',
        image: '',
      })
      const dialogOpen = ref(props.dialogVisible)
      watch(()=>props.dialogVisible, (newV, oldV)=>{
        console.log(newV, oldV);
        dialogOpen.value = newV
      })

      const handleRemove = (file) => {
        const { response: {data} } = file
        console.log(data);
        for(let i=0; i<imgs.length;i++){
          if(imgs.value[i] === data){
            imgs.value.splice(i, 1)
            break
          }
        }
      }

      const closeDialog = ()=>{
        emit('closeDialog')
      }

      const afterUpload = (res)=>{
        imgs.value.push(res.data)
      }
      const submitForm = (form)=>{
        form.image = imgs.value.join(';')
        imgs.value = []
        emit('submitForm', form)
      }

      return { dialogOpen, closeDialog, typeOptions, themeOptions, form, handleRemove, afterUpload, submitForm, Delete, Plus}
    }
}
</script>

<style lang="scss" scoped>
.input {
  width: 75%;
}
</style>