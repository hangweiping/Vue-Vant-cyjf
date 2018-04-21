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
    <div class="btn">
      <button @click="next">确认</button>
    </div>
  </div>
</template>

<script>
import storage from "store2";
const setStorage = data => {
  storage.set("sid", data.sid);
  storage.set("userId", data.userId);
  storage.set("userType", data.userType);
  storage.set("userKey", data.userKey);
};
export default {
  name: "changeloginpwd2",
  components: {},
  props: [],
  data() {
    return {
      password: "",
      repassword: ""
    };
  },
  created() {
    this.mobile = this.$route.query.mobile;
    this.smsCode = this.$route.query.smsCode;
  },
  mounted() {},
  methods: {
    next() {
      let isPasswordRuler = this.$util.isPasswordRuler(this.password);
      let password = this.$util.encryptByDES(this.password);
      //忘记密码要穿的参
      let forgetdata = {
        mobile: this.mobile,
        type: "GENERAL",
        smsCode: this.smsCode,
        password: password,
        clientType: "MOBILEWEB"
      };

      /* 将来可以做的事
      1 根据传来的参数判断跳到当前页的是什么类型的
      2 根据该值调用相应方法
      3 每种类型需要的参数都不一样 pay的密码是6为数字
      4 注意方法中参数的传递
      5 么问题之后 phoneProving.vue 删掉 changepaypwd文件删掉
      */
      this.forgetPwd(isPasswordRuler, forgetdata);
    },
    //忘记密码修改密码
    forgetPwd(isPasswordRuler, forgetdata) {
      if (this.password == "") {
        this.$toast("请输入密码");
      } else if (!isPasswordRuler) {
        this.$toast("密码应为6-12位数字、字母组合");
      } else if (this.repassword == "") {
        this.$toast("请再次输入密码");
      } else if (this.password !== this.repassword) {
        this.$toast("两次输入的密码不一致,请重新输入");
      } else {
        this.axios.post("forgetPassword", forgetdata).then(res => {
          if (res.success) {
            this.$toast.loading("修改成功!");
            this.thenLogin();
          } else {
            this.$toast(res.message);
          }
        });
      }
    },
    //主动修改登录密码
    changeLoginPwd() {},
    //主动修改支付密码
    changePayPwd() {},
    //登录
    login(data) {
      return new Promise(resolve => {
        this.axios.post("login", data).then(res => {
          resolve(res);
        });
      });
    },
    //1秒后跳转首页
    thenLogin() {
      //登录需要穿的参
      let loginData = {
        loginName: this.mobile,
        type: "GENERAL", //个人
        password: this.$util.encryptByDES(this.password),
        clientType: "MOBILEWEB"
      };
      setTimeout(() => {
        //修改成功使其登录并跳转到首页
        this.login(loginData).then(res => {
          if (res.success) {
            setStorage(res.data); //将sid等信息存起来
            this.$router.push("/home");
          } else {
            this.$toast(res.message);
          }
        });
      }, 1000);
    }
  }
};
</script>

<style scoped lang="scss">
.changeloginpwd2 {
  padding: 10px 23px 23px 23px;

  .btn {
    width: 100%;
    height: 40px;
    margin-top: 15px;
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
