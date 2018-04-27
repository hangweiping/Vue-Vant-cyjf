<template>
  <div class="investmsg">
    <div class="box1">
      <div class="top">
        <p class="title">{{dataInfor.title}}</p>
        <span class="bgnumber">{{dataInfor.interestRate}}</span>
        <span class="smnumber">%</span>
        <!-- <span class="smnumber">% +</span>
        <span class="bgnumber">1.0</span>
        <span class="smnumber">%</span> -->
        <p class="gray">预期年化</p>
      </div>
      <div class="mid">
        <van-progress class="flt" :show-pivot="false" :percentage="dataInfor.percent" color="#6980F5"/>
        <div class="frt gray">{{dataInfor.percent}}%</div>
      </div>
      <div class="foot clearfix">
        <div>
          <p><span>{{dataInfor.period}}</span>&nbsp;{{dataInfor.periodUnitDes}}</p>
          <p class="gray">投资期限</p>
        </div>
        <div>
          <p><span>{{dataInfor.residualAmount}}</span>&nbsp;元</p>
          <p class="gray">可投金额</p>
        </div>
        <div>
          <p><span>{{dataInfor.amount}}</span>&nbsp;元</p>
          <p class="gray">项目总额</p>
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="title">
        <span class="font-16">风险保障</span>
        <span class="font-14 frt">成都**集团有限公司&nbsp;&nbsp;<van-icon name="checked" class="bag"/></span>
        <!-- <van-cell-group>
          <van-cell title="风险保障" value="成都**集团有限公司">
            <van-icon slot="icon" name="checked" class="van-cell__right-icon checked"/>
            <van-icon slot="icon" name="location" class="van-cell-icon" />
          </van-cell>
        </van-cell-group> -->
      </div>
      <div class="mid">
        <div class="font-16">还款方式</div>
        <div>
          <span class="flt">{{dataInfor.repaymentMethodDes}}</span>
          <span class="frt">302600.00元</span>
        </div>
        <div>
          <span class="flt">起息日</span>
          <span class="frt">募集完成审核后（T+1计息)</span>
        </div>
      </div>
    </div>
    <div class="box3">
      <div class="title font-16">风险控制</div>
      <div class="mid">
        <div class="top">
          <div class="font-14">审核状态</div>
          <span>信用报告 <van-icon name="checked" class="bag"/></span>
          <span>企业认证 <van-icon name="checked" class="bag"/></span>
          <span>实地核查 <van-icon name="checked" class="bag"/></span>
          <span>营业执照 <van-icon name="checked" class="bag"/></span>
          <span>采购合同 <van-icon name="checked" class="bag"/></span>
        </div>
        <div class="foot">
          <div class="font-14">主体信息</div>
          <div class="content">
            <p>借款人</p>
            <p>成都**汽车服务有限公司是一家销售汽车为主的企业。</p>
            <p>汽车供应链平台</p>
            <p>**车服科技（成都）有限公司是一家及采购、物流服务、供应链与消费金融为一体的汽车全产业链服务型企业，与采购方、供应方长期合作，关系稳定。</p>
            <p>担保方</p>
            <p>成都**集团有限公司是一家以汽车金融为主导的综合性控股集团；**车服科技（成都）有限公司是一家及采购、物流服务、供应链与消费金融为一体的汽车全产业链服务型企业。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box4">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="项目介绍" name="1">
          <div v-html="intro" class="gray2"></div>
        </van-collapse-item>
        <van-collapse-item title="投资列表" name="2">
          <div class="gray2">
            <p><span class="lt">时间</span><span class="md">用户</span><span class="rt">投资金额(元)</span></p>
            <p v-for="(item,index) in investmentRecords" :key="index">
              <span class="lt">{{item.buyTime}}</span>
              <span class="md">{{item.investor}}</span>
              <span class="rt">{{item.amount}}</span>
            </p>
          </div>
        </van-collapse-item>
      </van-collapse>
      <div class="msg">出借资金全程由银行存管</div>
      <div class="btn" v-show="dataInfor.allowInvest">
        <button @click="next">买入</button>
      </div>
    </div>
    <!-- 开通中金 -->
    <judgeOpenAccount @openAccountClose="openAccountClose" :openshow="openshow"></judgeOpenAccount>
    <!-- 实名认证 -->
    <judgeRealName @realNameClose="realNameClose" :realshow="realshow"></judgeRealName>
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
  name: "investmsg",
  components: {
    judgeRealName,
    judgeOpenAccount,
    judgeBankCard
  },
  props: [],
  data() {
    return {
      activeNames: [],
      id: "",
      dataInfor: [],
      intro: "", //项目介绍
      investmentRecords: [],//投资列表
      realshow: false, //实名认证
      openshow: false, //开通中金
      bankshow: false, //绑卡
      isAuthIdNo: false, //实名
      isOpenEscrow: false, //开户
      isBindCard: false, //绑卡
      allowInvest: false //是否可投
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.sid = this.storage.get("sid");
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      //账户信息
      this.axios.post("uc/accountDetail").then(res => {
        if (res.success) {
          setStorage(res.data);
          this.isAuthIdNo = this.storage.get("isAuthIdNo") || false;
          this.isOpenEscrow = this.storage.get("isOpenEscrow") || false;
          this.isBindCard = this.storage.get("isBindCard") || false;
          this.isSetGesPassword = this.storage.get("isSetGesPassword") || false;
          this.hasChargeAgreementNo =
            this.storage.get("hasChargeAgreementNo") || false;
        } else {
          // this.$toast("网络异常,请稍后再试");
        }
      });
      //项目详情
      this.axios.get("investment/details?projectId=" + this.id).then(res => {
        if (res.success) {
          this.dataInfor = res.data;
        }
      });
      //项目描述
      this.axios.get("investment/projectDetail/" + this.id).then(res => {
        if (res.success) {
          this.intro = res.data.intro;
        }
      });
      //投资列表
      this.axios.get(`investment/investmentRecords?currentPage=1&isTransfer=0&projectId=${this.id}`).then(res=>{
        if(res.success){
          this.investmentRecords = res.data.records
        }
      })
      //项目是否可投
    },
    next() {
      if (!this.isAuthIdNo) {
        //先判断是否实名
        this.realshow = true;
        return;
      } else if (!this.isOpenEscrow) {
        //再判断是否开通中金
        this.openshow = true;
        return;
      } else if (!this.isBindCard) {
        //未绑卡
        this.bankshow = true;
        return;
      } else {
        this.$router.push({
          name: "purchase",
          query: { id: this.id }
        });
      }
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
.investmsg {
  margin-bottom: 46px;
  .box1 {
    height: 214px;
    text-align: center;
    background-color: #fff;
    margin-bottom: 4px;
    box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.1);
    .top {
      .title {
        height: 33px;
        font-size: 14px;
        color: #333;
        line-height: 33px;
      }
      .gray {
        height: 25px;
        line-height: 25px;
      }
    }
    .mid {
      padding: 16px 30px;
      .van-progress {
        width: 88%;
        height: 5px;
      }
      .frt {
        height: 5px;
        line-height: 5px;
      }
    }
    .foot {
      margin: 15px 16px;
      div {
        float: left;
        width: 32.7%;
        span {
          font-size: 20px;
          color: #333;
        }
      }
    }
  }
  .box2 {
    height: 167px;
    background-color: #fff;
    margin-bottom: 4px;
    box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.1);
    .title {
      height: 47px;
      line-height: 47px;
      padding: 0 16px;
      box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.1);
      // .van-cell__right-icon.checked {
      //   margin: 0 144px;
      //   color: #8bc34a;
      // }
      .frt {
        padding-right: 11px;
      }
      .bag:before {
        position: absolute;
        left: -3px;
        top: -12px;
        color: #8bc34a;
      }
    }
    .mid {
      padding: 16px;
      div {
        height: 30px;
        line-height: 30px;
      }
      .flt {
        font-size: 14px;
        color: #999999;
      }
      .frt {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .box3 {
    background-color: #fff;
    margin-bottom: 4px;
    box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.1);
    .van-icon-checked:before {
      color: #8bc34a;
    }
    .title {
      height: 47px;
      line-height: 47px;
      padding: 0 16px;
      border-bottom: 1px solid #e5e5e5;
    }
    .mid {
      padding: 8px 16px;
      .top {
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 10px;
        .font-14 {
          height: 30px;
          line-height: 30px;
        }
        span {
          display: inline-block;
          width: 32%;
          height: 30px;
          font-size: 14px;
          color: #666666;
          line-height: 30px;
          .bag:before {
            position: absolute;
            left: 2px;
            top: -12px;
          }
        }
      }
      .foot {
        padding: 10px 0;
        .font-14 {
          height: 30px;
          line-height: 30px;
        }
        .content {
          p {
            font-size: 14px;
            color: #666666;
            line-height: 25px;
          }
        }
      }
    }
  }
  .box4 {
    .msg {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #333;
      text-align: center;
    }
    .btn {
      width: 100%;
      height: 46px;
      position: fixed;
      left: 0;
      bottom: 0;
      button {
        width: 100%;
        color: #fff;
        background-color: #ff9800;
        font-size: 18px;
        line-height: 46px;
        border-style: none;
      }
    }
    .lt,.md,.rt{
      display: inline-block;
    }
    .lt{
      width: 45%;
    }
    .md{
      width: 25%;
    }
    .rt{
      width: 20%;
    }
  }
}
</style>