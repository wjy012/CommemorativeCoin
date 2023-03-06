<template>
     <el-aside width="200px">
        <el-menu
          router="true"
          default-active="/dashboard"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/dashboard">
            <el-icon><Compass /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Search /></el-icon>
              <span>纪念币查询</span>
            </template>
              <el-menu-item index="/coins/common">普通纪念币</el-menu-item>
              <el-menu-item index="/coins/precious">贵金属纪念币</el-menu-item>
              <el-menu-item index="/coins/cash">纪念钞</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/comments" >
            <el-icon><document /></el-icon>
            <span>鉴赏文章查询</span>
          </el-menu-item>
          <el-menu-item v-if=isLogged index="/system" >
            <el-icon><setting /></el-icon>
            <span>系统管理</span>
          </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
  name: 'AppAside',
  props: ['isLogged'],
  beforeMount(){
    // console.log('aside', isLogged);
  }
}
</script>

<style scoped>

</style>