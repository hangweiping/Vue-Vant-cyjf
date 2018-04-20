<template>
  <div class="purchase">
    <div class="content">
      <div class="box1">买入CD18032701汽车订单采购借款</div>
      <div class="box2"><span>￥</span><input readonly type="text" placeholder="100起投" @click="show = true" v-model="money"></div>
      <div class="box3"><span class="gray">可用余额&nbsp;</span><span>100,000.00元&nbsp;</span><router-link to="/recharge" class="smnumber font-12">&nbsp;充值</router-link></div>
      <div class="box4">应付金额<span>¥10000.00</span></div>
      <div class="box5"><span class="gray">期待年化利率&nbsp;</span><span class="smnumber font-12">10.00%&nbsp;</span><span class="gray">&nbsp;期待回报&nbsp;</span><span class="smnumber font-12">100.00元</span></div>
      <div class="box6">
        <div class="mid">
          <van-checkbox v-model="checked" @change="agree" label-disabled>同意&nbsp;<span class="contract">服务协议及风险提示</span></van-checkbox>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="buy">买入</button>
    </div>
    <van-number-keyboard
      :show="show"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
      @hide="onHide"
      :hide-on-click-outside="false"
      title="已进入安全模式"
    />
    <!-- 开通中金 -->
    <transition name="van-slide-bottom">
      <div class="layer" v-show="layershow">
        <div class="laycontent">
          <div class="title">开启中金存管</div>
          <div class="msg gray">交易资金由中金支付全程存管</div>
          <div class="btns">
            <button class="flt" @click="layershow = false">再想想</button>
            <button class="frt">去开启</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 支付 -->
    <transition name="van-slide-bottom">
      <div class="layer" v-show="pwdshow">
        <div class="laycontent">
          <div class="close" @click="pwdshow = false">x</div>
          <div class="title2">请输入支付密码</div>
          <div class="title3">支付金额</div>
          <div class="title4">{{money}}元</div>
          <van-password-input
            :value="password"
            @focus="showKeyboard = true"
          />
        </div>
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onPwInput"
          @delete="onPwDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "purchase",
  components: {},
  props: [],
  data() {
    return {
      show: false,
      pwdshow: false,
      checked: false,
      money: "",
      layershow: false,
      password: "",
      showKeyboard: false
    };
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.sid = this.storage.get("sid");
    },
    /* 金额 */
    onInput(value) {
      this.money += value;
      this.money = this.$util.limitTowDecimals(this.money);
    },
    onDelete() {
      this.money = this.money.slice(0, this.money.length - 1);
    },
    //当收起收入框
    onHide() {
      if (this.money.length - 1 == this.money.lastIndexOf(".")) {
        this.money = this.money.substr(0, this.money.length - 1);
      }
    },
    /* 密码 */
    onPwInput(value) {
      this.password = (this.password + value).slice(0, 6);
      if (this.password.length == 6) {
        this.$toast("输入完成");
      }
    },
    onPwDelete() {
      this.password = this.password.slice(0, this.password.length - 1);
    },
    agree() {},
    //点击买入 判断是否已经开启中金支付,是pwdshow--true 否layershow--true
    buy(){
      if (this.money.length - 1 == this.money.lastIndexOf(".")) {
        this.money = this.money.substr(0, this.money.length - 1);
      }
      this.pwdshow = true;
    }
  }
};
</script>

<style scoped lang="scss">
.purchase {
  margin-bottom: 55px;
  color: #666;

  .box1 {
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    padding: 0 23px;
  }
  .box2 {
    margin: 0 23px;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #e5e5e53b;
    border-bottom: 1px solid #e5e5e53b;
    font-size: 30px;
    span {
      float: left;
    }
    input {
      float: left;
      font-size: 17px;
      text-indent: 10px;
    }
  }
  .box3,
  .box5 {
    padding: 0 23px;
    height: 35px;
    line-height: 35px;
    box-shadow: 0 1px 3px rgba($color: #000000, $alpha: 0.1);
  }
  .box4 {
    padding: 0 23px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e53b;
    span {
      font-size: 17px;
      float: right;
    }
  }
  .box6 {
    padding: 0 23px;
    height: 35px;
    line-height: 35px;
    .mid {
      .contract {
        color: #3f51b5;
      }
    }
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
  .layer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: 0.3);
    .laycontent {
      position: fixed;
      background-color: #fff;
      top: 40%;
      left: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate(-50%, -50%);
      -webkit-transition: 0.2s ease-out;
      transition: 0.2s ease-out;
      width: 289px;
      height: 216px;
      background-color: #fff;
      border-radius: 5px;
      z-index: 100;
      .title {
        height: 40px;
        font-size: 23px;
        color: #101010;
        line-height: 40px;
        text-align: center;
        margin-top: 57px;
      }
      .msg {
        height: 23px;
        line-height: 23px;
        text-align: center;
      }
      .btns {
        padding: 30px 50px;
        button {
          width: 45%;
          height: 30px;
          color: #3f51b5;
          background-color: #fff;
          border: 1px solid #3f51b5;
          border-radius: 15px;
          font-size: 14px;
          line-height: 14px;
        }
        .frt {
          color: #fff;
          background-color: #3f51b5;
        }
      }
      .close {
        font-size: 20px;
        font-weight: 700;
        margin-left: 5px;
      }
      .title2 {
        height: 40px;
        font-size: 23px;
        color: #101010;
        line-height: 40px;
        text-align: center;
      }
      .title3 {
        height: 30px;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
      }
      .title4 {
        height: 40px;
        line-height: 40px;
        font-size: 23px;
        text-align: center;
        color: #101010;
      }
    }
  }
}
</style>
