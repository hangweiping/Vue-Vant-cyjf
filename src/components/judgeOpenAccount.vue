<template>
  <div class="judgeOpenAccount">
    <!-- 开通中金 -->
    <transition name="van-slide-bottom">
      <div class="layer" v-show="childshow">
        <div class="laycontent">
          <div class="title">开启中金存管</div>
          <div class="msg gray">交易资金由中金支付全程存管</div>
          <div class="btns">
            <button class="flt" @click="openAccountClose">再想想</button>
            <button class="frt" @click="toOpenAccount">去开启</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "judgeOpenAccount",
  components: {},
  props: ["openshow"],
  data() {
    return {
      childshow: this.openshow
    };
  },
  created() {
    this.sid = this.storage.get("sid");
  },
  mounted() {},
  methods: {
    openAccountClose() {
      this.childshow = false;
      if (this.childshow == false) {
        this.$emit("openAccountClose", 1);
      }
    },
    toOpenAccount() {
      window.location.href = `http://isantian.com/mobile/pay/open-account-webmobile?sid=${
          this.sid
        }`;
    }
  },
  watch: {
    openshow: function name(params) {
      this.childshow = this.openshow;
    }
  }
};
</script>

<style scoped lang="scss">
.judgeOpenAccount {
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