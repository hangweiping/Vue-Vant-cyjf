/**
 * Created by Tomatoro on 18/4/9
 * http配置
 */
import axios from 'axios';
import storage from 'store2';
import router from './router';
import {
  Toast
} from 'vant';

//  axios配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; //允许cookie操作
// axios.defaults.baseURL = 'http://59.110.13.9:9803/mobile/';
// axios.defaults.baseURL = 'http://47.104.71.208:9081/mobile/';
// axios.defaults.baseURL = 'http://isantian.com/mobile/'; //正式解开
axios.defaults.baseURL = 'http://192.168.31.159:8080/mobile/';
// axios.defaults.baseURL = 'http://192.168.2.23:8080/mobile/';

const logout = () => {
  const sid = storage.get('sid');
  sid && console.warn(`sid[${sid}]失效`);
  // localStorage.removeItem('sid');
  Toast.fail('登录过期,请重新登录');
  storage.remove('sid');
  //  跳到登陆页.
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};
// http request 请求拦截器，有sid值则配置上sid值
axios.interceptors.request.use(
  config => {
    // let api = '/api/' //开发
    // config.url = api + config.url; //开发 使用axios时可以直接使用相应的接口不需要再加api/
    const sid = storage.get('sid');
    if (config.method == 'post') {
      config.data = JSON.stringify(config.data) //对post请求传的数据进行统一处理
    }
    if (!!sid) { // 每次发送请求之前判断是否存在sid，如果存在，则统一在http请求的header都加上sid，不用每次请求都手动添加了
      config.headers.sid = sid;
    }
    Toast.loading({
      message: '加载中...'
    });
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取sid
axios.interceptors.response.use(
  response => {
    const {
      config = {}
    } = response || {};
    const {
      params = {}
    } = config;
    Toast.clear();
    return response.data;
  },
  error => {
    const {
      response = {}
    } = error || {};
    let msg = '网络错误';
    switch (response.status) {
      case 401:
        // 这里写清除sid的代码
        logout();
        return;
        break;
      case 404:
        Toast.fail('接口不存在');
        break;
    }
    if (Math.floor(response.status / 100) === 5) {
      msg = '服务器错误';
    }
    Toast.fail(msg);
    return Promise.reject(response.data); // 返回接口返回的错误信息
    // 这里使用 resolve 就不再在每个请求中去处理 catch 了
    // return Promise.resolve({
    //   code: '001',
    //   message
    // });
  });
export default axios;
