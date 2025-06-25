import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category'


export const useCategory = () => {
  const data = ref({})
  const getData = async (id = useRoute().params.id) => {
    data.value = await getCategoryAPI(id).then(ans => ans.result)
  }
  onMounted(() => getData())

  onBeforeRouteUpdate((to) => {
    getData(to.params.id)
  })
  return {
    data
  }
}
