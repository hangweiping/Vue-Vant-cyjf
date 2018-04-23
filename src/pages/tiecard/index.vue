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
    init() {
      this.sid = this.storage.get("sid")
      this.axios
        .get(`pay/bankcard/bind?sid=${this.sid}`)
        .then(res => {
          if (!!res) {
            window.location.href =
              `http://192.168.31.159:8080/mobile/pay/bankcard/bind?sid=${this.sid}`;
          }else{
            this.$toast('请求失败,请稍后再试')
          }
        });
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