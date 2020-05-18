<template>
  <div>
    <vHead title="分类" :leftbtn="false" />
    <div class="left">
      <van-sidebar v-model="activeKey" class="left-con">
        <van-sidebar-item v-for="(val,i) in taps" :title="val.name" :key="i" />
      </van-sidebar>
    </div>

    <div class="right">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="(val,i) in rightcon" :key="i" :text="val.name" :icon="val.imgUrl" @click="gomoreg"></van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      taps: [],
      rightcon: [],
      c1: "",
      t: ""
    };
  },
  methods:{
    gomoreg(){
      this.$router.push({name:'moregoods'})
    }
  },
  watch: {
    activeKey(activeKey) {
      if (activeKey === 0) {
        this.c1 = "43";
        this.t = "1589161597";
      } else if (activeKey === 1) {
        console.log(this.activeKey);
        this.c1 = "2419";
        this.t = "1589166576";
      }
      this.$axios
        .get(
          `/bdapi/ICategory/Category?_t=${this.t}&c1=${this.c1}&webId=1&source=2`
        )
        .then(res => {
          this.taps = res.data.data.menu;
          this.rightcon = res.data.data.category[0].children;
        });
    }
  },
  mounted() {
    this.$axios
      .get(
        `/bdapi/ICategory/Category?_t=1589161597&c1=43&webId=1&source=2`
      )
      .then(res => {
        this.taps = res.data.data.menu;
        this.rightcon = res.data.data.category[0].children;
      });

  }
};
</script>

<style lang="scss" scoped>
.left-con{
  width:100%
}
.left {
  width: 25%;
  float: left;
}
.right {
  width: 75%;
  float: left;
}
</style>

