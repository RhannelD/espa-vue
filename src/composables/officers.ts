import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'

export default function useOfficer() {
    const search: Ref<string> = ref('')
    const page: Ref<number> = ref(1)
    const officers: Ref<any> = ref({
        data: [],
        links: {},
        meta: {},
    })

    const getOfficers = async () => {
        await axios.get('officer', { params: { search: search.value, page: page.value } })
            .then((response) => {
                officers.value = response.data
            })
    }

    const setPage = async (pagenum: number) => {
        page.value = pagenum
        await getOfficers()
    }

    const deleteOfficer = async (officer_id: number) => {
        await axios.delete(`officer/${officer_id}`)
        await getOfficers()
    }

    return {
        getOfficers,
        setPage,
        deleteOfficer,
        officers,
        search,
        page
    }
}
