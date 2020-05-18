<template>
  <div>
    <!-- 参数 title-页面头部标题  leftbtn-左侧返回按钮  lefttext-左侧按钮文字  clkfun-点击左按钮执行函数 -->
    <van-nav-bar :title="title" :left-text="lefttext" :left-arrow="leftbtn" @click-left="clkfun">
      <template #right>
        <van-icon v-if="!search" name="search" size="18" class="search" @click="goSearch" />
        <van-icon v-if="!login" name="friends-o" size="18" @click="goLogin" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      //必传，不传会报错
      type: String,
      required: true
    },
    leftbtn: {
      //左侧按钮，不传参数的话，默认显示
      type: Boolean,
      default: true
    },
    lefttext: {
      //左侧文本，不传参数的话，默认为空
      type: String,
      default: ""
    },
    login: Boolean,
    search: Boolean,
    clkfun: {
      //点击左侧按钮函数
      type: Function,
      default:function(){}
    }
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "search" });
    },
    goLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin-right: 20px;
}
</style>