import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/favor',
          component: () => import('@/views/favor/index.vue')
        },
        {
          path: '/order',
          component: () => import('@/views/order/index.vue')
        },
        {
          path: '/profile',
          component: () => import('@/views/profile/index.vue')
        }
      ]
    },
    {
      path: '/city',
      component: () => import('@/views/city/index.vue')
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: () => import('@/views/search/index.vue')
    }
  ]
})

export default router
