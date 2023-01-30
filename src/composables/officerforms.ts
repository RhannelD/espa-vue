import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useOfficer() {
    const router = useRouter()
    const officer: Ref<{
        firstname: string
        lastname: string,
        email: string,
        sex: string,
    }> = ref({
        firstname: "",
        lastname: "",
        email: "",
        sex: "",
    })
    const errors: Ref<any> = ref({})

    const getOfficer = async (officer_id: number) => {
        await axios.get(`officer/${officer_id}`)
            .then((response) => {
                officer.value = response.data.data
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    router.push({ name: 'officer' })
                }
            })
    }

    const storeOfficer = async () => {
        await axios.post(`officer`, officer.value)
            .then((response) => {
                router.go(-1)
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors
                }
            })
    }

    const updateOfficer = async (officer_id: number) => {
        await axios.put(`officer/${officer_id}`, officer.value)
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
        getOfficer,
        storeOfficer,
        updateOfficer,
        officer,
        errors,
    }
}
