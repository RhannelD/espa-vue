import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useStudent() {
    const router = useRouter()
    const student: Ref<{
        sr_code: string,
        firstname: string,
        lastname: string,
        email: string,
        sex: string,
    }> = ref({
        sr_code: "",
        firstname: "",
        lastname: "",
        email: "",
        sex: "",
    })
    const errors: Ref<any> = ref({})

    const getStudent = async (student_id: number) => {
        await axios.get(`student/${student_id}`)
            .then((response) => {
                student.value = response.data.data
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    router.push({ name: 'student' })
                }
            })
    }

    const storeStudent = async () => {
        await axios.post(`student`, student.value)
            .then((response) => {
                router.go(-1)
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors
                }
            })
    }

    const updateStudent = async (student_id: number) => {
        await axios.put(`student/${student_id}`, student.value)
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
        getStudent,
        storeStudent,
        updateStudent,
        student,
        errors,
    }
}
