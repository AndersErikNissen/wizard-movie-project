import { createRouter, createWebHashHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/program-overview',
    name: 'ProgramOverview',
    component: () => import('../views/ProgramOverview.vue'),
  },
  {
    path: '/program/:programId',
    name: 'ProgramTemplate',
    component: () => import('../views/ProgramTemplate.vue'),
    // In order to easily use the $route.params, each routes can have props: true. That way the .params is now a prop for the component.
    props: true
  },
  {
    path: '/user-favorites',
    name: 'UserFavorites',
    component: () => import('../views/UserFavorites.vue'),
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: () => import('../views/ErrorPage.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: "LastStop",
    redirect: '/notfound'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
