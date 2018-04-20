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
        <input type="text" v-model="smsCode" placeholder="请输入验证码" maxlength="10">
        <div class="code frt" @click="getcode" v-show="isshow1">{{btntxt}}</div>
        <div class="decode frt" v-show="isshow2">{{btntxt}}</div>
      </div>
      <div class="mid frt"></div>
      <!-- <router-link class="btn"  :to="{path:'/registerstep3',query:{mobile:mobile,smsCode:smsCode}}">
        <button>下一步</button>
      </router-link> -->
      <div class="btn">
        <button @click="next">下一步</button>
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
      mobile: "",
      smsCode: "",
      isshow1: true,
      isshow2: false,
      time: 0,
      btntxt : '获取验证码',
    };
  },
  created() {
    this.mobile = this.$route.query.mobile;
    console.log(this.mobile);
  },
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
      let data = ({
        mobile: this.mobile,
        smsType: "USER_REGIST_CODE"
      });
      this.axios.post("/sms/sendSms", data).then(res => {
        if (res.success) {
          this.time = 60;
          this.timer();
          this.$toast(res.message);
        } else {
          this.$toast(res.message);
        }
      });
    },
    next() {
      let data = ({
        mobile: this.mobile,
        smsType: "USER_REGIST_CODE",
        smsCode: this.smsCode
      });
      if (this.smsCode == "") {
        this.$toast("请输入验证码");
        return;
      } else {
        this.axios
          .post("sms/verify",data)
          .then(res => {
            if (res.success) {
              this.$toast(res.message);
              this.$router.push({
                name: "registerstep3",
                query: { mobile: this.mobile,smsCode: this.smsCode }
              });
            } else {
              this.$toast(res.message);
            }
          })
          .catch(err => {});
      }
    }
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
  .decode {
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