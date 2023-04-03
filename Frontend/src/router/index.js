import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'index',
        component: ()=> import('../layout/index.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: ()=> import('../views/Dashboard/index.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/coins/common',
                name: 'commonCoins',
                component: ()=> import('../views/Coins/index.vue'),
                // props: { type: 'common' },
                meta: {
                    title: '普通纪念币'
                }
            },
            {
                path: '/coins/precious',
                name: 'preciousCoins',
                component: ()=> import('../views/Coins/index.vue'),
                // props: { type: 'precious' },
                meta: {
                    title: '贵金属纪念币'
                }
            },
            {
                path: '/coins/cash',
                name: 'cash',
                component: ()=> import('../views/Coins/index.vue'),
                // props: { type: 'cash' },
                meta: {
                    title: '纪念钞'
                }
            },
            {
                path: '/coins/detail/:id',
                name: 'detail',
                component: ()=>import('../views/Details/index.vue'),
                meta: {
                    title: '详情'
                }
            },
            {
                path: '/comments',
                name: 'comments',
                component: ()=> import('../views/Comments/index.vue'),
                meta: {
                    title: '鉴赏文章'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('../views/Login/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router