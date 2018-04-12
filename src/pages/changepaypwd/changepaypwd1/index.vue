<template>
  <div class="changepaypwd1">
    <phone @getcode=getcode @nextbtn=nextbtn></phone>
  </div>
</template>

<script>
import phone from "../../../components/phoneProving.vue";
export default {
  name: "changepaypwd1",
  components: {
    phone
  },
  props: [],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    getcode(str) {
      alert(str);
    },
    nextbtn(str) {
      alert(str);
      this.$router.push("/changepaypwd2");
    }
  }
};
</script>

<style scoped lang="scss">
.van-cell {
  padding: 10px 0 5px 0;
  border-bottom: 1px solid #e0e0e0;
}
[class*="van-hairline"]::after {
  border: none;
}
.van-field__icon {
  right: 3%;
  top: 50%;
}
.van-button--primary {
  background-color: #ff9800;
  border: none;
}
</style>