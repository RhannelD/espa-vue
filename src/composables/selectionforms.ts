import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'

export default function useSelectionForm() {
    const selection_colleges: Ref<{
        id: number,
        college: string
    }[]> = ref([])

    const getSelectionColleges = async () => {
        await axios.get(`form/college`)
            .then((response) => {
                selection_colleges.value = response.data.data
            })
    }

    return {
        getSelectionColleges,
        selection_colleges,
    }
}
