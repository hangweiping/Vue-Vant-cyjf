<template>
  <div class="dealrecord">
    <van-tabs swipeable :swipe-threshold="5" @click="tabs">
      <van-tab v-for="(item,index) in titleInfo" :title="item" :key="index">
        {{ item }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "dealrecord",
  components: {},
  props: [],
  data() {
    return {
      titleInfo: ["全部", "充值", "提现", "理财", "奖励"],
      method: "",
      dataInfo: []
    };
  },
  created() {
    this.tabs();
  },
  mounted() {},
  methods: {
    tabs(index) {
      switch (index) {
        case 0:
          this.method = "";
          break;
        case 1:
          this.method = "RECHARGE";
          break;
        case 2:
          this.method = "WITHDRAW ";
          break;
        case 3:
          this.method = "INVESTMENT";
          break;
        case 4:
          this.method = "REFFERAL";
          break;
        default:
          this.method = "";
          break;
      }
      this.axios
        .get(`uc/account/fundRecord?method=${this.method}&page=1&rows=15`)
        .then(res => {
          if (res.success) {
            this.$toast("加载成功");
            this.dataInfo = res.data.rows;
          } else {
            this.$toast("加载失败,请稍后再试");
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.dealrecord {
  margin-bottom: 55px;
}
</style>
<style lang="scss">
.van-tab--active {
  color: #ff9800;
}
.van-tabs__nav-bar {
  background-color: #ff9800;
}
</style>

