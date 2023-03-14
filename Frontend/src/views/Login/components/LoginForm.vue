<template>
    <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-position="right"
        label-width="60px"
      >
        <el-form-item name="username" label="用户名" prop="username">
          <el-input name="username" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item name="password" label="密码" prop="password">
          <el-input type="password" name="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginForm)">
            登录
          </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import {login} from '../service';
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'LoginForm',
  setup() {
    const router = useRouter()
    const loginFormRef = ref()
    const loginForm = reactive({
      username: '',
      password: '',
    })
    const submitForm = async (form)=>{
      const res = await login(form)
      if(res.code===200){
        localStorage.setItem('token', 'Bearer '+res.token)
        ElMessage({
          message: '登陆成功！三秒后自动跳转首页...',
          type: 'success'
        })
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000);
      }else if(res.code===404){
        ElMessage({
          message: '用户未注册！',
          type: 'warning'
        })
      }else{
        ElMessage({
          message: '密码不匹配！',
          type: 'error'
        })
      }
    }
    return {loginFormRef, loginForm, submitForm}
  }
})
</script>

<style lang="scss" scoped>

</style>