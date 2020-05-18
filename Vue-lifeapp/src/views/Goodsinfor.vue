<template>
  <div>
    <vHead title="商品详情" :clkfun="clkfun" />
    <van-swipe @change="onChange">
      <van-swipe-item v-for="(val,i) in imglist" :key="i">
        <img :src="val" class="goodsimg" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{length}}</div>
      </template>
    </van-swipe>

    <van-panel
      :title="goodslist.productName"
      :desc="goodslist.promotionWord"
      :status="'￥'+ price"
    ></van-panel>

    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
    </van-goods-action>
  </div>
</template>


<script>
import {Toast} from 'vant'
export default {
  data() {
    return {
      current: 0,
      goodslist: {},
      imglist: [],
      length: 4,
      price:"0",
    };
  },
  methods: {
    clkfun() {
      this.$router.go(-1);
    },
    onChange(index) {
      this.current = index;
    },
    onClickIcon() {
      this.$router.push({ name: "shopcar" });
    },
    onClickButton() {
      //加入购物车
      let goodsid = [];
      let goodsnum = [];
      let gi = this.$route.query.sysNoo.toString(); 
      
      if (localStorage.goodsid && localStorage.goodsnum) {
        //当本地存储有值时，赋值两个数组
        goodsid = localStorage.goodsid.split(",");
        goodsnum = localStorage.goodsnum.split(",");
      } else {
        //没有值时为空
        goodsid = [];
        goodsnum = [];
      }
      if (goodsid.indexOf(gi) == -1) {//如果本地中没有这个商品的id，那么直接添加
        goodsid.push(gi);
        goodsnum.push(1);
        localStorage.setItem('goodsid',goodsid)
        localStorage.setItem('goodsnum',goodsnum)
      } else {//如果存在，只添加对应商品id的数量
        let adgoodsnum = parseInt(goodsnum[goodsid.indexOf(gi)]) + 1;
        goodsnum[goodsid.indexOf(gi)] = adgoodsnum;
        localStorage.setItem("goodsnum", goodsnum);
      }
      Toast.success('成功加入购物车');
    }
  },
  mounted() {
    let sysNoo = this.$route.query.sysNoo; //取到地址栏？拼接的参数
    this.$axios.post("/nduser/goodsinfor").then(res => {
      this.goodslist = res.data.filter(function(v, i, a) {
        return v.sysNoo == sysNoo;
      })[0]; //获取数据中该商品的数据
      console.log(this.goodslist);
      console.log(this.goodslist.price.price);
      this.price = this.goodslist.price.price
      this.imglist = this.goodslist.imgUrl; //商品图片数据
      this.length = this.imglist.length; //图片数量
    });
  }
};
</script>

<style lang="scss" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.goodsimg {
  width: 100%;
}
</style>