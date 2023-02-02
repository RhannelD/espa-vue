<template>
    <Breadcrumb :breadcrumbs="breadcrumbs"/>
    <div class="w-100 mt-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <form v-on:submit.prevent="saveStudent()">
            <div class="grid grid-cols-12 gap-4 mb-6">
                <div class="col-span-12 md:col-span-6">
                    <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Firstname
                    </label>
                    <input v-model="student.firstname" type="text" id="firstname" placeholder="Firstname" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors['firstname'] != null" class="text-red-600">{{ errors['firstname'][0] }}</small>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Lastname
                    </label>
                    <input v-model="student.lastname" type="text" id="lastname" placeholder="Lastname" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors['lastname'] != null" class="text-red-600">{{ errors['lastname'][0] }}</small>
                </div>
                <div class="col-span-12 md:col-span-3">
                    <label for="sr_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        SR Code
                    </label>
                    <input v-model="student.sr_code" type="text" id="sr_code" placeholder="SR Code" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors['sr_code'] != null" class="text-red-600">{{ errors['sr_code'][0] }}</small>
                </div>
                <div class="col-span-12 md:col-span-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </label>
                    <input v-model="student.email" type="email" id="email" placeholder="Email" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors['email'] != null" class="text-red-600">{{ errors['email'][0] }}</small>
                </div>
                <div class="col-span-12 md:col-span-4">
                    <label for="sex" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Sex
                    </label>
                    <select v-model="student.sex" id="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="">Select sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <small v-if="errors['sex'] != null" class="text-red-600">{{ errors['sex'][0] }}</small>
                </div>
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
import useStudent from '@/composables/studentforms'
import useSelectionForm from '@/composables/selectionforms'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import swal from 'sweetalert'
import type { Ref } from 'vue'

const route = useRoute()

const breadcrumbs: Ref<any> = ref([
    {
        name: 'Student',
        link: router.resolve({
            name: 'student',
        }).href
    },
    {
        name: "Form Create",
        link: null
    }
])

const { getSelectionColleges } = useSelectionForm()
const { getStudent, storeStudent, updateStudent, student, errors } = useStudent()

onMounted(() => {
    getSelectionColleges()

    var student_id: string = route.params.id as string
    if (Number(student_id)) {
        getStudent(Number(student_id))
        breadcrumbs.value[1].name = `Form ${(route.params.id as string).length == 0 ? 'Create' : 'Update'}`
    }
})

const saveStudent = async () => {
    var student_id: string = route.params.id == null ? '' : route.params.id as string
    var isUpdate: boolean = student_id.length != 0
    swal({
        title: isUpdate ? 'Update the record?' : 'Add a record?',
        text: isUpdate ? 'Your record will be modified' : 'New record will be added',
        icon: 'warning',
        dangerMode: false,
        buttons: ['Cancel', isUpdate ? 'Yes, Update It' : 'Yes, Add It'],
    }).then((agree) => {
        if (agree) {
            if (Number(student_id)) {
                updateStudent(Number(student_id))
            } else {
                storeStudent()
            }
        }
    })
}
</script>