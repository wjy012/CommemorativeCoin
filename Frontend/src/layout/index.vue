<template>
  <el-container>
    <el-header 
      style="text-align: right; font-size: 12px"
    >
    <div class="toolbar">
      <el-button v-if="!data.isLogged" type="primary" @click="toLogin()">登录</el-button>
      <el-button v-else type="primary" @click="logout()" plain>注销</el-button>
    </div>
  </el-header>
  <el-container>
    <AppAside :isLogged="data.isLogged" />
    <AppMain />
  </el-container>
  </el-container>
</template>

<script>
import { reactive } from 'vue';
import AppAside from './components/AppAside.vue';
import AppMain from './components/AppMain.vue';
import { useRouter } from 'vue-router';
import { verify } from './service';
import { ElMessage } from 'element-plus';

export default {
  components: { AppAside, AppMain },

  setup(){
    const data = reactive({
      isLogged: false
    })
    const router = useRouter()

    const getLogState = async ()=>{
      const res = await verify()
      if(res.code === 200){
        data.isLogged = true
      }
    }
    getLogState()

    const toLogin = ()=>{
      router.push('/login')
    }
    const logout = ()=>{
      localStorage.removeItem('token')
      data.isLogged = false
      ElMessage({
        message: '用户已注销！',
        type: 'success'
      })
    }
    return {toLogin, logout, data}
  }        
}
</script>

<style scoped>
.el-container{
    height: 100%;
}
.el-header{
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.el-main{
  padding: 30px;
  /* background-color: cadetblue; */
}
</style>