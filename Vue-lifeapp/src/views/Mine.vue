<template>
  <div :style="{textAlign:'center'}">
    <vHead title="我的" :leftbtn="false" :login="true" :search="true" />
    <div v-if="show">
      <Uploadimg />
      <van-cell :title="phone" />
    </div>

    <van-button type="danger" size="large" class="out" v-if="show" @click="outlogin">退出登录</van-button>
    <van-button type="danger" size="large" class="out" v-if="!show" @click="gologin">点击登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "17852215522",
      show: true
    };
  },
  methods: {
    gologin() {
      this.$router.push({ name: "login" });
    },
    outlogin() {
      localStorage.userphone = "";
      localStorage.isLogin = false;
      this.show = false;
    }
  },
  mounted() {
    if (localStorage.userphone && localStorage.userphone !== "") {
      this.phone = localStorage.userphone;
      this.show = true;
    } else {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.userhead {
  margin-top: 20px;
}
.out {
  margin-top: 20px;
}
</style>