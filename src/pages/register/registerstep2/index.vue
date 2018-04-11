<template>
  <div class="register">
    <div class="step">
      <span class="cir active"></span>
      <span class="line"></span>
      <span class="cir active"></span>
      <span class="line"></span>
      <span class="cir"></span>
    </div>
    <div class="content2">
      <div class="ipt">
        <input type="text" v-model="identifyingCode" placeholder="请输入验证码" maxlength="10">
        <div class="code frt" @click="getcode">获取验证码</div>
      </div>
      <div class="mid frt"></div>
      <router-link class="btn" to="/registerstep3">
        <button>下一步</button>
      </router-link>
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
    background-color: #fff;
    padding: 20px 60px;
    box-sizing: border-box;
    .cir {
      float: left;
      width: 15px;
      height: 15px;
      border: 1px solid #6980f5;
      background-color: #fff;
      border-radius: 50%;
    }
    .cir.active {
      background-color: #6980f5;
    }
    .line {
      float: left;
      width: 100px;
      height: 1px;
      background-color: #6980f5;
      margin: 8px 0;
    }
  }
  .content2 {
    padding: 0 23px 23px 23px;
    background-color: #fff;
    .ipt {
      width: 100%;
      height: 50px;
      input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        text-indent: 4px;
        border-bottom: 1px solid #ccc;
      }
    }
    .mid {
      height: 45px;
    }
  }
  .content2 .ipt input {
    width: 65%;
  }
}
</style>