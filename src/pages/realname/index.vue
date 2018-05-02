<template>
  <div class="realname">
    <van-cell-group>
      <van-field
        center
        v-model="realName"
        type="text"
        label="真实姓名"
        placeholder="请输入您的真实姓名"
        icon="clear"
        @click-icon="realName = ''"
      >
      </van-field>
      <van-field
        center
        v-model="idCard"
        type="text"
        label="身份证号"
        placeholder="请输入您的身份证号"
        icon="clear"
        @click-icon="idCard = ''"
      >
      </van-field>
    </van-cell-group>
    <div class="btn">
      <button @click="nextbtn">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "realname",
  components: {},
  props: [],
  data() {
    return {
      realName: "",
      idCard: ""
    };
  },
  created() {
    this.sid = this.storage.get("sid");
  },
  mounted() {},
  methods: {
    nextbtn() {
      let data = {
        realName: this.realName,
        idNo: this.idCard,
        type: "GENERAL"
      };
      let isIdCard = this.$util.checkId(this.idCard);
      if (this.realName == "") {
        this.$toast("请输入您的真实姓名");
      } else if (this.idCard == "") {
        this.$toast("请输入您的身份证号");
      } else if (!isIdCard) {
        this.$toast("请输入正确的身份证号");
      } else {
        this.axios
          .post(`uc/security/checkIdNo?idNo=${this.idCard}`)
          .then(res => {
            if (res.success) {
              //身份证认证成功
              this.thenRealName(data).then(res => {
                if (res.success) {
                  //实名认证成功
                  this.$toast.loading("实名认证成功!");
                  setTimeout(() => {
                    this.$router.push("/home");
                  }, 500);
                } else {
                  //实名认证失败
                  this.$toast(res.message);
                }
              });
            } else {
              this.$toast(res.message);
            }
          })
          .catch(err => {});
      }
    },
    thenRealName(data) {
      return new Promise(resolve => {
        this.axios.post("uc/security/identity", data).then(res => {
          resolve(res);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.realname {
  padding: 10px 23px 23px 23px;
  .van-cell {
    padding: 10px 0 5px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  [class*="van-hairline"]::after {
    border: none;
  }
  .btn {
    width: 100%;
    height: 40px;
    margin-top: 15px;
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