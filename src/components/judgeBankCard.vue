<template>
  <div class="judgeBankCard">
    <!-- 实名认证 -->
    <transition name="van-slide-bottom">
      <div class="layer" v-show="childshow">
        <div class="laycontent">
          <div class="title">还未绑定银行卡</div>
          <div class="msg gray">为了进行相应的交易操作,请先绑定银行卡</div>
          <div class="btns">
            <button class="flt" @click="bankCardClose">再想想</button>
            <button class="frt" @click="toTiecard">去绑定</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "judgeBankCard",
  components: {},
  props: ["bankshow"],
  data() {
    return {
      childshow: this.bankshow //将父组件传来的值进行重新赋值,避免子组件直接操作父组件传来的参数
    };
  },
  created() {
    this.sid = this.storage.get("sid");
  },
  mounted() {},
  methods: {
    bankCardClose() {
      this.childshow = false;
      if (this.childshow == false) {
        this.$emit("bankCardClose", 1);
      }
    },
    toTiecard(){
      window.location.href = `http://192.168.31.159:8080/mobile/pay/bankcard/bind-webmobile?sid=${
          this.sid
        }`;
    }
  },
  watch: {
    bankshow: function name(params) {
      this.childshow = this.bankshow;
    }
  }
};
</script>

<style scoped lang="scss">
.judgeBankCard {
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
    }
  }
}
</style>