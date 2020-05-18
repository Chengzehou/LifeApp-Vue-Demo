<template>
  <div>
    <vHead title="购物车" :leftbtn="false" />
    <van-empty description="购物车还是空的..." v-if="show">
      <van-button plain type="danger" class="bottom-button" @click="goshop">去逛逛</van-button>
    </van-empty>
    <div v-if="!show">
      <van-swipe-cell v-for="(v,i) in goodslist" :key="i">
        <div class="cargoods">
          <img :src="v.imgUrl" />
          <div>
            <span class="goodstitle">{{v.productName}}</span>
            <span class="goodsprice">总价:￥{{v.price.price * goodsnum[i] | float}}</span>
            <input type="number" v-model.number="goodsnum[i]" />
          </div>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="del(i)" />
        </template>
      </van-swipe-cell>
    </div>

    <van-submit-bar :price="parseFloat(money)" button-text="提交订单" @submit="onSubmit" class="heji">
      <!-- <van-checkbox v-model="checked">全选</van-checkbox> -->
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  filters: {
    float(val) {
      return val.toFixed(2);
    } //过滤器，保留两位小数
  },
  data() {
    return {
      onSubmit() {},
      checked: false,
      show: false,
      goodslist: [],
      goodsnum: [],
      money: 0
    };
  },
  methods: {
    goshop() {
      //去逛逛连接到首页
      this.$router.push({ name: "home" });
    },
    del(val) {//删除
      let goodsnum = this.goodsnum
      goodsnum.splice(val, 1);  //数组删除当前删除的项
      this.goodsnum = goodsnum   //data中的数据返回删除后的数据
      this.goodslist.splice(val,1)
      let goodsid = localStorage.goodsid.split(",")
      goodsid.splice(val, 1);
      localStorage.setItem("goodsid", goodsid);//新数组重新存入本地存储
      localStorage.setItem("goodsnum", goodsnum);
    }
  },
  watch: {
    goodsnum(val) {
      //监听数量变化，将变化后的数组重新存入本地
      localStorage.setItem("goodsnum", val);
      let num = 0;
      this.goodslist.forEach(function(v, i, a) {
        //遍历商品价格
        num += v.price.price * val[i] * 100; //商品价格*改动后的数量数组
      });
      this.money = num;
    }
  },
  mounted() {
    if (localStorage.goodsid && localStorage.goodsnum) {
      //查看本地存储，有值时
      this.show = false;
      this.$axios.post("/nduser/moregoods").then(res => {
        //获取对应id的商品详细信息
        let goodsid = localStorage.goodsid.split(","); //将商品id取出转成数组
        let goodsnum = localStorage.goodsnum.split(",");
        this.goodsnum = goodsnum;
        goodsid.forEach(element => {
          this.goodslist.push(
            res.data.filter((v, i, a) => {//筛选出id相同的商品数据
              return v.sysNoo == element;
            })[0]
          );
        });
      });
    } else {
      //无值时
      this.show = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.heji {
  bottom: 50px;
}
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}

.cargoods {
  width: 100%;
  border-bottom: 1px solid rgba(70, 71, 70, 0.133);
  overflow: hidden;
  background: #fff;
  img {
    width: 30%;
    height: 100px;
    float: left;
  }
  div {
    width: 70%;
    float: left;
    text-align: right;
    overflow: hidden;
    .goodstitle{
      color:gray;
      font-size: 16px;
      margin-right: 10px;
    }
    .goodsprice {
      color: red;
      display: block;
      margin: 10px 10px 10px 0;
    }
    input {
      width: 50px;
      margin-right: 10px;
    }
  }
}
</style>

