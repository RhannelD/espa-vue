<template>
    <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li v-for="(breadcrumb_item, index) in props.breadcrumbs" class="inline-flex items-center" aria-current="page">
                <svg v-if="index > 0" aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <router-link v-if="breadcrumb_item.link != null" :to="breadcrumb_item.link" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    {{ breadcrumb_item.name }}
                </router-link>
                <span v-else class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    {{ breadcrumb_item.name }}
                </span>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
const props = defineProps(['breadcrumbs'])
</script>