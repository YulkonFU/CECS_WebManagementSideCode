import { createRouter, createWebHistory } from 'vue-router'
import userLogin from '../views/userLogin.vue'
import management from '../views/management.vue'
import dataVisualization from '../views/dataVisualization.vue'
import emergencyCommand from '../views/emergencyCommand.vue'
import planImplementation from '../views/planImplementation.vue'
import resourceScheduling from '../views/resourceScheduling.vue'
import dispositionDeployment from '../views/dispositionDeployment.vue'
import dutyManagement from '../views/dutyManagement.vue'
import eventManagement from '../views/eventManagement.vue'
import eventTermination from '../views/eventTermination.vue'
import eventQuery from '../views/eventQuery.vue'
import planManagement from '../views/planManagement.vue'
import dutyPlan from '../views/dutyPlan.vue'
import dutyLog from '../views/dutyLog.vue'
import dutyLeave from '../views/dutyLeave.vue'

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
        component: dataVisualization,
    }, {
        path: "emergencyCommand",
        name: "emergencyCommand",
        component: emergencyCommand,
        redirect: '/management/emergencyCommand/planImplementation',
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
    }, {
        path: "dutyManagement",
        name: "dutyManagement",
        component: dutyManagement,
        redirect: "/management/dutyManagement/dutyPlan",
        children: [{
            path: "dutyPlan",
            name: "dutyPlan",
            component: dutyPlan
        }, {
            path: "dutyLog",
            name: "dutyLog",
            component: dutyLog
        }, {
            path: "dutyLeave",
            name: "dutyLeave",
            component: dutyLeave
        }, ]
    }, {
        path: "eventManagement",
        name: "eventManagement",
        component: eventManagement,
        redirect: "/management/eventManagement/eventTermination",
        children: [{
            path: "eventTermination",
            name: "eventTermination",
            component: eventTermination
        }, {
            path: "eventQuery",
            name: "eventQuery",
            component: eventQuery
        }, {
            path: "planManagement",
            name: "planManagement",
            component: planManagement
        }, ]
    }]
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router