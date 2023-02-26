<template>
    <div class="login-container">
      <el-card class="box-card">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          class="login-form"
          autocomplete="on"
          label-position="right"
          label-width="60px"
          >
          <div class="title-container">
            <h3 class="title">系统登录</h3>
          </div>
        <el-form-item name="username" label="用户名" prop="username">
          <el-input name="username" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item name="password" label="密码" prop="password">
          <el-input name="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button @click="goBack()">返回</el-button>
          <el-button type="primary" @click="submitForm(loginFormRef)">
            登录
          </el-button>
        </el-form-item>
<!--   
        <el-form-item
          prop="username"
          label="用户名"
          >
          <el-input
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
  
        <el-form-item 
          prop="password"
          label="密码"
        >
          <el-input
            name="password"
            tabindex="2"
            autocomplete="on"
          />
        </el-form-item>
  
        <el-button
          type="primary"
          @click.prevent="handleLogin"
        >
          登录
        </el-button> -->
  
        </el-form>
      </el-card>
  
    </div>
  </template>

<script >
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'


export default {
    setup() {
        const router = useRouter()
        const loginFormRef = ref()
        const loginForm = reactive({
          username: '',
          password: '',
        })
        const goBack = ()=>{
            router.back()
        }
        return {loginFormRef, loginForm, goBack}
    }
       
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
  .box-card {
    width: 350px;
    // position: relative;
    // max-width: 100%;
    padding: 30px 50px;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: black;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>