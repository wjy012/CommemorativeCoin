<template>
    <BreadCrumb />
    <CommentsTable />
    
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb/index.vue'
import CommentsTable from './components/CommentsTable.vue';

export default {
    components: {BreadCrumb, CommentsTable}
}
</script>

<style lang="scss" scoped>

</style>