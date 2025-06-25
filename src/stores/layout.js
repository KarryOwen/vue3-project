import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryData } from '@/apis/layout'


export const useCategoryStore = defineStore('category', () => {
  const categoryData = ref([])
  const getCategotry = async () => {
    categoryData.value = await getCategoryData().then(ans => ans.result)
  }
  return {
    categoryData,
    getCategotry
  }
})
