import { createRouter, createWebHashHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage
  },
  {
    path: '/program-overview',
    name: 'ProgramOverview',
    component: () => import('../views/ProgramOverview.vue')
  },
  {
    path: '/program-template',
    name: 'ProgramTemplate',
    component: () => import('../views/ProgramTemplate.vue')
  },
  {
    path: '/user-favorites',
    name: 'UserFavorites',
    component: () => import('../views/UserFavorites.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
