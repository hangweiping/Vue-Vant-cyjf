<template>
  <div class="openaccount">
    <div class="content">
      正在跳转中.......
    </div>
  </div>
</template>

<script>
export default {
  name: "openaccount",
  components: {},
  props: [],
  data() {
    return {
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
        .get(`pay/open-account?sid=${this.sid}`)
        .then(res => {
          if (!!res) {
            window.location.href =
              `http://192.168.31.159:8080/mobile/pay/open-account?sid=${this.sid}`;
          }else{
            this.$toast('请求失败,请稍后再试')
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.openaccount {
  margin-bottom: 55px;
  .content {
    padding: 16px;
    text-align: center;
    font-size: 15px;
    
  }
}
</style>