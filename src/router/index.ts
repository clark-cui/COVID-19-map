import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home.vue'
import Chart from '../views/chart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart
  },
 
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
