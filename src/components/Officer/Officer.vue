<template>
    <Breadcrumb :breadcrumbs="breadcrumbs"/>
    <div class="flex justify-between flex-wrap mt-2">
        <div class="mt-1">
            <Search v-model="search" @searching="searching()" placeholder="Search for officers"/>
        </div>
        <router-link :to="{ name: 'officer.form' }" v-if="officers.can_create" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create
        </router-link>
    </div>
    <div class="relative overflow-x-auto sm:rounded-lg mt-2 border dark:border-gray-700">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Firstname
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Lastname
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Sex
                    </th>
                    <th scope="col" class="px-6 py-3" style="width: 5%;">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(officer) in officers.data" :key="officer.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4">
                        {{ officer.firstname }}
                    </td>
                    <td class="px-6 py-4">
                        {{ officer.lastname }}
                    </td>
                    <td class="px-6 py-4">
                        {{ officer.email }}
                    </td>
                    <td class="px-6 py-4 capitalize">
                        {{ officer.sex }}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                        <router-link v-if="officer.can_update" :to="{ name: 'officer.form', params: { id: officer.id } }" class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                        <button v-if="officer.can_update_access" type="button" class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Access</button>
                        <button v-if="officer.can_update_password" type="button" class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Password</button>
                        <button v-if="officer.can_delete" v-on:click="deleteOfficerAlert(officer.id)" type="button" class="mr-2 font-medium text-red-600 dark:text-red-600 hover:underline">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :meta="officers.meta" @setPage="setPage"/>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layouts/Breadcrumb.vue'
import Pagination from '@/layouts/Pagination.vue'
import Search from '@/layouts/Search.vue'
import router from '@/router'
import useOfficer from '@/composables/officers'
import { onMounted, ref } from 'vue'
import swal from 'sweetalert'
import type { Ref } from 'vue'

const breadcrumbs: Ref<any> = ref([
    {
        name: 'Officer',
        link: router.resolve({
            name: 'officer',
        }).href
    },
    {
        name: 'List',
        link: null
    }
])

const { getOfficers, setPage, deleteOfficer, officers, search } = useOfficer()

onMounted(getOfficers)

const searching = async () => {
    await setPage(1)
}

const deleteOfficerAlert = async (officer_id: number) => {
    swal({
        title: 'Delete the record?',
        text: 'You will not be able to recover it',
        icon: 'warning',
        dangerMode: true,
        buttons: ['Cancel', 'Yes, Delete It'],
    }).then(async (agree) => {
        if (agree) {
            await deleteOfficer(officer_id)
            swal({
                title: 'Record Deleted!',
                text: '',
                icon: 'success',
            })
        }
    })
}
</script>