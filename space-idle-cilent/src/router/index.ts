import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router