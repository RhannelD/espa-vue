<template>
    <Breadcrumb :breadcrumbs="breadcrumbs"/>
    <div class="flex justify-between flex-wrap mt-2">
        <div class="mt-1">
            <form class="relative" @submit.prevent="searching">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon/>
                </div>
                <input v-model="search" type="text" id="table-search-users"  placeholder="Search for colleges"
                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </form>
        </div>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create
        </button>
    </div>
    <div class="relative overflow-x-auto sm:rounded-lg mt-2 border dark:border-gray-700">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Abbreviation
                    </th>
                    <th scope="col" class="px-6 py-3">
                        College
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(college) in colleges.data" :key="college.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ college.abbreviation }}
                    </th>
                    <td class="px-6 py-4">
                        {{ college.college }}
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <nav class="flex items-center justify-between pt-4 mt-2" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing 
            <span class="font-semibold text-gray-900 dark:text-white">
                {{ colleges.meta.from }}-{{ colleges.meta.to }}
            </span> 
            of 
            <span class="font-semibold text-gray-900 dark:text-white">
                {{ colleges.meta.total   }}
            </span>
        </span>
        <ul class="inline-flex items-center -space-x-px">
            <li v-for="(link, index) in colleges.meta.links">
                <a v-if="index == 0" v-on:click="prevPage()" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </a>
                <a v-else-if="index == colleges.meta.links.length-1" v-on:click="naxtPage()" href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
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
import Breadcrumb from '@/layouts/Breadcrumb.vue'
import SearchIcon from '@/icons/Search.vue'
import router from '@/router'
import useCollege from '@/composables/colleges'
import { onMounted } from 'vue'

const breadcrumbs = [
    {
        name: 'College',
        link: router.resolve({
            name: 'college',
        }).href
    },
    {
        name: 'List',
        link: null
    }
];

const { getColleges, colleges, search, page } = useCollege();

onMounted(getColleges)

const searching = async () => {
    await getColleges()
}
const setPage = async (pagenum: number) => {
    page.value = pagenum
    await searching()
}
const prevPage = async () => {
    page.value = page.value <= 1 ? 1 : page.value - 1
    await searching()
}
const naxtPage = async () => {
    page.value = page.value >= colleges.value.meta.last_page ? colleges.value.meta.last_page : page.value + 1
    await searching()
}
</script>