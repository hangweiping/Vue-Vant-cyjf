<template>
  <div class="user">
    <h1>user</h1>
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
        active:1,
      };
    },
    created() {},
    mounted() {},
    methods: {}
  };
</script>

<style scoped lang="scss">
.user {
  margin-bottom: 55px;
}
</style>