<template>
  <div id="app">
    <!-- <van-nav-bar
      :title="title"
      :left-arrow="isshow"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
    /> -->
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
      title: ""
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
      let arr = ["/home","/publicity"];
      this.isshow = arr.indexOf(routeValue.path) == -1 ? true : false;
      // let registerArr = ["/registerstep1", "/registerstep2", "/registerstep3"];
      // this.title =
      //   registerArr.indexOf(routeValue.path) !== -1 ? "注册" : "智链金融";
      switch (routeValue.path) {
        case "/registerstep1" || "/registerstep2" || "/registerstep3":
          this.title = "注册";
          break;
        case "/changeloginpwd1" || "/changepaypwd1":
          this.title = "验证手机号";
          break;
        case "/changeloginpwd2":
          this.title = "设置登录密码";
          break;
        case "/changepaypwd2":
          this.title = "设置支付密码";
          break;
        case "/rebinding":
          this.title = "重新绑定手机号";
          break;
        case "/recharge":
          this.title = "充值";
          break;
        case "/withdraw":
          this.title = "提现";
          break;
        default:
          this.title = "智链金融";
          break;
      }
    }
  }
};
</script>

<style lang="scss">
html,
body {
  background-color: #fff;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.app {
  // margin-top: 46px;
}
.van-nav-bar__title {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
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
.font-12 {
  font-size: 12px;
}
.font-14 {
  font-size: 14px;
}
.font-15 {
  font-size: 15px;
}
.font-16 {
  font-size: 16px;
}
/* 浮动 */
.flt {
  float: left;
}
.frt {
  float: right;
}
/* 输入框 */
/* .van-cell {
  padding: 10px 0 5px 0;
  border-bottom: 1px solid #e0e0e0;
}
[class*="van-hairline"]::after {
  border: none;
} */
.van-field__icon {
  right: 3%;
  top: 50%;
}
/* .van-button--primary {
  background-color: rgb(247, 208, 69);
  border: none;
} */
/* 同意按钮 */
.van-checkbox__icon {
  width: 12px;
  height: 12px;
  font-size: 10px;
  line-height: 10px;
  background-color: #fff;
  margin-bottom:2px;
}
.van-checkbox--checked {
  width: 12px;
  height: 12px;
  font-size: 10px;
  line-height: 12px;
  color: #fff;
  background-color:rgb(247, 208, 69);
  border: 1px solid #aaa;
  margin-bottom:2px;
}
/* 密码框 */
.van-password-input__security {
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
