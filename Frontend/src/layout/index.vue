<template>
    <el-container>
      <el-header>header</el-header>
      <el-container>
        <AppAside />
        <!-- <el-aside width="200px">
        aside
        </el-aside> -->
        <AppMain />
        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppAside from './components/AppAside.vue';
import AppMain from './components/AppMain.vue';

export default {
    components: {AppHeader, AppAside, AppMain}        
}
</script>

<style scoped>
.el-container{
    height: 100%;
}
.el-header{
    background-color: antiquewhite;
}
.el-main{
    background-color: cadetblue;
}
</style>