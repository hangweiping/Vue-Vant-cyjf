<template>
  <div class="register">
    <div class="step"></div>
    <div class="content1">
      <div class="ipt">
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="mid frt">
        我有账号，立即登录
      </div>
      <div class="btn">
        <button>下一步</button>
      </div>
    </div>
    <div class="content2">
      <div class="ipt">
        <input type="text" v-model="identifyingCode" placeholder="请输入验证码" maxlength="10">
        <div class="code frt" @click="getcode">获取验证码</div>
      </div>
      <div class="btn">
        <button>下一步</button>
      </div>
    </div>
    <div class="content3">
      <div class="ipt">
        <input type="text" v-model="password" placeholder="请输入登录密码" maxlength="12">
      </div>
      <div class="mid flt">
        6-12位数字、字母组合
      </div>
      <div class="btn">
        <button>下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  props: [],
  data() {
    return {
      active: 0,
      phoneNum: "",
      identifyingCode: "",
      password: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    getcode() {}
  }
};
</script>

<style scoped lang="scss">
.register {
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
  .step {
    height: 57px;
  }
  .content1,
  .content2,
  .content3 {
    padding: 23px;
    background-color: #fff;
    .ipt {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ccc;
      input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        text-indent: 4px;
      }
    }
  }
  .content1 .mid {
    height: 45px;
    color: #879aff;
    font-size: 14px;
    line-height: 45px;
  }
  .content2 .ipt input {
    width: 65%;
  }
  .content3 .mid {
    height: 45px;
    color: #999999;
    font-size: 14px;
    line-height: 45px;
  }
}
</style>