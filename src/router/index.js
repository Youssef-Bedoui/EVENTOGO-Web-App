
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from "../views/SignInView.vue"
import SignUpView from "../views/SignUpView.vue"


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddEventView.vue')
  },
  {
    path: '/modif',
    name: 'modif',
    component: () => import('../views/ModifView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')

  },
  {
    path: '/favorite',
    name: 'favorite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FavoriteView.vue')

  },

  //for testing purposes
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddEventView.vue')
  },
  {
    path: '/modif',
    name: 'modif',
    component: () => import('../components/ModifEvent/ModifEvent.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
