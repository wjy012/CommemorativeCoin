<template>
    <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-position="right"
        label-width="80px"
      >
        <el-form-item 
          name="username" 
          label="用户名" 
          prop="username" 
          :required="true"
          >
          <el-input class="loginput" name="username" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item name="password" label="密码" prop="password" :required="true">
          <el-input class="loginput" type="password" name="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginForm)" :auto-insert-space="true">
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
    const rules = {
      username: [
        {  required: true, message: '请输入用户名！', trigger: 'blur' },
        {  min: 3, max: 20, message: '用户名长度需在3-20个字符之间！', trigger: 'blur'}
      ],
      password: [
        {  required: true, message: '请输入密码！', trigger: 'blur' },
        {  min: 6, max: 60, message: '密码长度需在6-60个字符之间！', trigger: 'blur'}
      ]
    }
    const submitForm = async (form)=>{
      const res = await login(form)
      if(res.code===200){
        localStorage.setItem('token', 'Bearer '+res.token)
        ElMessage({
          message: '登陆成功！三秒后自动回退...',
          type: 'success'
        })
        setTimeout(() => {
          router.back()
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
    return {loginFormRef, rules, loginForm, submitForm}
  }
})
</script>

<style lang="scss" scoped>
.loginput{
  margin: 5% 0;
}
</style>