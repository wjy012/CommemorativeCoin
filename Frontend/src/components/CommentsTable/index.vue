<template>
  <div>
    <Query @getQuery="getQuery" :kw="query"/>
    <el-table 
      :show-header="false"
      :data="tableData"
    >
      <el-table-column prop="title" :min-width="80">
        <template v-slot:default="scope">
          <el-link :href="scope.row.link" target="_blank">
            <KeywordText :keyword="query" :text="scope.row.title" />
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="date" :min-width="20" align="right"/>
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
import Query from "../Query/index.vue";
import KeywordText from '../KeywordText/index.jsx'

export default {
    name: 'CommentsTable',
    components: {Query, KeywordText},
    props: {
      dataRequest: Function,  //func(pagination, value)
      query: {
        type: Boolean,
        default: true
      },
      coinID: String
    },
    setup(props){
      let count = ref(0)
      let tableData = ref([])
      const query = ref('')
      const pagination = reactive({
        currentPage: 1,
        pageSize: 10
      })

      const getData = async (pagination, {value})=>{
        let res
        if(props.query){
          res = await props.dataRequest(pagination, value)
        }
        else{
          res = await props.dataRequest(pagination, props.coinID)
        }
        if(res.code === 200){
          tableData.value = res.data.rows
          count.value = res.data.count
        }
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

      return {pagination, count, tableData, query, getQuery, handleCurrentChange, handleSizeChange}
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