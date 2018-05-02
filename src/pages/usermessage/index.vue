<template>
  <div class="usermessage">
    <div class="box" v-if="dataInfor.avatar">
      <span class="flt">头像</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt head">
        <van-uploader :after-read="onRead" :before-read="oversize" accept="image/gif,image/jpeg,image/png" multiple :max-size="1048576">
          <img :src="dataInfor.avatar" alt="">
        </van-uploader>
      </span>
    </div>
    <div class="box" v-else>
      <span class="flt">头像</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt head">
        <van-uploader :after-read="onRead" :before-read="oversize" accept="image/gif,image/jpeg,image/png" multiple :max-size="1048576">
          <img src="./images/head.jpg" alt="">
        </van-uploader>
      </span>
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

    <div class="box">
      <span class="flt">风险测评</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">重新测评</span>
      <span class="frt gray2">保守型</span>
    </div>

    <div class="box" @click="toOpenAccount" v-if="!isOpenEscrow">
      <span class="flt">存管账户</span>
      <span class="frt"><van-icon name="arrow"/></span>
      <span class="frt orange">立即开户</span>
      <span class="frt gray2">未开户</span>
    </div>
    <div class="box" v-else-if="isOpenEscrow">
      <span class="flt">存管账户</span>
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
      <span class="frt orange">我的银行卡</span>
    </div>

    <div class="box" v-show="false">
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
    <!-- 开通中金 -->
    <judgeOpenAccount @openAccountClose="openAccountClose" :openshow="openshow"></judgeOpenAccount>
  </div>
</template>

<script>
import storage from "store2";
import VueCoreImageUpload from "vue-core-image-upload";
import judgeOpenAccount from "../../components/judgeOpenAccount.vue";
const setStorage = data => {
  storage.set("isAuthIdNo", data.isAuthIdNo || false); //是否实名
  storage.set("isOpenEscrow", data.isOpenEscrow || false); //是否开户
  storage.set("isBindCard", data.isBindCard || false); //是否绑卡
  storage.set("isSetGesPassword", data.isSetGesPassword || false); //是否设置手势密码
  storage.set("hasChargeAgreementNo", data.hasChargeAgreementNo || false); //是否有签约号
};
export default {
  name: "usermessage",
  components: { "vue-core-image-upload": VueCoreImageUpload, judgeOpenAccount },
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
      dataInfor: [],
      firstRealName: false,
      openshow: false
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
      this.headers = { sid: this.sid };
      this.firstRealName = this.$route.query.from == "realname" ? true : false;
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
          // this.$toast("网络异常,请稍后再试");
        }
      });
      if (this.firstRealName) this.openshow = true
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
    onRead(file) {
      let extension = file.file.type.replace("image/", "");
      let index = file.content.search(";base64,") + 8;
      let avatarData = file.content.slice(index);
      let data = {
        extension: extension,
        avatarData: avatarData
      };
      this.axios.post("uc/accountDetail/avatar/upload", data).then(res => {
        if (res.success) {
          window.location.reload();
        } else {
          this.$toast("上传失败,请重试");
        }
      });
    },
    oversize(file) {
      if (file.size > 1048576) {
        this.$toast("上传图片大小不能超过1M");
        return false;
      } else {
        return true;
      }
    },
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
        window.location.href = `http://192.168.31.159:8080/mobile/pay/open-account-webmobile?sid=${
          this.sid
        }`;
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
        window.location.href = `http://192.168.31.159:8080/mobile/pay/bankcard/bind-webmobile?sid=${
          this.sid
        }`;
      }
    },
    //银行卡列表
    toCardList() {
      this.$router.push("/bankcard");
    },

    //支付签约
    sign() {
      //实名 开户 绑卡 签约
      window.location.href = `http://192.168.31.159:8080/mobile/pay/signed?sid=${
        this.sid
      }&agreementType=20`;
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
    },
    //开户弹窗
    openAccountClose(close) {
      if (close) {
        this.openshow = false;
      }
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
      border-radius: 50%;
      background-color: #fff;
      .van-uploader {
        width: 100%;
        height: 100%;
      }
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