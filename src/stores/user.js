import { defineStore } from "pinia"
import { getLoginAPI } from '@/apis/user'
import { ref } from "vue"
import { mergeCartAPI } from "@/apis/cart"
import { useCartStore } from "./cartStore"

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const cartStore = useCartStore()

  // 登入时获取用户信息
  const getData = async ({ account, password }) => {
    const rel = await getLoginAPI({ account, password })
    userInfo.value = rel.result
    // 登入时合并本地购物车数据
    await mergeCartAPI(cartStore.cartList.map(e => {
      return {
        skuId: e.skuId,
        count: e.count,
        selected: e.selected
      }
    }))
    cartStore.updateCart()
  }

  // 退出时清空用户信息
  const clearInfo = () => {
    userInfo.value = {}
  }
  return {
    userInfo,
    getData,
    clearInfo
  }
},
  {
    persist: true,
  },)
