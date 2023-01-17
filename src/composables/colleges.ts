import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'

export default function useCollge() {
    const colleges: Ref<any> = ref({
        data: [],
        links: {},
        meta: {},
    });
    const search: Ref<string> = ref('');
    const page: Ref<number> = ref(1);

    const getColleges = async () => {
        let response = await axios.get('http://localhost:8009/api/college', { params: { search: search.value, page: page.value } });
        colleges.value = response.data;
    }

    return {
        getColleges,
        colleges,
        search,
        page
    };
}
