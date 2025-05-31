import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import login from '@/components/start/login.vue'
import register from '@/components/start/register.vue'
import forget from '@/components/start/forget.vue'
import title from '@/components/start/title.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'title',
        component: title,
        children: [
            {
                path: '/login',
                name: 'login',
                component: login
            },
            {
                path: '/register',
                name: 'register',
                component: register
            },
            {
                path: '/forget',
                name: 'forget',
                component: forget
            }
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router