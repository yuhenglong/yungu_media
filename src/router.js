import Vue from 'vue'
import Router from 'vue-router'
import yunguIndex from '@/components/dashboard/view/yunguIndex'
import index from '@/components/dashboard/index.vue'
import notfound from '@/components/dashboard/404.vue'
import ceshi from '@/components/dashboard/view/ceshi.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {
          path: '/',
          component: ceshi
        }
      ]
    }, {
      path: '*',   //默认没有匹配对应的路由跳转到这个页面。
      name: 'notfound',
      component: notfound
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '/',
          component: yunguIndex
        },
        {
          path: '/yunguIndex',
          name:'yunguIndex',
          component: yunguIndex
        }
      ]
    }
  ]
})
