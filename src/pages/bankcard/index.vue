<template>
  <div class="bankcard">
    <div class="card" v-for="(item,index) in dataInfor" :key="index">
      <div class="logo"><img :src="item.bankLogo" alt=""></div>
      <div class="bankName">{{item.bankName}}</div>
      <div class="cardNum">**** **** **** 3169</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bankcard",
  components: {},
  props: [],
  data() {
    return {
      dataInfor: []
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.sid = this.storage.get("sid");
      this.axios.get(`uc/bank_card/list.json?sid=${this.sid}`).then(res => {
        if (res.success) {
          this.dataInfor = res.data;
        } else {
          this.$toast(res.message);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.bankcard {
  .card {
    height: 160px;
    margin: 0 16px -40px 16px;
    border-radius: 10px;
    color: #fff;
    background-color: #339999;
    box-shadow: 0px -2px 15px rgba($color: #000000, $alpha: 0.5);
  }
  .logo {
    float: left;
    height: 40px;
    width: 40px;
    margin: 10px;
    background: #fff;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .bankName{
    float: left;
    margin-top: 20px;
    font-size: 16px;
  }
  .cardNum {
    float: left;
    width: 100%;
    margin: 10px;
    margin-left: 60px;
    font-size: 16px;
  }
}
</style>