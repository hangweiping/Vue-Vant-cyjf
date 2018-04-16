<template>
  <div class="user">
    <div class="msg">
      <div class="picture clearfix">
        <div class="flt head">
          <img src="" alt="">
        </div>
        <div class="flt realname">未实名</div>
        <div class="frt service">
          <van-icon name="phone" />
        </div>
      </div>
      <div class="income clearfix">
        <div class="box1">
          <p>总资产</p>
          <p>50000.00元</p>
        </div>
        <div class="box2">
          <p>昨日收益</p>
          <p>500.00元</p>
        </div>
        <div class="box3">
          <p>可用资金</p>
          <p>50000.00元</p>
        </div>
        <div class="box4">
          <p>累计收益</p>
          <p>50000.00元</p>
        </div>
      </div>
    </div>
    <div class="content">
      <router-link to="/withdraw" class="box1">提现</router-link>
      <router-link to="/recharge" class="box1">充值</router-link>
      <router-link to="/login" class="box2">投资记录</router-link>
      <router-link to="/changeloginpwd1" class="box2">优惠券</router-link>
      <router-link to="/rebinding" class="box2">收款明细</router-link>
      <router-link to="/user" class="box2">交易记录</router-link>
    </div>
    <van-tabbar v-model="active" replace>
      <van-tabbar-item icon="shop" url='#/home'>首页
      </van-tabbar-item>
      <van-tabbar-item icon="contact" url='#/user'>我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "user",
  components: {},
  props: [],
  data() {
    return {
      active: 1,
      dataInfor:[],
    };
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    initData(){
      this.axios.post('uc/accountDetail').then(res => {
        if (res) {
          console.log(res);
          
        }
      })
    },
  }
};
</script>

<style scoped lang="scss">
.user {
  margin-bottom: 55px;
  .msg {
    height: 220px;
    background-color: #3f51b5;
    .picture {
      padding: 20px;
      .head {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .realname {
        width: 60px;
        height: 20px;
        margin-top: 20px;
        margin-left: 5px;
        background-color: #ff9800;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        border-radius: 10px;
      }
      .service {
        height: 40px;
        width: 40px;
        text-align: right;
        font-size: 15px;
        line-height: 40px;
      }
    }
    .income {
      padding: 0 20px;
      div {
        width: 50%;
        float: left;
        color: #fff;
        padding-bottom: 20px;
        :first-child {
          font-size: 12px;
          color: #879AFF;
        }
        :last-child {
          font-size: 23px;
        }
      }
    }
  }
  .content {
    a {
      float: left;
      width: 50%;
      height: 50px;
      font-size: 15px;
      line-height: 50px;
      text-align: center;
      box-shadow: 0 0 1px rgba($color: #000000, $alpha: .1);
    }
    .box1 {
      color: #FF9800;
    }
  }
}
</style>