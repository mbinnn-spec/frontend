import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardGuruView from '../views/DashboardGuruView.vue'
import DashboardMuridView from '../views/DashboardMuridView.vue'
import SkillView from '../views/SkillView.vue'
import SkillDetailView from '../views/SkillDetailView.vue'
// import BarterView from '../views/BarterView.vue'
// import BarterListView from '../views/BarterListView.vue'

const routes = [

    {
        path: '/',
        component: LoginView
    },

    {
        path: '/dashboard-guru',
        component: DashboardGuruView
    },

    {
        path: '/dashboard-murid',
        component: DashboardMuridView
    },

    {
    path: '/skills',
    component: SkillView
    },

    {
    path: '/skills/:id',
    component: SkillDetailView
    },

    {
    path: '/barter',
    component: BarterView
    },

    // {
    // path: '/barters',
    // component: BarterListView
    // }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
