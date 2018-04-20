<template>
  <div class="changeloginpwd1">
    <div class="content">
      <van-cell-group>
        <van-field
          center
          v-model="mobile"
          type="number"
          label="手机号码"
          placeholder="请输入手机号码"
          icon="clear"
          @click-icon="mobile = ''"
        />
        <van-field
          center
          v-model="smsCode"
          type="number"
          label="验证码"
          placeholder="请输入验证码"
          icon="clear"
          @click-icon="smsCode = ''"
        >
          <van-button slot="button" size="small" v-show="isshow1" @click="getcode">{{btntxt}}</van-button>
          <van-button slot="button" size="small" v-show="isshow2" disabled>{{btntxt}}</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="btn">
      <button @click="nextbtn">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeloginpwd1",
  components: {},
  props: [],
  data() {
    return {
      mobile: "",
      smsCode: "",
      isshow1: true,
      isshow2: false,
      btntxt: "获取验证码",
      time: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    
    getcode() {
      let isPhone = this.$util.isPhone(this.mobile);
      let data = {
        mobile: this.mobile,
        smsType: "USER_FIND_PASSWORD_CODE"
      };
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
    nextbtn() {
      let data = {
        mobile: this.mobile,
        smsType: "USER_FIND_PASSWORD_CODE",
        smsCode: this.smsCode
      };
      if (this.smsCode == "") {
        this.$toast("请输入验证码");
        return;
      } else {
        this.axios
          .post("sms/verify", data)
          .then(res => {
            if (res.success) {
              
              this.$router.push({
                name: "changeloginpwd2",
                query: { mobile: this.mobile, smsCode: this.smsCode }
              });
            } else {
              this.$toast(res.message);
            }
          })
          .catch(err => {});
      }
    },
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
    }
  }
};
</script>
<style scoped lang="scss">
.changeloginpwd1 {
  padding: 10px 23px 23px 23px;
  .van-cell {
    padding: 10px 0 5px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  [class*="van-hairline"]::after {
    border: none;
  }
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
}
</style>
