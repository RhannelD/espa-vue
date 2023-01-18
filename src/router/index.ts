import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import Signin from '@/components/Auth/Signin.vue'
import Main from "../layouts/Main.vue"
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Signin,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        layout: Main,
        requiresAuth: true
      },
    },
    {
      path: '/college',
      name: 'college',
      component: () => import('../components/College/College.vue'),
      meta: {
        layout: Main,
        requiresAuth: true
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios.get('/user')
      .then((response) => {
        next();
      })
      .catch((error_data) => {
        if (error_data.response.status === 401) {
          next({ name: 'index' });
        }
      });
  } else {
    next();
  }
});

export default router
