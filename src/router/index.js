import { createRouter, createWebHashHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/user-wishlist',
    name: 'UserWishlist',
    component: () => import('../views/UserWishlist.vue'),
  },
  {
    path: '/program/:programId',
    name: 'ProgramTemplate',
    component: () => import('../views/ProgramTemplate.vue'),
    // In order to easily use the $route.params, each routes can have props: true. That way the .params is now a prop for the component.
    props: true
  },
  {
    path: '/programs/:genreId',
    name: 'ProgramsTemplate',
    component: () => import('../views/ProgramsTemplate.vue'),
    props: true,
  },
  // Some simple error handling for the routes.
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
