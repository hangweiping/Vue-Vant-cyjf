<template>
  <div class="usermessage">
    <div class="box">
      <span class="flt">头像</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt"><img src="" alt=""></span>
    </div>
    <div class="box">
      <span class="flt">存管账户</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt gray2">*琨山  *******8812</span>
    </div>
    <div class="box">
      <span class="flt">风险测评</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">重新测评</span>
      <span class="frt gray2">保守型</span>
    </div>
    <div class="box">
      <span class="flt">身份认证</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt gray2">*琨山  ***************8812</span>
    </div>
    <div class="box">
      <span class="flt">银行卡</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">立即绑定</span>
      <span class="frt gray2">未绑定</span>
    </div>
    <div class="box">
      <span class="flt">手机号码</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">重新绑定</span>
    </div>
    <div class="box" @click="toChangeLoginPwd">
      <span class="flt">登录密码</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">修改密码</span>
    </div>
    <div class="btn">
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "usermessage",
  components: {},
  props: [],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    //退出登录
    logout() {
      this.axios.post("uc/logout").then(res => {
        if (res.success) {
          this.$toast("退出成功");
          this.storage.clear();
          this.$router.push("/home");
        } else {
          this.$toast("退出失败");
        }
      });
    },
    //修改登陆密码
    toChangeLoginPwd() {
      this.$router.push({
        name: "changepwd1",
        query: { smsType: "USER_FIND_PASSWORD_CODE" }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.usermessage {
  margin-bottom: 55px;
  .box {
    height: 50px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
    line-height: 50px;
    padding: 2px 16px;
    i {
      margin-top: 18px;
    }
    span {
      padding: 0 5px;
    }
  }
  .btn {
    width: 100%;
    height: 45px;
    padding: 16px;
    box-sizing: border-box;
    font-size: 14px;
    button {
      width: 100%;
      height: 45px;
      border: 1px solid #ff9800;
      color: #ff9800;
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
</style>