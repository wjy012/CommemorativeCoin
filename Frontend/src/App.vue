<script>
import API from "./plugins/axiosInstance"
export default {
  created(){
    API({
      url: '/string',
      method: 'get',
    }).then(res =>{
      console.log(res);
    })
  }
}
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <router-view></router-view>
</template>

<style scoped>

</style>
