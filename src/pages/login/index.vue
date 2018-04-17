<template>
  <div class="login">
    <div class="toggle">
      <span class="flt" :class="{ active: isActive1 }" @click="left">短信验证码登录</span>
      <span class="flt" :class="{ active: isActive2 }" @click="right">账号密码登录</span>
    </div>
    <div class="content" v-if="status == 0">
      <div class="ipt1">
        <input type="text" v-model="mobile" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt2">
        <!-- <van-field
          v-model="mobile"
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
        <input type="text" v-model="smsCode" placeholder="请输入验证码" maxlength="10">
        
        <button class="code frt" @click="getcode" :disabled="disabled" :class="{ active: disabled }">{{btntxt}}</button>
      </div>
      
      <div class="btn">
        <button @click="loginSms">登录</button>
      </div>
      <div class="mid">
        <van-checkbox v-model="checked" @change="agree" label-disabled>同意&nbsp;<span class="contract">智链金融平台注册服务协议</span></van-checkbox>
      </div>
    </div>
    <div class="content" v-if="status == 1">
      <div class="ipt1">
        <input type="text" v-model="mobile" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt1">
        <input type="password" v-model="password" placeholder="请输入登录密码" maxlength="12">
      </div>
      <div class="forget frt">
        忘记密码？
      </div>
      <div class="btn">
        <button @click="loginPwd">登录</button>
      </div>
      <router-link class="btn2" to="/registerstep1">
        <button>注册领取加息特权</button>
      </router-link>
      <div class="mid">
        <van-checkbox v-model="checked" @change="agree" label-disabled>同意&nbsp;<span class="contract">智链金融平台注册服务协议</span></van-checkbox>
      </div>
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
  name: "login",
  components: {},
  props: [],
  data() {
    return {
      mobile: "",
      smsCode: "",
      password: "",
      status: 0,
      isActive1: true,
      isActive2: false,
      checked: false,
      disabled: false, //禁用验证码
      time: 0,
      btntxt: "获取验证码"
    };
  },
  created() {},
  mounted() {
    console.log(this.$route.query.redirect);
  },
  methods: {
    getcode() {
      let isPhone = this.$util.isPhone(this.mobile);
      let data = JSON.stringify({
        mobile: this.mobile,
        smsType: "USER_REGIST_CODE"
      });
      if (this.mobile == "") {
        this.$toast("请先输入手机号");
      } else if (!isPhone) {
        this.$toast("请输入正确的手机号");
      } else {
        this.axios.post("/sms/sendSms", data).then(res => {
          if (res.success) {
            this.time = 60;
            this.timer();
            this.$toast(res.message);
          } else {
            this.$toast(res.message);
          }
        });
      }
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
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btntxt = this.time + "s";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    //注册
    register(data) {
      return new Promise(resolve => {
        this.axios.post("regist/submit", data).then(res => {
          resolve(res);
        });
      });
    },
    //短信登录
    login(data) {
      return new Promise(resolve => {
        this.axios.post("login_duanxin", data).then(res => {
          resolve(res);
        });
      });
    },
    //短信登录按钮
    loginSms() {
      let isPhone = this.$util.isPhone(this.mobile);
      let password = this.$util.encryptByDES(`icy${this.mobile}`);
      let registerData = JSON.stringify({
        type: "GENERAL",
        mobile: this.mobile,
        password: password,
        clientType: "MOBILEWEB",
        smsCode: this.smsCode
      });
      let loginData = JSON.stringify({
        type: "GENERAL",
        loginName: this.mobile,
        smsType: "USER_REGIST_CODE",
        smsCode: this.smsCode,
        clientType: "MOBILEWEB"
      });
      if (this.mobile == "") {
        this.$toast("请先输入手机号");
      } else if (!isPhone) {
        this.$toast("请输入正确的手机号");
      } else if (this.smsCode == "") {
        this.$toast("请先输入验证码");
      } else {
        //判断是否已经注册
        this.axios
          .post(`regist/checkMobile?mobile=${this.mobile}&type=${"GENERAL"}`)
          .then(res => {
            if (res.success) {
              //如果未注册 先走注册接口在走登录接口
              this.register(registerData).then(res => {
                if (res.success) {
                  //注册成功
                  this.login(loginData).then(res => {
                    if (res.success) {
                      setStorage(res.data); //将sid等信息存起来
                      this.$toast(res.message);
                      if (!!this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect);
                      } else {
                        this.$router.push("/home");
                      }
                    } else {
                      this.$toast(res.message);
                    }
                  });
                } else {
                  this.$toast(res.message); //注册失败
                }
              });
            } else {
              //如果已注册 直接走登陆接口
              this.login(loginData)
                .then(res => {
                  if (res.success) {
                    //登陆成功
                    setStorage(res.data); //将sid等信息存起来
                    this.$toast(res.message);
                    if (!!this.$route.query.redirect) {
                      this.$router.push(this.$route.query.redirect);
                    } else {
                      this.$router.push("/home");
                    }
                  } else {
                    this.$toast(res.message); //登录失败
                  }
                })
                .catch(err => {});
            }
          })
          .catch(err => {});
      }
    },
    //密码登录按钮
    loginPwd() {
      let isPhone = this.$util.isPhone(this.mobile);
      let password = this.$util.encryptByDES(this.password);
      let loginData = JSON.stringify({
        loginName: this.mobile,
        type: "GENERAL", //个人
        password: password,
        clientType: "MOBILEWEB"
      });
      if (this.mobile == "") {
        this.$toast("请输入手机号");
      } else if (!isPhone) {
        this.$toast("请输入正确的手机号");
      } else if (this.password == "") {
        this.$toast("请输入密码");
      } else {
        this.axios.post("login", loginData).then(res => {
          if (res.success) {
            setStorage(res.data); //将sid等信息存起来
            this.$toast(res.message);
            if (!!this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push("/home");
            }
          } else {
            this.$toast(res.message);
          }
        });
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
    margin-top: 33px;
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