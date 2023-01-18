import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import './assets/index.css'
import './assets/main.css'

const token = localStorage.getItem('Authorization')
axios.defaults.baseURL = "http://localhost:8009/api"
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.defaults.headers.common["Content-Type"] = "application/json"

const app = createApp(App)

app.use(router)

app.mount('#app')
