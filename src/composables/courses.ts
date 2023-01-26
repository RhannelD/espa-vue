import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'

export default function useCourse() {
    const search: Ref<string> = ref('')
    const page: Ref<number> = ref(1)
    const courses: Ref<any> = ref({
        data: [],
        links: {},
        meta: {},
    })

    const getCourses = async () => {
        await axios.get('course', { params: { search: search.value, page: page.value } })
            .then((response) => {
                courses.value = response.data
            })
    }

    const setPage = async (pagenum: number) => {
        page.value = pagenum
        await getCourses()
    }

    const deleteCourse = async (course_id: number) => {
        await axios.delete(`course/${course_id}`)
        await getCourses()
    }

    return {
        getCourses,
        setPage,
        deleteCourse,
        courses,
        search,
        page
    }
}
