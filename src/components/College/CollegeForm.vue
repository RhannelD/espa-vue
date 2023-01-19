<template>
    <Breadcrumb :breadcrumbs="breadcrumbs"/>

    <div class="w-100 mt-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <form v-on:submit.prevent="saveCollege()">
            <div class="mb-6">
                <label for="abbreviation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Abbreviation
                </label>
                <input v-model="college.abbreviation" type="text" id="abbreviation" placeholder="Abbreviation" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <small v-if="errors.abbreviation != null" class="text-red-600">{{ errors.abbreviation[0] }}</small>
            </div>
            <div class="mb-6">
                <label for="college" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    College
                </label>
                <input v-model="college.college" type="text" id="college" placeholder="College" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <small v-if="errors.college != null" class="text-red-600">{{ errors.college[0] }}</small>
            </div>
            <div class="text-end">
                <button @click="$router.go(-1)" type="button" class="mr-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Cancel
                </button>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layouts/Breadcrumb.vue'
import router from '@/router'
import useCollege from '@/composables/collegeforms'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import swal from 'sweetalert'
import type { Ref } from 'vue'

const route = useRoute()

const breadcrumbs: Ref<any> = ref([
    {
        name: 'College',
        link: router.resolve({
            name: 'college',
        }).href
    },
    {
        name: "Form Create",
        link: null
    }
])

const { getCollege, storeCollege, updateCollege, college, errors } = useCollege()

onMounted(() => {
    var college_id: string = route.params.id as string
    if (Number(college_id)) {
        getCollege(Number(college_id))
        breadcrumbs.value[1].name = `Form ${(route.params.id as string).length == 0 ? 'Create': 'Update'}`
    }
})

const saveCollege = () => {
    var college_id: string = route.params.id == null? '': route.params.id as string
    var isUpdate: boolean = college_id.length != 0
    swal({
        title: isUpdate? 'Update the record?': 'Add a record?',
        text: isUpdate? 'Your record will be modified': 'New record will be added',
        icon: 'warning',
        dangerMode: false,
        buttons: ['Cancel', isUpdate? 'Yes, Update It': 'Yes, Add It'],
    }).then((agree) => {
        if (agree) {
            if (Number(college_id)) {
                updateCollege(Number(college_id))
            } else {
                storeCollege()
            }
        }
    })
}
</script>