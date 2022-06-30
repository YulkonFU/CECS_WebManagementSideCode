import {
    createRouter,
    createWebHistory
} from 'vue-router'
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
import userManagement from '../views/userManagement.vue'
import axios from 'axios'

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
}, {
    path: '/userManagement',
    name: 'userManagement',
    component: userManagement
}, ]
const router = createRouter({
    history: createWebHistory(),
    routes
})

//导航守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
        // 判断是否有token(通过isAuthenticated判断),
    if (to.name == 'login') {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        next()
    } else if (!token) {
        console.log("未登录，请登录")
        next('/login')
    } else if (token) {
        // 
        next()
    }
})

export default router