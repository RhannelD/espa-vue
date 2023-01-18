import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'

export default function useCollge() {
    const search: Ref<string> = ref('')
    const page: Ref<number> = ref(1)
    const colleges: Ref<any> = ref({
        data: [],
        links: {},
        meta: {},
    })

    const getColleges = async () => {
        let response = await axios.get('college', { params: { search: search.value, page: page.value } })
        colleges.value = response.data
    }

    const setPage = async (pagenum: number) => {
        page.value = pagenum
        await getColleges()
    }

    const deleteCollege = async (college_id: number) => {
        await axios.delete(`college/${college_id}`)
        await getColleges()
    }

    return {
        getColleges,
        setPage,
        deleteCollege,
        colleges,
        search,
        page
    }
}
