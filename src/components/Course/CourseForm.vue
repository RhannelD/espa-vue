<template>
    <Breadcrumb :breadcrumbs="breadcrumbs"/>

    <div class="w-100 mt-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <form v-on:submit.prevent="saveCourse()">
            <div class="grid grid-cols-12 gap-4">
                <div class="mb-6 col-span-12 md:col-span-3">
                    <label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Code
                    </label>
                    <input v-model="course.code" type="text" id="code" placeholder="Code" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors.code != null" class="text-red-600">{{ errors.code[0] }}</small>
                </div>
                <div class="mb-6 col-span-12 md:col-span-9">
                    <label for="course" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Course
                    </label>
                    <input v-model="course.course" type="text" id="course" placeholder="Course" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors.course != null" class="text-red-600">{{ errors.course[0] }}</small>
                </div>
                <div class="mb-6 col-span-12 md:col-span-4">
                    <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Unit
                    </label>
                    <input v-model="course.unit" type="text" id="unit" placeholder="Unit" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors.unit != null" class="text-red-600">{{ errors.unit[0] }}</small>
                </div>
                <div class="mb-6 col-span-12 md:col-span-4">
                    <label for="laboratory" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Laboratory
                    </label>
                    <input v-model="course.laboratory" type="text" id="laboratory" placeholder="Laboratory" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors.laboratory != null" class="text-red-600">{{ errors.laboratory[0] }}</small>
                </div>
                <div class="mb-6 col-span-12 md:col-span-4">
                    <label for="lecture" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Lecture
                    </label>
                    <input v-model="course.lecture" type="text" id="lecture" placeholder="Lecture" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <small v-if="errors.lecture != null" class="text-red-600">{{ errors.lecture[0] }}</small>
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
import useCourse from '@/composables/courseforms'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import swal from 'sweetalert'
import type { Ref } from 'vue'

const route = useRoute()

const breadcrumbs: Ref<any> = ref([
    {
        name: 'Course',
        link: router.resolve({
            name: 'course',
        }).href
    },
    {
        name: "Form Create",
        link: null
    }
])

const { getCourse, storeCourse, updateCourse, course, errors } = useCourse()

onMounted(() => {
    var course_id: string = route.params.id as string
    if (Number(course_id)) {
        getCourse(Number(course_id))
        breadcrumbs.value[1].name = `Form ${(route.params.id as string).length == 0 ? 'Create': 'Update'}`
    }
})

const saveCourse = () => {
    var course_id: string = route.params.id == null? '': route.params.id as string
    var isUpdate: boolean = course_id.length != 0
    swal({
        title: isUpdate? 'Update the record?': 'Add a record?',
        text: isUpdate? 'Your record will be modified': 'New record will be added',
        icon: 'warning',
        dangerMode: false,
        buttons: ['Cancel', isUpdate? 'Yes, Update It': 'Yes, Add It'],
    }).then((agree) => {
        if (agree) {
            if (Number(course_id)) {
                updateCourse(Number(course_id))
            } else {
                storeCourse()
            }
        }
    })
}
</script>