<template>
    <el-carousel trigger="click" height="230px" >
      <el-carousel-item v-for="item in hrefs.split(';')" :key="item">
        <el-image :src="item" style="height: 100%;" fit="contain" />
      </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name: 'CoinImg',
    props: {
        hrefs: String
    },
    setup(props){
    }
}
</script>

<style lang="scss" scoped>
.el-carousel__item{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>