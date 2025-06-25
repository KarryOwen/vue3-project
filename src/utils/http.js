// axios基础封装

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import axios from "axios"
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 100000
})


httpInstance.interceptors.request.use(config => {
  // 配置token
  const { userInfo } = useUserStore()
  if (userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一校验配置
  console.log(e)
  ElMessage({ type: 'warning', message: e.message })
  // e.response.data.message
  // 401tokrn失效处理
  const { clearInfo } = useUserStore()
  const router = useRouter()
  if (e.response.status === 401) {
    clearInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})


export default httpInstance
