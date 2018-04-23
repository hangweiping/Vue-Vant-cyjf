<template>
  <div class="judgeRealName">
    <!-- 实名认证 -->
    <transition name="van-slide-bottom">
      <div class="layer" v-show="realnameshow">
        <div class="laycontent">
          <div class="title">还未实名认证</div>
          <div class="msg gray">为了保证您的账户安全,请先进行实名认证</div>
          <div class="btns">
            <button class="flt" @click="childClose">再想想</button>
            <router-link to="/realname"><button class="frt">去认证</button></router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "judgeRealName",
  components: {},
  props: ["realshow"],
  data() {
    return {
      realnameshow: this.realshow //将父组件传来的值进行重新赋值,避免子组件直接操作父组件传来的参数
    };
  },
  created() {},
  mounted() {},
  methods: {
    childClose() {
      this.realnameshow = false;
      if (this.realnameshow == false) {
        this.$emit("childClose", 1);
      }
    }
  },
  watch: {
    realshow: function name(params) {
      this.realnameshow = this.realshow;
    }
  }
};
</script>

<style scoped lang="scss">
.judgeRealName {
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