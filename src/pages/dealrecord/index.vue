<template>
  <div class="dealrecord">
    <van-tabs swipeable :swipe-threshold="5" @click="tabs">
      <van-tab v-for="(item,index) in titleInfo" :title="item" :key="index">
        <div v-for="(item,index) in dataInfo" :key="index" class="box clearfix">
          <p>
            <span class="box1 flt">{{item.orderNo}}</span>
            <span class="box2 frt">{{item.amount}}</span>
          </p>
          <p>
            <span class="box3 flt">{{item.typeDes}}</span>
            <span class="box4 frt">{{item.creatDate | changeDate()}}</span>
          </p>
        </div>
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
      titleInfo: ["全部", "充值", "提现", "理财"],
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
            this.dataInfo = res.data.rows;
          } else {
            this.$toast(res.message);
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.dealrecord {
  margin-bottom: 55px;
  .box{
    padding: 16px;
    box-shadow: 0 1px 1px rgba($color: #000000, $alpha: .1);
    p {
     height: 20px;
     line-height: 20px;
     font-size: 14px;
     color: #101010;
     padding-top: 5px;
    }
    .box1{

    }
    .box2{
      font-size: 14px;
      color: #ff9800;
    }
    .box3{
      
    }
    .box4{
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

