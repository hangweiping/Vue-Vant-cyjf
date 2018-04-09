/**
 * Created by Tomatoro on 18/4/9
 * http配置
 */
import axios from 'axios';
import storage from 'store2';
import router from './router';
import { Toast } from 'vant';

//  axios配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://127.0.0.1:8899/moblie/';

const logout = () => {
  const token = storage.get('token');
  token && console.warn(`token[${token}]失效`);
  localStorage.removeItem('token');
  //  跳到登陆页.
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};
// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    const token = storage.get('token');
    if (!!token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.token = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let msg = '网络错误';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          logout();
          break;
        case 404:
          Toast.fail('接口不存在');
          break;
      }
    }
    if (Math.floor(response.status / 100) === 5) {
      msg = '服务器错误';
    }
    Toast.error(msg);
    // return Promise.reject(error.response.data);
    // 这里使用 resolve 就不再在每个请求中去处理 catch 了
    return Promise.resolve({
      code: -1,
      msg
    });
  });
export default axios;
