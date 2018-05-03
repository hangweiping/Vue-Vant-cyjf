<template>
  <div class="user">
    <div class="msg">
      <div class="picture clearfix">
        <router-link class="flt head" to="/usermessage">
          <img src="./images/head.jpg" alt="" v-if="!dataInfor.avatar">
          <img :src="dataInfor.avatar" alt="" v-else>
        </router-link>
        <div class="flt realname" v-if="!dataInfor.isAuthIdNo">未实名</div>
        <div class="flt realname" v-else-if="dataInfor.isAuthIdNo">已实名</div>
        <div class="frt service" v-show="false">
          <van-icon name="phone"/>
        </div>
      </div>
      <div class="income clearfix">
        <div class="box1">
          <p>总资产</p>
          <!-- <p>0.00元</p> -->
          <p>{{dataInfor.allCapitalSum}}元</p>
        </div>
        <div class="box2">
          <p>昨日收益</p>
          <!-- <p>0.00元</p> -->
          <p>{{dataInfor.yesterdayfee}}元</p>
        </div>
        <div class="box3">
          <p>可用资金</p>
          <!-- <p>0.00元</p> -->
          <p>{{dataInfor.available}}元</p>
        </div>
        <div class="box4">
          <p>累计收益</p>
          <!-- <p>0.00元</p> -->
          <p>{{accumulateIncome}}元</p>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- <router-link to="/recharge" class="box1" @click="realshow = true">充值</router-link> -->
      <div class="box1" @click="toWithDraw">提现</div>
      <div class="box1" @click="toRecharge">充值</div>
      <div class="box2" @click="toCoupon">优惠券</div>
      <div class="box2" @click="toGather">收款明细</div>
      <router-link to="/investrecord" class="box2">投资记录</router-link>
      <router-link to="/dealrecord" class="box2">交易记录</router-link>
    </div>
    <van-tabbar v-model="active" replace>
      <van-tabbar-item icon="wap-home" url='#/home'>首页
      </van-tabbar-item>
      <van-tabbar-item icon="contact" url='#/user'>我的
      </van-tabbar-item>
    </van-tabbar>
    <!-- 实名认证 -->
    <judgeRealName @realNameClose="realNameClose" :realshow="realshow"></judgeRealName>
    <!-- 开通中金 -->
    <judgeOpenAccount @openAccountClose="openAccountClose" :openshow="openshow"></judgeOpenAccount>
    <!-- 绑卡 -->
    <judgeBankCard @bankCardClose="bankCardClose" :bankshow="bankshow"></judgeBankCard>
  </div>
</template>

<script>
import judgeRealName from "../../components/judgeRealName.vue";
import judgeOpenAccount from "../../components/judgeOpenAccount.vue";
import judgeBankCard from "../../components/judgeBankCard.vue";
import storage from "store2";
const setStorage = data => {
  storage.set("isAuthIdNo", data.isAuthIdNo || false); //是否实名
  storage.set("isOpenEscrow", data.isOpenEscrow || false); //是否开户
  storage.set("isBindCard", data.isBindCard || false); //是否绑卡
  storage.set("isSetGesPassword", data.isSetGesPassword || false); //是否设置手势密码
  storage.set("hasChargeAgreementNo", data.hasChargeAgreementNo || false); //是否有签约号
};
export default {
  name: "user",
  components: {
    judgeRealName,
    judgeOpenAccount,
    judgeBankCard
  },
  props: [],
  data() {
    return {
      active: 1,
      dataInfor: [],
      accumulateIncome: "", //累计收益
      realshow: false, //实名认证
      openshow: false, //开通中金
      bankshow: false //绑卡
    };
  },
  created() {
    this.sid = this.storage.get("sid");
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      //账户信息
      this.axios.post("uc/accountDetail").then(res => {
        if (res.success) {
          this.dataInfor = res.data;
          setStorage(res.data);
        } else {
          // this.$toast("网络异常,请稍后再试");
        }
      });
      this.axios.get(`uc/overViewFunds?sid=${this.sid}`).then(res => {
        if (res.success) {
          this.accumulateIncome = res.data.accumulateIncome;
        } else {
          this.$toast(res.message);
        }
      });
    },
    //去充值
    toRecharge() {
      //未实名
      if (!this.dataInfor.isAuthIdNo) {
        this.realshow = true;
        return;
      } else if (!this.dataInfor.isOpenEscrow) {
        //未开户
        this.openshow = true;
        return;
      } else if (!this.dataInfor.isBindCard) {
        //未绑卡
        this.bankshow = true;
        return;
      } else {
        this.$router.push("/recharge");
      }
    },
    //去提现
    toWithDraw() {
      //未实名
      if (!this.dataInfor.isAuthIdNo) {
        this.realshow = true;
        return;
      } else if (!this.dataInfor.isOpenEscrow) {
        //未开户
        this.openshow = true;
        return;
      } else if (!this.dataInfor.isBindCard) {
        //未绑卡
        this.bankshow = true;
        return;
      } else {
        this.$router.push("/withdraw");
      }
    },
    //去优惠券
    toCoupon(){
      this.$toast('功能暂未开放')
    },
    //去收款明细
    toGather(){
      this.$toast('功能暂未开放')
    },
    realNameClose(close) {
      if (close) {
        this.realshow = false;
      }
    },
    openAccountClose(close) {
      if (close) {
        this.openshow = false;
      }
    },
    bankCardClose(close) {
      if (close) {
        this.bankshow = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.user {
  margin-bottom: 55px;
  .msg {
    height: 220px;
    background-color: #3f51b5;
    .picture {
      padding: 20px;
      .head {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .realname {
        width: 60px;
        height: 20px;
        margin-top: 20px;
        margin-left: 5px;
        background-color: #ff9800;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        border-radius: 10px;
      }
      .service {
        height: 40px;
        width: 40px;
        text-align: right;
        font-size: 15px;
        line-height: 40px;
      }
    }
    .income {
      padding: 0 20px;
      div {
        width: 50%;
        float: left;
        color: #fff;
        padding-bottom: 20px;
        :first-child {
          font-size: 12px;
          color: #879aff;
        }
        :last-child {
          font-size: 23px;
        }
      }
    }
  }
  .content {
    .box1 {
      color: #ff9800;
      float: left;
      width: 50%;
      height: 50px;
      font-size: 15px;
      line-height: 50px;
      text-align: center;
      box-shadow: 0 0 1px rgba($color: #000000, $alpha: 0.1);
    }
    .box2 {
      float: left;
      width: 50%;
      height: 50px;
      font-size: 15px;
      line-height: 50px;
      text-align: center;
      box-shadow: 0 0 1px rgba($color: #000000, $alpha: 0.1);
    }
  }
}
</style>