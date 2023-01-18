import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useCollege() {
    const router = useRouter()
    const college: Ref<{
        college: string,
        abbreviation: string,
    }> = ref({
        college: "",
        abbreviation: "",
    })
    const errors: Ref<{
        college: string[]|null,
        abbreviation: string[]|null
    }> = ref({
        college: null,
        abbreviation: null
    })

    const getCollege = async (college_id: number) => {
        await axios.get(`college/${college_id}`)
            .then((response) => {
                college.value.abbreviation = response.data.data.abbreviation
                college.value.college = response.data.data.college
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    router.push({ name: 'college' })
                }
            })
    }

    const storeCollege = async () => {
        await axios.post(`college`, college.value)
            .then((response) => {
                router.go(-1)
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors
                }
            })
    }

    const updateCollege = async (college_id: number) => {
        await axios.put(`college/${college_id}`, college.value)
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
        getCollege,
        storeCollege,
        updateCollege,
        college,
        errors,
    }
}
