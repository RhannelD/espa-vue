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
                requiresAuth: true,
                active_nav: 'dashboard',
            },
        },
        {
            path: '/college',
            name: 'college',
            component: () => import('../components/College/College.vue'),
            meta: {
                layout: Main,
                requiresAuth: true,
                active_nav: 'college',
            },
        },
        {
            path: '/college/form/:id?',
            name: 'college.form',
            component: () => import('../components/College/CollegeForm.vue'),
            meta: {
                layout: Main,
                requiresAuth: true,
                active_nav: 'college',
            },
        },
        {
            path: '/program',
            name: 'program',
            component: () => import('../components/Program/Program.vue'),
            meta: {
                layout: Main,
                requiresAuth: true,
                active_nav: 'program',
            },
        },
        {
            path: '/program/form/:id?',
            name: 'program.form',
            component: () => import('../components/Program/ProgramForm.vue'),
            meta: {
                layout: Main,
                requiresAuth: true,
                active_nav: 'program',
            },
        },
        {
            path: '/course',
            name: 'course',
            component: () => import('../components/Course/Course.vue'),
            meta: {
                layout: Main,
                requiresAuth: true,
                active_nav: 'course',
            },
        },
        {
            path: '/course/form/:id?',
            name: 'course.form',
            component: () => import('../components/Course/CourseForm.vue'),
            meta: {
                layout: Main,
                requiresAuth: true,
                active_nav: 'course',
            },
        },
        {
            path: '/officer',
            name: 'officer',
            component: () => import('../components/Officer/Officer.vue'),
            meta: {
                layout: Main,
                requiresAuth: true,
                active_nav: 'officer',
            },
        },
        {
            path: '/officer/form/:id?',
            name: 'officer.form',
            component: () => import('../components/Officer/OfficerForm.vue'),
            meta: {
                layout: Main,
                requiresAuth: true,
                active_nav: 'officer',
            },
        },
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
