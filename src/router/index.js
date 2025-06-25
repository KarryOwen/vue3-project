import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import home from '@/views/home/index.vue'
import category from '@/views/category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import detail from '@/views/detail/index.vue'
import cartList from '@/views/cartList/index.vue'
import checkOut from  '@/views/checkOut/index.vue'
import pay from '@/views/pay/index.vue'
import PayBack from '@/views/pay/PayBack.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import member from '@/views/Member/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '',
          component: home
        },
        {
          path: 'category/:id',
          component: category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: detail
        },
        {
          path: 'cartList',
          component: cartList
        },
        {
          path: 'checkout',
          component: checkOut
        },
        {
          path: 'pay',
          component: pay
        },
        {
          path: 'payback',
          component: PayBack
        },
        {
          path: 'member',
          component: member,
          redirect: 'member/user',
          children: [
            {
              path: 'order',
              component: UserOrder
            },
            {
              path: 'user',
              component: UserInfo
            },
          ]
        },
      ]
    },
    {
      path: '/login',
      component: login
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
