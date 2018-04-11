<template>
  <div class="changeloginpwd1">
    <phone @getcode=getcode @nextbtn=nextbtn></phone>
  </div>
</template>

<script>
import phone from '../../../components/phoneProving.vue'
  export default {
    name: "changeloginpwd1",
    components: {
      phone
    },
    props: [],
    data() {
      return {

      };
    },
    created() {},
    mounted() {},
    methods: {
      getcode(str){
        alert(str)
      },
      nextbtn(str){
        alert(str);
        this.$router.push('/changepaypwd2')
      }
    }
  };
</script>

<style scoped lang="scss">
.changeloginpwd1 {

}
</style>