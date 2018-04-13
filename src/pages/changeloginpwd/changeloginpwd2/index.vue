<template>
  <div class="changeloginpwd2">
    <div class="content">
      <van-cell-group>
        <van-field
          center
          v-model="password"
          type="password"
          label="登录密码"
          placeholder="请输入登录密码"
          icon="clear"
          @click-icon="password = ''"
        />
        <van-field
          center
          v-model="repassword"
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
          icon="clear"
          @click-icon="repassword = ''"
        />
      </van-cell-group>
    </div>
    <div class="errmsg">{{errmsg}}</div>
    <div class="btn">
      <button>确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeloginpwd2",
  components: {},
  props: [],
  data() {
    return {
      password: "",
      repassword: "",
      errmsg: "两次密码不一致"
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.changeloginpwd2 {
  padding: 10px 23px 23px 23px;
  .content {
  }
  .errmsg {
    height: 21px;
    font-size: 12px;
    line-height: 21px;
    color: #f44;
  }
  .btn {
    width: 100%;
    height: 40px;
    button {
      width: 100%;
      color: #fff;
      background-color: #ff9800;
      font-size: 15px;
      line-height: 40px;
      border-style: none;
      border-radius: 5px;
    }
  }
  .van-cell {
    padding: 10px 0 5px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  [class*="van-hairline"]::after {
    border: none;
  }
}
</style>
