<template>
  <div class="investmsg">
    <div class="box1">
      <div class="top">
        <p class="title">{{dataInfor.title}}</p>
        <span class="bgnumber">{{dataInfor.interestRate}}</span>
        <span class="smnumber">% +</span>
        <span class="bgnumber">1.0</span>
        <span class="smnumber">%</span>
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
          <p><span>{{dataInfor.residualAmount}}</span>&nbsp;万</p>
          <p class="gray">可投金额</p>
        </div>
        <div>
          <p><span>{{dataInfor.amount}}</span>&nbsp;万</p>
          <p class="gray">项目总额</p>
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="title">
        <van-cell-group>
          <van-cell title="风险保障" is-link to="" value="成都**集团有限公司">
            <van-icon slot="icon" name="checked" class="van-cell__right-icon checked"/>
            <van-icon slot="icon" name="location" class="van-cell-icon" />
          </van-cell>
        </van-cell-group>
      </div>
      <div class="mid">
        <div class="font-16">还款方式</div>
        <div>
          <span class="flt">到期还款付息</span>
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
          提供多样店铺模板，快速搭建网上商城
        </van-collapse-item>
        <van-collapse-item title="投资记录" name="2">
          网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
        </van-collapse-item>
      </van-collapse>
      <div class="msg">出借资金全程由银行存管</div>
      <div class="btn">
        <button @click="next">买入</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "investmsg",
  components: {},
  props: [],
  data() {
    return {
      activeNames: [],
      id: "",
      dataInfor: []
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  mounted() {
    this.initData();
    console.log(this.dataInfor.percent);
  },
  methods: {
    initData() {
      let that = this;
      this.axios
        .get("investment/details?projectId=" + this.id)
        .then(res => {
          if (res.status) {
            this.dataInfor = res.data;
          }
        })
        .catch(err => {});
    },
    next() {
      this.$router.push("/purchase");
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
      box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.1);
      .van-cell__right-icon.checked {
        margin: 0 144px;
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
  }
}
</style>