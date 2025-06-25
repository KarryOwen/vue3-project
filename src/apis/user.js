import httpInstance from "@/utils/http"

export const getLoginAPI = ({ account, password }) => httpInstance({
  url: '/login',
  method: 'POST',
  data: {
    account,
    password
  }
})


// 个人中心猜你喜欢模块数据获取
export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}


// 获取订单列表
export const getUserOrder = (params) => {
  return httpInstance({
    url: '/member/order',
    method: 'GET',
    params
  })
}
