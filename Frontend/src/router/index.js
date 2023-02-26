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
                props: { type: 'common' }
            },
            {
                path: '/coins/precious',
                name: 'preciousCoins',
                component: ()=> import('../views/Coins/index.vue'),
                props: { type: 'precios' }
            },
            {
                path: '/coins/cash',
                name: 'cash',
                component: ()=> import('../views/Coins/index.vue'),
                props: { type: 'cash' }
            },
            {
                path: '/comments',
                name: 'comments',
                component: ()=> import('../views/Comments/index.vue')
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