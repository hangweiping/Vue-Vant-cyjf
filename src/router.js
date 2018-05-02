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
      component: () => import(/* webpackChunkName: "publicity" */ "@/pages/publicity"),//宣传页
    }, {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ "@/pages/user"),//我的
      meta: {
        requireAuth: true
      },
    }, {
      path: '/investmsg',
      name: 'investmsg',
      component: () => import(/* webpackChunkName: "investmsg" */ "@/pages/investmsg"),//投资详情
      meta: {
        requireAuth: true
      },
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ "@/pages/login"),//登录
    }, {
      path: '/registerstep1',
      name: 'registerstep1',
      component: () => import(/* webpackChunkName: "registerstep1" */ "@/pages/register/registerstep1"),//注册
    }, {
      path: '/registerstep2',
      name: 'registerstep2',
      component: () => import(/* webpackChunkName: "registerstep2" */ "@/pages/register/registerstep2"),//注册
    }, {
      path: '/registerstep3',
      name: 'registerstep3',
      component: () => import(/* webpackChunkName: "registerstep3" */ "@/pages/register/registerstep3"),//注册
    }, {
      path: '/changepwd1',
      name: 'changepwd1',
      component: () => import(/* webpackChunkName: "changepwd1" */ "@/pages/changepwd/changepwd1"),//更改登录密码
    }, {
      path: '/changepwd2',
      name: 'changepwd2',
      component: () => import(/* webpackChunkName: "changepwd2" */ "@/pages/changepwd/changepwd2"),//更改登录密码
    },{
      path: '/rebinding',
      name: 'rebinding',
      component: () => import(/* webpackChunkName: "rebinding" */ "@/pages/rebinding"),//重新绑定手机号
      meta: {
        requireAuth: true
      },
    }, {
      path: '/purchase',
      name: 'purchase',
      component: () => import(/* webpackChunkName: "purchase" */ "@/pages/purchase"),//买入
      meta: {
        requireAuth: true
      },
    }, {
      path: '/recharge',
      name: 'recharge',
      component: () => import(/* webpackChunkName: "recharge" */ "@/pages/recharge"),//充值
      meta: {
        requireAuth: true
      },
    }, {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import(/* webpackChunkName: "withdraw" */ "@/pages/withdraw"),//提现
      meta: {
        requireAuth: true
      },
    }, {
      path: '/realname',
      name: 'realname',
      component: () => import(/* webpackChunkName: "realname" */ "@/pages/realname"),//实名认证
      meta: {
        requireAuth: true
      },
    },{
      path: '/usermessage',
      name: 'usermessage',
      component: () => import(/* webpackChunkName: "usermessage" */ "@/pages/usermessage"),//用户详情
      meta: {
        requireAuth: true
      },
    }, {
      path: '/bankcard',
      name: 'bankcard',
      component: () => import(/* webpackChunkName: "bankcard" */ "@/pages/bankcard"),//用户银行卡列表
      meta: {
        requireAuth: true
      },
    }, {
      path: '/dealrecord',
      name: 'dealrecord',
      component: () => import(/* webpackChunkName: "dealrecord" */ "@/pages/dealrecord"),//交易记录
      meta: {
        requireAuth: true
      },
    }, {
      path: '/investrecord',
      name: 'investrecord',
      component: () => import(/* webpackChunkName: "investrecord" */ "@/pages/investrecord"),//投资记录
      meta: {
        requireAuth: true
      },
    }
  ],
  //处理,使路由跳转的时候,可以想原生打开页面一样,返回到页面顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


export default router