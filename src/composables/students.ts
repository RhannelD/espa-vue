import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'

export default function useStudent() {
    const search: Ref<string> = ref('')
    const page: Ref<number> = ref(1)
    const students: Ref<any> = ref({
        data: [],
        links: {},
        meta: {},
    })

    const getStudents = async () => {
        await axios.get('student', { params: { search: search.value, page: page.value } })
            .then((response) => {
                students.value = response.data
            })
    }

    const setPage = async (pagenum: number) => {
        page.value = pagenum
        await getStudents()
    }

    const deleteStudent = async (student_id: number) => {
        await axios.delete(`student/${student_id}`)
        await getStudents()
    }

    return {
        getStudents,
        setPage,
        deleteStudent,
        students,
        search,
        page
    }
}
