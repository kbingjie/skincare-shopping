import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect: '/login'

    },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    beforeEnter:(to, from ,next) => {
      let user = window.localStorage.getItem('username');
      if(user) {
        next()
      } else {
        next({name: 'Login'})
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter:(to, from, next) => {
      let user = window.localStorage.getItem('username');
      if(user){
        window.alert('You already loggedin')
      } else {
        next()
      }
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
