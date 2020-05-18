<template>
  <div>
    <vHead title="首页" :leftbtn="false" :lefttext="city" :clkfun="clkfun" />
    <div>
      <van-tabs v-model="active" sticky>
        <van-tab v-for="(val,i) in activename" :title="val.title" :key="i"></van-tab>
        <Homeban />
      </van-tabs>
    </div>
    <div class="homeicon">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="(hival,index) in homeicon" :key="index" @click="gomoreg">
          <van-image :src="hival.img" />
        </van-grid-item>
        <van-grid-item v-for="(hival1,index1) in homeicon2" :key="index1+20" @click="gomoreg">
          <van-image :src="hival1.img" />
        </van-grid-item>
      </van-grid>
    </div>
    <van-notice-bar :text="notice" left-icon="volume-o" color="green" />
    <div class="pubbox">
      <div class="pub" v-for="(pubval,pubi) in pub" :key="pubi">
        <img :src="pubval.list[0].img" class="pubimg" lazy-load v-lazy="pubval.list[0].img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "定位",
      active: 0,
      activename: [],
      homeicon: [],
      homeicon2: [],
      notice:
        "本地生活大放送，精彩不容错过，不容错过！！！本地生活大放送，精彩不容错过，不容错过！！！",
      pub: []
    };
  },
  methods: {
    clkfun() {
      this.$router.push({ name: "city" });
    },
    gomoreg(){
      this.$router.push({name:'moregoods'})
    }
  },
  mounted() {
    if (localStorage.city) {
      //请求定位信息
      this.city = localStorage.city;
    } else {
      this.$router.push({ name: "city" });
    }

    this.$axios
      .get(
        "/bdapi/IHome/GetHomeCategory?_t=1589081319&webId=1&key=mainSlider1&expires=3000"
      )
      .then(res => {
        //获取导航标签标题
        //console.log(res);
        this.activename = res.data.data.titles;
      });

    this.$axios
      .get(
        "/bdapi/IHome/GetHomePageTagInfo?_t=1589093389&webId=1&categorySysNo=1&offset=0&limit=20&source=2&localcity=186"
      )
      .then(res => {
       // console.log(res);
        this.homeicon = res.data.data[3].list;
        this.homeicon2 = res.data.data[4].list;
        this.pub = res.data.data.filter(function(v, i, a) {
          return i >= 9 && i < 16;
        });
        // console.log(
        //   res.data.data.filter(function(v, i, a) {
        //     return i >= 9 && i < 16;
        //   })
        // );
      });
  }
};
</script>

<style lang="scss" scoped>
.pubimg {
  width: 100%;
}
.pubbox{
  padding-bottom: 80px;
}
</style>

