<template>
    <div class="px-3 py-4 overflow-y-auto rounded">
        <ul class="space-y-2">
            <li>
                <router-link :to="{ name: 'dashboard' }" :class="{ 'bg-gray-100 dark:bg-gray-700': $route.meta.active_nav == 'dashboard' }" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <DashboardIcon class="w-5 h-5"/>
                    <span class="ml-3">Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'college' }" :class="{ 'bg-gray-100 dark:bg-gray-700': $route.meta.active_nav == 'college' }" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <CollegeIcon class="w-5 h-5"/>
                    <span class="ml-3">College</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'program' }" :class="{ 'bg-gray-100 dark:bg-gray-700': $route.meta.active_nav == 'program' }" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <ProgramIcon class="w-5 h-5"/>
                    <span class="ml-3">Program</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import DashboardIcon from '../icons/Dashboard.vue'
import CollegeIcon from '../icons/College.vue'
import ProgramIcon from '../icons/Program.vue'
</script>