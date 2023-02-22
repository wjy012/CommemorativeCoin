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
                path: '/coins',
                name: 'coins',
                component: ()=> import('../views/Coins/index.vue')
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