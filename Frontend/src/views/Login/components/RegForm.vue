<template>
    <el-form
        ref="regFormRef"
        :model="regForm"
        label-position="right"
        label-width="60px"
      >
        <el-form-item name="username" label="用户名" prop="username">
          <el-input name="username" v-model="regForm.username" />
        </el-form-item>
        <el-form-item name="password" label="密码" prop="password">
          <el-input type="password" name="password" v-model="regForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(regForm)">
            注册
          </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { reg } from '../service';
import { useRouter } from "vue-router";

export default defineComponent({
    name: 'RegForm',
    setup() {
      const router = useRouter()
      const regFormRef = ref()
      const regForm = reactive({
        username: '',
        password: '',
      })
      const submitForm = async (form)=>{
          const res = await reg(form)
          if(res.code===200){
            localStorage.setItem('token', 'Bearer '+res.token)
            ElMessage({
              message: '注册成功！三秒后自动跳转首页...',
              type: 'success'
            })
            setTimeout(() => {
              router.push('/dashboard')
            }, 3000);
          }else{
            ElMessage({
              message: '失败！',
              type: 'error'
            })
          }
      }
      return { regFormRef, regForm, submitForm}
    }
    
})
</script>

<style lang="scss" scoped>

</style>