<template>
  <div id="app">
    <van-nav-bar
      :title="title"
      :left-arrow="isshow"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
    />
    <router-view class="app"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);
export default {
  name: "app",
  components: {},
  props: [],
  data() {
    return {
      isshow: false,
      title:'',
    };
  },
  created() {
    this.isShow();
  }, // 当刷新页面的时候，因为路由地址没有发生变化，没有执行watch，所以要在组件创建完毕后，判断是否显示后退按钮
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {},
    isShow() {
      let arr = ["/home"];
      this.isshow = arr.indexOf(this.$router.path) == -1 ? true : false;
    }
  },
  // 当路由地址变化的时候。决定后退按钮显示或者隐藏
  watch: {
    $route: function(routeValue) {
      let arr = ['/home'];
      let registerArr = ['/registerstep1','/registerstep2','/registerstep3'];
      this.isshow = arr.indexOf(routeValue.path) == -1 ? true : false;
      this.title = registerArr.indexOf(routeValue.path) !== -1 ? '注册' : '磁云金服';
    }
  }
};
</script>

<style>
html,body {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
.app {
  margin-top: 46px;
}
.van-cell__title .van-icon {
  font-size: 18px;
}
h1,
h2,
h3,
h4,
h5,
h6,
ul,
dl,
ol,
dt,
dd,
li,
p,
div {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #333;
}
a:hover {
  color: #6980f5;
}
/* 清除浮动 */
.clearfix::after {
  content: "";
  height: 0;
  line-height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}
.clearfix {
  zoom: 1;
}
input,
img {
  margin: 0;
  padding: 0;
  border: 0 none;
  outline-style: none;
}
/* 字体 */
.bgnumber {
  color: #ff9800;
  font-size: 36px;
}
.smnumber {
  color: #ff9800;
  font-size: 14px;
}
.gray {
  font-size: 12px;
  color: #aaaaaa;
}
.font-16 {
  font-size: 16px;
}
.font-14 {
  font-size: 14px;
}
/* 浮动 */
.flt {
  float: left;
}
.frt {
  float: right;
}
</style>
