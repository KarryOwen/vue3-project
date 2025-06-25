import httpInstance from "@/utils/http"


// 获取banner轮播图数据

export const getBannerAPI = (data) => httpInstance({
  url: 'home/banner',
  params: {
    distributionSite: data ? data.distributionSite : '1'
  }
})


/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return httpInstance('home/hot')
}


/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
