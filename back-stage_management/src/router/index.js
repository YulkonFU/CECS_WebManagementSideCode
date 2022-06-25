import { createRouter, createWebHistory } from 'vue-router'
import userLogin from '../views/userLogin.vue'
import management from '../views/management.vue'


const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    name: 'login',
    component: userLogin
}, {
    path: '/management',
    name: 'management',
    component: management
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router