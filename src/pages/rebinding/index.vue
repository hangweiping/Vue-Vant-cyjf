<template>
  <div class="proving">
    <div class="content">
      <div class="ipt1">
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt2">
        <input type="text" v-model="identifyingCode" placeholder="请输入验证码" maxlength="10">
        <div class="code frt" @click="getcode">获取验证码</div>
      </div>
      <div class="btn">
        <button @click="nextbtn">确认绑定</button>
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
    };
  },
  created() {},
  mounted() {},
  methods: {
    getcode() {},
    nextbtn() {}
  }
};
</script>

<style scoped lang="scss">
.proving {
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
  .content {
    padding: 23px;
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
  }
}
</style>