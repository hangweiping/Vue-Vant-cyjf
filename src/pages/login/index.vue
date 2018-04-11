<template>
  <div class="login">
    <div class="toggle">
      <span class="flt" v-bind:class="{ active: isActive1 }" @click="left">短信验证码登录</span>
      <span class="flt" v-bind:class="{ active: isActive2 }" @click="right">账号密码登录</span>
    </div>
    <div class="content" v-if="status == 0">
      <div class="ipt1">
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt2">
        <input type="text" v-model="identifyingCode" placeholder="请输入验证码" maxlength="10">
        <div class="code frt" @click="getcode">获取验证码</div>
      </div>
      <router-link class="btn" to="/registerstep1">
        <button>登录</button>
      </router-link>
      <div class="mid">
        <span class="agree"></span>
        <span>同意</span>
        <span class="contract">磁云金服平台注册服务协议</span>
      </div>
    </div>
    <div class="content" v-if="status == 1">
      <div class="ipt1">
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt1">
        <input type="text" v-model="password" placeholder="请输入登录密码" maxlength="12">
      </div>
      <div class="forget frt">
        忘记密码？
      </div>
      <router-link class="btn" to="/registerstep1">
        <button>登录</button>
      </router-link>
      <router-link class="btn2" to="/registerstep1">
        <button>注册领取加息特权</button>
      </router-link>
      <div class="mid">
        <span class="agree"></span>
        <span>同意</span>
        <span class="contract">磁云金服平台注册服务协议</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  props: [],
  data() {
    return {
      phoneNum: "",
      identifyingCode: "",
      password: "",
      status: 0,
      isActive1: true,
      isActive2: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    getcode() {},
    left() {
      this.status = 0;
      this.isActive1 = true;
      this.isActive2 = false;
    },
    right() {
      this.status = 1;
      this.isActive1 = false;
      this.isActive2 = true;
    },
  }
};
</script>

<style scoped lang="scss">
.login {
  .code {
    width: 30%;
    height: 51px;
    line-height: 51px;
    text-align: center;
    font-size: 16px;
    text-decoration: none;
    outline-style: none;
    color: #ff9800;
    border: 1px solid #ff9800;
    border-radius: 5px;
  }
  .btn {
    width: 100%;
    height: 46px;
    margin-top: 15px;
    button {
      width: 100%;
      color: #fff;
      background-color: #ff9800;
      font-size: 18px;
      line-height: 46px;
      border-style: none;
      border-radius: 5px;
    }
  }
  .toggle {
    height: 44px;
    padding: 20px 23px 0px 23px;
    .flt {
      width: 50%;
      height: 43px;
      background-color: #fff;
      color: #ff9800;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
      border: 1px solid #ff9800;
      box-sizing: border-box;
    }
    .flt.active,
    .frt.active {
      color: #fff;
      background-color: #ff9800;
    }
  }
  .content {
    padding: 0 23px 23px 23px;
    background-color: #fff;
    .ipt1,
    .ipt2 {
      width: 100%;
      height: 50px;
      margin: 10px 0;
      input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        text-indent: 4px;
        border-bottom: 1px solid #ccc;
      }
    }
    .ipt2 {
      margin-bottom: 20px;
      input {
        width: 65%;
      }
    }
    .mid {
      width: 100%;
      height: 38px;
      font-size: 14px;
      line-height: 38px;
      color: #999999;
      .contract {
        color: #3f51b5;
      }
    }
    .forget {
      height: 25px;
      font-size: 14px;
      line-height: 25px;
      color: #3f51b5;
    }
    .btn2 {
      display: block;
      width: 100%;
      height: 46px;
      margin-top: 16px;
      button {
        width: 100%;
        color: #3f51b5;
        background-color: #fff;
        font-size: 18px;
        line-height: 46px;
        border-style: none;
        border-radius: 5px;
        border: 1px solid #3f51b5;
      }
    }
  }
}
</style>