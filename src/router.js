import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


let router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/home"),//首页
    },{
      path: '/publicity',
      name: 'publicity',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/publicity"),//宣传页
    }
  ]
})


export default router