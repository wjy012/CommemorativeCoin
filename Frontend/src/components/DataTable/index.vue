<template>
  <div >
    <Query @getQuery="getQuery"/>
    <el-table :data="tableData" style="width: 100%;" :key="Math.random()">
      <el-table-column 
        v-for="item in columns" 
        :prop="item.prop" 
        :label="item.label"
        :width="item.width"
        />
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
import { defineComponent, ref, reactive } from 'vue';
import Query from '../Query/index.vue'
export default defineComponent({
    name: 'DataTable',
    components: {Query},
    props: {
        columns: Array,
        dataRequest: Function,
        type: String, //纪念币列表用
        //request(pagination: {currentPage,pageSize}, params: query)
    },
    setup(props){
        let count = ref(0)
        let query = reactive({})
        if(props.type){
            query.type = props.type
        }
        const pagination = reactive({
            currentPage: 1,
            pageSize: 10
        })
        let tableData = ref([])

        const getData = async (pagination, params)=>{
            const {data: res} = await props.dataRequest(pagination, params)
            if(res.code ===200){
                tableData.value = res.data.rows
                count.value = res.data.count
            }
            // console.log(tableData);
        }
        const handleCurrentChange = (val)=>{
            pagination.currentPage = val
            getData(pagination, query)
        }
        const handleSizeChange = (val)=>{
            pagination.pageSize = val
            getData(pagination, query)
        }
        const getQuery = (form) =>{
            for(const key in form){
                query[key] = form[key]
            }
            // console.log('query', query);
            getData(pagination, query)
        }


        getData(pagination, query)
        return {pagination, count, tableData, handleCurrentChange, handleSizeChange, getQuery}
    }
})
</script>

<style lang="scss" scoped>
.pagediv{
    display: flex;
    justify-content: right;
    margin-top: 10px;
}
</style>