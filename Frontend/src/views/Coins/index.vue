<template>
    <BreadCrumb/>

    <DataTable 
      :columns="columns"
      :dataRequest="getCoinList"
      :type="type"
      :shouldTableUpdate="shouldTableUpdate"
      @tableUpdated="tableUpdated"
      @setDialogVisible="setDialogVisible"
      />

    <AddCoinForm :type="type" :dialogVisible="dialogVisible" @closeDialog="closeDialog" @submitForm="submitForm"/>
    
</template>

<script>
import { reactive, ref, watch } from 'vue'
import Query from '../../components/Query/index.vue'
import BreadCrumb from '../../components/BreadCrumb/index.vue'
import DataTable from '../../components/DataTable/index.vue'
import AddCoinForm from '../../components/AddCoinForm/index.vue'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getCoinList, addCoin } from './service';
import { verify } from '../../plugins/verify'

export default {
    components: {Query, BreadCrumb, DataTable, AddCoinForm},
    setup(){
        const columns = [
            {
                prop: 'image',
                type: 'img',
                label: '图案',
                width: '20%'
            }, {
                prop: 'name',
                label: '名称',
                width: '50%'
            }, {
                prop: 'value',
                label: '面值(元)',
                width: '15%'
            }, {
                prop: 'amount',
                label: '发行量',
                width: '15%'
            }, {
                prop: 'date',
                label: '发行日期',
                width: '20%'
            }, {
                fixed: 'right',
                type: 'detail',
                align: 'center',
                addItem: false,
                width: '30%'
            }
        ]
        const route = useRoute()
        const type = ref(route.path.replace('/coins/', ''))
        watch(()=>route.path, (newV)=>{
            type.value = newV.replace('/coins/', '')
        })

        const data = reactive({})

        const getLogState = async ()=>{
            const res = await verify()
                if(res.code === 200){
                    columns[columns.length-1]['addItem'] = true
                }
            }
        getLogState()

        const dialogVisible = ref(false)
        const shouldTableUpdate = ref(false)
        const setDialogVisible = ()=>{
            dialogVisible.value = true
        }
        const closeDialog = ()=>{
            dialogVisible.value = false
        }
        const submitForm = async (form)=>{
            const res = await addCoin(form)
            if(res.code===200){
                ElMessage({
                    message: '添加成功！正在收集相关鉴赏文章中...',
                    type: 'success'
                })
                closeDialog()
                shouldTableUpdate.value = true
            }else{
                ElMessage({
                    message: '添加失败！',
                    type: 'warning'
                })
            }
        }
        const tableUpdated = ()=>{
            shouldTableUpdate.value = false
        }

        
        return {columns, data, type, dialogVisible, shouldTableUpdate, tableUpdated, getCoinList, setDialogVisible, closeDialog, submitForm}
    }
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>