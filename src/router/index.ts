import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import Main from "../layouts/Main.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        layout: Main,
      },
    },
    {
      path: '/college',
      name: 'college',
      component: () => import('../components/College/College.vue'),
      meta: {
        layout: Main,
      },
    }
  ]
})

export default router
