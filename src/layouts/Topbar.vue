<template>
    <nav class="fixed z-30 w-full h-16 border-b px-2 py-1 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex flex-wrap items-center">
                <button @click="$emit('sidebartoggle')" class="text-gray-600 p-2 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
                    <MenuIcon class="h-6 w-6"/>
                </button>
                <router-link :to="{ name: 'dashboard' }" class="p-2 text-2xl font-extrabold dark:text-gray-100">
                    ESPA
                </router-link>
            </div>
            <div class="flex flex-wrap items-center pr-2">
                <div class="relative">
                    <button v-on:click="themecolortoggle" class="text-gray-600 p-2 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 text-center">
                        <LightIcon v-if="lighttheme" class="w-6 h-6"/>
                        <DarkIcon v-else class="w-6 h-6"/>
                    </button>
                </div>
                <div class="relative">
                    <button id="dropdown-profile-btn" data-dropdown-toggle="dropdown-profile-menu" class="p-2">
                        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="">
                        <span class="top-1 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </button>
                    <div id="dropdown-profile-menu" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-profile-btn">
                            <li>
                                <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {{ user.firstname }}
                                </div>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <a v-on:click="signout()" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import MenuIcon from '../icons/Menu.vue'
import DarkIcon from '../icons/Dark.vue'
import LightIcon from '../icons/Light.vue'
import { onMounted } from 'vue'
import { initDropdowns } from 'flowbite'
import { ref } from 'vue'
import axios from 'axios'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const lighttheme: Ref<boolean> = ref(true);
const user: Ref<{
    firstname: string,
    lastname: string,
    sr_code: string|null
}> = ref({
    firstname: '',
    lastname: '',
    sr_code: null
});

onMounted(() => {
    initDropdowns()
    setUser()
})

const setUser = async () => {
    await axios.get('user')
        .then((response) => {
            user.value = response.data
        })
}

const signout = async () => {
    await axios.post('signout')
    localStorage.removeItem('Authorization')
    router.push({ name: 'index' })
}

const themecolortoggle = async () => {
    lighttheme.value = !lighttheme.value

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
}
</script>
