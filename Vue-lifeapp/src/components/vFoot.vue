<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item>
        <span>首页</span>
        <template #icon>
          <i class="icon-shouye iconfont"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item>
        <span>分类</span>
        <template #icon>
          <i class="icon-fenlei iconfont"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item>
        <span>购物车</span>
        <template #icon>
          <i class="icon-gouwuchekong iconfont"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item badge="3">
        <span>我的</span>
        <template #icon>
          <i class="icon-icon-test iconfont"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  watch: {
    //监听active变化，跳转到指定路由
    active(val) {
      if (val === 0) {
        this.$router.push({ name: "home" });
      } else if (val === 1) {
        this.$router.push({ name: "classify" });
      } else if (val === 2) {
        this.$router.push({ name: "shopcar" });
      } else if(val === 3) {
        this.$router.push({ name: "mine" });
      }
    },
    "$route": function(to, from) {
      if (this.$route.name === "home") {
        this.active = 0;
      } else if (this.$route.name === "classify") {
        this.active = 1;
      } else if (this.$route.name === "shopcar") {
        this.active = 2;
      } else if(this.$route.name === "mine") {
        this.active = 3;
      }
    }
  },
  mounted() {
    //根据路由位置判断相应的图标是否高亮
    //   console.log(this.$route);
    if (this.$route.name === "home") {
      this.active = 0;
    } else if (this.$route.name === "classify") {
      this.active = 1;
    } else if (this.$route.name === "shopcar") {
      this.active = 2;
    } else if(this.$route.name === "mine"){
      this.active = 3;
    }
  }
};
</script>