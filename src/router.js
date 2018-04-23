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
      meta: {
        requireAuth: true
      },
    }, {
      path: '/investmsg',
      name: 'investmsg',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/investmsg"),//投资详情
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/login"),//登录
    }, {
      path: '/registerstep1',
      name: 'registerstep1',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/register/registerstep1"),//注册
    }, {
      path: '/registerstep2',
      name: 'registerstep2',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/register/registerstep2"),//注册
    }, {
      path: '/registerstep3',
      name: 'registerstep3',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/register/registerstep3"),//注册
    }, {
      path: '/changepwd1',
      name: 'changepwd1',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/changepwd/changepwd1"),//更改登录密码
    }, {
      path: '/changepwd2',
      name: 'changepwd2',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/changepwd/changepwd2"),//更改登录密码
    }, {
      path: '/changepaypwd1',
      name: 'changepaypwd1',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/changepaypwd/changepaypwd1"),//更改支付密码
    }, {
      path: '/changepaypwd2',
      name: 'changepaypwd2',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/changepaypwd/changepaypwd2"),//更改支付密码
    }, {
      path: '/rebinding',
      name: 'rebinding',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/rebinding"),//重新绑定手机号
    }, {
      path: '/purchase',
      name: 'purchase',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/purchase"),//买入
    }, {
      path: '/recharge',
      name: 'recharge',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/recharge"),//充值
    }, {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/withdraw"),//提现
    }, {
      path: '/realname',
      name: 'realname',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/realname"),//实名认证
    }, {
      path: '/openaccount',
      name: 'openaccount',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/openaccount"),//开通中金
    }, {
      path: '/tiecard',
      name: 'tiecard',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/tiecard"),//开通中金
    }, {
      path: '/usermessage',
      name: 'usermessage',
      component: () => import(/* webpackChunkName: "home" */ "@/pages/usermessage"),//开通中金
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