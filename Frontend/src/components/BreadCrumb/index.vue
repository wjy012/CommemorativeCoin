<template>
  <el-breadcrumb v-if="breadcrumbs.length!==1" separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span v-if="index===breadcrumbs.length-1">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import {defineComponent, reactive, onBeforeMount, watch, toRefs} from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    setup(){
        const currRoute = useRoute()
        const router = useRouter()
        const state = reactive({
            breadcrumbs: [],
            getBreadcrumb: ()=>{
                let matched = currRoute.matched.filter(e=>e.meta&&e.meta.title)
                const first = matched[0]
                if(!state.isDashboard(first)){
                    matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
                }
                state.breadcrumbs = matched.filter(e=>{
                    return e.meta && e.meta.title && e.meta.breadcrumb!==false
                })
            },
            isDashboard(route){
                const name = route && route.name
                if(!name)   return false
                return name.toString().trim().toLocaleLowerCase() === 'dashboard'.toLocaleLowerCase()
            },
            handleLink(item) {
                const {redirect, path} = item
                if(redirect){
                    router.push(redirect).catch((err) => {
                        console.warn(err)
                    })
                    return
                }
                router.push(path).catch((err) => {
                    console.warn(err)
                })
            }
        })
        watch(()=>currRoute.path, path=>{
            // if(path.startsWith())
            state.getBreadcrumb()
        })
        onBeforeMount(()=>{
            state.getBreadcrumb()
        })
        return {...toRefs(state)}
    }
})

</script>

<style lang="scss" scoped>

</style>