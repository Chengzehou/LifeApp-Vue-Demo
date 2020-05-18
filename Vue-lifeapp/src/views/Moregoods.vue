<template>
  <div>
    <vHead title="商品" :clkfun="clkfun" />
    <div v-for="(val,i) in goodslist" :key="i">
      <van-card
        :price="val.price.price"
        :origin-price="val.price.origPrice"
        :desc="val.promotionWord"
        :title="val.productName"
        :thumb="val.imgUrl"
        :lazy-load="true"
        @click="gogoodsinfor(val.sysNoo)"
      >
        <template #tags>
          <van-tag plain type="danger">{{val. promotionsTags[0]}}</van-tag>
          <van-tag plain type="danger">{{val. promotionsTags[1]}}</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">加入购物车</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: []
    };
  },
  methods: {
    clkfun() {
      this.$router.go(-1);
    },
    gogoodsinfor(value) {
      this.$router.push({ name: "goodsinfor", query: { sysNoo:value } });
    }
  },
  mounted() {
    this.$axios({
      url: "/nduser/moregoods",
      method: "post"
    }).then(res => {
      this.goodslist = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>