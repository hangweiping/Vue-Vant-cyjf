<template>
  <div class="proving">
    <div class="content">
      <van-cell-group>
        <van-field
          center
          v-model="mobile"
          type="number"
          label="手机号码"
          placeholder="请输入手机号码"
          icon="clear"
          @click-icon="mobile = ''"
        />
        <van-field
          center
          v-model="smsCode"
          type="number"
          label="验证码"
          placeholder="请输入验证码"
          icon="clear"
          @click-icon="smsCode = ''"
        >
          <van-button slot="button" size="small" v-show="isshow1" @click="getcode">{{btntxt}}</van-button>
          <van-button slot="button" size="small" v-show="isshow2" disabled>{{btntxt}}</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="btn">
      <button @click="nextbtn">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  props: ["time"],
  data() {
    return {
      mobile: "",
      smsCode: "",
      isshow1: true,
      isshow2: false,
      btntxt: "获取验证码",
      mytime: this.time
    };
  },
  created() {},
  mounted() {
    console.log(this.time);
    console.log(this.mytime);
  },
  methods: {
    timer() {
      if (this.mytime > 0) {
        this.isshow1 = false;
        this.isshow2 = true;
        this.mytime--;
        this.btntxt = this.mytime + "s";
        setTimeout(this.mytime, 1000);
      } else {
        this.mytime = 0;
        this.btntxt = "获取验证码";
        this.isshow1 = true;
        this.isshow2 = false;
      }
    },
    getcode() {
      this.$emit("getcode", this.mobile, this.smsCode);
    },
    nextbtn() {
      this.$emit("nextbtn", "我是子组件下一步");
    }
  }
};
</script>

<style scoped lang="scss">
.proving {
  padding: 10px 23px 23px 23px;
  .van-cell {
    padding: 10px 0 5px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  [class*="van-hairline"]::after {
    border: none;
  }
  .btn {
    width: 100%;
    height: 40px;
    margin-top: 15px;
    button {
      width: 100%;
      color: #fff;
      background-color: #ff9800;
      font-size: 15px;
      line-height: 40px;
      border-style: none;
      border-radius: 5px;
    }
  }
}
</style>