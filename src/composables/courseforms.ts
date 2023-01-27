import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useCourse() {
    const router = useRouter()
    const course: Ref<{
        course: string,
        code: string,
        unit: number,
        laboratory: number,
        lecture: number,
    }> = ref({
        course: "",
        code: "",
        unit: 0,
        laboratory: 0,
        lecture: 0,
    })
    const errors: Ref<{
        course: string[]|null,
        code: string[]|null,
        unit: string[]|null,
        laboratory: string[]|null,
        lecture: string[]|null,
    }> = ref({
        course: null,
        code: null,
        unit: null,
        laboratory: null,
        lecture: null,
    })

    const getCourse = async (course_id: number) => {
        await axios.get(`course/${course_id}`)
            .then((response) => {
                course.value = response.data.data
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    router.push({ name: 'course' })
                }
            })
    }

    const storeCourse = async () => {
        await axios.post(`course`, course.value)
            .then((response) => {
                router.go(-1)
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors
                }
            })
    }

    const updateCourse = async (course_id: number) => {
        await axios.put(`course/${course_id}`, course.value)
            .then((response) => {
                router.go(-1)
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors
                }
            })
    }

    return {
        getCourse,
        storeCourse,
        updateCourse,
        course,
        errors,
    }
}
