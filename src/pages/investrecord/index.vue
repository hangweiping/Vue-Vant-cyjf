<template>
  <div class="investrecord">
    <van-tabs swipeable :swipe-threshold="5" @click="tabs">
      <van-tab v-for="(item,index) in titleInfo" :title="item" :key="index">
        <div v-for="(item,index) in dataInfo" :key="index" class="box clearfix">
          <p>
            <span class="box1 flt">{{item.projectName}}</span>
            <span class="box2 frt">{{item.amount}}</span>
          </p>
          <p>
            <span class="box3 flt">{{item.rate}}</span>
            <span class="box4 frt">{{item.endDate | changeDate()}}</span>
          </p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "investrecord",
  components: {},
  props: [],
  data() {
    return {
      titleInfo: ["持有中", "进行中", "已结束"],
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
          this.method = "HOLD";
          break;
        case 1:
          this.method = "DOING";
          break;
        case 2:
          this.method = "COMPELETED";
          break;
        default:
          this.method = "HOLD";
          break;
      }
      this.axios
        .get(`uc/account/investmentRecord?page=1&rows=15&state=${this.method}`)
        .then(res => {
          if (res.success) {
            this.dataInfo = res.data.rows;
            this.$toast(res.message);
          } else {
            this.$toast("加载失败,请稍后再试");
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.investrecord {
  margin-bottom: 55px;
  .box {
    padding: 16px;
    box-shadow: 0 1px 1px rgba($color: #000000, $alpha: 0.1);
    p {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #101010;
      padding-top: 5px;
    }
    .box1 {
    }
    .box2 {
      font-size: 14px;
      color: #ff9800;
    }
    .box3 {
    }
    .box4 {
      font-size: 14px;
      color: #aaaaaa;
    }
  }
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

