<template>
    <Breadcrumb :breadcrumbs="breadcrumbs"/>
    <div class="flex justify-between flex-wrap mt-2">
        <div class="mt-1">
            <Search v-model="search" @searching="searching()" placeholder="Search for students"/>
        </div>
        <router-link :to="{ name: 'student.form' }" v-if="students.can_create" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create
        </router-link>
    </div>
    <div class="relative overflow-x-auto sm:rounded-lg mt-2 border dark:border-gray-700">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        SR-Code
                    </th>
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
                <tr v-for="(student) in students.data" :key="student.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4">
                        {{ student.sr_code }}
                    </td>
                    <td class="px-6 py-4">
                        {{ student.firstname }}
                    </td>
                    <td class="px-6 py-4">
                        {{ student.lastname }}
                    </td>
                    <td class="px-6 py-4">
                        {{ student.email }}
                    </td>
                    <td class="px-6 py-4 capitalize">
                        {{ student.sex }}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                        <router-link v-if="student.can_update" :to="{ name: 'student.form', params: { id: student.id } }" class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                        <button v-if="student.can_update_access" type="button" class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Access</button>
                        <button v-if="student.can_update_password" type="button" class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Password</button>
                        <button v-if="student.can_delete" v-on:click="deleteStudentAlert(student.id)" type="button" class="mr-2 font-medium text-red-600 dark:text-red-600 hover:underline">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :meta="students.meta" @setPage="setPage"/>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layouts/Breadcrumb.vue'
import Pagination from '@/layouts/Pagination.vue'
import Search from '@/layouts/Search.vue'
import router from '@/router'
import useStudent from '@/composables/students'
import { onMounted, ref } from 'vue'
import swal from 'sweetalert'
import type { Ref } from 'vue'

const breadcrumbs: Ref<any> = ref([
    {
        name: 'Student',
        link: router.resolve({
            name: 'student',
        }).href
    },
    {
        name: 'List',
        link: null
    }
])

const { getStudents, setPage, deleteStudent, students, search } = useStudent()

onMounted(getStudents)

const searching = async () => {
    await setPage(1)
}

const deleteStudentAlert = async (student_id: number) => {
    swal({
        title: 'Delete the record?',
        text: 'You will not be able to recover it',
        icon: 'warning',
        dangerMode: true,
        buttons: ['Cancel', 'Yes, Delete It'],
    }).then(async (agree) => {
        if (agree) {
            await deleteStudent(student_id)
            swal({
                title: 'Record Deleted!',
                text: '',
                icon: 'success',
            })
        }
    })
}
</script>