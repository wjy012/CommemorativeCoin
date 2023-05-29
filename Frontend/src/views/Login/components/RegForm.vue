<template>
    <el-form
        ref="regFormRef"
        :model="regForm"
        :rules="rules"
        label-position="right"
        label-width="80px"
      >
        <el-form-item name="username" label="用户名" prop="username" :required="true">
          <el-input name="username" v-model="regForm.username" />
        </el-form-item>
        <el-form-item name="password" label="密码" prop="password" :required="true">
          <el-input type="password" name="password" v-model="regForm.password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :required="true">
          <el-input type="password" name="checkPass" v-model="regForm.checkPass" />
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
        checkPass: ''
      })

      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码！'))
        } else if (value !== regForm.password) {
          callback(new Error("两次输入的密码不一致！"))
        } else {
          callback()
        }
      }

      const rules = {
        username: [
          {  required: true, message: '请输入用户名！', trigger: 'blur' },
          {  min: 3, max: 20, message: '用户名长度需在3-20个字符之间！', trigger: 'blur'}
        ],
        password: [
          {  required: true, message: '请输入密码！', trigger: 'blur' },
          {  min: 6, max: 60, message: '密码长度需在6-60个字符之间！', trigger: 'blur'}
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }

      const submitForm = async (form)=>{
          const res = await reg(form)
          if(res.code===200){
            localStorage.setItem('token', 'Bearer '+res.token)
            ElMessage({
              message: '注册成功！三秒后自动跳转首页...',
              type: 'success'
            })
            setTimeout(() => {
              router.back()
            }, 3000);
          }else{
            ElMessage({
              message: '失败！',
              type: 'error'
            })
          }
      }
      return { regFormRef, regForm, rules, submitForm}
    }
    
})
</script>

<style lang="scss" scoped>

</style>