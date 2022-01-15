import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('../views/Status.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('access') != null) {
    console.log('Got access token Then Jump') 
    next()
    } else {
      if (to.path === '/login' | to.path === '/') {
        console.log('Login Jump') 
        next()
      }else {
        console.log(' Jump Login') 
        next('/login')
      }
    }
})

export default router
