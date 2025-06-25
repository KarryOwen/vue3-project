
// 获取分类数据

import httpInstance from "@/utils/http"

export const getCategoryData = () => httpInstance({
    url: '/home/category/head'
})
