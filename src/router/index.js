import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Detail from '@/pages/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { backLink: false }
    },
    {
      path: '/item/:id',
      name: 'Detail',
      component: Detail,
      meta: { backLink: true }
    }
  ]
})
