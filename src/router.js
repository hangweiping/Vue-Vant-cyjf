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
    }, {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/user"),//我的
    }, {
      path: '/investmsg',
      name: 'investmsg',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/investmsg"),//投资详情
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/login"),//登录
    }, {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/register"),//注册
    }
  ]
})


export default router