<template>
    <Breadcrumb :breadcrumbs="breadcrumbs"/>

    <div class="w-100 mt-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <form v-on:submit.prevent="saveProgram()">
            <div class="mb-6">
                <label for="college_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    College
                </label>
                <select v-model="program.college_id" id="college_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="">Select college</option>
                    <option v-for="college in selection_colleges" :value="college.id">{{ college.college }}</option>
                </select>
                <small v-if="errors.college_id != null" class="text-red-600">{{ errors.college_id[0] }}</small>
            </div>
            <div class="mb-6">
                <label for="abbreviation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Abbreviation
                </label>
                <input v-model="program.abbreviation" type="text" id="abbreviation" placeholder="Abbreviation" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <small v-if="errors.abbreviation != null" class="text-red-600">{{ errors.abbreviation[0] }}</small>
            </div>
            <div class="mb-6">
                <label for="program" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Program
                </label>
                <input v-model="program.program" type="text" id="college" placeholder="Program" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <small v-if="errors.program != null" class="text-red-600">{{ errors.program[0] }}</small>
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
import useProgram from '@/composables/programforms'
import useSelectionForm from '@/composables/selectionforms'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import swal from 'sweetalert'
import type { Ref } from 'vue'

const route = useRoute()

const breadcrumbs: Ref<any> = ref([
    {
        name: 'Program',
        link: router.resolve({
            name: 'program',
        }).href
    },
    {
        name: "Form Create",
        link: null
    }
])

const { getSelectionColleges, selection_colleges } = useSelectionForm()
const { getProgram, storeProgram, updateProgram, program, errors } = useProgram()

onMounted(() => {
    getSelectionColleges()

    var program_id: string = route.params.id as string
    if (Number(program_id)) {
        getProgram(Number(program_id))
        breadcrumbs.value[1].name = `Form ${(route.params.id as string).length == 0 ? 'Create' : 'Update'}`
    }
})

const saveProgram = async () => {
    var program_id: string = route.params.id == null ? '' : route.params.id as string
    var isUpdate: boolean = program_id.length != 0
    swal({
        title: isUpdate ? 'Update the record?' : 'Add a record?',
        text: isUpdate ? 'Your record will be modified' : 'New record will be added',
        icon: 'warning',
        dangerMode: false,
        buttons: ['Cancel', isUpdate ? 'Yes, Update It' : 'Yes, Add It'],
    }).then((agree) => {
        if (agree) {
            if (Number(program_id)) {
                updateProgram(Number(program_id))
            } else {
                storeProgram()
            }
        }
    })
}
</script>