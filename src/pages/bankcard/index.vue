<template>
  <div class="bankcard">
    
    <div v-for="(item,index) in dataInfor" :key="index" @click="toBankMsg(item)">
      <van-cell-swipe :right-width="60" :on-close="onClose" >
        <div class="card">
          <div class="top">
            <div class="logo"><img :src="item.bankLogo" alt=""></div>
            <div class="bankName">{{item.bankName}}</div>
          </div>
          <div class="cardNum">**** **** **** {{item.bankAccountNumber}}</div>
        </div>
        <div slot="right" @click="unTieCard(item)">
          <p>解</p>
          <p>绑</p>
        </div>
      </van-cell-swipe>
    </div>
    <div class="btn">
      <button @click="addBankCard">绑定新卡</button>
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
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "outside":
          instance.close();
          break;
        case "right":
          instance.close();
          break;
      }
    },
    addBankCard() {
      //添加银行卡
      window.location.href = `http://192.168.31.159:8080/mobile/pay/bankcard/bind-webmobile?sid=${
        this.sid
      }`;
    },
    //解绑
    unTieCard(item) {
      window.location.href = `http://192.168.31.159:8080/mobile/pay/bankcard/unbind-webmobile?sid=${
        this.sid
      }&bindingSystemNo=${item.bindingSystemNo}`;
    },
    //银行卡详情
    toBankMsg(item) {}
  }
};
</script>

<style scoped lang="scss">
.bankcard {
  .card {
    height: 145px;
    margin: 10px 16px 0 16px;
    border-radius: 10px;
    color: #fff;
    background-color: #339999;
    box-shadow: 0px -2px 15px rgba($color: #000000, $alpha: 0.5);
    .top {
      height: 60px;
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
      .bankName {
        float: left;
        margin-top: 20px;
        font-size: 16px;
      }
    }
    .cardNum {
      margin: 10px;
      margin-left: 60px;
      font-size: 16px;
    }
  }
  .btn {
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    font-size: 14px;
    position: fixed;
    left: 0;
    bottom: 0px;
    button {
      width: 100%;
      height: 45px;
      border: 1px solid #ff9800;
      color: #ff9800;
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
<style lang="scss">
.van-cell-swipe__left,
.van-cell-swipe__right {
  width: 60px;
  height: 145px;
  top: 0;
  position: absolute;
  font-size: 20px;
  padding: 45px 0;
  background-color: #669999;
  color: #fff;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
}
</style>
