<template>
  <div>
    <Query @getQuery="getQuery" kw="1"/>
    <el-table 
      :show-header="false"
      :data="tableData"
    >

    </el-table>
    <div class="pagediv">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        layout="sizes, prev, pager, next"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import Query from "../../../components/Query/index.vue";
import { googleSearch } from "../service";
export default {
    name: 'CommentsTable',
    components: {Query},
    props: {
      dataRequest: Function
    },
    setup(){
      let count = ref(0)
      let tableData = ref([])
      const query = ref('')
      const pagination = reactive({
        currentPage: 1,
        pageSize: 10
      })

      const columns = [{
        prop: 'title',
      }, {
        prop: 'date'
      }]

      const getData = async (pagination, params)=>{
        const res = await googleSearch(pagination, params)
        console.log(res);
        // if(res.code === 200){
        //   tableData.value = res.data.rows
        //   count.value = res.data.count
        // }
      }

      const getQuery = (form) =>{
        query.value = form.key
        getData(pagination, query)
      }
      const handleCurrentChange = (val)=>{
        pagination.currentPage = val
        getData(pagination, query)
      }
      const handleSizeChange = (val)=>{
        pagination.pageSize = val
        getData(pagination, query)
      }
      getData(pagination, query)

      return {pagination, count, tableData, getQuery, handleCurrentChange, handleSizeChange}
    }

}
</script>

<style lang="scss" scoped>
.pagediv{
    display: flex;
    justify-content: right;
    margin-top: 10px;
}
</style>