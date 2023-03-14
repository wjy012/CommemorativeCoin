<template>
    <BreadCrumb/>
    <!-- <Query style="margin-top: 20px;"/> -->

    <DataTable 
      :columns="columns"
      :dataRequest="getCoinList"
      :type="type"
      />

</template>

<script>
import { useRoute } from 'vue-router';
import Query from '../../components/Query/index.vue'
import BreadCrumb from '../../components/BreadCrumb/index.vue'
import DataTable from '../../components/DataTable/index.vue'
import { getCoinList } from './service';

export default {
    components: {Query, BreadCrumb, DataTable},
    props:{
        type: String
    },
    setup(){
        const columns = [
            {
                prop: 'image',
                type: 'img',
                label: '图案',
                width: '150'
            }, {
                prop: 'name',
                label: '名称',
                width: '300'
            }, {
                prop: 'value',
                label: '面值(元)',
                width: '180'
            }, {
                prop: 'amount',
                label: '发行量',
                width: '180'
            }, {
                prop: 'date',
                label: '发行日期',
                width: '180'
            },
        ]
        return {columns, getCoinList}
    }
}
</script>

<style lang="scss" scoped>

</style>