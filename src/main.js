import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import 'lib-flexible'

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
