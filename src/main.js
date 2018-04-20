import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import storage from "store2"
import Vant from 'vant';
import util from './util' //工具
import 'vant/lib/vant-css/index.css';
import 'lib-flexible'
import './components/filters' //过滤器

Vue.use(Vant);
Vue.use(util);
Vue.prototype.axios = axios;
Vue.prototype.storage = storage


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { //判断该路由是否需要登陆权限
    if (storage.get('sid')) {
      next()
      // console.log('拿到sid');

    } else {
      // console.log('未拿到sid');
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})





new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
