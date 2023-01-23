import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useProgram() {
    const router = useRouter()
    const program: Ref<{
        college_id: number|string
        program: string,
        abbreviation: string,
    }> = ref({
        college_id: "",
        program: "",
        abbreviation: "",
    })
    const errors: Ref<{
        college_id: string[]|null,
        program: string[]|null,
        abbreviation: string[]|null
    }> = ref({
        college_id: null,
        program: null,
        abbreviation: null
    })

    const getProgram = async (program_id: number) => {
        await axios.get(`program/${program_id}`)
            .then((response) => {
                program.value.college_id = response.data.data.college_id
                program.value.abbreviation = response.data.data.abbreviation
                program.value.program = response.data.data.program
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    router.push({ name: 'program' })
                }
            })
    }

    const storeProgram = async () => {
        await axios.post(`program`, program.value)
            .then((response) => {
                router.go(-1)
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors
                }
            })
    }

    const updateProgram = async (program_id: number) => {
        await axios.put(`program/${program_id}`, program.value)
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
        getProgram,
        storeProgram,
        updateProgram,
        program,
        errors,
    }
}
