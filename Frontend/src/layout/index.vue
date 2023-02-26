<template>
    <el-container>
        <el-header 
          style="text-align: right; font-size: 12px"
        >
        <div class="toolbar">
          <el-button type="primary" @click="toLogin()">登录</el-button>
        </div>
      </el-header>
      <el-container>
        <AppAside />
        <AppMain />
        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
</template>

<script>
// import AppHeader from './components/AppHeader.vue';
import AppAside from './components/AppAside.vue';
import AppMain from './components/AppMain.vue';
import {useRouter} from 'vue-router'

export default {
    components: { AppAside, AppMain},
    setup(){
        const router = useRouter()
        const toLogin = ()=>{
            router.push('/login')
        }
        return {toLogin}
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
    background-color: cadetblue;
}
</style>