<template>
  <div class="tiecard">
    <div class="content">
      正在前往,跳转中.......
    </div>
  </div>
</template>

<script>
export default {
  name: "tiecard",
  components: {},
  props: [],
  data() {
    return {
      htmldos: ""
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    // init() {
    //   this.sid = this.storage.get("sid");
    //   window.location.href = `http://192.168.31.159:8080/mobile/pay/bankcard/bind?sid=${
    //     this.sid
    //   }`;
      // this.axios.get(`pay/bankcard/bind?sid=${this.sid}`).then(res => {
      //   if (!!res) {
      //   } else {
      //     this.$toast("请求失败,请稍后再试");
      //   }
      // });
    // }
  
    init() {
      this.sid = this.storage.get("sid");
      //解绑银行卡
      // window.location.href = `http://192.168.31.159:8080/mobile/pay/bankcard/unbind?sid=${
      //   this.sid
      // }&bindingSystemNo=1804241528256204247273339`;
      //支付签约
      // window.location.href = `http://192.168.31.159:8080/mobile/pay/signed?sid=${this.sid}&agreementType=20`;
      //支付解约
      // this.axios.get(`pay/termination?sid=${this.sid}&agreementNo=`)
    }
  }
};
</script>

<style scoped lang="scss">
.tiecard {
  margin-bottom: 55px;
  .content {
    margin: 16px;
    text-align: center;
    font-size: 15px;
  }
}
</style>