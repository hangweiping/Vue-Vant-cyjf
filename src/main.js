import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import 'lib-flexible'

Vue.use(Vant);
Vue.prototype.axios = axios;
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
