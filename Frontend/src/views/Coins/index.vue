<template>
    <BreadCrumb/>
    <div>
        纪念币钞查询{{ type }}
    </div>
    <Query/>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="img" label="图案" width="180" />
      <el-table-column prop="name" label="名称" width="300" />
      <el-table-column prop="value" label="面值" width="180" />
      <el-table-column prop="amount" label="发行量" width="180" />
      <el-table-column prop="date" label="发行日期" />
    </el-table>

</template>

<script>
import Query from '../../components/Query/index.vue'
import BreadCrumb from '../../components/BreadCrumb/index.vue'
export default {
    components: {Query, BreadCrumb},
    props:{
        type: String
    }
}
</script>

<style lang="scss" scoped>

</style>