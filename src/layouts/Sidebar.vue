<template>
    <div class="px-3 py-4 overflow-y-auto rounded">
        <ul class="space-y-2">
            <li>
                <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <DashboardIcon/>
                    <span class="ml-3">Dashboard</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import DashboardIcon from '../icons/Dashboard.vue'
</script>