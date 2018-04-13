import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import Vant from 'vant';
import util from './util' //工具
import 'vant/lib/vant-css/index.css';
import 'lib-flexible'
import './components/filters'//过滤器

Vue.use(Vant);
Vue.use(util);
Vue.prototype.axios = axios;
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
