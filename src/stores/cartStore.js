import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useUserStore } from "./user"
import { addCartAPI, getCartListAPI, delCartAPI } from "@/apis/cart"

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  // 购物车列表刷新
  const updateCart = async () => {
    cartList.value = await getCartListAPI().then(rel => rel.result)
  }

  // 加入购物车
  const addCart = async (goodsInfo) => {
    if (isLogin.value) {
      await addCartAPI(goodsInfo)
      updateCart()
    } else {
      const item = cartList.value.find(e => e.skuId === goodsInfo.skuId)
      if (item) {
        item.count += goodsInfo.count
      } else {
        cartList.value.push(goodsInfo)
      }
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateCart()
    } else {
      cartList.value = cartList.value.filter(e => e.skuId !== skuId)
    }
  }

  // 统计
  const allCount = computed(() => cartList.value.reduce((all, current) => all + current.count, 0))
  const allPrice = computed(() => cartList.value.reduce((all, current) => all + current.count * current.price, 0))

  // 修改selected
  const singleCheck = (selected, skuId) => {
    const item = cartList.value.find(e => e.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const isAll = computed(() => cartList.value.every(e => e.selected))
  const checkAll = (selected) => cartList.value.forEach(e => e.selected = selected)

  // list统计
  const listCount = computed(() => cartList.value.filter(e => e.selected).reduce((all, current) => all + current.count, 0))
  const listPrice = computed(() => cartList.value.filter(e => e.selected).reduce((all, current) => all + current.count * current.price, 0))

  // 清空购物车
  const clearCart = () => {
    cartList.value = []
  }

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    checkAll,
    listCount,
    listPrice,
    clearCart,
    updateCart
  }
},
  {
    persist: true,
  })
