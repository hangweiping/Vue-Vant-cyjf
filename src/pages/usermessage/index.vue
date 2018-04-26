<template>
  <div class="usermessage">
    <div class="box" @click="toChangeHead" v-if="dataInfor.avatar">
      <span class="flt">头像</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt head"><img src="./images/head.jpg" alt=""></span>
    </div>
    <div class="box" @click="toChangeHead" v-else>
      <span class="flt">头像</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt head"><img :src="dataInfor.avatar" alt=""></span>
    </div>

    <div class="box" @click="toOpenAccount" v-if="!isOpenEscrow">
      <span class="flt">存管账户</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">立即开户</span>
      <span class="frt gray2">未开户</span>
      <!-- <span class="frt gray2">*琨山  *******8812</span> -->
    </div>
    <div class="box" v-else-if="isOpenEscrow">
      <span class="flt">存管账户</span>
      <span class="frt gray2">{{dataInfor.idNo | changIdCard()}}</span>
      <span class="frt gray2">{{dataInfor.realName | changeName()}}</span>
    </div>

    <div class="box">
      <span class="flt">风险测评</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">重新测评</span>
      <span class="frt gray2">保守型</span>
    </div>

    <div class="box" @click="toRealName" v-if="!isAuthIdNo">
      <span class="flt">身份认证</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">立即绑定</span>
      <span class="frt gray2">未绑定</span>
    </div>
    <div class="box" v-else-if="isAuthIdNo">
      <span class="flt">身份认证</span>
      <span class="frt gray2">{{dataInfor.idNo | changIdCard()}}</span>
      <span class="frt gray2">{{dataInfor.realName | changeName()}}</span>
    </div>

    <div class="box" @click="toTieCard" v-if="!isBindCard">
      <span class="flt">银行卡</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">立即绑定</span>
      <span class="frt gray2">未绑定</span>
    </div>
    <div class="box" @click="toCardList" v-else-if="isBindCard">
      <span class="flt">银行卡</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">查看已绑银行卡</span>
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
import storage from "store2";
const setStorage = data => {
  storage.set("isAuthIdNo", data.isAuthIdNo || false); //是否实名
  storage.set("isOpenEscrow", data.isOpenEscrow || false); //是否开户
  storage.set("isBindCard", data.isBindCard || false); //是否绑卡
  storage.set("isSetGesPassword", data.isSetGesPassword || false); //是否设置手势密码
  storage.set("hasChargeAgreementNo", data.hasChargeAgreementNo || false); //是否有签约号
};
export default {
  name: "usermessage",
  components: {},
  props: [],
  data() {
    return {
      sid: "",
      isAuthIdNo: false, //实名
      isOpenEscrow: false, //开户
      isBindCard: false, //绑卡
      isSetGesPassword: false, //是否设置手势密码
      hasChargeAgreementNo: false, //是否有签约号
      // agreementNo:'',//签约号
      bindingSystemNo: "", //解绑时需要的流水号
      dataInfor: []
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      //账户信息
      this.sid = this.storage.get("sid");
      this.axios.post("uc/accountDetail").then(res => {
        if (res.success) {
          this.dataInfor = res.data;
          setStorage(res.data);
          this.isAuthIdNo = this.storage.get("isAuthIdNo");
          this.isOpenEscrow = this.storage.get("isOpenEscrow");
          this.isBindCard = this.storage.get("isBindCard");
          this.isSetGesPassword = this.storage.get("isSetGesPassword");
          this.hasChargeAgreementNo = this.storage.get("hasChargeAgreementNo");
        } else {
          this.$toast("网络异常,请刷新重试");
        }
      });
    },
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
    //修改头像
    toChangeHead() {},
    //修改登陆密码
    toChangeLoginPwd() {
      this.$router.push({
        name: "changepwd1",
        query: { smsType: "USER_FIND_PASSWORD_CODE" }
      });
    },
    //实名
    toRealName() {
      //如果未实名认证
      if (!this.isAuthIdNo) {
        this.$router.push("/realname");
      }
    },
    //开户
    toOpenAccount() {
      //先判断是否实名,再开户
      if (!this.isAuthIdNo) {
        this.$toast("请先进行实名认证");
        return;
      } else if (!this.isOpenEscrow) {
        window.open(
          `http://192.168.31.159:8080/mobile/pay/open-accountHtml5?sid=${this.sid}`
        );
      }
    },
    //绑卡
    toTieCard() {
      //先判断是否实名,再开户再绑卡
      if (!this.isAuthIdNo) {
        this.$toast("请先进行实名认证");
        return;
      } else if (!this.isOpenEscrow) {
        this.$toast("请先开通中金账户");
        return;
      } else if (!this.isBindCard) {
        //未绑卡
        window.open(
          `http://192.168.31.159:8080/mobile/pay/bankcard/bind?sid=${this.sid}`
        );
      }
    },
    //银行卡列表
    toCardList() {
      // this.axios.get(`uc/bank_card/list.json?sid=${this.sid}`).then(res => {
      //   if (res.success) {
          
      //   }
      // });
      this.$router.push('/bankcard')
    },
    //解绑
    unTieCard() {
      if (!this.isBindCard) {
        this.$toast("还未绑定银行卡,无法进行此操作");
        return;
      } else if (this.isBindCard) {
        window.open(
          `http://192.168.31.159:8080/mobile/pay/bankcard/unbind?sid=${
            this.sid
          }&bindingSystemNo=${this.bindingSystemNo}`
        );
      }
    },
    //支付签约
    sign() {
      //实名 开户 绑卡 签约
      window.open(
        `http://192.168.31.159:8080/mobile/pay/signed?sid=${
          this.sid
        }&agreementType=20`
      );
    },
    //支付解约
    rescined() {
      this.axios
        .get(
          `pay/termination?sid=${this.sid}&agreementNo=${
            this.dataInfor.chargeAgreementNo
          }`
        )
        .then(res => {
          if (res.success) {
            this.$toast("解约成功!");
          } else {
            this.$toast(res.message);
          }
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
    .head {
      width: 40px;
      height: 40px;
      padding: 5px 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
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