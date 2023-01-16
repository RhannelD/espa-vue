import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from "../layouts/Main.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: Main,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        layout: Main,
      },
    }
  ]
})

export default router
