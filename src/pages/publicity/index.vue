<template>
  <div class="publicity">
    <div class="verification">
      <van-cell-group>
        <van-field center v-model="phonenum" type="number" placeholder="请输入手机号" />
      </van-cell-group>
      <van-cell-group>
        <van-field
          center
          v-model="sms"
          type="number"
          placeholder="请输入短信验证码"
          icon="clear"
          @click-icon="sms = ''"
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
        <van-field
          center
          v-model="sms"
          type="number"
          placeholder="请输入正确的验证码"
          icon="clear"
          @click-icon="sms = ''"
          error
          v-show="false"
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn">
        <button @click="drawBtn">立即领取</button>
      </div>
    </div>
    <div class="tiket-top">
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
      </div>
  </div>
</template>

<script>
export default {
  name: "publicity",
  components: {},
  props: [],
  data() {
    return {
      sms: '',
      phonenum: '',
    };
  },
  created() {},
  mounted() {},
  methods: {
    drawBtn(){
      //如果验证码正确跳转
        this.$router.push("/home");
    }
  }
};
</script>

<style scoped lang="scss">
.publicity {
  overflow: hidden;
  .verification {
    width: 342px;
    height: 300px;
    margin: 16px;
    padding: 100px 17px 8px 17px;
    background-color: #f55d66;
    box-sizing: border-box;
    border-radius: 5px;
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
        background-color: #ff9800;
        font-size: 18px;
        line-height: 46px;
        border-style: none;
        border-radius: 5px;
      }
    }
  }
  .tiket-top {
    width: 100%;
    margin-top: 5px;
    box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.1);
    .title {
      height: 23px;
      padding: 11px 16px;
      border-bottom: 1px solid #e0e0e0;
      .lt {
        float: left;
        height: 23px;
        font-size: 14px;
        line-height: 23px;
        color: #333;
        font-family: "Microsoft Yahei";
      }
      .rt {
        width: 80px;
        height: 23px;
        float: right;
        border: 1px solid #ff9800;
        border-radius: 4px;
        color: #ff9800;
        font-size: 14px;
        line-height: 23px;
        text-align: center;
      }
    }
    .msg {
      padding: 20px 16px;
      div {
        width: 100%;
        .lt {
          float: left;
          width: 45%;
          height: 60px;
          p {
            margin: 0;
            font-size: 12px;
            color: #aaaaaa;
          }
        }
        .rt {
          float: right;
          width: 55%;
          height: 60px;
          padding: 0 14px;
          box-sizing: border-box;
          .van-progress {
            height: 5px;
            margin-top: 34px;
            margin-bottom: 8px;
          }
          p {
            margin: 0;
            font-size: 12px;
            color: #aaaaaa;
            span {
              margin-right: 5px;
            }
          }
        }
      }
      .btn {
        width: 341px;
        height: 46px;
        margin-top: 15px;
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
}
</style>