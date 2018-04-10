<template>
  <div id="app">
    <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <router-view></router-view>
    <van-tabbar>
      <van-tabbar-item icon="shop">
       <router-link to="/home">首页</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="contact">
        <router-link to="/user">我的</router-link>
      </van-tabbar-item>
    </van-tabbar>
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
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {},
    onClickRight() {}
  }
};
</script>

<style>
body {
  background-color: #f8f8f8;
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
