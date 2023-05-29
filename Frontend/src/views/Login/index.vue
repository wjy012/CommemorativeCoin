<template>
    <div class="login-container">
      <el-card class="box-card">
        <el-button :icon="ArrowLeft" text @click="goBack()">返回</el-button>
        <div class="form-area">
          <el-tabs v-model="activeName" class="demo-tabs" stretch>
            <el-tab-pane label="登录" name="first">
              <LoginForm></LoginForm>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
              <RegForm></RegForm>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>

    </div>
  </template>

<script >
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {ArrowLeft} from '@element-plus/icons-vue'
import LoginForm from "./components/LoginForm.vue";
import RegForm from './components/RegForm.vue';

export default {
  components: { LoginForm, RegForm},
    setup() {
      const activeName = ref('first')
      const router = useRouter()
      const loginFormRef = ref()
      const loginForm = reactive({
        username: '',
        password: '',
      })
      const goBack = ()=>{
          router.back()
      }
      return {loginFormRef, loginForm, goBack, activeName, ArrowLeft}
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
    width: 25%;
    margin: 0 auto;
    overflow: hidden;
  }
  .form-area{
    width: 80%;
    margin: auto;
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