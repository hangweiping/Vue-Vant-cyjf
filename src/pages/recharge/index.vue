<template>
  <div class="recharge">
    <div class="content">
      <div class="box1"><span class="font-15">储蓄卡&nbsp;&nbsp;</span><span class="font-15" @click="checkBank">{{bankCard}}</span></div>
      <div class="box2"><p>充值金额</p><span>￥</span><input readonly type="text" placeholder="" @click="show = true" v-model="money"></div>
    </div>
    <div class="btn" @click="next">
      <button>确认充值</button>
    </div>
    <van-popup v-model="bankCardShow" position="bottom" overlay-class="vanlayer">
      <van-picker
        show-toolbar
        :loading="loading"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
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
    <!-- 支付 -->
    <transition name="van-slide-bottom">
      <div class="layer" v-show="pwdshow">
        <div class="laycontent">
          <div class="close" @click="pwdshow = false">x</div>
          <div class="title2">请输入支付密码</div>
          <div class="title3">充值金额</div>
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
  name: "recharge",
  components: {},
  props: [],
  data() {
    return {
      sid: "",
      money: "",
      show: false, //金额
      pwdshow: false, //密码键盘
      password: "",
      showKeyboard: false, //数字键盘
      bankCard: "招商银行6239480********0010",
      bankCardShow: false, //银行卡
      columns: ["招商银行6239480********0010", "中信银行6239480********0087", "浦发银行6239480********0185", "平安银行6239480********2789"], //银行卡列表
      loading: false //加载完后变成false
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.sid = this.storage.get("sid");
    },
    //选择银行
    checkBank(){
      this.bankCardShow = true
    },
    //选择完成银行卡
    onConfirm(value, index) {
      this.bankCardShow = false;
      this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.bankCard = value
    },
    //取消选择银行卡
    onCancel() {
      this.bankCardShow = false;
      this.$toast("取消");
    },
    //确认充值
    next() {
      if (this.money == "") {
        this.$toast("请先输入充值金额");
      } else if (this.money.length - 1 == this.money.lastIndexOf(".")) {
        this.money = this.money.substr(0, this.money.length - 1);
        this.pwdshow = true;
      } else {
        this.pwdshow = true;
      }
    },
    //金额
    onInput(value) {
      this.money += value;
      this.money = this.$util.limitTowDecimals(this.money);
    },
    //删除金额按钮
    onDelete() {
      this.money = this.money.slice(0, this.money.length - 1);
    },
    //当收起收入框
    onHide() {
      if (this.money.length - 1 == this.money.lastIndexOf(".")) {
        this.money = this.money.substr(0, this.money.length - 1);
      }
    },

    //输入密码
    onPwInput(value) {
      this.password = (this.password + value).slice(0, 6);
      if (this.password.length == 6) {
        this.$toast("输入完成");
        this.password = "";
        // let data = {
        //   sid: this.sid,
        //   amount: this.money
        // };
        this.axios
          .post(`pay/recharge?sid=${this.sid}&amount=${this.money}`)
          .then(res => {
            if (res.success) {
              console.log(res);
            }
          });
      }
    },
    //删除密码按钮
    onPwDelete() {
      this.password = this.password.slice(0, this.password.length - 1);
    },
    
  }
};
</script>

<style scoped lang="scss">
.recharge {
  margin-bottom: 55px;
  .vanlayer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .content {
    .box1 {
      padding: 0 23px;
      margin-bottom: 2px;
      height: 50px;
      font-size: 15px;
      line-height: 50px;
      box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.1);
      :first-child {
        color: #666666;
      }
      :last-child {
        color: #0878c9;
      }
    }
    .box2 {
      margin: 10px 23px;
      height: 65px;
      line-height: 50px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 30px;
      p {
        font-size: 15px;
        height: 15px;
        line-height: 15px;
        color: #666666;
        margin-top: 10px;
      }
      span {
        float: left;
      }
      input {
        float: left;
        font-size: 17px;
        text-indent: 10px;
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
<style lang="scss">
/* 遮罩层的颜色过深的话,把这个解开 */
/* .vanlayer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
  } */
</style>
