import { createRouter, createWebHistory } from 'vue-router'
import userLogin from '../views/userLogin.vue'
import management from '../views/management.vue'
import dataVisualization from '../views/dataVisualization.vue'
import emergencyCommand from '../views/emergencyCommand.vue'
import planImplementation from '../views/planImplementation.vue'
import resourceScheduling from '../views/resourceScheduling.vue'
import dispositionDeployment from '../views/dispositionDeployment.vue'

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
    component: management,
    redirect: '/management/dataVisualization',
    children: [{
        path: "dataVisualization",
        name: "dataVisualization",
        component: dataVisualization
    }, {
        path: "emergencyCommand",
        name: "emergencyCommand",
        component: emergencyCommand,
        children: [{
            path: "planImplementation",
            name: "planImplementation",
            component: planImplementation
        }, {
            path: "resourceScheduling",
            name: "resourceScheduling",
            component: resourceScheduling
        }, {
            path: "dispositionDeployment",
            name: "dispositionDeployment",
            component: dispositionDeployment
        }]
    }]
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router