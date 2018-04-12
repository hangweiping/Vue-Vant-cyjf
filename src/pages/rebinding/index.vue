<template>
  <div class="proving">
    <div class="content">
      <!-- <div class="ipt1">
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt2">
        <input type="text" v-model="identifyingCode" placeholder="请输入验证码" maxlength="10">
        <div class="code frt" @click="getcode">获取验证码</div>
      </div> -->
      <van-cell-group>
        <van-field
          center
          v-model="phoneNum"
          type="number"
          label="手机号码"
          placeholder="请输入手机号码"
          icon="clear"
          @click-icon="phoneNum = ''"
        />
        <van-field
          center
          v-model="code"
          type="number"
          label="验证码"
          placeholder="请输入验证码"
          icon="clear"
          @click-icon="code = ''"
        >
          <van-button slot="button" size="small" @click="getcode" :disabled="disabled">发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="errmsg">{{errmsg}}</div>
    <div class="btn">
      <button @click="nextbtn">重新绑定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  props: [],
  data() {
    return {
      phoneNum: "",
      code: "",
      disabled: false,
      errmsg: "验证码不正确"
    };
  },
  created() {},
  mounted() {},
  methods: {
    getcode() {
      this.disabled = true;
    },
    nextbtn() {}
  }
};
</script>

<style scoped lang="scss">
.proving {
  padding: 10px 23px 23px 23px;
  .content {
  }
  .errmsg {
    height: 21px;
    font-size: 12px;
    line-height: 21px;
    color: #f44;
  }
  .btn {
    width: 100%;
    height: 40px;
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
<style lang="scss">
.van-field .van-cell__title {
  min-width: 73px;
}
.van-field .van-cell__title {
  min-width: 73px;
}
.van-cell {
  padding: 10px 0 5px 0;
  border-bottom: 1px solid #e0e0e0;
}
[class*="van-hairline"]::after {
  border: none;
}
.van-field__icon {
  right: 3%;
  top: 50%;
}
.van-button--primary {
  background-color: #ff9800;
  border: none;
}
</style>