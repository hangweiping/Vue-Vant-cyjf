<template>
  <div class="login">
    <div class="toggle">
      <span class="flt" :class="{ active: isActive1 }" @click="left">短信验证码登录</span>
      <span class="flt" :class="{ active: isActive2 }" @click="right">账号密码登录</span>
    </div>
    <div class="content" v-if="status == 0">
      <div class="ipt1">
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt2">
        <!-- <van-field
          v-model="phoneNum"
          placeholder="请输入手机号"
        />
        <van-cell-group>
          <van-field
            v-model="sms"
            placeholder="请输入短信验证码"
            icon="clear"
            @click-icon="sms = ''"
          >
          <van-button slot="button" size="small" >发送验证码</van-button>
          </van-field>
        </van-cell-group> -->
        <input type="text" v-model="identifyingCode" placeholder="请输入验证码" maxlength="10">
        
        <button class="code frt" @click="getcode" :disabled="disabled"  :class="{ active: disabled }">发送验证码</button>
      </div>
      
      <div class="errmsg">{{errmsg1}}</div>
      <router-link class="btn" to="/registerstep1">
        <button>登录</button>
      </router-link>
      <div class="mid">
        <van-checkbox v-model="checked" @change="agree" label-disabled>同意&nbsp;<span class="contract">磁云金服平台注册服务协议</span></van-checkbox>
      </div>
    </div>
    <div class="content" v-if="status == 1">
      <div class="ipt1">
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt1">
        <input type="text" v-model="password" placeholder="请输入登录密码" maxlength="12">
      </div>
      <div class="errmsg flt">{{errmsg2}}</div>
      <div class="forget frt">
        忘记密码？
      </div>
      <router-link class="btn" to="/changeloginpwd1">
        <button>登录</button>
      </router-link>
      <router-link class="btn2" to="/registerstep1">
        <button>注册领取加息特权</button>
      </router-link>
      <div class="mid">
        <van-checkbox v-model="checked" @change="agree" label-disabled>同意&nbsp;<span class="contract">磁云金服平台注册服务协议</span></van-checkbox>
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
      checked: false,
      disabled: false, //禁用验证码
      errmsg1: "手机号码格式错误", //错误信息
      errmsg2: "手机号码", //错误信息
      sms: '',
    };
  },
  created() {},
  mounted() {},
  methods: {
    getcode() {
      this.disabled = this.disabled ? false : true;
    },
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
    agree(value) {
      //如果同意的逻辑
      if (value) {
      }
    }
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
    background-color: #fff;
  }
  .code.active {
    width: 30%;
    height: 51px;
    line-height: 51px;
    text-align: center;
    font-size: 16px;
    text-decoration: none;
    outline-style: none;
    color: #ccc;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
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
      margin-bottom: 10px;
      input {
        width: 65%;
      }
    }
    .errmsg {
      height: 21px;
      font-size: 12px;
      line-height: 21px;
      color: #f44;
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
      height: 21px;
      font-size: 14px;
      line-height: 21px;
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