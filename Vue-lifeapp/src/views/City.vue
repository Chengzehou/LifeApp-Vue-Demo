<template>
  <div>
    <vHead title="定位" :leftbtn="true" :clkfun="clkfun" :login="true" :search="true" />
    <van-index-bar class="citycell" :index-list="indexlist">
      <div v-for="(val,i) in citylist" :key="i">
        <van-index-anchor :index="val.areaName" />
        <van-cell v-for="(value,index) in val.city" :title="value.cityName" :key="index" @click="selcity(value.cityName)" />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citylist: [],
      indexlist: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        // "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        // "U",
        // "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  methods: {
    clkfun() {//后退
      this.$router.go(-1);
    },
    selcity(val){//将城市名字存入内存，并跳转到首页
        localStorage.setItem('city',val)
        this.$router.push({name:'home'})
    },
  },
  mounted() {
    this.$axios({
      url:
        "/bdapi/IHome/SiteList?timestamp=1589079364751&_t=1589079364&webId=1&KeyWord=&Type=&szSpecialUrl=&szShareProcUrl=&url=",
      method: "get"
    }).then(res => {
      //console.log(res);
      this.citylist = res.data.data.list;
    });
  }
};
</script>

<style lang="scss" scoped>
.citycell {
  text-align: left;
}
</style>