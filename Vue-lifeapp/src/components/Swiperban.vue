<template>
  <!-- swiper封装 -->
  <div class="swiper-container" :id="id">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>


<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  props: {
    id: String,
    swiperobj: {
      type: Object
    }
  },
  // mounted() {
  //   let mySwiper = new Swiper("#" + this.id, this.swiperobj);
  // },
  updated() {
    let mySwiper = new Swiper("#" + this.id, this.swiperobj);
  }
};
</script>