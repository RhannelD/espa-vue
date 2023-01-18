<template>
    <nav class="flex items-center justify-between pt-4 mt-2" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing 
            <span class="font-semibold text-gray-900 dark:text-white">
                {{ meta.from }}-{{ meta.to }}
            </span> 
            of 
            <span class="font-semibold text-gray-900 dark:text-white">
                {{ meta.total   }}
            </span>
        </span>
        <ul class="inline-flex items-center -space-x-px">
            <li v-for="(link, index) in meta.links">
                <a v-if="index == 0" v-on:click="prevPage()" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <PreviousIcon/>    
                </a>
                <a v-else-if="index == meta.links.length-1" v-on:click="naxtPage()" href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <NextIcon/>    
                </a>
                <a v-else-if="link.active" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                    {{ link.label }}
                </a>
                <a v-else v-on:click="setPage(link.label)" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {{ link.label }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import PreviousIcon from '@/icons/Previous.vue'
import NextIcon from '@/icons/Next.vue'

const props = defineProps(['meta'])
const emit = defineEmits(['setPage'])

const setPage = async (pagenum: number) => {
    emit('setPage', pagenum)
}

const prevPage = async () => {
    emit('setPage', (props.meta.current_page <= 1 ? 1 : props.meta.current_page - 1))
}

const naxtPage = async () => {
    emit('setPage', (props.meta.current_page >= props.meta.last_page ? props.meta.last_page : props.meta.current_page + 1))
}
</script>