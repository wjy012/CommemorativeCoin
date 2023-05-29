<template>
  <div>
    <Query @getQuery="getQuery" kw="1">
      <template #refresh v-if="isLogged">
        <el-button type="primary" :icon="Refresh" :loading="loading" round @click="handleRefresh()">刷新</el-button>
      </template>
    </Query>
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
import {Refresh} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import Query from "../../../components/Query/index.vue";
import KeywordText from '../../../components/KeywordText/index.jsx'
import { commentList, refreshComments } from "../service";
import { verify } from "../../../plugins/verify";
export default {
    name: 'CommentsTable',
    components: {Query, KeywordText},
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

      const isLogged = ref(false)
      const getLogState = async ()=>{
        const res = await verify()
        if(res.code === 200){
          isLogged.value = true
        }
      }
      getLogState()

      const getData = async (pagination, {value})=>{
        const res = await commentList(pagination, value)
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

      const loading = ref(false)
      const handleRefresh = async ()=>{
        loading.value = true
        const res = await refreshComments()
        console.log('res', res);
        if(res.code === 200){
          ElMessage({
            message: `更新成功！收集到${res.lines}条鉴赏文章！`,
            type: 'success'
          })
        }
        loading.value = false
        getData(pagination, query)
      }

      return {pagination, count, tableData, query, isLogged, loading, Refresh, getQuery, handleCurrentChange, handleSizeChange, handleRefresh}
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