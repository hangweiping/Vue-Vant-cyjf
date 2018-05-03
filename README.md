# cyjf

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```
  留给后来者的话~
  麻雀虽小,但五脏俱全
  1.目前项目整体已经完成.但部分功能目前并没有要求上线,对于这部分,已经v-show="false"了,但逻辑还在.
  2.还有一些不上线的功能,我已经标注了isban,可以通过全局搜索来看哪些功能被搁置
  3.进行调试时,你只需要解开http.js里对应的路径即可
  4.本地调试已经把跨域问题解决,可查看config->index.js
  5.对于页面的登录拦截,都在http.js里写了,可以参照
  6.将来,请把通用的工具放在util.js里
  7.components文件里主要是用来放公共组件的
  8.filter.js里就是平常能用到的过滤器了
  9.最后,还请保持代码的优雅.善待她,还是个小姑娘
  10.tomatoro@163.com
```