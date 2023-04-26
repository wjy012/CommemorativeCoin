<template>
  <div >
    <Query @getQuery="getQuery" kw="1" theme="1" date="1"/>
    <el-table :data="tableData" style="width: 100%;" :key="Math.random()">
      <el-table-column 
        v-for="item in columns" 
        :prop="item.prop" 
        :label="item.label"
        :min-width="item.width"
        :align="item.align || 'left'"
        :fixed="item.fixed || false"
        >
        <template v-slot:default="scope">
          <div v-if="item.type==='img'" class="imgbox">
            <el-image :src="scope.row.image.split(';')[0]" />
          </div>
          <div v-if="item.type==='detail'" >
            <el-button link type="primary" size="small" @click="toDetail(scope.row.id)">
              详细信息
            </el-button>
          </div>
        </template>
        <template #header v-if="item.addItem">
          <el-button type="primary" :icon="Plus" @click="openDialog()">
            添加记录
          </el-button>
        </template>
      </el-table-column>
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
import { defineComponent, ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import Query from '../Query/index.vue'
export default defineComponent({
    name: 'DataTable',
    components: {Query},
    props: {
      columns: Array,
      dataRequest: Function,
      //request(pagination: {currentPage,pageSize}, params: query)
      type: String, //纪念币列表用
      shouldTableUpdate: Boolean,
    },
    setup(props, {emit}){
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
        const router = useRouter()

        const getData = async (pagination, params)=>{
          const res = await props.dataRequest(pagination, params)
          if(res.code ===200){
            tableData.value = res.data.rows
            count.value = res.data.count
          }
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
          getData(pagination, query)
        }
        const toDetail = (id)=>{
          router.push('/coins/detail/'+id)
        }
        const openDialog = ()=>{
          emit('setDialogVisible')
        }

        watch(()=>props.shouldTableUpdate, (newV)=>{
          if(newV===true){
            getData(pagination, query)
            emit('tableUpdated')
          }
        })
        watch(()=>props.type, (newV)=>{
          query.type = newV
          getData(pagination, query)
        })


        getData(pagination, query)
        return {pagination, count, tableData, handleCurrentChange, handleSizeChange, getQuery, openDialog, toDetail, Plus}
    }
})
</script>

<style lang="scss" scoped>
.pagediv{
    display: flex;
    justify-content: right;
    margin-top: 10px;
}
.imgbox{
    width: 70px;
    height: 70px;
}
</style>