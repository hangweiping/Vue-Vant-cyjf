<template>
  <div class="home">
    <div class="swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <div v-lazy:background-image="image"></div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="container">
      <div class="tiket-top">
        <div class="title">
          <span class="lt">CD18032701汽车订单采购借款</span>
          <span class="rt">车商借款</span>
        </div>
        <div class="msg">
          <div class="clearfix">
            <div class="lt">
              <span class="bgnumber">9.0</span>
              <span class="smnumber">% +</span>
              <span class="bgnumber">1.0</span>
              <span class="smnumber">%</span>
              <p class="gray">预期年化</p>
            </div>
            <div class="rt">
                <van-progress :percentage="88" color="#6980F5"/>
                <p><span>30天</span><span>|</span><span>总额30.00万元</span></p>
            </div>
          </div>
          <div class="btn">
            <button @click="investBtn">一键投资</button>
          </div>
        </div>
      </div>
      <div class="tiket-top">
        <div class="title">
          <span class="lt">CD18032701汽车订单采购借款</span>
          <span class="rt">车商借款</span>
        </div>
        <div class="msg">
          <div class="clearfix">
            <div class="lt">
              <span class="bgnumber">9.0</span>
              <span class="smnumber">% +</span>
              <span class="bgnumber">1.0</span>
              <span class="smnumber">%</span>
              <p class="gray">预期年化</p>
            </div>
            <div class="rt">
                <van-progress :percentage="88" color="#6980F5"/>
                <p><span>30天</span><span>|</span><span>总额30.00万元</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="tiket-foot">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  props: [],
  data() {
    return {
      images: [
        "http://dl.bizhi.sogou.com/images/2012/02/11/25025.jpg",
        "http://student.mtstudent.se/~sh14hp3151/wordpress/wp-content/uploads/2015/01/pluvia-2880x1800.jpg",
        "http://pic1.win4000.com/wallpaper/f/53bb9aa9c4eef.jpg"
      ]
    };
  },
  created() {
     this.initData()
  },
  mounted() {},
  methods: {
    investBtn() {
      this.$router.push("/investmsg");
    },
    initData(){
      this.axios.get('investment/list').then(res => {
        if(res.status){
          
        } else {

        }
      }).catch(res => {

      })
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  margin-bottom: 55px;
  .swiper {
    .van-swipe {
      height: 194px;
      div {
        height: 194px;
        background-size: cover;
      }
    }
  }
  .container {
    background-color: #fff;
    .tiket-top {
      width: 100%;
      margin-top: 5px;
      box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.1);
      .title {
        height: 23px;
        padding: 11px 16px;
        border-bottom: 1px solid #e0e0e0;
        .lt {
          float: left;
          height: 23px;
          font-size: 14px;
          line-height: 23px;
          color: #333;
          font-family: "Microsoft Yahei";
        }
        .rt {
          width: 80px;
          height: 23px;
          float: right;
          border: 1px solid #ff9800;
          border-radius: 4px;
          color: #ff9800;
          font-size: 14px;
          line-height: 23px;
          text-align: center;
        }
      }
      .msg {
        padding: 20px 16px;
        div {
          width: 100%;
          .lt {
            float: left;
            width: 45%;
            height: 60px;
          }
          .rt {
            float: right;
            width: 55%;
            height: 60px;
            padding: 0 14px;
            box-sizing: border-box;
            .van-progress {
              height: 5px;
              margin-top: 34px;
              margin-bottom: 8px;
            }
            p {
              margin: 0;
              font-size: 12px;
              color: #aaaaaa;
              span {
                margin-right: 5px;
              }
            }
          }
        }
        .btn {
          width: 341px;
          height: 46px;
          margin-top: 15px;
          button {
            width: 100%;
            color: #fff;
            background-color: #ff9800;
            font-size: 18px;
            line-height: 46px;
            border-style: none;
          }
        }
      }
    }
    .tiket-foot {
      width: 100%;
      height: 129px;
      margin-top: 5px;
      box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.1);
    }
  }
}
</style>