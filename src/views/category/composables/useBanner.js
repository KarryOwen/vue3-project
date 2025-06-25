
import { ref, onMounted } from "vue"
import { getBannerAPI } from '@/apis/home'

export const useBanner = () => {
  const datas = ref([])
  const getDatas = async () => {
    const ans = await getBannerAPI({ distributionSite: '2' }).then((ans) => ans.result)
    datas.value = ans
  }
  onMounted(() => {
    getDatas()
  })
  return {
    datas
  }
}
