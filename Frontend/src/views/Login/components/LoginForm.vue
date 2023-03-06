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
import {login} from '../service';
export default defineComponent({
    name: 'LoginForm',
    setup() {
        const loginFormRef = ref()
        const loginForm = reactive({
          username: '',
          password: '',
        })
        const submitForm = async (form)=>{
            const {data: res} = await login(form)
            console.log('res', res);
        }
        return {loginFormRef, loginForm, submitForm}
    }
    
})
</script>

<style lang="scss" scoped>

</style>