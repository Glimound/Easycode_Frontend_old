import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),
    },
    {
        path: '/deploy/:appid',
        name: 'Deploy',
        component: () => import('@/views/Deploy'),
    }
]

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})
