<template>
  <Swiperban id="homeban" :swiperobj="swobj">
    <Swiperbansec v-for="(imgval,y) in homebanimg" :key="y">
      <img :src="imgval.img" class="homebanimg" />
    </Swiperbansec>
  </Swiperban>
</template>

<script>
export default {
  data() {
    return {
      homebanimg: [],
      swobj: {
        loop: true, //最后一页到前一页，循环
        autoplay: true, //自动播放
        pagination: {
          //分页
          el: ".swiper-pagination",
          clickable: true //点击页进入指定页
        },
        //observer: false // 修改swiper自己或子元素时，自动初始化swiper
      }
    };
  },
  created() {//获取home页面banner
    this.$axios
      .get(
        "/bdapi/IHome/GetHomePageTagInfo?_t=1589089958&webId=1&categorySysNo=1&offset=0&limit=20&source=2&localcity=186"
      )
      .then(res => {
       // console.log(res.data.data[0].list);
        this.$nextTick(() => { //下次DOM更新循环结束之后
          this.homebanimg = res.data.data[0].list;
        });
      });
  }
};
</script>



<style lang="scss" scoped>
.homebanimg {
  width: 100%;
  height: 127px;
}
</style>