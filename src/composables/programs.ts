import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'

export default function useProgram() {
    const search: Ref<string> = ref('')
    const page: Ref<number> = ref(1)
    const programs: Ref<any> = ref({
        data: [],
        links: {},
        meta: {},
    })

    const getPrograms = async () => {
        await axios.get('program', { params: { search: search.value, page: page.value } })
            .then((response) => {
                programs.value = response.data
            })
    }

    const setPage = async (pagenum: number) => {
        page.value = pagenum
        await getPrograms()
    }

    const deleteProgram = async (program_id: number) => {
        await axios.delete(`program/${program_id}`)
        await getPrograms()
    }

    return {
        getPrograms,
        setPage,
        deleteProgram,
        programs,
        search,
        page
    }
}
