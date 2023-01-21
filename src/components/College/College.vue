<template>
    <Breadcrumb :breadcrumbs="breadcrumbs"/>
    <div class="flex justify-between flex-wrap mt-2">
        <div class="mt-1">
            <Search v-model="search" @searching="searching()" placeholder="Search for colleges"/>
        </div>
        <router-link :to="{ name: 'college.form' }" v-if="colleges.can_create" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create
        </router-link>
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
                        <router-link v-if="college.can_update" :to="{ name: 'college.form', params: { id: college.id } }" class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                        <button v-if="college.can_delete" v-on:click="deleteCollegeAlert(college.id)" type="button" class="font-medium text-red-600 dark:text-red-600 hover:underline">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :meta="colleges.meta" @setPage="setPage"/>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layouts/Breadcrumb.vue'
import Pagination from '@/layouts/Pagination.vue'
import Search from '@/layouts/Search.vue'
import router from '@/router'
import useCollege from '@/composables/colleges'
import { onMounted, ref } from 'vue'
import swal from 'sweetalert'
import type { Ref } from 'vue'

const breadcrumbs: Ref<any> = ref([
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
])

const { getColleges, setPage, deleteCollege, colleges, search } = useCollege()

onMounted(getColleges)

const searching = async () => {
    await setPage(1)
}

const deleteCollegeAlert = async (college_id: number) => {
    swal({
        title: 'Delete the record?',
        text: 'You will not be able to recover it',
        icon: 'warning',
        dangerMode: true,
        buttons: ['Cancel', 'Yes, Delete It'],
    }).then(async (agree) => {
        if (agree) {
            await deleteCollege(college_id)
            swal({
                title: 'Record Deleted!',
                text: '',
                icon: 'success',
            })
        }
    })
}
</script>