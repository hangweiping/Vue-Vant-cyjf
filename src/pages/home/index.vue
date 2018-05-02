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
      <!-- <div class="tiket-top">
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
      </div> -->
      <router-link v-for="(item,index) in dataInfor" :key="index" :to="{path:'/investmsg',query:{id:item.borrowingId}}">
        <div class="tiket-top" :data-id="item.borrowingId">
          <div class="title">
            <span class="lt">{{item.title}}</span>
            <span class="rt">{{item.borrowingType | borrowingType()}}</span>
          </div>
          <div class="msg">
            <div class="clearfix">
              <div class="lt">
                <span class="bgnumber">{{item.interestRate.toFixed(1)}}</span>
                <span class="smnumber">%</span>
                <!-- <span class="smnumber">% +</span>
                <span class="bgnumber">1.0</span>
                <span class="smnumber">%</span> -->
                <p class="gray">预期年化</p>
              </div>
              <div class="rt">
                  <van-progress :percentage="item.percent" color="#6980F5"/>
                  <p><span>{{item.periodUnitStr}}</span><span>|</span><span>总额{{item.residualAmountStr}}</span></p>
              </div>
            </div>
            <div class="btn" v-if="index == 0">
              <button>一键投资</button>
            </div>
          </div>
        </div>
      </router-link>
      <!-- <div class="tiket-foot">

      </div> -->
    </div>
    <van-tabbar v-model="active" replace>
      <van-tabbar-item icon="wap-home" url='#/home'>首页
      </van-tabbar-item>
      <van-tabbar-item icon="contact" url='#/user'>我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import wx from "weixin-js-sdk"; // 微信分享
export default {
  name: "home",
  components: {},
  props: [],
  data() {
    return {
      active: 0,
      images: ["./static/images/banner.jpg"],
      dataInfor: []
    };
  },
  created() {},
  mounted() {
    this.initData();
    this.wxshare();
  },
  methods: {
    investBtn() {
      this.$router.push("/investmsg");
    },
    // initData() {
    //   this.axios
    //     .get("investment/list")
    //     .then(res => {
    //       if (res.success) {
    //         this.dataInfor = res.data.rows;
    //       } else {
    //       }
    //     })
    //     .catch(err => {});
    // },
    initData() {
      this.axios.get("index/data").then(res => {
        if (res.success) {
          let banners = res.data.banners;
          // for(var i=0;i<banners.length;i++){
          //   this.images[i] = banners[i].burl
          // }
          this.dataInfor = res.data.hotProjects;
        }
      });
    },
    //<----------- 微信分享 ----------->
    wxshare() {
      let url = location.href.split("#")[0]; //获取锚点之前的链接
      let data = { pageUrl: url };
      this.axios.post("/weixinsign/signFun", data).then(res => {
        console.log(res);
        this.wxinit(res);
      });
    },
    wxinit(res) {
      let url = location.href.split("#")[0]; //获取锚点之前的链接
      let links = url + "#/home";
      let title = "磁云P2P官方网站";
      let desc = "磁云P2P正式官网,进入惊喜不断";
      let imgUrl = "http://iciyun.nat300.top/static/images/weixin_log.png";
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wx6ff9661d61d525d9", // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone"
        ] // 必填，需要使用的JS接口列表
      });
      //分享到朋友圈
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          this.$toast("分享成功!");
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          this.$toast("分享已取消");
        }
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          this.$toast("分享成功!");
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          this.$toast("分享已取消");
        }
      });
      //分享到QQ
      wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          this.$toast("分享成功!");
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          this.$toast("分享已取消");
        }
      });
      //分享到腾讯微博
      wx.onMenuShareWeibo({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          this.$toast("分享成功!");
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          this.$toast("分享已取消");
        }
      });
      //分享到QQ空间
      wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          this.$toast("分享成功!");
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          this.$toast("分享已取消");
        }
      });
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
      // margin-bottom: 5px;
      // box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.1);
      border-bottom: 1px solid #e0e0e0;
      .title {
        height: 23px;
        padding: 11px 16px 0 16px;
        .lt {
          float: left;
          height: 23px;
          font-size: 14px;
          line-height: 23px;
          color: #333;
          font-family: "Microsoft Yahei";
        }
        .rt {
          height: 23px;
          float: right;
          border: 1px solid #ff9800;
          border-radius: 4px;
          color: #ff9800;
          font-size: 14px;
          line-height: 23px;
          text-align: center;
          padding: 0 8px;
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