<template>
  <div class="publicity">
    <div class="banner"></div>
    <div class="verification">
      <div class="bribe">
        开启供应链金融投资
      </div>
      <van-cell-group>
        <van-field center v-model="mobile" type="number" placeholder="请输入手机号" icon="clear"
          @click-icon="mobile = ''" />
      </van-cell-group>
      <van-cell-group class="ipt2">
        <van-field
          center
          v-model="smsCode"
          type="number"
          placeholder="请输入短信验证码"
          icon="clear"
          @click-icon="smsCode = ''"
        >
          <van-button slot="button" size="small" type="primary" v-show="isshow1" @click="getcode">{{btntxt}}</van-button>
          <van-button slot="button" size="small" v-show="isshow2" disabled>{{btntxt}}</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn">
        <button @click="next">立即开启</button>
      </div>
      <div class="agreement">
        <van-checkbox v-model="checked">同意智链金融平台注册服务协议</van-checkbox>
      </div>
    </div>
    <!-- <div class="tiket-top">
        <div class="title">
          <span class="lt">CD18032701汽车订单采购借款</span>
          <span class="rt">车商借款</span>
        </div>
        <div class="msg">
          <div class="clearfix">
            <div class="lt">
              <span class="bgnumber">9.0</span>
              <span class="smnumber">% +</span>
              <span class="bgnumber">1.0</span>
              <span class="smnumber">%</span>
              <p>预期年化</p>
            </div>
            <div class="rt">
                <van-progress :percentage="88" color="#6980F5"/>
                <p><span>30天</span><span>|</span><span>总额30.00万元</span></p>
            </div>
          </div>
        </div>
      </div> -->
      <div class="foot1"></div>
      <div class="foot2"></div>
      <div class="foot3"></div>
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
  name: "publicity",
  components: {},
  props: [],
  data() {
    return {
      mobile: "",
      smsCode: "",
      isshow1: true,
      isshow2: false,
      time: 0,
      btntxt: "获取验证码",
      checked: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    timer() {
      if (this.time > 0) {
        this.isshow1 = false;
        this.isshow2 = true;
        this.time--;
        this.btntxt = this.time + "s";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.isshow1 = true;
        this.isshow2 = false;
      }
    },
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
    next() {
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
      } else if (this.checked == false) {
        this.$toast("请先阅读并同意相关协议");
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
                      setStorage(res.data);
                      this.$toast("恭喜您,开启成功!");
                      this.$router.push("/home");
                      console.log(res);
                    } else {
                      this.$toast("开启失败,请稍后再试");
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
                    setStorage(res.data);
                    this.$toast("恭喜您,开启成功!");
                    this.$router.push("/home");
                  } else {
                    this.$toast("开启失败,请稍后再试"); //登录失败
                  }
                })
                .catch(err => {});
            }
          })
          .catch(err => {});
      }
    },
    //<----------- 登录/注册 ----------->
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
    }
  }
};
</script>

<style scoped lang="scss">
.publicity {
  overflow: hidden;
  .banner {
    width: 100%;
    height: 200px;
    background-image: url(./images/banner.jpg);
    background-size: 100% 200px;
    background-repeat: no-repeat;
  }
  .verification {
    height: 300px;
    margin: -30px 16px 16px 16px;
    padding: 100px 17px 8px 17px;
    background-color: rgba(218, 61, 61, 1);
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    .bribe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 78px;
      background-image: url(./images/publicity-0.jpg);
      background-size: 100% 78px;
      background-repeat: no-repeat;
      font-size: 18px;
      color: #fff;
      line-height: 50px;
      text-align: center;
    }
    .ipt2 .van-cell {
      padding-top: 7px;
      padding-bottom: 7px;
    }
    .van-cell-group {
      border-radius: 5px;
      margin-bottom: 15px;
      outline-style: none;
    }
    .van-cell {
      border-radius: 5px;
    }
    [class*="van-hairline"]::after {
      border: 0;
    }
    .btn {
      height: 46px;
      button {
        width: 100%;
        color: #fff;
        background-color: rgb(247, 208, 69);
        font-size: 18px;
        line-height: 46px;
        border-style: none;
        border-radius: 5px;
      }
    }
    .agreement {
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: #e0e0e0;
    }
  }
  .foot1 {
    width: 100%;
    height: 283px;
    margin-bottom: 25px;
    background-image: url(./images/publicity-1.jpg);
    background-size: 100% 283px;
    background-repeat: no-repeat;
  }
  .foot2 {
    width: 100%;
    height: 404px;
    margin-bottom: 25px;
    background-image: url(./images/publicity-2.jpg);
    background-size: 100% 404px;
    background-repeat: no-repeat;
  }
  .foot3 {
    width: 100%;
    height: 400px;
    margin-bottom: 25px;
    background-image: url(./images/publicity-3.jpg);
    background-size: 100% 400px;
    background-repeat: no-repeat;
  }
  // .tiket-top {
  //   width: 100%;
  //   margin-top: 5px;
  //   box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.1);
  //   .title {
  //     height: 23px;
  //     padding: 11px 16px;
  //     border-bottom: 1px solid #e0e0e0;
  //     .lt {
  //       float: left;
  //       height: 23px;
  //       font-size: 14px;
  //       line-height: 23px;
  //       color: #333;
  //       font-family: "Microsoft Yahei";
  //     }
  //     .rt {
  //       width: 80px;
  //       height: 23px;
  //       float: right;
  //       border: 1px solid #ff9800;
  //       border-radius: 4px;
  //       color: #ff9800;
  //       font-size: 14px;
  //       line-height: 23px;
  //       text-align: center;
  //     }
  //   }
  //   .msg {
  //     padding: 20px 16px;
  //     div {
  //       width: 100%;
  //       .lt {
  //         float: left;
  //         width: 45%;
  //         height: 60px;
  //         p {
  //           margin: 0;
  //           font-size: 12px;
  //           color: #aaaaaa;
  //         }
  //       }
  //       .rt {
  //         float: right;
  //         width: 55%;
  //         height: 60px;
  //         padding: 0 14px;
  //         box-sizing: border-box;
  //         .van-progress {
  //           height: 5px;
  //           margin-top: 34px;
  //           margin-bottom: 8px;
  //         }
  //         p {
  //           margin: 0;
  //           font-size: 12px;
  //           color: #aaaaaa;
  //           span {
  //             margin-right: 5px;
  //           }
  //         }
  //       }
  //     }
  //     .btn {
  //       width: 341px;
  //       height: 46px;
  //       margin-top: 15px;
  //       button {
  //         width: 100%;
  //         color: #fff;
  //         background-color: #ff9800;
  //         font-size: 18px;
  //         line-height: 46px;
  //         border-style: none;
  //       }
  //     }
  //   }
  // }
}
</style>